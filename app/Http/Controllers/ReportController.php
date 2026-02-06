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
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ReportController extends Controller
{
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
