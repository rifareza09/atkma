<?php

namespace App\Policies;

use App\Models\AuditLog;
use App\Models\User;

class AuditLogPolicy
{
    /**
     * Determine if user can view any audit logs
     */
    public function viewAny(User $user): bool
    {
        // Only admins can view audit logs
        return $user->isAdmin();
    }

    /**
     * Determine if user can view specific audit log
     */
    public function view(User $user, AuditLog $auditLog): bool
    {
        // Only admins can view audit logs
        return $user->isAdmin();
    }

    /**
     * Determine if user can export audit logs
     */
    public function export(User $user): bool
    {
        // Only admins can export audit logs
        return $user->isAdmin();
    }
}
