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
        'ruangan_nama',
        'user_id',
        'nama_peminta',
        'type',
        'status',
        'tanggal',
        'keterangan',
    ];

    protected $appends = [
        'nomor_transaksi',
        'pemohon',
        'tanggal_transaksi',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
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
     * Format: TRX-YYYYMMDD-XXX (nomor urut reset setiap bulan)
     */
    public static function generateKode(): string
    {
        $date  = now()->format('Ymd');
        $month = now()->format('Ym');

        // Cari transaksi terakhir di bulan yang sama (prefix TRX-YYYYMM)
        $lastTransaction = static::where('kode_transaksi', 'like', "TRX-{$month}%")
            ->orderByRaw('CAST(SUBSTRING_INDEX(kode_transaksi, \'-\', -1) AS UNSIGNED) DESC')
            ->first();

        if ($lastTransaction) {
            $lastNumber = (int) substr($lastTransaction->kode_transaksi, -3);
            $newNumber  = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return "TRX-{$date}-" . str_pad($newNumber, 3, '0', STR_PAD_LEFT);
    }

    /**
     * Get transaction items
     */
    public function items(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
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
     * Get nomor_transaksi accessor for backward compatibility
     */
    public function getNomorTransaksiAttribute(): ?string
    {
        return $this->kode_transaksi;
    }

    /**
     * Get pemohon accessor for backward compatibility
     */
    public function getPemohonAttribute(): ?string
    {
        return $this->nama_peminta;
    }

    /**
     * Get tanggal_transaksi accessor for backward compatibility
     */
    public function getTanggalTransaksiAttribute(): ?string
    {
        return $this->tanggal?->format('Y-m-d');
    }
}
