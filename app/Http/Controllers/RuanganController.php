<?php

namespace App\Http\Controllers;

use App\Http\Requests\RuanganRequest;
use App\Models\Ruangan;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RuanganController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Ruangan::class);

        $query = Ruangan::query();

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

        // Add transaction count manually since we use ruangan_nama now
        $ruangans = $query->addSelect([
            'transactions_count' => \App\Models\Transaction::selectRaw('count(*)')
                ->whereColumn('transactions.ruangan_nama', 'ruangans.nama')
        ])
            ->orderBy('kode')
            ->get();

        return Inertia::render('master/ruangan/index', [
            'ruangans' => $ruangans,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', Ruangan::class);

        return Inertia::render('master/ruangan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RuanganRequest $request): RedirectResponse
    {
        $this->authorize('create', Ruangan::class);

        Ruangan::create($request->validated());

        return redirect()->route('ruangan.index')
            ->with('success', 'Ruangan berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ruangan $ruangan): Response
    {
        $this->authorize('view', $ruangan);

        $transactions = \App\Models\Transaction::with(['items.barang'])
            ->where('ruangan_nama', $ruangan->nama)
            ->where('type', 'keluar')
            ->orderBy('tanggal', 'desc')
            ->get()
            ->map(function ($trx) {
                return [
                    'id'             => $trx->id,
                    'kode_transaksi' => $trx->kode_transaksi,
                    'tanggal'        => $trx->tanggal?->format('d/m/Y'),
                    'nama_peminta'   => $trx->nama_peminta,
                    'keterangan'     => $trx->keterangan,
                    'status'         => $trx->status,
                    'items'          => $trx->items->map(function ($item) {
                        return [
                            'id'         => $item->id,
                            'nama_barang' => $item->barang?->nama ?? '-',
                            'kode_barang' => $item->barang?->kode ?? '-',
                            'satuan'     => $item->barang?->satuan ?? '-',
                            'jumlah'     => $item->jumlah,
                        ];
                    }),
                ];
            });

        return Inertia::render('master/ruangan/show', [
            'ruangan'      => $ruangan,
            'transactions' => $transactions,
        ]);
    }

    /**
     * Export riwayat peminjaman ruangan ke PDF.
     */
    public function exportPdf(Request $request, Ruangan $ruangan)
    {
        $this->authorize('view', $ruangan);

        $query = \App\Models\Transaction::with(['items.barang'])
            ->where('ruangan_nama', $ruangan->nama)
            ->where('type', 'keluar');

        $bulan = $request->query('bulan'); // format: 01-12
        $tahun = $request->query('tahun'); // format: 2026
        $tanggal = $request->query('tanggal'); // format: YYYY-MM-DD

        if ($tanggal) {
            $query->whereDate('tanggal', $tanggal);
            $period_label = \Carbon\Carbon::parse($tanggal)->translatedFormat('d F Y');
        } else {
            if ($tahun) {
                $query->whereYear('tanggal', $tahun);
            }
            if ($bulan) {
                $query->whereMonth('tanggal', $bulan);
            }

            $bulanLabel = $bulan ? \Carbon\Carbon::createFromDate(null, $bulan, 1)->translatedFormat('F') : null;
            if ($bulanLabel && $tahun) {
                $period_label = $bulanLabel . ' ' . $tahun;
            } elseif ($tahun) {
                $period_label = 'Tahun ' . $tahun;
            } elseif ($bulanLabel) {
                $period_label = $bulanLabel;
            } else {
                $period_label = 'Semua Periode';
            }
        }

        $transactions = $query->orderBy('tanggal', 'desc')->get();

        $pdf = Pdf::loadView('exports.ruangan-pdf', [
            'ruangan'      => $ruangan,
            'transactions' => $transactions,
            'period_label' => $period_label,
            'generated_at' => now()->format('d F Y H:i:s'),
        ]);

        $pdf->setPaper('a4', 'landscape');

        $filename = 'riwayat-' . str($ruangan->kode)->slug() . '-' . now()->format('Ymd') . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Export multiple ruangan ke satu PDF.
     */
    public function exportMultiplePdf(Request $request)
    {
        $ids = $request->query('ids', '');
        $idArray = array_filter(array_map('intval', explode(',', $ids)));

        if (empty($idArray)) {
            return redirect()->back()->with('error', 'Tidak ada ruangan yang dipilih');
        }

        // Get ruangans
        $ruangans = Ruangan::whereIn('id', $idArray)->get();

        // Get transactions untuk setiap ruangan
        $ruanganData = $ruangans->map(function ($ruangan) {
            $transactions = \App\Models\Transaction::with(['items.barang'])
                ->where('ruangan_nama', $ruangan->nama)
                ->where('type', 'keluar')
                ->orderBy('tanggal', 'desc')
                ->get();

            return [
                'ruangan'      => $ruangan,
                'transactions' => $transactions,
            ];
        });

        $pdf = Pdf::loadView('exports.ruangan-pdf-multiple', [
            'ruanganData'  => $ruanganData,
            'generated_at' => now()->format('d F Y H:i:s'),
        ]);

        $pdf->setPaper('a4', 'landscape');

        $filename = 'riwayat-peminjaman-' . now()->format('Ymd_His') . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ruangan $ruangan): Response
    {
        $this->authorize('update', $ruangan);

        return Inertia::render('master/ruangan/edit', [
            'ruangan' => $ruangan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RuanganRequest $request, Ruangan $ruangan): RedirectResponse
    {
        $this->authorize('update', $ruangan);

        $ruangan->update($request->validated());

        return redirect()->route('ruangan.index')
            ->with('success', 'Ruangan berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Ruangan $ruangan): RedirectResponse
    {
        $this->authorize('delete', $ruangan);

        // Soft delete by setting is_active to false
        $ruangan->update(['is_active' => false]);

        return redirect()->route('ruangan.index')
            ->with('success', 'Ruangan berhasil dinonaktifkan');
    }
}
