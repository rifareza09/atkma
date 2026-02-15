<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionApprovalRequest;
use App\Http\Requests\TransactionRequest;
use App\Models\Barang;
use App\Models\Ruangan;
use App\Models\Transaction;
use App\Services\TransactionService;
use App\TransactionType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
        $filters = $request->only(['search', 'type', 'ruangan_id', 'barang_id', 'from_date', 'to_date']);

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
    public function show(Transaction $transaction): Response
    {
        $transaction->load([
            'ruangan',
            'user',
            'items.barang',
            'stockMovements.barang',
            'stockMovements.user'
        ]);

        return Inertia::render('transaksi/permintaan/show', [
            'transaction' => $transaction,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction): Response
    {
        // Prevent editing of completed transactions
        if (in_array($transaction->status, ['approved', 'rejected'])) {
            abort(403, 'Transaksi yang sudah ' . $transaction->status . ' tidak dapat diedit');
        }

        abort(403, 'Transaksi tidak dapat diedit untuk menjaga integritas data');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        // Prevent editing of completed transactions
        if (in_array($transaction->status, ['approved', 'rejected'])) {
            abort(403, 'Transaksi yang sudah ' . $transaction->status . ' tidak dapat diedit');
        }

        // Transactions should not be editable for audit trail integrity
        abort(403, 'Transaksi tidak dapat diedit untuk menjaga integritas data');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        // Prevent deletion of completed transactions
        if (in_array($transaction->status, ['approved', 'rejected'])) {
            abort(403, 'Transaksi yang sudah ' . $transaction->status . ' tidak dapat dihapus');
        }

        try {
            $transaction->delete();

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
}
