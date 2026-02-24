<?php

namespace App\Http\Controllers;

use App\Exports\InventoryExport;
use App\Exports\StockMovementExport;
use App\Exports\TransactionExport;
use App\Models\Barang;
use App\Models\Ruangan;
use App\Models\StockMovement;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ReportController extends Controller
{
    /**
     * Display the laporan inventaris page
     */
    public function inventaris(Request $request): Response
    {
        $query = Barang::query()->where('is_active', true);

        // Apply filters
        if ($request->has('ruangan_nama') && $request->ruangan_nama) {
            // If you have a relationship between Barang and Ruangan, filter by it
            // For now, we'll just pass the filter to frontend
        }

        if ($request->has('status') && $request->status) {
            if ($request->status === 'low_stock') {
                $query->whereRaw('stok <= stok_minimum');
            }
        }

        if ($request->has('from_date') && $request->from_date) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->has('to_date') && $request->to_date) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $barangs = $query->orderBy('nama')->get();

        return Inertia::render('laporan/inventaris', [
            'barangs' => $barangs,
            'ruangans' => Ruangan::where('is_active', true)
                ->orderBy('nama')
                ->get(),
            'filters' => $request->only(['ruangan_nama', 'status', 'from_date', 'to_date']),
        ]);
    }

    /**
     * Display the laporan transaksi page
     */
    public function transaksi(Request $request): Response
    {
        $query = Transaction::with(['user', 'items.barang']);

        // Apply filters
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        if ($request->has('ruangan_nama') && $request->ruangan_nama) {
            $query->where('ruangan_nama', $request->ruangan_nama);
        }

        if ($request->has('from_date') && $request->from_date) {
            $query->whereDate('tanggal', '>=', $request->from_date);
        }

        if ($request->has('to_date') && $request->to_date) {
            $query->whereDate('tanggal', '<=', $request->to_date);
        }

        $transactions = $query->orderBy('tanggal', 'desc')->get();

        return Inertia::render('laporan/transaksi', [
            'transactions' => $transactions,
            'ruangans' => Ruangan::where('is_active', true)
                ->orderBy('nama')
                ->get(),
            'filters' => $request->only(['type', 'ruangan_nama', 'from_date', 'to_date']),
        ]);
    }

    /**
     * Export daftar inventaris ke PDF
     */
    public function exportInventoryPdf(Request $request)
    {
        $query = Barang::query()->where('is_active', true);

        // Apply filters
        if ($request->has('low_stock') && $request->low_stock) {
            $query->whereRaw('stok <= stok_minimum');
        }

        $barangs = $query->orderBy('nama')->get();

        $pdf = Pdf::loadView('reports.inventory', [
            'barangs' => $barangs,
            'title' => 'Laporan Inventaris Barang ATK',
            'date' => now()->format('d F Y'),
            'filter' => $request->low_stock ? 'Stok Rendah' : 'Semua Barang',
        ]);

        return $pdf->download('laporan-inventaris-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Export daftar inventaris ke Excel
     */
    public function exportInventoryExcel(Request $request): BinaryFileResponse
    {
        $lowStock = $request->has('low_stock') && $request->low_stock;

        return Excel::download(
            new InventoryExport($lowStock),
            'laporan-inventaris-' . now()->format('Y-m-d') . '.xlsx'
        );
    }

    /**
     * Cetak kartu stok per barang
     */
    public function kartuStokPdf(Barang $barang, Request $request)
    {
        $query = StockMovement::where('barang_id', $barang->id)
            ->with(['user', 'transaction']);

        // Filter by date range if provided
        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $movements = $query->orderBy('created_at', 'asc')->get();

        $pdf = Pdf::loadView('reports.kartu-stok', [
            'barang' => $barang,
            'movements' => $movements,
            'date_from' => $request->date_from,
            'date_to' => $request->date_to,
            'printed_at' => now()->format('d F Y H:i'),
        ])->setPaper('a4', 'landscape');

        return $pdf->download('kartu-stok-' . $barang->kode . '-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Export laporan transaksi ke PDF
     */
    public function exportTransactionPdf(Request $request)
    {
        $query = Transaction::with(['user', 'items.barang']);

        // Apply filters
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        if ($request->has('ruangan_nama') && $request->ruangan_nama) {
            $query->where('ruangan_nama', $request->ruangan_nama);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('tanggal', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('tanggal', '<=', $request->date_to);
        }

        $transactions = $query->orderBy('tanggal', 'desc')->get();

        // Get ruangan name for title if filtered
        $ruanganName = $request->ruangan_nama ?? null;

        $pdf = Pdf::loadView('reports.transaction', [
            'transactions' => $transactions,
            'title' => 'Laporan Transaksi ATK',
            'filters' => [
                'type' => $request->type,
                'ruangan' => $ruanganName,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
            'printed_at' => now()->format('d F Y H:i'),
        ])->setPaper('a4', 'landscape');

        return $pdf->download('laporan-transaksi-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Export laporan transaksi ke Excel
     */
    public function exportTransactionExcel(Request $request): BinaryFileResponse
    {
        return Excel::download(
            new TransactionExport(
                $request->only(['type', 'ruangan_nama', 'date_from', 'date_to'])
            ),
            'laporan-transaksi-' . now()->format('Y-m-d') . '.xlsx'
        );
    }

    /**
     * Export riwayat stock movement ke Excel
     */
    public function exportStockMovementExcel(Request $request): BinaryFileResponse
    {
        return Excel::download(
            new StockMovementExport(
                $request->only(['barang_id', 'date_from', 'date_to'])
            ),
            'riwayat-stock-movement-' . now()->format('Y-m-d') . '.xlsx'
        );
    }

    /**
     * Show bulan selector page for a specific barang
     */
    public function barangBulan(Barang $barang): \Inertia\Response
    {
        return \Inertia\Inertia::render('laporan/barang-bulan', [
            'barang' => $barang->only(['id', 'kode', 'nama', 'satuan', 'stok']),
        ]);
    }

    /**
     * Show the detail page: transactions for a specific barang/month/year grouped by ruangan
     */
    public function barangBulanDetail(Barang $barang, int $month, int $year): \Inertia\Response
    {
        $items = $barang->transactionItems()
            ->whereHas('transaction', function ($q) use ($month, $year) {
                $q->where('type', 'keluar')
                  ->whereMonth('tanggal', $month)
                  ->whereYear('tanggal', $year);
            })
            ->with(['transaction'])
            ->get()
            ->sortBy('transaction.tanggal')
            ->values();

        $groupedByRuangan = $items
            ->groupBy(fn ($item) => $item->transaction->ruangan_nama ?? 'Tidak Diketahui')
            ->map(function ($ruanganItems, $ruanganNama) {
                $rows = $ruanganItems->map(fn ($item) => [
                    'tanggal'    => $item->transaction->tanggal,
                    'jumlah'     => $item->jumlah,
                    'keterangan' => $item->transaction->keterangan ?? '-',
                ])->values();

                return [
                    'ruangan'  => $ruanganNama,
                    'rows'     => $rows,
                    'subtotal' => $rows->sum('jumlah'),
                ];
            })
            ->sortBy('ruangan')
            ->values();

        return \Inertia\Inertia::render('laporan/barang-bulan-detail', [
            'barang'      => $barang->only(['id', 'kode', 'nama', 'satuan', 'stok']),
            'ruangans'    => $groupedByRuangan,
            'grand_total' => $groupedByRuangan->sum('subtotal'),
            'month'       => $month,
            'year'        => $year,
        ]);
    }

    /**
     * Export distribusi barang per ruangan untuk bulan tertentu sebagai PDF
     */
    public function exportBarangBulanPdf(Request $request, Barang $barang)
    {
        $month = (int) $request->get('month', now()->month);
        $year  = (int) $request->get('year',  now()->year);

        $monthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret',    4 => 'April',
            5 => 'Mei',     6 => 'Juni',      7 => 'Juli',     8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember',
        ];

        // Fetch all "keluar" transaction items for this barang in the given month/year
        $items = $barang->transactionItems()
            ->whereHas('transaction', function ($q) use ($month, $year) {
                $q->where('type', 'keluar')
                  ->whereMonth('tanggal', $month)
                  ->whereYear('tanggal', $year);
            })
            ->with(['transaction'])
            ->get()
            ->sortBy('transaction.tanggal')
            ->values();

        // Group by ruangan_nama
        $groupedByRuangan = $items
            ->groupBy(fn ($item) => $item->transaction->ruangan_nama ?? 'Tidak Diketahui')
            ->map(function ($ruanganItems, $ruanganNama) {
                $rows = $ruanganItems->map(fn ($item) => [
                    'tanggal' => $item->transaction->tanggal,
                    'jumlah'  => $item->jumlah,
                    'keterangan' => $item->transaction->keterangan ?? '-',
                ])->values();

                return [
                    'ruangan' => $ruanganNama,
                    'rows'    => $rows,
                    'subtotal' => $rows->sum('jumlah'),
                ];
            })
            ->sortBy('ruangan')
            ->values();

        $grandTotal = $groupedByRuangan->sum('subtotal');

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('reports.barang-bulan-pdf', [
            'barang'      => $barang,
            'ruangans'    => $groupedByRuangan,
            'grand_total' => $grandTotal,
            'month'       => $month,
            'year'        => $year,
            'month_name'  => $monthNames[$month] ?? '-',
            'generated_at' => now()->format('d/m/Y H:i:s'),
        ])->setPaper('a4', 'portrait');

        $filename = 'laporan-distribusi-' . \Illuminate\Support\Str::slug($barang->nama)
            . '-' . str_pad($month, 2, '0', STR_PAD_LEFT) . '-' . $year . '.pdf';

        return $pdf->download($filename);
    }
}
