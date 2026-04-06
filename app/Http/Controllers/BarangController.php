<?php

namespace App\Http\Controllers;

use App\Http\Requests\BarangRequest;
use App\Models\Barang;
use App\Models\IncomingStock;
use App\Exports\BarangTransactionHistoryExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Barang::class);

        $query = Barang::query();

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode', 'like', "%{$search}%")
                    ->orWhere('nama', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        // Filter by low stock
        if ($request->has('low_stock') && $request->low_stock) {
            $query->whereRaw('stok < stok_minimum');
        }

        $barangs = $query->latest()
            ->paginate(100)
            ->withQueryString();

        return Inertia::render('master/barang/index', [
            'barangs' => $barangs,
            'filters' => $request->only(['search', 'status', 'low_stock']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', Barang::class);

        return Inertia::render('master/barang/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BarangRequest $request): RedirectResponse
    {
        $this->authorize('create', Barang::class);

        Barang::create($request->validated());

        return redirect()->route('barang.index')
            ->with('success', 'Barang berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Barang $barang): Response
    {
        $this->authorize('view', $barang);

        $barang->load(['transactionItems.transaction', 'stockMovements']);

        return Inertia::render('master/barang/show', [
            'barang' => $barang,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barang $barang): Response
    {
        $this->authorize('update', $barang);

        return Inertia::render('master/barang/edit', [
            'barang' => $barang,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BarangRequest $request, Barang $barang): RedirectResponse
    {
        $this->authorize('update', $barang);

        $barang->update($request->validated());

        return redirect()->route('barang.index')
            ->with('success', 'Barang berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Barang $barang): RedirectResponse
    {
        $this->authorize('delete', $barang);

        // Soft delete by setting is_active to false
        $barang->update(['is_active' => false]);

        return redirect()->route('barang.index')
            ->with('success', 'Barang berhasil dinonaktifkan');
    }

    /**
     * Get items with low stock
     */
    public function getLowStockItems()
    {
        $lowStockItems = Barang::where('is_active', true)
            ->whereRaw('stok <= stok_minimum')
            ->select('id', 'kode', 'nama', 'satuan', 'stok', 'stok_minimum')
            ->selectRaw('(stok * 100.0 / stok_minimum) as stock_percentage')
            ->orderByRaw('(stok * 100.0 / stok_minimum) ASC')
            ->limit(20)
            ->get()
            ->map(function ($item) {
                $item->stock_percentage = round($item->stock_percentage, 2);
                $item->critical = $item->stok == 0;
                return $item;
            });

        return response()->json($lowStockItems);
    }

    /**
     * Get transaction history for a specific barang
     */
    public function transactionHistory(Request $request, Barang $barang)
    {
        // Helper to apply date filters to a query
        $applyFilters = function ($q) use ($request) {
            if ($request->has('start_date') && $request->start_date) {
                $q->whereDate('tanggal', '>=', $request->start_date);
            }
            if ($request->has('end_date') && $request->end_date) {
                $q->whereDate('tanggal', '<=', $request->end_date);
            }
            if ($request->has('month') && $request->has('year')) {
                $q->whereMonth('tanggal', $request->month)
                  ->whereYear('tanggal', $request->year);
            } elseif ($request->has('year')) {
                $q->whereYear('tanggal', $request->year);
            }
        };

        // --- Barang Keluar (permintaan) ---
        $keluarQuery = $barang->transactionItems()
            ->with('transaction')
            ->whereHas('transaction', function ($q) use ($applyFilters) {
                $q->where('type', 'keluar');
                $applyFilters($q);
            });

        $keluarTransactions = $keluarQuery->latest()->get()->map(function ($item) {
            return [
                'ruangan_nama' => $item->transaction->ruangan_nama ?? '-',
                'nama_peminta' => $item->transaction->nama_peminta ?? '-',
                'tanggal' => $item->transaction->tanggal,
                'jumlah' => $item->jumlah,
                'kode_transaksi' => $item->transaction->kode_transaksi,
            ];
        });

        $groupedKeluar = $keluarTransactions->groupBy('ruangan_nama')->map(function ($items, $ruangan) {
            return [
                'ruangan' => $ruangan,
                'total_jumlah' => $items->sum('jumlah'),
                'transaksi_count' => $items->count(),
                'transaksi' => $items->sortByDesc('tanggal')->values(),
            ];
        })->values();

        // --- Barang Masuk (dari incoming_stocks) ---
        $masukQuery = IncomingStock::with(['user'])
            ->where('barang_id', $barang->id)
            ->where('status', 'approved');

        // Apply date filters using tanggal_masuk
        if ($request->filled('start_date')) {
            $masukQuery->whereDate('tanggal_masuk', '>=', $request->start_date);
        }
        if ($request->filled('end_date')) {
            $masukQuery->whereDate('tanggal_masuk', '<=', $request->end_date);
        }
        if ($request->filled('month') && $request->filled('year')) {
            $masukQuery->whereMonth('tanggal_masuk', $request->month)
                       ->whereYear('tanggal_masuk', $request->year);
        } elseif ($request->filled('year')) {
            $masukQuery->whereYear('tanggal_masuk', $request->year);
        }

        $masukTransactions = $masukQuery->latest()->get()->map(function ($stock) {
            $petugas = $stock->user?->name ?? 'Admin';
            return [
                'petugas'         => $petugas,
                'tanggal'         => $stock->tanggal_masuk,
                'jumlah'          => $stock->jumlah,
                'kode_transaksi'  => $stock->kode_barang_masuk,
                'keterangan'      => $stock->keterangan ?? '-',
                'sumber'          => $stock->sumber ?? '-',
            ];
        });

        $groupedMasuk = $masukTransactions->groupBy('petugas')->map(function ($items, $petugas) {
            return [
                'petugas'          => $petugas,
                'total_jumlah'     => $items->sum('jumlah'),
                'transaksi_count'  => $items->count(),
                'transaksi'        => $items->sortByDesc('tanggal')->values(),
            ];
        })->values();

        return response()->json([
            'barang' => [
                'id' => $barang->id,
                'nama' => $barang->nama,
                'kode' => $barang->kode,
                'satuan' => $barang->satuan,
            ],
            'data' => $groupedKeluar,
            'total_requests' => $keluarTransactions->count(),
            'total_quantity' => $keluarTransactions->sum('jumlah'),
            'masuk_data' => $groupedMasuk,
            'total_masuk' => $masukTransactions->count(),
            'total_masuk_quantity' => $masukTransactions->sum('jumlah'),
        ]);
    }

    /**
     * Export transaction history for a specific barang
     */
    public function exportTransactionHistory(Request $request, Barang $barang)
    {
        $format = $request->get('format', 'pdf');
        $filters = $request->only(['start_date', 'end_date', 'month', 'year']);

        // Helper to check if a date is within the requested period
        $inPeriod = function ($date) use ($request) {
            $d = \Carbon\Carbon::parse($date);
            if ($request->filled('start_date') && $d->lt(\Carbon\Carbon::parse($request->start_date)->startOfDay())) return false;
            if ($request->filled('end_date')   && $d->gt(\Carbon\Carbon::parse($request->end_date)->endOfDay()))   return false;
            if ($request->filled('month') && $request->filled('year')) {
                if ($d->month != $request->month || $d->year != $request->year) return false;
            } elseif ($request->filled('year')) {
                if ($d->year != $request->year) return false;
            }
            return true;
        };

        // Helper: is date on/after start of period?
        $afterPeriodStart = function ($date) use ($request) {
            if ($request->filled('start_date')) {
                return \Carbon\Carbon::parse($date)->gte(\Carbon\Carbon::parse($request->start_date)->startOfDay());
            }
            if ($request->filled('month') && $request->filled('year')) {
                return \Carbon\Carbon::parse($date)->gte(\Carbon\Carbon::create($request->year, $request->month, 1)->startOfDay());
            }
            if ($request->filled('year')) {
                return \Carbon\Carbon::parse($date)->year >= $request->year;
            }
            return true; // no filter = all in period
        };

        // --- 1. Keluar transactions from transaction_items ---
        $keluarItems = $barang->transactionItems()
            ->with(['transaction'])
            ->whereHas('transaction', fn($q) => $q->where('type', 'keluar'))
            ->get()
            ->filter(fn($item) => $inPeriod($item->transaction->tanggal));

        // --- 2. Masuk transactions from incoming_stocks ---
        $masukItems = IncomingStock::where('barang_id', $barang->id)
            ->where('status', 'approved')
            ->with('user')
            ->get()
            ->filter(fn($stock) => $inPeriod($stock->tanggal_masuk));

        // --- 3. Calculate saldo awal (stock before the period) ---
        $saldoAwal = $barang->stok;

        // Subtract everything in/after the period to get the stock before it
        $allKeluar = $barang->transactionItems()->with('transaction')
            ->whereHas('transaction', fn($q) => $q->where('type', 'keluar'))
            ->get()
            ->filter(fn($item) => $afterPeriodStart($item->transaction->tanggal));

        $allMasuk = IncomingStock::where('barang_id', $barang->id)
            ->where('status', 'approved')
            ->get()
            ->filter(fn($stock) => $afterPeriodStart($stock->tanggal_masuk));

        foreach ($allKeluar as $item) { $saldoAwal += $item->jumlah; }  // reverse keluar
        foreach ($allMasuk  as $stock) { $saldoAwal -= $stock->jumlah; } // reverse masuk

        // --- 4. Build unified sorted transaction list ---
        $combined = collect();

        foreach ($keluarItems as $item) {
            $combined->push([
                'tanggal' => $item->transaction->tanggal,
                'uraian'  => $item->transaction->ruangan_nama ?? '-',
                'masuk'   => 0,
                'keluar'  => $item->jumlah,
            ]);
        }

        foreach ($masukItems as $stock) {
            $combined->push([
                'tanggal' => $stock->tanggal_masuk,
                'uraian'  => $stock->sumber ?? ('Barang Masuk - ' . ($stock->user->name ?? 'Admin')),
                'masuk'   => $stock->jumlah,
                'keluar'  => 0,
            ]);
        }

        $sorted = $combined->sortBy(fn($t) => \Carbon\Carbon::parse($t['tanggal']))->values();

        $saldo = $saldoAwal;
        $transactionList = $sorted->map(function ($t) use (&$saldo) {
            $saldo += $t['masuk'] - $t['keluar'];
            return array_merge($t, ['saldo' => $saldo]);
        })->toArray();

        $data = [
            'barang'        => $barang,
            'transactions'  => $transactionList,
            'saldo_awal'    => $saldoAwal,
            'filters'       => $filters,
            'period_label'  => $this->getPeriodLabel($filters),
            'generated_at'  => now()->format('d/m/Y H:i:s'),
        ];

        if ($format === 'excel') {
            $filename = 'kartu-stok-' . str_replace(' ', '-', strtolower($barang->nama)) . '-' . now()->format('Y-m-d') . '.xlsx';
            return Excel::download(new BarangTransactionHistoryExport($barang, $filters), $filename);
        }

        $pdf = Pdf::loadView('exports.barang-transaction-history-pdf', $data);
        $pdf->setPaper('a4', 'portrait');
        $filename = 'kartu-stok-' . str_replace(' ', '-', strtolower($barang->nama)) . '-' . now()->format('Y-m-d') . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Get period label for display
     */
    private function getPeriodLabel(array $filters): string
    {
        if (!empty($filters['month']) && !empty($filters['year'])) {
            $months = [
                1 => 'JANUARI', 2 => 'FEBRUARI', 3 => 'MARET', 4 => 'APRIL',
                5 => 'MEI', 6 => 'JUNI', 7 => 'JULI', 8 => 'AGUSTUS',
                9 => 'SEPTEMBER', 10 => 'OKTOBER', 11 => 'NOVEMBER', 12 => 'DESEMBER'
            ];
            return 'BULAN ' . $months[(int)$filters['month']] . ' TAHUN ' . $filters['year'];
        } elseif (!empty($filters['year'])) {
            return 'TAHUN ' . $filters['year'];
        } elseif (!empty($filters['start_date']) && !empty($filters['end_date'])) {
            return date('d/m/Y', strtotime($filters['start_date'])) . ' - ' . date('d/m/Y', strtotime($filters['end_date']));
        }
        
        return 'SEMUA PERIODE';
    }

    /**
     * Upload image for a barang
     */
    public function uploadImage(Request $request, Barang $barang)
    {
        $this->authorize('update', $barang);

        try {
            $validated = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
            ]);

            // Delete old image if exists
            if ($barang->image_path && Storage::disk('public')->exists($barang->image_path)) {
                Storage::disk('public')->delete($barang->image_path);
            }

            // Store new image
            $path = $request->file('image')->store('barang-images', 'public');

            if (!$path) {
                throw new \Exception('Failed to store image');
            }

            // Update barang with new image path
            $barang->update(['image_path' => $path]);

            return response()->json([
                'success' => true,
                'image_path' => $path,
                'image_url' => Storage::disk('public')->url($path),
                'message' => 'Gambar berhasil diupload'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal: ' . implode(', ', $e->errors()['image'] ?? [])
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Image upload error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error uploading image: ' . $e->getMessage()
            ], 500);
        }
    }
}
