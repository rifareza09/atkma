<?php

namespace App\Models;

use App\Concerns\HasAuditLog;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class Ruangan extends Model
{
    use HasFactory, HasAuditLog;

    protected $fillable = [
        'kode',
        'nama',
        'penanggung_jawab',
        'deskripsi',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get total usage (total transactions)
     */
    public function getTotalUsage(): int
    {
        return DB::table('transactions')
            ->where('ruangan_nama', $this->nama)
            ->count();
    }

    /**
     * Scope active ruangan
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', true);
    }
}
