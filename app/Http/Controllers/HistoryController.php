<?php

namespace App\Http\Controllers;

use App\Exports\HistoryExport;
use App\Models\Ruangan;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class HistoryController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['tanggal', 'bulan', 'tahun', 'ruangan_id', 'sort']);

        $sortDir = ($filters['sort'] ?? 'asc') === 'asc' ? 'asc' : 'desc';

        $query = Transaction::with(['items' => function ($q) {
                $q->orderBy('id', 'asc');
            }, 'items.barang'])
            ->where('type', 'keluar')
            ->orderBy('tanggal', $sortDir)
            ->orderBy('id', $sortDir);

        // Filter tanggal spesifik
        if (!empty($filters['tanggal'])) {
            $query->whereDate('tanggal', $filters['tanggal']);
        } else {
            if (!empty($filters['tahun'])) {
                $query->whereYear('tanggal', $filters['tahun']);
            }
            if (!empty($filters['bulan'])) {
                $query->whereMonth('tanggal', $filters['bulan']);
            }
        }

        if (!empty($filters['ruangan_id']) && $filters['ruangan_id'] !== 'all') {
            $ruangan = Ruangan::find($filters['ruangan_id']);
            if ($ruangan) {
                $query->where('ruangan_nama', $ruangan->nama);
            }
        }

        $transactions = $query->get()->map(function ($trx) {
            return [
                'id'             => $trx->id,
                'kode_transaksi' => $trx->kode_transaksi,
                'tanggal'        => $trx->tanggal?->format('d/m/Y'),
                'ruangan_nama'   => $trx->ruangan_nama ?? '-',
                'nama_peminta'   => $trx->nama_peminta ?? '-',
                'status'         => $trx->status,
                'items'          => $trx->items->map(function ($item) {
                    return [
                        'nama_barang' => $item->barang?->nama ?? '-',
                        'kode_barang' => $item->barang?->kode ?? '-',
                        'satuan'      => $item->barang?->satuan ?? '-',
                        'jumlah'      => $item->jumlah,
                    ];
                }),
            ];
        });

        $ruangans = Ruangan::where('is_active', true)->orderBy('nama')->get(['id', 'nama', 'kode']);

        // Build available years from DB
        $availableYears = Transaction::selectRaw('YEAR(tanggal) as year')
            ->where('type', 'keluar')
            ->whereNotNull('tanggal')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year');

        return Inertia::render('history/index', [
            'transactions'    => $transactions,
            'ruangans'        => $ruangans,
            'available_years' => $availableYears,
            'filters'         => $filters,
        ]);
    }

    public function exportExcel(Request $request)
    {
        $filters = $request->only(['tanggal', 'bulan', 'tahun', 'ruangan_id']);

        $filename = 'history-transaksi-' . now()->format('Ymd_His') . '.xlsx';

        return Excel::download(new HistoryExport($filters), $filename);
    }

    public function exportPdf(Request $request)
    {
        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            $transactions = Transaction::with(['items.barang'])
                ->whereIn('id', $ids)
                ->where('type', 'keluar')
                ->orderBy('tanggal', 'desc')
                ->get();
            $pdf = Pdf::loadView('exports.history-pdf', [
                'transactions'  => $transactions,
                'period_label'  => 'Transaksi Terpilih (' . count($ids) . ')',
                'ruangan_nama'  => null,
                'generated_at'  => now()->format('d F Y H:i:s'),
            ]);
            $pdf->setPaper('a4', 'landscape');
            return $pdf->download('history-transaksi-' . now()->format('Ymd_His') . '.pdf');
        }

        $filters = $request->only(['tanggal', 'bulan', 'tahun', 'ruangan_id']);

        $query = Transaction::with(['items.barang'])
            ->where('type', 'keluar');

        if (!empty($filters['tanggal'])) {
            $query->whereDate('tanggal', $filters['tanggal']);
            $period_label = \Carbon\Carbon::parse($filters['tanggal'])->translatedFormat('d F Y');
        } else {
            if (!empty($filters['tahun'])) {
                $query->whereYear('tanggal', $filters['tahun']);
            }
            if (!empty($filters['bulan'])) {
                $query->whereMonth('tanggal', $filters['bulan']);
            }

            $bulanLabel = !empty($filters['bulan'])
                ? \Carbon\Carbon::createFromDate(null, $filters['bulan'], 1)->translatedFormat('F')
                : null;

            if ($bulanLabel && !empty($filters['tahun'])) {
                $period_label = "$bulanLabel {$filters['tahun']}";
            } elseif (!empty($filters['tahun'])) {
                $period_label = "Tahun {$filters['tahun']}";
            } elseif ($bulanLabel) {
                $period_label = $bulanLabel;
            } else {
                $period_label = 'Semua Periode';
            }
        }

        $ruanganNama = null;
        if (!empty($filters['ruangan_id']) && $filters['ruangan_id'] !== 'all') {
            $ruangan = Ruangan::find($filters['ruangan_id']);
            if ($ruangan) {
                $query->where('ruangan_nama', $ruangan->nama);
                $ruanganNama = $ruangan->nama;
            }
        }

        $transactions = $query->orderBy('tanggal', 'desc')->get();

        $pdf = Pdf::loadView('exports.history-pdf', [
            'transactions'  => $transactions,
            'period_label'  => $period_label,
            'ruangan_nama'  => $ruanganNama,
            'generated_at'  => now()->format('d F Y H:i:s'),
        ]);

        $pdf->setPaper('a4', 'landscape');

        $filename = 'history-transaksi-' . now()->format('Ymd_His') . '.pdf';

        return $pdf->download($filename);
    }
}
