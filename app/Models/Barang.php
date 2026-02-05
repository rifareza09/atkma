<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Barang extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode',
        'nama',
        'satuan',
        'stok',
        'stok_minimum',
        'deskripsi',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'stok' => 'integer',
            'stok_minimum' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Check if stock is low
     */
    public function isLowStock(): bool
    {
        return $this->stok < $this->stok_minimum;
    }

    /**
     * Add stock
     */
    public function addStock(int $qty): void
    {
        $this->increment('stok', $qty);
    }

    /**
     * Reduce stock
     */
    public function reduceStock(int $qty): void
    {
        $this->decrement('stok', $qty);
    }

    /**
     * Scope active barang
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', true);
    }

    /**
     * Get transaction items
     */
    public function transactionItems(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }

    /**
     * Get stock movements
     */
    public function stockMovements(): HasMany
    {
        return $this->hasMany(StockMovement::class);
    }
}
