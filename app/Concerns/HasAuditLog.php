<?php

namespace App\Concerns;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;

trait HasAuditLog
{
    /**
     * Boot the trait
     */
    public static function bootHasAuditLog(): void
    {
        static::created(function ($model) {
            $model->logAudit('created', null, $model->getAuditableAttributes());
        });

        static::updated(function ($model) {
            $model->logAudit('updated', $model->getOriginal(), $model->getAuditableAttributes());
        });

        static::deleted(function ($model) {
            $model->logAudit('deleted', $model->getAuditableAttributes(), null);
        });

        // If soft deletes is used
        if (method_exists(static::class, 'restored')) {
            static::restored(function ($model) {
                $model->logAudit('restored', null, $model->getAuditableAttributes());
            });
        }
    }

    /**
     * Log audit trail
     */
    protected function logAudit(string $action, ?array $oldValue, ?array $newValue): void
    {
        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'model' => get_class($this),
            'model_id' => $this->id,
            'old_value' => $oldValue,
            'new_value' => $newValue,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Get attributes that should be audited
     */
    protected function getAuditableAttributes(): array
    {
        // Get all attributes except timestamps and pivot
        $attributes = $this->getAttributes();
        
        // Remove attributes that shouldn't be audited
        $excludeAttributes = array_merge(
            ['password', 'remember_token', 'two_factor_secret', 'two_factor_recovery_codes'],
            $this->getHiddenAuditAttributes()
        );

        return array_diff_key($attributes, array_flip($excludeAttributes));
    }

    /**
     * Get attributes that should be hidden from audit
     * Override this method in your model if needed
     */
    protected function getHiddenAuditAttributes(): array
    {
        return [];
    }

    /**
     * Get audit logs for this model
     */
    public function auditLogs()
    {
        return AuditLog::forModelInstance($this)
            ->with('user')
            ->orderBy('created_at', 'desc');
    }
}
