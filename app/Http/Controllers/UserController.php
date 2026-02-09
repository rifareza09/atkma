<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', User::class);

        $query = User::query();

        // Search by name, username, or email
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($request->has('role') && $request->role && $request->role !== 'all') {
            $query->where('role', $request->role);
        }

        // Filter by status (has email_verified_at)
        if ($request->has('status') && $request->status && $request->status !== 'all') {
            if ($request->status === 'active') {
                $query->whereNotNull('email_verified_at');
            } else {
                $query->whereNull('email_verified_at');
            }
        }

        $users = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('settings/users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'status']),
            'roles' => [
                ['value' => 'all', 'label' => 'Semua Role'],
                ['value' => Role::ADMIN->value, 'label' => 'Admin'],
                ['value' => Role::PENGAWAS->value, 'label' => 'Pengawas'],
            ],
        ]);
    }

    /**
     * Show the form for creating a new user
     */
    public function create(): Response
    {
        $this->authorize('create', User::class);

        return Inertia::render('settings/users/create', [
            'roles' => [
                ['value' => Role::ADMIN->value, 'label' => 'Admin'],
                ['value' => Role::PENGAWAS->value, 'label' => 'Pengawas'],
            ],
        ]);
    }

    /**
     * Store a newly created user
     */
    public function store(UserRequest $request): RedirectResponse
    {
        $this->authorize('create', User::class);

        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('users.index')
            ->with('success', 'Pengguna berhasil ditambahkan');
    }

    /**
     * Display the specified user
     */
    public function show(User $user): Response
    {
        $this->authorize('view', $user);

        $user->load(['transactions' => function ($query) {
            $query->latest()->take(10);
        }]);

        return Inertia::render('settings/users/show', [
            'user' => $user,
            'statistics' => [
                'total_transactions' => $user->transactions()->count(),
                'transactions_this_month' => $user->transactions()
                    ->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->count(),
            ],
        ]);
    }

    /**
     * Show the form for editing the user
     */
    public function edit(User $user): Response
    {
        $this->authorize('update', $user);

        return Inertia::render('settings/users/edit', [
            'user' => $user,
            'roles' => [
                ['value' => Role::ADMIN->value, 'label' => 'Admin'],
                ['value' => Role::PENGAWAS->value, 'label' => 'Pengawas'],
            ],
        ]);
    }

    /**
     * Update the specified user
     */
    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $this->authorize('update', $user);

        $validated = $request->validated();

        // Only update password if provided
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('users.index')
            ->with('success', 'Pengguna berhasil diperbarui');
    }

    /**
     * Remove the specified user
     */
    public function destroy(User $user): RedirectResponse
    {
        $this->authorize('delete', $user);

        // Prevent deleting own account
        if ($user->id === auth()->id()) {
            return back()->withErrors([
                'error' => 'Anda tidak dapat menghapus akun Anda sendiri'
            ]);
        }

        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'Pengguna berhasil dihapus');
    }

    /**
     * Toggle user active status
     */
    public function toggleStatus(User $user): RedirectResponse
    {
        $this->authorize('toggleActivation', $user);

        // Prevent toggling own account status
        if ($user->id === auth()->id()) {
            return back()->withErrors([
                'error' => 'Anda tidak dapat mengubah status akun Anda sendiri'
            ]);
        }

        $user->update(['is_active' => !$user->is_active]);

        $message = $user->is_active ? 'Pengguna berhasil diaktifkan' : 'Pengguna berhasil dinonaktifkan';

        return back()->with('success', $message);
    }

    /**
     * Reset user password (admin only)
     */
    public function resetPassword(User $user): RedirectResponse
    {
        $this->authorize('update', $user);

        // Generate random password
        $newPassword = 'password123'; // In production, use: Str::random(12)

        $user->update([
            'password' => Hash::make($newPassword),
        ]);

        return back()->with('success', "Password berhasil direset. Password baru: {$newPassword}");
    }
}
