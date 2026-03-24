<?php

namespace App\Services;

use App\Events\TransactionCreated;
use App\Events\TransactionStatusChanged;
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
                'ruangan_nama' => $data['ruangan_nama'],
                'user_id' => $user->id,
                'nama_peminta' => $data['nama_peminta'] ?? null,
                'type' => $data['type'],
                'status' => 'pending',
                'tanggal' => $data['tanggal'],
                'keterangan' => $data['keperluan'] ?? $data['keterangan'] ?? null,
            ]);

            // Process items
            $this->processItems($transaction, $data['items']);

            // Trigger TransactionCreated event
            event(new TransactionCreated($transaction));

            return $transaction->load(['items.barang', 'user']);
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
                    keterangan: "Permintaan dari {$transaction->ruangan_nama}"
                );
            } elseif ($transaction->type === TransactionType::MASUK) {
                // Add stock for incoming transaction
                $this->stockService->addStock(
                    barang: $barang,
                    qty: $jumlah,
                    user: $transaction->user,
                    keterangan: "Barang masuk ke {$transaction->ruangan_nama}",
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
     * Update transaction: reverse old stock movements, delete old items, re-process new items
     */
    public function updateTransaction(Transaction $transaction, array $data, User $user): Transaction
    {
        return DB::transaction(function () use ($transaction, $data, $user) {
            $type = TransactionType::from($data['type'] ?? $transaction->type->value);

            // Reverse stock for all existing items first
            foreach ($transaction->items()->with('barang')->get() as $item) {
                $barang = $item->barang;
                if (!$barang) continue;

                if ($type === TransactionType::KELUAR) {
                    // Add back the stock that was taken (increment langsung ke DB)
                    $barang->addStock($item->jumlah);
                } elseif ($type === TransactionType::MASUK) {
                    $barang->reduceStock($item->jumlah);
                }
                // Tidak perlu $barang->save() karena addStock/reduceStock pakai increment/decrement
            }

            // Delete old stock movements & items
            $transaction->stockMovements()->delete();
            $transaction->items()->delete();

            // Validate new items AFTER reversal (stok sudah dikembalikan)
            if ($type === TransactionType::KELUAR) {
                foreach ($data['items'] as $itemData) {
                    $barang = \App\Models\Barang::find($itemData['barang_id']);
                    if ($barang && $barang->fresh()->stok < $itemData['jumlah']) {
                        throw new \Exception(
                            "Stok {$barang->nama} tidak mencukupi. Tersedia: {$barang->fresh()->stok}, diminta: {$itemData['jumlah']}"
                        );
                    }
                }
            }

            // Update transaction header
            $transaction->update([
                'ruangan_nama' => $data['ruangan_nama'],
                'nama_peminta' => $data['nama_peminta'] ?? null,
                'tanggal'      => $data['tanggal'],
                'keterangan'   => $data['keperluan'] ?? $data['keterangan'] ?? null,
            ]);

            // Re-process with new items & update stock
            $this->processItems($transaction, $data['items']);

            return $transaction->load(['items.barang', 'user']);
        });
    }

    /**
     * Get transactions with filters
     *
     * @param array $filters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getTransactions(array $filters = [])
    {
        $query = Transaction::with(['user', 'items.barang']);

        // Filter by date range
        if (!empty($filters['from_date'])) {
            $query->where('tanggal', '>=', $filters['from_date']);
        }

        if (!empty($filters['to_date'])) {
            $query->where('tanggal', '<=', $filters['to_date']);
        }

        // Filter by ruangan_id (convert to ruangan_nama)
        if (!empty($filters['ruangan_id']) && $filters['ruangan_id'] !== 'all') {
            $ruangan = \App\Models\Ruangan::find($filters['ruangan_id']);
            if ($ruangan) {
                $query->where('ruangan_nama', $ruangan->nama);
            }
        }

        // Filter by ruangan_nama (direct)
        if (!empty($filters['ruangan_nama'])) {
            $query->where('ruangan_nama', $filters['ruangan_nama']);
        }

        // Filter by status
        if (!empty($filters['status']) && is_array($filters['status'])) {
            $query->whereIn('status', $filters['status']);
        }

        // Filter by type
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        // Search by kode_transaksi or ruangan_nama
        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('kode_transaksi', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('ruangan_nama', 'like', '%' . $filters['search'] . '%');
            });
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
}
