<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{
    protected $fillable = [
        'user_id',
        'action',
        'model',
        'model_id',
        'old_value',
        'new_value',
        'ip_address',
        'user_agent',
    ];

    protected function casts(): array
    {
        return [
            'old_value' => 'array',
            'new_value' => 'array',
        ];
    }

    /**
     * Get the user who performed the action
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the auditable model
     */
    public function auditable()
    {
        return $this->morphTo('model');
    }

    /**
     * Get changes as human readable format
     */
    public function getChangesAttribute(): array
    {
        $changes = [];

        if ($this->action === 'created') {
            return ['status' => 'Record created', 'changes' => $this->new_value];
        }

        if ($this->action === 'deleted') {
            return ['status' => 'Record deleted', 'old_data' => $this->old_value];
        }

        if ($this->action === 'updated' && $this->old_value && $this->new_value) {
            foreach ($this->new_value as $key => $newValue) {
                $oldValue = $this->old_value[$key] ?? null;
                
                if ($oldValue !== $newValue) {
                    $changes[$key] = [
                        'old' => $oldValue,
                        'new' => $newValue,
                    ];
                }
            }
        }

        return $changes;
    }

    /**
     * Scope to filter by model type
     */
    public function scopeForModel($query, string $modelClass)
    {
        return $query->where('model', $modelClass);
    }

    /**
     * Scope to filter by model instance
     */
    public function scopeForModelInstance($query, Model $model)
    {
        return $query->where('model', get_class($model))
            ->where('model_id', $model->id);
    }

    /**
     * Scope to filter by action
     */
    public function scopeAction($query, string $action)
    {
        return $query->where('action', $action);
    }

    /**
     * Scope to filter by date range
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }
}
