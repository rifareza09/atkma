<?php

namespace App\Http\Controllers;

use App\Http\Requests\BarangRequest;
use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Barang::class);

        $query = Barang::query();

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode', 'like', "%{$search}%")
                    ->orWhere('nama', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        // Filter by low stock
        if ($request->has('low_stock') && $request->low_stock) {
            $query->whereRaw('stok < stok_minimum');
        }

        $barangs = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('master/barang/index', [
            'barangs' => $barangs,
            'filters' => $request->only(['search', 'status', 'low_stock']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', Barang::class);

        return Inertia::render('master/barang/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BarangRequest $request): RedirectResponse
    {
        $this->authorize('create', Barang::class);

        Barang::create($request->validated());

        return redirect()->route('barang.index')
            ->with('success', 'Barang berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Barang $barang): Response
    {
        $this->authorize('view', $barang);

        $barang->load(['transactionItems.transaction', 'stockMovements']);

        return Inertia::render('master/barang/show', [
            'barang' => $barang,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barang $barang): Response
    {
        $this->authorize('update', $barang);

        return Inertia::render('master/barang/edit', [
            'barang' => $barang,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BarangRequest $request, Barang $barang): RedirectResponse
    {
        $this->authorize('update', $barang);

        $barang->update($request->validated());

        return redirect()->route('barang.index')
            ->with('success', 'Barang berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Barang $barang): RedirectResponse
    {
        $this->authorize('delete', $barang);

        // Soft delete by setting is_active to false
        $barang->update(['is_active' => false]);

        return redirect()->route('barang.index')
            ->with('success', 'Barang berhasil dinonaktifkan');
    }
}
