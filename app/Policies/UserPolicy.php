<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine if the user can view any users
     */
    public function viewAny(User $user): bool
    {
        // Only admin can view user list
        return $user->isAdmin();
    }

    /**
     * Determine if the user can view a specific user
     */
    public function view(User $user, User $model): bool
    {
        // Admin can view any user, user can view own profile
        return $user->isAdmin() || $user->id === $model->id;
    }

    /**
     * Determine if the user can create users
     */
    public function create(User $user): bool
    {
        // Only admin can create users
        return $user->isAdmin();
    }

    /**
     * Determine if the user can update a user
     */
    public function update(User $user, User $model): bool
    {
        // Admin can update any user, user can update own profile (except role)
        return $user->isAdmin() || $user->id === $model->id;
    }

    /**
     * Determine if the user can delete a user
     */
    public function delete(User $user, User $model): bool
    {
        // Only admin can delete users
        // Cannot delete own account
        return $user->isAdmin() && $user->id !== $model->id;
    }

    /**
     * Determine if the user can activate/deactivate users
     */
    public function toggleActivation(User $user, User $model): bool
    {
        // Only admin can toggle activation
        // Cannot toggle own account
        return $user->isAdmin() && $user->id !== $model->id;
    }

    /**
     * Determine if the user can reset passwords
     */
    public function resetPassword(User $user, User $model): bool
    {
        // Only admin can reset passwords
        return $user->isAdmin();
    }
}
