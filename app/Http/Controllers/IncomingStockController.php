<?php

namespace App\Http\Controllers;

use App\Http\Requests\IncomingStockRequest;
use App\Models\IncomingStock;
use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class IncomingStockController extends Controller
{
    /**
     * Display a listing of incoming stocks.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', IncomingStock::class);

        $query = IncomingStock::select(
            'kode_barang_masuk',
            \DB::raw('MAX(id) as id'),
            \DB::raw('MAX(tanggal_masuk) as tanggal_masuk'),
            \DB::raw('MAX(sumber) as sumber'),
            \DB::raw('MAX(nomor_dokumen) as nomor_dokumen'),
            \DB::raw('MAX(nomor_faktur) as nomor_faktur'),
            \DB::raw('MAX(nomor_surat_jalan) as nomor_surat_jalan'),
            \DB::raw('MAX(tanggal_faktur) as tanggal_faktur'),
            \DB::raw('COUNT(id) as total_items'),
            \DB::raw('SUM(jumlah) as total_jumlah')
        )->groupBy('kode_barang_masuk');

        // Year filter (Report requirement)
        if ($request->has('year') && $request->year) {
            $query->whereYear('tanggal_masuk', $request->year);
        }

        // Month filter (Report requirement)
        if ($request->has('month') && $request->month) {
            $query->whereMonth('tanggal_masuk', $request->month);
        }

        // Search by kode or barang name
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_barang_masuk', 'like', "%{$search}%")
                    ->orWhere('nomor_dokumen', 'like', "%{$search}%")
                    ->orWhere('nomor_faktur', 'like', "%{$search}%")
                    ->orWhere('nomor_surat_jalan', 'like', "%{$search}%")
                    ->orWhereHas('barang', function ($q) use ($search) {        
                        $q->where('nama', 'like', "%{$search}%")
                          ->orWhere('kode', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->dateRange($request->start_date, $request->end_date);        
        }

        // Order by latest (pertahun / groups)
        $query->orderBy(\DB::raw('MAX(tanggal_masuk)'), 'desc')->orderBy('kode_barang_masuk', 'desc');

        $incomingStocks = $query->paginate(15)
            ->withQueryString();

        return Inertia::render('transaksi/barang-masuk/index', [
            'incomingStocks' => [
                'data' => $incomingStocks->items(),
                'meta' => [
                    'current_page' => $incomingStocks->currentPage(),
                    'last_page'    => $incomingStocks->lastPage(),
                    'per_page'     => $incomingStocks->perPage(),
                    'total'        => $incomingStocks->total(),
                    'from'         => $incomingStocks->firstItem(),
                    'to'           => $incomingStocks->lastItem(),
                ],
            ],
            'filters' => $request->only(['search', 'status', 'start_date', 'end_date', 'barang_id', 'year', 'month']),
            // Available years for dropdown
            'availableYears' => IncomingStock::selectRaw('YEAR(tanggal_masuk) as year')->distinct()->orderBy('year', 'desc')->pluck('year'),
        ]);
    }

    /**
     * Show the form for creating a new incoming stock.
     */
    public function create(): Response
    {
        $this->authorize('create', IncomingStock::class);

        return Inertia::render('transaksi/barang-masuk/create', [
            'barangs' => Barang::select('id', 'kode', 'nama', 'satuan', 'stok')
                ->where('is_active', true)
                ->orderBy('nama')
                ->get(),
        ]);
    }

    /**
     * Store a newly created incoming stock.
     */
    public function store(IncomingStockRequest $request): RedirectResponse
    {
        $this->authorize('create', IncomingStock::class);

        $kodeBarangMasuk = IncomingStock::generateKode();
        $lastInserted = null;
        
        foreach ($request->items as $item) {
            $lastInserted = IncomingStock::create([
                'kode_barang_masuk' => $kodeBarangMasuk,
                'barang_id'     => $item['barang_id'],
                'jumlah'        => $item['jumlah'],
                'tanggal_masuk' => $request->tanggal,
                'sumber'        => $request->sumber_tujuan,
                'nomor_dokumen' => $request->nomor_referensi,
                'nomor_faktur'  => $request->nomor_faktur,
                'nomor_surat_jalan' => $request->nomor_surat_jalan,
                'tanggal_faktur' => $request->tanggal_faktur,
                'keterangan'    => $request->keterangan,
                'user_id'       => auth()->id(),
                'status'        => 'approved',
            ]);
        }

        $count = count($request->items);
        $message = $count === 1
            ? 'Barang masuk berhasil dicatat dan stok telah diperbarui.'
            : "{$count} barang masuk berhasil dicatat dan stok telah diperbarui.";

        return redirect()->route('barang-masuk.index')
            ->with('success', $message);
    }

    /**
     * Display the specified incoming stock.
     */
    public function show(IncomingStock $barangMasuk): Response
    {
        $this->authorize('view', $barangMasuk);

        // Fetch all items that belong to the same transaction
        $transactionItems = IncomingStock::with(['barang', 'user'])
            ->where('kode_barang_masuk', $barangMasuk->kode_barang_masuk)
            ->get();

        return Inertia::render('transaksi/barang-masuk/show', [
            'movement' => $barangMasuk, // The generic info for the transaction
            'items' => $transactionItems,
        ]);
    }

    /**
     * Show the form for editing the specified incoming stock.
     */
    public function edit(IncomingStock $barangMasuk): Response
    {
        $this->authorize('update', $barangMasuk);

        $barangMasuk->load('barang');

        return Inertia::render('stok/barang-masuk/Edit', [
            'incomingStock' => $barangMasuk,
            'barangs' => Barang::where('is_active', true)
                ->select('id', 'kode', 'nama', 'satuan', 'stok')
                ->orderBy('nama')
                ->get(),
        ]);
    }

    /**
     * Update the specified incoming stock.
     */
    public function update(Request $request, IncomingStock $barangMasuk): RedirectResponse
    {
        $this->authorize('update', $barangMasuk);

        // Allow editing reference fields even if approved.
        $validated = $request->validate([
            'tanggal_masuk'     => 'required|date',
            'sumber'            => 'nullable|string|max:255',
            'nomor_dokumen'     => 'nullable|string|max:255',
            'nomor_faktur'      => 'nullable|string|max:100',
            'nomor_surat_jalan' => 'nullable|string|max:100',
            'tanggal_faktur'    => 'nullable|date',
            'keterangan'        => 'nullable|string|max:1000',
        ]);

        // Update all items in this transaction
        IncomingStock::where('kode_barang_masuk', $barangMasuk->kode_barang_masuk)
            ->update($validated);

        return redirect()->route('barang-masuk.show', $barangMasuk->id)
            ->with('success', 'Detail barang masuk berhasil diperbarui.');
    }

    public function updateItem(Request $request, IncomingStock $incomingStock): RedirectResponse
    {
        $this->authorize('update', $incomingStock);

        $validated = $request->validate([
            'jumlah' => 'required|integer|min:1',
        ]);

        $newJumlah = $validated['jumlah'];
        $oldJumlah = $incomingStock->jumlah;
        $diff = $newJumlah - $oldJumlah;

        if ($diff === 0) {
            return back();
        }

        \DB::transaction(function () use ($incomingStock, $newJumlah, $oldJumlah, $diff) {
            $barang = $incomingStock->barang()->lockForUpdate()->first();
            
            // If decreasing, ensure enough stock
            if ($diff < 0 && ($barang->stok + $diff) < 0) {
                abort(422, "Stok barang '{$barang->nama}' tidak mencukupi untuk pengurangan ini. Sisa saat ini: {$barang->stok}");
            }

            $stokSebelum = $barang->stok;
            $stokSesudah = $stokSebelum + $diff;

            // Update master stok
            $barang->update(['stok' => $stokSesudah]);
            
            // Update item quantity
            $incomingStock->updateQuietly(['jumlah' => $newJumlah]);

            // Create stock movement
            \App\Models\StockMovement::create([
                'barang_id' => $incomingStock->barang_id,
                'user_id' => auth()->id(),
                'type' => $diff > 0 ? 'penambahan' : 'pengurangan',
                'jumlah' => abs($diff),
                'stok_sebelum' => $stokSebelum,
                'stok_sesudah' => $stokSesudah,
                'keterangan' => "Koreksi Barang Masuk {$incomingStock->kode_barang_masuk} (Awal: {$oldJumlah}, Menjadi: {$newJumlah})",
            ]);
        });

        return back()->with('success', 'Kuantitas barang berhasil diperbarui.');
    }

    /**
     * Remove the specified incoming stock.
     */
    public function destroy(IncomingStock $barangMasuk): RedirectResponse
    {
        $this->authorize('delete', $barangMasuk);

        if ($barangMasuk->status === 'approved') {
            return back()->withErrors([
                'message' => 'Data yang sudah diapprove tidak dapat dihapus. Hubungi administrator.'
            ]);
        }

        $barangMasuk->delete();

        return redirect()->route('barang-masuk.index')
            ->with('success', 'Data barang masuk berhasil dihapus.');
    }

    /**
     * Export incoming stocks data
     */
    public function export(Request $request)
    {
        $this->authorize('viewAny', IncomingStock::class);

        $query = IncomingStock::with(['barang', 'user']);

        if ($request->has('year') && $request->year) {
            $query->whereYear('tanggal_masuk', $request->year);
        }
        if ($request->has('month') && $request->month) {
            $query->whereMonth('tanggal_masuk', $request->month);
        }
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_barang_masuk', 'like', "%{$search}%")
                  ->orWhere('sumber', 'like', "%{$search}%")
                  ->orWhere('nomor_dokumen', 'like', "%{$search}%")
                  ->orWhere('nomor_faktur', 'like', "%{$search}%")
                  ->orWhere('nomor_surat_jalan', 'like', "%{$search}%")
                  ->orWhereHas('barang', function ($q) use ($search) {
                      $q->where('nama', 'like', "%{$search}%")
                        ->orWhere('kode', 'like', "%{$search}%");
                  });
            });
        }

        $items = $query->orderBy('tanggal_masuk', 'desc')
                      ->orderBy('created_at', 'desc')
                      ->get();

        $transactions = $items->groupBy('kode_barang_masuk')->values();

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('reports.barang-masuk', [
            'title' => 'Laporan Barang Masuk',
            'transactions' => $transactions,
            'filters' => [
                'year' => $request->year,
                'month' => $request->month,
                'search' => $request->search
            ],
            'signature_place_date' => $request->input('signature_place_date', 'Jakarta, ' . now()->translatedFormat('d F Y')),
            'nama_ppk' => $request->input('nama_ppk'),
            'nama_mengetahui' => $request->input('nama_mengetahui'),
            'nama_pjawab' => $request->input('nama_pjawab'),
            'printed_at' => now()->format('d/m/Y H:i:s')
        ])->setPaper('a4', 'landscape');

        return $pdf->download("Laporan_Barang_Masuk_" . now()->format('Ymd_His') . ".pdf");
    }
}
