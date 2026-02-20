<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class IncomingStock extends Model
{
    protected $fillable = [
        'kode_barang_masuk',
        'barang_id',
        'user_id',
        'jumlah',
        'tanggal_masuk',
        'sumber',
        'nomor_dokumen',
        'keterangan',
        'status',
    ];

    protected $casts = [
        'tanggal_masuk' => 'date',
        'jumlah' => 'integer',
    ];

    protected $attributes = [
        'status' => 'approved',
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($incomingStock) {
            if (empty($incomingStock->kode_barang_masuk)) {
                $incomingStock->kode_barang_masuk = static::generateKode();
            }
        });

        static::created(function ($incomingStock) {
            if ($incomingStock->status === 'approved') {
                $incomingStock->updateStokBarang();
            }
        });

        static::updated(function ($incomingStock) {
            if ($incomingStock->wasChanged('status') && $incomingStock->status === 'approved') {
                $incomingStock->updateStokBarang();
            }
        });
    }

    /**
     * Generate unique kode barang masuk
     */
    public static function generateKode(): string
    {
        $date = now()->format('Ymd');
        $prefix = "BM-{$date}-";

        $lastRecord = static::where('kode_barang_masuk', 'like', "{$prefix}%")
            ->orderBy('kode_barang_masuk', 'desc')
            ->first();

        if ($lastRecord) {
            $lastNumber = (int) substr($lastRecord->kode_barang_masuk, -3);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix . str_pad($newNumber, 3, '0', STR_PAD_LEFT);
    }

    /**
     * Update stok barang dan create stock movement
     */
    public function updateStokBarang(): void
    {
        DB::transaction(function () {
            $barang = $this->barang()->lockForUpdate()->first();
            $stokSebelum = $barang->stok;
            $stokSesudah = $stokSebelum + $this->jumlah;

            // Update stok barang
            $barang->update(['stok' => $stokSesudah]);

            // Create stock movement record
            StockMovement::create([
                'barang_id' => $this->barang_id,
                'user_id' => $this->user_id,
                'transaction_id' => null,
                'type' => 'penambahan',
                'jumlah' => $this->jumlah,
                'stok_sebelum' => $stokSebelum,
                'stok_sesudah' => $stokSesudah,
                'keterangan' => "Barang Masuk: {$this->kode_barang_masuk}" . 
                              ($this->keterangan ? " - {$this->keterangan}" : ''),
            ]);
        });
    }

    /**
     * Relationship: Barang
     */
    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class);
    }

    /**
     * Relationship: User (yang mencatat)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope: Filter by status
     */
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope: Filter by date range
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('tanggal_masuk', [$startDate, $endDate]);
    }

    /**
     * Scope: Recent first
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('tanggal_masuk', 'desc')->orderBy('created_at', 'desc');
    }
}
