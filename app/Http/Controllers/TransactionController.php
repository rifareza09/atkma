<?php

namespace App\Http\Controllers;

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
            ->select('id', 'nama', 'kode_barang')
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
            ->select('id', 'nama', 'kode_ruangan')
            ->orderBy('nama')
            ->get();

        $barangs = Barang::where('is_active', true)
            ->select('id', 'nama', 'kode_barang', 'satuan', 'stok')
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
            $this->transactionService->createTransaction(
                $validated,
                $request->user()
            );

            return redirect()
                ->route('permintaan.index')
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
        // Note: Editing transactions is typically not allowed for audit trail
        // But we include it for completeness. Consider disabling in production.
        
        abort(403, 'Transaksi tidak dapat diedit untuk menjaga integritas data');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        // Transactions should not be editable for audit trail integrity
        abort(403, 'Transaksi tidak dapat diedit untuk menjaga integritas data');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        // Note: Deleting transactions affects stock movements
        // Consider soft deletes or disabling deletion in production
        
        try {
            $transaction->delete();

            return redirect()
                ->route('permintaan.index')
                ->with('success', 'Transaksi berhasil dihapus');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus transaksi: ' . $e->getMessage()]);
        }
    }
}
