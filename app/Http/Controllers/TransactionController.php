<?php

namespace App\Http\Controllers;

use App\Exports\TransactionExport;
use App\Http\Requests\TransactionApprovalRequest;
use App\Http\Requests\TransactionRequest;
use App\Models\Barang;
use App\Models\Ruangan;
use App\Models\Transaction;
use App\Services\TransactionService;
use App\TransactionType;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class TransactionController extends Controller
{
    public function __construct(
        protected TransactionService $transactionService
    ) {
        // Authorization akan dilakukan di policy jika diperlukan
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'type', 'ruangan_id', 'ruangan_nama', 'status', 'barang_id', 'from_date', 'to_date']);

        $transactions = $this->transactionService->getTransactions($filters);

        // Get filter options
        $ruangans = Ruangan::where('is_active', true)
            ->select('id', 'nama')
            ->orderBy('nama')
            ->get();

        $barangs = Barang::where('is_active', true)
            ->select('id', 'nama', 'kode')
            ->orderBy('nama')
            ->get();

        return Inertia::render('transaksi/permintaan/index', [
            'transactions' => $transactions,
            'filters' => $filters,
            'ruangans' => $ruangans,
            'barangs' => $barangs,
            'transactionTypes' => [
                ['value' => TransactionType::MASUK->value, 'label' => 'Barang Masuk'],
                ['value' => TransactionType::KELUAR->value, 'label' => 'Barang Keluar'],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $ruangans = Ruangan::where('is_active', true)
            ->select('id', 'nama', 'kode')
            ->orderBy('nama')
            ->get();

        $barangs = Barang::where('is_active', true)
            ->select('id', 'nama', 'kode', 'satuan', 'stok')
            ->orderBy('nama')
            ->get();

        return Inertia::render('transaksi/permintaan/create', [
            'ruangans' => $ruangans,
            'barangs' => $barangs,
            'transactionTypes' => [
                ['value' => TransactionType::MASUK->value, 'label' => 'Barang Masuk'],
                ['value' => TransactionType::KELUAR->value, 'label' => 'Barang Keluar'],
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request)
    {
        $validated = $request->validated();

        // Validate stock availability for outgoing transactions
        $type = TransactionType::from($validated['type']);
        $stockErrors = $this->transactionService->validateItemsStock($validated['items'], $type);

        if ($stockErrors) {
            return back()->withErrors($stockErrors);
        }

        try {
            $transaction = $this->transactionService->createTransaction(
                $validated,
                $request->user()
            );

            return redirect()
                ->route('permintaan.show', $transaction->id)
                ->with('success', 'Transaksi berhasil dibuat');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Gagal membuat transaksi: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $permintaan): Response
    {
        $permintaan->load([
            'user',
            'items.barang',
            'stockMovements.barang',
            'stockMovements.user'
        ]);

        return Inertia::render('transaksi/permintaan/show', [
            'transaction' => [
                'id' => $permintaan->id,
                'kode_transaksi' => $permintaan->kode_transaksi,
                'ruangan_nama' => $permintaan->ruangan_nama ?? '',
                'user_id' => $permintaan->user_id,
                'type' => $permintaan->type?->value ?? 'keluar',
                'status' => $permintaan->status ?? 'pending',
                'tanggal' => $permintaan->tanggal?->format('Y-m-d') ?? now()->format('Y-m-d'),
                'keterangan' => $permintaan->keterangan,
                'created_at' => $permintaan->created_at?->toISOString() ?? now()->toISOString(),
                'updated_at' => $permintaan->updated_at?->toISOString() ?? now()->toISOString(),
                'user' => $permintaan->user ? [
                    'id' => $permintaan->user->id,
                    'name' => $permintaan->user->name,
                    'email' => $permintaan->user->email,
                ] : null,
                'items' => $permintaan->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'barang_id' => $item->barang_id,
                        'jumlah' => (int) $item->jumlah,
                        'barang' => $item->barang ? [
                            'id' => $item->barang->id,
                            'kode' => $item->barang->kode,
                            'nama' => $item->barang->nama,
                            'satuan' => $item->barang->satuan,
                        ] : null,
                    ];
                })->values()->toArray(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $permintaan): Response
    {
        // Prevent editing of completed transactions
        if (in_array($permintaan->status, ['approved', 'rejected'])) {
            abort(403, 'Transaksi yang sudah ' . $permintaan->status . ' tidak dapat diedit');
        }

        abort(403, 'Transaksi tidak dapat diedit untuk menjaga integritas data');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $permintaan)
    {
        // Prevent editing of completed transactions
        if (in_array($permintaan->status, ['approved', 'rejected'])) {
            abort(403, 'Transaksi yang sudah ' . $permintaan->status . ' tidak dapat diedit');
        }

        // Transactions should not be editable for audit trail integrity
        abort(403, 'Transaksi tidak dapat diedit untuk menjaga integritas data');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $permintaan)
    {
        // Prevent deletion of completed transactions
        if (in_array($permintaan->status, ['approved', 'rejected'])) {
            abort(403, 'Transaksi yang sudah ' . $permintaan->status . ' tidak dapat dihapus');
        }

        try {
            $permintaan->delete();

            return redirect()
                ->route('permintaan.index')
                ->with('success', 'Transaksi berhasil dihapus');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus transaksi: ' . $e->getMessage()]);
        }
    }

    /**
     * Approve a transaction
     */
    public function approve(Transaction $transaction)
    {
        // Authorization check (only admin can approve)
        $this->authorize('approve', $transaction);

        try {
            $updatedTransaction = $this->transactionService->approveTransaction(
                $transaction,
                auth()->user()
            );

            return redirect()
                ->route('permintaan.show', $updatedTransaction)
                ->with('success', 'Transaksi berhasil disetujui');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Reject a transaction
     */
    public function reject(TransactionApprovalRequest $request, Transaction $transaction)
    {
        // Authorization check (only admin can reject)
        $this->authorize('reject', $transaction);

        try {
            $updatedTransaction = $this->transactionService->rejectTransaction(
                $transaction,
                auth()->user(),
                $request->input('rejection_reason')
            );

            return redirect()
                ->route('permintaan.show', $updatedTransaction)
                ->with('success', 'Transaksi berhasil ditolak');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Revise a transaction
     */
    public function revise(TransactionApprovalRequest $request, Transaction $transaction)
    {
        // Authorization check (only admin can revise)
        $this->authorize('revise', $transaction);

        try {
            $updatedTransaction = $this->transactionService->reviseTransaction(
                $transaction,
                auth()->user(),
                $request->input('revision_notes')
            );

            return redirect()
                ->route('permintaan.show', $updatedTransaction)
                ->with('success', 'Transaksi telah diminta untuk direvisi');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Export transactions to Excel
     */
    public function exportExcel(Request $request)
    {
        $filters = $request->only(['search', 'type', 'ruangan_id', 'status', 'from_date', 'to_date']);
        
        $filename = 'transactions_' . now()->format('Y-m-d_His') . '.xlsx';
        
        return Excel::download(new TransactionExport($filters), $filename);
    }

    /**
     * Export transactions to PDF
     */
    public function exportPdf(Request $request)
    {
        $filters = $request->only(['search', 'type', 'ruangan_id', 'status', 'from_date', 'to_date']);
        
        $query = Transaction::with(['user', 'items.barang']);

        // Apply filters
        if (!empty($filters['search'])) {
            $query->where('kode_transaksi', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (!empty($filters['ruangan_id']) && $filters['ruangan_id'] !== 'all') {
            $ruangan = Ruangan::find($filters['ruangan_id']);
            if ($ruangan) {
                $query->where('ruangan_nama', $ruangan->nama);
            }
        }

        if (!empty($filters['status']) && is_array($filters['status'])) {
            $query->whereIn('status', $filters['status']);
        }

        if (!empty($filters['from_date'])) {
            $query->whereDate('tanggal', '>=', $filters['from_date']);
        }

        if (!empty($filters['to_date'])) {
            $query->whereDate('tanggal', '<=', $filters['to_date']);
        }

        $transactions = $query->orderBy('tanggal', 'desc')->get();

        $pdf = Pdf::loadView('exports.transactions-pdf', [
            'transactions' => $transactions,
            'filters' => $filters,
            'generated_at' => now()->format('d F Y H:i:s')
        ]);

        $pdf->setPaper('a4', 'landscape');

        return $pdf->download('transactions_' . now()->format('Y-m-d_His') . '.pdf');
    }
}
