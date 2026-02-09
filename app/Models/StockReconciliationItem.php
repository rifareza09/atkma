<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockReconciliationItem extends Model
{
    protected $fillable = [
        'stock_reconciliation_id',
        'barang_id',
        'system_stock',
        'physical_stock',
        'difference',
    ];

    /**
     * Get the reconciliation this item belongs to
     */
    public function stockReconciliation(): BelongsTo
    {
        return $this->belongsTo(StockReconciliation::class);
    }

    /**
     * Get the barang (item)
     */
    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class);
    }

    /**
     * Check if there's a discrepancy
     */
    public function hasDiscrepancy(): bool
    {
        return $this->difference != 0;
    }

    /**
     * Get discrepancy type
     */
    public function getDiscrepancyTypeAttribute(): string
    {
        if ($this->difference > 0) {
            return 'surplus';
        } elseif ($this->difference < 0) {
            return 'shortage';
        }
        return 'match';
    }
}
