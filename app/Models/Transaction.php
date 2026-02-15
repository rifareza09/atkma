<?php

namespace App\Models;

use App\Concerns\HasAuditLog;
use App\TransactionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Transaction extends Model
{
    use HasFactory, HasAuditLog;

    protected $fillable = [
        'kode_transaksi',
        'ruangan_id',
        'user_id',
        'type',
        'status',
        'tanggal',
        'keterangan',
        'approved_by',
        'approved_at',
        'rejected_by',
        'rejected_at',
        'rejection_reason',
        'revised_by',
        'revised_at',
        'revision_notes',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
            'approved_at' => 'datetime',
            'rejected_at' => 'datetime',
            'revised_at' => 'datetime',
            'type' => TransactionType::class,
        ];
    }

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($transaction) {
            if (empty($transaction->kode_transaksi)) {
                $transaction->kode_transaksi = static::generateKode();
            }
        });
    }

    /**
     * Generate transaction code
     * Format: TRX-YYYYMMDD-XXX
     */
    public static function generateKode(): string
    {
        $date = now()->format('Ymd');
        $prefix = "TRX-{$date}-";

        $lastTransaction = static::where('kode_transaksi', 'like', "{$prefix}%")
            ->orderBy('kode_transaksi', 'desc')
            ->first();

        if ($lastTransaction) {
            $lastNumber = (int) substr($lastTransaction->kode_transaksi, -3);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix . str_pad($newNumber, 3, '0', STR_PAD_LEFT);
    }

    /**
     * Get transaction items
     */
    public function items(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }

    /**
     * Get ruangan
     */
    public function ruangan(): BelongsTo
    {
        return $this->belongsTo(Ruangan::class);
    }

    /**
     * Get user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get stock movements
     */
    public function stockMovements(): HasMany
    {
        return $this->hasMany(StockMovement::class);
    }

    /**
     * Get user who approved the transaction
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Get user who rejected the transaction
     */
    public function rejector(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rejected_by');
    }

    /**
     * Get user who revised the transaction
     */
    public function revisor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'revised_by');
    }

    /**
     * Check if transaction can be approved
     */
    public function canBeApproved(): bool
    {
        return in_array($this->status, ['pending', 'revised']);
    }

    /**
     * Check if transaction can be rejected
     */
    public function canBeRejected(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if transaction can be revised
     */
    public function canBeRevised(): bool
    {
        return $this->status === 'pending';
    }
}
