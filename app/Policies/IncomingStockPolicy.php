<?php

namespace App\Policies;

use App\Models\IncomingStock;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class IncomingStockPolicy
{
    /**
     * Determine whether the user can view any models.
     * Both admin and superadmin can view list
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isSuperadmin();
    }

    /**
     * Determine whether the user can view the model.
     * Both admin and superadmin can view details
     */
    public function view(User $user, IncomingStock $incomingStock): bool
    {
        return $user->isAdmin() || $user->isSuperadmin();
    }

    /**
     * Determine whether the user can create models.
     * Only admin can create
     */
    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     * Only admin can update
     */
    public function update(User $user, IncomingStock $incomingStock): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     * Only admin can delete
     */
    public function delete(User $user, IncomingStock $incomingStock): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, IncomingStock $incomingStock): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, IncomingStock $incomingStock): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can export data.
     * Both admin and superadmin can export
     */
    public function export(User $user): bool
    {
        return $user->isAdmin() || $user->isSuperadmin();
    }
}
