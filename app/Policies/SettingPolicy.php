<?php

namespace App\Policies;

use App\Models\User;
use App\Role;

class SettingPolicy
{
    /**
     * Determine if the user can view settings
     */
    public function viewAny(User $user): bool
    {
        // Admin can view settings, pengawas cannot
        return $user->role === Role::Admin;
    }

    /**
     * Determine if the user can update settings
     */
    public function update(User $user): bool
    {
        // Only admin can update settings
        return $user->role === Role::Admin;
    }
}
