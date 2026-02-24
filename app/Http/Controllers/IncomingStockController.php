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

        $query = IncomingStock::with(['barang', 'user'])
            ->latest();

        // Search by kode or barang name
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_barang_masuk', 'like', "%{$search}%")
                    ->orWhere('nomor_dokumen', 'like', "%{$search}%")
                    ->orWhereHas('barang', function ($q) use ($search) {
                        $q->where('nama', 'like', "%{$search}%")
                          ->orWhere('kode', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->status($request->status);
        }

        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->dateRange($request->start_date, $request->end_date);
        }

        // Filter by barang
        if ($request->has('barang_id') && $request->barang_id) {
            $query->where('barang_id', $request->barang_id);
        }

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
            'filters' => $request->only(['search', 'status', 'start_date', 'end_date', 'barang_id']),
            'barangs' => Barang::select('id', 'kode', 'nama')->where('is_active', true)->get(),
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

        $incomingStock = IncomingStock::create([
            'barang_id'     => $request->barang_id,
            'jumlah'        => $request->jumlah,
            'tanggal_masuk' => $request->tanggal,
            'sumber'        => $request->sumber_tujuan,
            'nomor_dokumen' => $request->nomor_referensi,
            'keterangan'    => $request->keterangan,
            'user_id'       => auth()->id(),
            'status'        => 'approved',
        ]);

        return redirect()->route('barang-masuk.show', $incomingStock)
            ->with('success', 'Barang masuk berhasil dicatat dan stok telah diperbarui.');
    }

    /**
     * Display the specified incoming stock.
     */
    public function show(IncomingStock $barangMasuk): Response
    {
        $this->authorize('view', $barangMasuk);

        $barangMasuk->load(['barang', 'user']);

        // Get related stock movement
        $stockMovement = $barangMasuk->barang->stockMovements()
            ->where('keterangan', 'like', "%{$barangMasuk->kode_barang_masuk}%")
            ->first();

        return Inertia::render('transaksi/barang-masuk/show', [
            'movement' => $barangMasuk,
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
    public function update(IncomingStockRequest $request, IncomingStock $barangMasuk): RedirectResponse
    {
        $this->authorize('update', $barangMasuk);

        // Only allow edit if not yet approved or if status change
        if ($barangMasuk->status === 'approved' && !$request->has('status')) {
            return back()->withErrors([
                'message' => 'Data yang sudah diapprove tidak dapat diubah.'
            ]);
        }

        $barangMasuk->update($request->validated());

        return redirect()->route('barang-masuk.show', $barangMasuk)
            ->with('success', 'Data barang masuk berhasil diperbarui.');
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

        $query = IncomingStock::with(['barang', 'user'])
            ->latest();

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->dateRange($request->start_date, $request->end_date);
        }

        $data = $query->get();

        // Return as CSV or Excel based on request
        // Implementation depends on your export library (e.g., Laravel Excel)

        return response()->json([
            'message' => 'Export feature coming soon',
            'data' => $data
        ]);
    }
}
