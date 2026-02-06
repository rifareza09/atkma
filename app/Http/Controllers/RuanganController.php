<?php

namespace App\Http\Controllers;

use App\Http\Requests\RuanganRequest;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RuanganController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Ruangan::class);

        $query = Ruangan::query();

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode', 'like', "%{$search}%")
                    ->orWhere('nama', 'like', "%{$search}%")
                    ->orWhere('penanggung_jawab', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        $ruangans = $query->withCount('transactions')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('master/ruangan/index', [
            'ruangans' => $ruangans,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', Ruangan::class);

        return Inertia::render('master/ruangan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RuanganRequest $request): RedirectResponse
    {
        $this->authorize('create', Ruangan::class);

        Ruangan::create($request->validated());

        return redirect()->route('ruangan.index')
            ->with('success', 'Ruangan berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ruangan $ruangan): Response
    {
        $this->authorize('view', $ruangan);

        $ruangan->load(['transactions' => function ($query) {
            $query->latest()->limit(10);
        }]);

        return Inertia::render('master/ruangan/show', [
            'ruangan' => $ruangan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ruangan $ruangan): Response
    {
        $this->authorize('update', $ruangan);

        return Inertia::render('master/ruangan/edit', [
            'ruangan' => $ruangan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RuanganRequest $request, Ruangan $ruangan): RedirectResponse
    {
        $this->authorize('update', $ruangan);

        $ruangan->update($request->validated());

        return redirect()->route('ruangan.index')
            ->with('success', 'Ruangan berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Ruangan $ruangan): RedirectResponse
    {
        $this->authorize('delete', $ruangan);

        // Soft delete by setting is_active to false
        $ruangan->update(['is_active' => false]);

        return redirect()->route('ruangan.index')
            ->with('success', 'Ruangan berhasil dinonaktifkan');
    }
}
