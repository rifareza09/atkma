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
        if ($request->has('ruangan_id') && $request->ruangan_id) {
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
            'filters' => $request->only(['ruangan_id', 'status', 'from_date', 'to_date']),
        ]);
    }

    /**
     * Display the laporan transaksi page
     */
    public function transaksi(Request $request): Response
    {
        $query = Transaction::with(['ruangan', 'user', 'items.barang']);

        // Apply filters
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        if ($request->has('ruangan_id') && $request->ruangan_id) {
            $query->where('ruangan_id', $request->ruangan_id);
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
            'filters' => $request->only(['type', 'ruangan_id', 'from_date', 'to_date']),
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
        $query = Transaction::with(['ruangan', 'user', 'items.barang']);

        // Apply filters
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        if ($request->has('ruangan_id') && $request->ruangan_id) {
            $query->where('ruangan_id', $request->ruangan_id);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('tanggal', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('tanggal', '<=', $request->date_to);
        }

        $transactions = $query->orderBy('tanggal', 'desc')->get();

        // Get ruangan name for title if filtered
        $ruanganName = null;
        if ($request->has('ruangan_id') && $request->ruangan_id) {
            $ruangan = Ruangan::find($request->ruangan_id);
            $ruanganName = $ruangan ? $ruangan->nama : null;
        }

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
                $request->only(['type', 'ruangan_id', 'date_from', 'date_to'])
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
}
