<?php

namespace App\Http\Controllers;

use App\Http\Requests\BarangRequest;
use App\Models\Barang;
use App\Exports\BarangTransactionHistoryExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;

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
            ->paginate(10)
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
        $query = $barang->transactionItems()
            ->with(['transaction' => function ($q) {
                $q->where('type', 'keluar'); // Only outgoing transactions (requests)
            }])
            ->whereHas('transaction', function ($q) {
                $q->where('type', 'keluar');
            });

        // Filter by date range
        if ($request->has('start_date') && $request->start_date) {
            $query->whereHas('transaction', function ($q) use ($request) {
                $q->whereDate('tanggal', '>=', $request->start_date);
            });
        }

        if ($request->has('end_date') && $request->end_date) {
            $query->whereHas('transaction', function ($q) use ($request) {
                $q->whereDate('tanggal', '<=', $request->end_date);
            });
        }

        // Filter by month and year
        if ($request->has('month') && $request->has('year')) {
            $query->whereHas('transaction', function ($q) use ($request) {
                $q->whereMonth('tanggal', $request->month)
                  ->whereYear('tanggal', $request->year);
            });
        } elseif ($request->has('year')) {
            $query->whereHas('transaction', function ($q) use ($request) {
                $q->whereYear('tanggal', $request->year);
            });
        }

        // Get transactions grouped by ruangan
        $transactions = $query->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'ruangan_nama' => $item->transaction->ruangan_nama,
                    'tanggal' => $item->transaction->tanggal,
                    'jumlah' => $item->jumlah,
                    'kode_transaksi' => $item->transaction->kode_transaksi,
                ];
            });

        // Group by ruangan and sum quantities
        $groupedByRuangan = $transactions->groupBy('ruangan_nama')->map(function ($items, $ruangan) {
            return [
                'ruangan' => $ruangan,
                'total_jumlah' => $items->sum('jumlah'),
                'transaksi_count' => $items->count(),
                'transaksi' => $items->sortByDesc('tanggal')->values(),
            ];
        })->values();

        return response()->json([
            'barang' => [
                'id' => $barang->id,
                'nama' => $barang->nama,
                'kode' => $barang->kode,
                'satuan' => $barang->satuan,
            ],
            'data' => $groupedByRuangan,
            'total_requests' => $transactions->count(),
            'total_quantity' => $transactions->sum('jumlah'),
        ]);
    }

    /**
     * Export transaction history for a specific barang
     */
    public function exportTransactionHistory(Request $request, Barang $barang)
    {
        $format = $request->get('format', 'pdf'); // pdf or excel
        $filters = $request->only(['start_date', 'end_date', 'month', 'year']);

        // Get ALL transaction data (both masuk and keluar)
        $query = $barang->transactionItems()
            ->with(['transaction']);

        // Apply filters
        if ($request->has('start_date') && $request->start_date) {
            $query->whereHas('transaction', function ($q) use ($request) {
                $q->whereDate('tanggal', '>=', $request->start_date);
            });
        }

        if ($request->has('end_date') && $request->end_date) {
            $query->whereHas('transaction', function ($q) use ($request) {
                $q->whereDate('tanggal', '<=', $request->end_date);
            });
        }

        if ($request->has('month') && $request->has('year')) {
            $query->whereHas('transaction', function ($q) use ($request) {
                $q->whereMonth('tanggal', $request->month)
                  ->whereYear('tanggal', $request->year);
            });
        } elseif ($request->has('year')) {
            $query->whereHas('transaction', function ($q) use ($request) {
                $q->whereYear('tanggal', $request->year);
            });
        }

        // Get transactions and sort by date
        $transactions = $query->get()
            ->sortBy(function ($item) {
                return $item->transaction->tanggal;
            })
            ->values();

        // Calculate initial stock (saldo awal)
        // Get all transactions before the start date
        $initialStock = $barang->stok; // Current stock
        
        // Calculate backwards: subtract all transactions after filter period
        $afterPeriodQuery = $barang->transactionItems()->with(['transaction']);
        
        if ($request->has('start_date') && $request->start_date) {
            $afterPeriodQuery->whereHas('transaction', function ($q) use ($request) {
                $q->whereDate('tanggal', '>=', $request->start_date);
            });
            
            $afterPeriodTransactions = $afterPeriodQuery->get();
            foreach ($afterPeriodTransactions as $item) {
                $itemType = $item->transaction->type instanceof \App\TransactionType
                    ? $item->transaction->type->value
                    : $item->transaction->type;
                if ($itemType === 'masuk') {
                    $initialStock -= $item->jumlah;
                } else {
                    $initialStock += $item->jumlah;
                }
            }
        }

        // Build transaction list with running balance
        $transactionList = [];
        $saldo = $initialStock;

        foreach ($transactions as $item) {
            $type = $item->transaction->type instanceof \App\TransactionType
                ? $item->transaction->type->value
                : $item->transaction->type;
            $masuk = $type === 'masuk' ? $item->jumlah : 0;
            $keluar = $type === 'keluar' ? $item->jumlah : 0;
            
            $saldo = $saldo + $masuk - $keluar;

            $transactionList[] = [
                'tanggal' => $item->transaction->tanggal,
                'uraian' => $item->transaction->ruangan_nama,
                'masuk' => $masuk,
                'keluar' => $keluar,
                'saldo' => $saldo,
            ];
        }

        $data = [
            'barang' => $barang,
            'transactions' => $transactionList,
            'saldo_awal' => $initialStock,
            'filters' => $filters,
            'period_label' => $this->getPeriodLabel($filters),
            'generated_at' => now()->format('d/m/Y H:i:s'),
        ];

        if ($format === 'excel') {
            $filename = 'kartu-stok-' . str_replace(' ', '-', strtolower($barang->nama)) . '-' . now()->format('Y-m-d') . '.xlsx';
            return Excel::download(new BarangTransactionHistoryExport($barang, $filters), $filename);
        }

        // Default to PDF
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
}
