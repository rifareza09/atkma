<?php

namespace App\Services;

use App\Models\Barang;
use App\Models\StockMovement;
use App\Models\Transaction;
use App\Models\User;
use App\StockMovementType;
use Illuminate\Support\Facades\DB;

class StockService
{
    /**
     * Add stock to barang
     *
     * @param Barang $barang
     * @param int $qty
     * @param User $user
     * @param string|null $keterangan
     * @param Transaction|null $transaction
     * @return StockMovement
     */
    public function addStock(
        Barang $barang,
        int $qty,
        User $user,
        ?string $keterangan = null,
        ?Transaction $transaction = null
    ): StockMovement {
        return DB::transaction(function () use ($barang, $qty, $user, $keterangan, $transaction) {
            $stokSebelum = $barang->stok;
            
            // Update stok barang
            $barang->addStock($qty);
            $barang->refresh();
            
            $stokSesudah = $barang->stok;

            // Create stock movement record
            return StockMovement::create([
                'barang_id' => $barang->id,
                'user_id' => $user->id,
                'transaction_id' => $transaction?->id,
                'type' => StockMovementType::PENAMBAHAN,
                'jumlah' => $qty,
                'stok_sebelum' => $stokSebelum,
                'stok_sesudah' => $stokSesudah,
                'keterangan' => $keterangan ?? 'Penambahan stok',
            ]);
        });
    }

    /**
     * Reduce stock from barang
     *
     * @param Barang $barang
     * @param int $qty
     * @param User $user
     * @param Transaction $transaction
     * @param string|null $keterangan
     * @return StockMovement
     * @throws \Exception
     */
    public function reduceStock(
        Barang $barang,
        int $qty,
        User $user,
        Transaction $transaction,
        ?string $keterangan = null
    ): StockMovement {
        return DB::transaction(function () use ($barang, $qty, $user, $transaction, $keterangan) {
            // Check if stock is sufficient
            if ($barang->stok < $qty) {
                throw new \Exception("Stok {$barang->nama} tidak mencukupi. Stok tersedia: {$barang->stok}, diminta: {$qty}");
            }

            $stokSebelum = $barang->stok;
            
            // Update stok barang
            $barang->reduceStock($qty);
            $barang->refresh();
            
            $stokSesudah = $barang->stok;

            // Create stock movement record
            return StockMovement::create([
                'barang_id' => $barang->id,
                'user_id' => $user->id,
                'transaction_id' => $transaction->id,
                'type' => StockMovementType::PENGURANGAN,
                'jumlah' => $qty,
                'stok_sebelum' => $stokSebelum,
                'stok_sesudah' => $stokSesudah,
                'keterangan' => $keterangan ?? 'Pengurangan stok - permintaan barang',
            ]);
        });
    }

    /**
     * Adjust stock to specific amount
     *
     * @param Barang $barang
     * @param int $newQty
     * @param User $user
     * @param string $keterangan
     * @return StockMovement
     */
    public function adjustStock(
        Barang $barang,
        int $newQty,
        User $user,
        string $keterangan
    ): StockMovement {
        return DB::transaction(function () use ($barang, $newQty, $user, $keterangan) {
            $stokSebelum = $barang->stok;
            $difference = $newQty - $stokSebelum;
            
            // Update stok barang
            $barang->update(['stok' => $newQty]);
            $barang->refresh();
            
            $stokSesudah = $barang->stok;

            // Create stock movement record
            return StockMovement::create([
                'barang_id' => $barang->id,
                'user_id' => $user->id,
                'transaction_id' => null,
                'type' => StockMovementType::PENYESUAIAN,
                'jumlah' => abs($difference),
                'stok_sebelum' => $stokSebelum,
                'stok_sesudah' => $stokSesudah,
                'keterangan' => $keterangan,
            ]);
        });
    }

    /**
     * Check if barang has sufficient stock
     *
     * @param Barang $barang
     * @param int $qty
     * @return bool
     */
    public function hasSufficientStock(Barang $barang, int $qty): bool
    {
        return $barang->stok >= $qty;
    }

    /**
     * Get low stock items
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLowStockItems()
    {
        return Barang::active()
            ->whereRaw('stok < stok_minimum')
            ->orderBy('stok')
            ->get();
    }
}
