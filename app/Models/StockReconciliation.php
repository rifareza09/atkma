<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StockReconciliation extends Model
{
    protected $fillable = [
        'user_id',
        'reconciliation_date',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'reconciliation_date' => 'date',
        ];
    }

    /**
     * Get the user who performed the reconciliation
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the reconciliation items
     */
    public function items(): HasMany
    {
        return $this->hasMany(StockReconciliationItem::class);
    }

    /**
     * Get total items count
     */
    public function getTotalItemsAttribute(): int
    {
        return $this->items()->count();
    }

    /**
     * Get items with differences (discrepancies)
     */
    public function getDiscrepanciesAttribute()
    {
        return $this->items()->where('difference', '!=', 0)->get();
    }

    /**
     * Get total items with discrepancies
     */
    public function getTotalDiscrepanciesAttribute(): int
    {
        return $this->items()->where('difference', '!=', 0)->count();
    }
}
