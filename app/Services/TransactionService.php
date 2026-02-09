<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Models\User;
use App\TransactionType;
use Illuminate\Support\Facades\DB;

class TransactionService
{
    public function __construct(
        protected StockService $stockService
    ) {}

    /**
     * Create new transaction with items
     *
     * @param array $data
     * @param User $user
     * @return Transaction
     * @throws \Exception
     */
    public function createTransaction(array $data, User $user): Transaction
    {
        return DB::transaction(function () use ($data, $user) {
            // Create transaction
            $transaction = Transaction::create([
                'ruangan_id' => $data['ruangan_id'],
                'user_id' => $user->id,
                'type' => $data['type'],
                'tanggal' => $data['tanggal'],
                'keterangan' => $data['keterangan'] ?? null,
            ]);

            // Process items
            $this->processItems($transaction, $data['items']);

            return $transaction->load(['items.barang', 'ruangan', 'user']);
        });
    }

    /**
     * Process transaction items and update stock
     *
     * @param Transaction $transaction
     * @param array $items
     * @return void
     * @throws \Exception
     */
    public function processItems(Transaction $transaction, array $items): void
    {
        foreach ($items as $item) {
            $barang = \App\Models\Barang::findOrFail($item['barang_id']);
            $jumlah = $item['jumlah'];

            // Create transaction item
            TransactionItem::create([
                'transaction_id' => $transaction->id,
                'barang_id' => $barang->id,
                'jumlah' => $jumlah,
            ]);

            // Update stock based on transaction type
            if ($transaction->type === TransactionType::KELUAR) {
                // Reduce stock for outgoing transaction
                $this->stockService->reduceStock(
                    barang: $barang,
                    qty: $jumlah,
                    user: $transaction->user,
                    transaction: $transaction,
                    keterangan: "Permintaan dari {$transaction->ruangan->nama}"
                );
            } elseif ($transaction->type === TransactionType::MASUK) {
                // Add stock for incoming transaction
                $this->stockService->addStock(
                    barang: $barang,
                    qty: $jumlah,
                    user: $transaction->user,
                    keterangan: "Barang masuk ke {$transaction->ruangan->nama}",
                    transaction: $transaction
                );
            }
        }
    }

    /**
     * Validate items stock before creating transaction
     *
     * @param array $items
     * @param TransactionType $type
     * @return array|null Returns error message array if validation fails, null if passes
     */
    public function validateItemsStock(array $items, TransactionType $type): ?array
    {
        // Only validate for outgoing transactions
        if ($type !== TransactionType::KELUAR) {
            return null;
        }

        $errors = [];

        foreach ($items as $index => $item) {
            $barang = \App\Models\Barang::find($item['barang_id']);
            
            if (!$barang) {
                $errors["items.{$index}.barang_id"] = "Barang tidak ditemukan";
                continue;
            }

            if (!$this->stockService->hasSufficientStock($barang, $item['jumlah'])) {
                $errors["items.{$index}.jumlah"] = "Stok {$barang->nama} tidak mencukupi. Tersedia: {$barang->stok}, diminta: {$item['jumlah']}";
            }
        }

        return empty($errors) ? null : $errors;
    }

    /**
     * Get transactions with filters
     *
     * @param array $filters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getTransactions(array $filters = [])
    {
        $query = Transaction::with(['ruangan', 'user', 'items.barang']);

        // Filter by date range
        if (!empty($filters['from_date'])) {
            $query->where('tanggal', '>=', $filters['from_date']);
        }

        if (!empty($filters['to_date'])) {
            $query->where('tanggal', '<=', $filters['to_date']);
        }

        // Filter by ruangan
        if (!empty($filters['ruangan_id'])) {
            $query->where('ruangan_id', $filters['ruangan_id']);
        }

        // Filter by type
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        // Search by kode_transaksi
        if (!empty($filters['search'])) {
            $query->where('kode_transaksi', 'like', '%' . $filters['search'] . '%');
        }

        // Filter by barang (has transaction item with specific barang)
        if (!empty($filters['barang_id'])) {
            $query->whereHas('items', function ($q) use ($filters) {
                $q->where('barang_id', $filters['barang_id']);
            });
        }

        return $query->latest('tanggal')
            ->latest('created_at')
            ->paginate(10);
    }

    /**
     * Approve a transaction
     *
     * @param Transaction $transaction
     * @param User $approver
     * @return Transaction
     * @throws \Exception
     */
    public function approveTransaction(Transaction $transaction, User $approver): Transaction
    {
        if (!$transaction->canBeApproved()) {
            throw new \Exception("Transaksi dengan status {$transaction->status} tidak dapat disetujui");
        }

        return DB::transaction(function () use ($transaction, $approver) {
            // Update transaction status
            $transaction->update([
                'status' => 'approved',
                'approved_by' => $approver->id,
                'approved_at' => now(),
            ]);

            // If this is an outgoing transaction and stock hasn't been reduced yet
            // (for transactions that were created as 'pending' status)
            // Note: Based on current implementation, stock is already reduced on creation
            // But this is here for future flexibility if workflow changes

            return $transaction->fresh(['approver', 'ruangan', 'user', 'items.barang']);
        });
    }

    /**
     * Reject a transaction
     *
     * @param Transaction $transaction
     * @param User $rejector
     * @param string $reason
     * @return Transaction
     * @throws \Exception
     */
    public function rejectTransaction(Transaction $transaction, User $rejector, string $reason): Transaction
    {
        if (!$transaction->canBeRejected()) {
            throw new \Exception("Transaksi dengan status {$transaction->status} tidak dapat ditolak");
        }

        return DB::transaction(function () use ($transaction, $rejector, $reason) {
            // Rollback stock if transaction type is KELUAR and status was pending
            // (stock might have been reduced on creation)
            if ($transaction->type === TransactionType::KELUAR && $transaction->status === 'pending') {
                foreach ($transaction->items as $item) {
                    // Add back the stock that was reduced
                    $this->stockService->addStock(
                        barang: $item->barang,
                        qty: $item->jumlah,
                        user: $rejector,
                        keterangan: "Rollback - Transaksi {$transaction->kode_transaksi} ditolak: {$reason}",
                        transaction: $transaction
                    );
                }
            }

            // Update transaction status
            $transaction->update([
                'status' => 'rejected',
                'rejected_by' => $rejector->id,
                'rejected_at' => now(),
                'rejection_reason' => $reason,
            ]);

            return $transaction->fresh(['rejector', 'ruangan', 'user', 'items.barang']);
        });
    }

    /**
     * Revise a transaction
     *
     * @param Transaction $transaction
     * @param User $revisor
     * @param string $notes
     * @return Transaction
     * @throws \Exception
     */
    public function reviseTransaction(Transaction $transaction, User $revisor, string $notes): Transaction
    {
        if (!$transaction->canBeRevised()) {
            throw new \Exception("Transaksi dengan status {$transaction->status} tidak dapat direvisi");
        }

        return DB::transaction(function () use ($transaction, $revisor, $notes) {
            // Update transaction status
            $transaction->update([
                'status' => 'revised',
                'revised_by' => $revisor->id,
                'revised_at' => now(),
                'revision_notes' => $notes,
            ]);

            return $transaction->fresh(['revisor', 'ruangan', 'user', 'items.barang']);
        });
    }
}
