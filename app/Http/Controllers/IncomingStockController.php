<?php

namespace App\Http\Controllers;

use App\Http\Requests\IncomingStockRequest;
use App\Models\IncomingStock;
use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class IncomingStockController extends Controller
{
    /**
     * Display a listing of incoming stocks.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', IncomingStock::class);

        $query = IncomingStock::with(['barang', 'user'])
            ->latest();

        // Search by kode or barang name
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_barang_masuk', 'like', "%{$search}%")
                    ->orWhere('nomor_dokumen', 'like', "%{$search}%")
                    ->orWhereHas('barang', function ($q) use ($search) {
                        $q->where('nama', 'like', "%{$search}%")
                          ->orWhere('kode', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->status($request->status);
        }

        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->dateRange($request->start_date, $request->end_date);
        }

        // Filter by barang
        if ($request->has('barang_id') && $request->barang_id) {
            $query->where('barang_id', $request->barang_id);
        }

        $incomingStocks = $query->paginate(15)
            ->withQueryString();

        return Inertia::render('stok/barang-masuk/Index', [
            'incomingStocks' => $incomingStocks,
            'filters' => $request->only(['search', 'status', 'start_date', 'end_date', 'barang_id']),
            'barangs' => Barang::select('id', 'kode', 'nama')->where('is_active', true)->get(),
        ]);
    }

    /**
     * Show the form for creating a new incoming stock.
     */
    public function create(): Response
    {
        $this->authorize('create', IncomingStock::class);

        return Inertia::render('stok/barang-masuk/Create');
    }

    /**
     * Store a newly created incoming stock.
     */
    public function store(IncomingStockRequest $request): RedirectResponse
    {
        $this->authorize('create', IncomingStock::class);

        $incomingStock = \DB::transaction(function () use ($request) {
            // Generate kode barang
            $kodeBarang = Barang::generateKode();

            // Create new barang with initial stock = 0
            // Stock will be added automatically by IncomingStock model
            $barang = Barang::create([
                'kode' => $kodeBarang,
                'nama' => $request->nama_barang,
                'satuan' => 'Pcs', // Default satuan
                'stok' => 0, // Initial stock = 0, will be updated by incoming stock
                'stok_minimum' => 10, // Default stok minimum
                'is_active' => true,
            ]);

            // Create incoming stock record
            // The IncomingStock model will automatically:
            // 1. Update barang stock
            // 2. Create stock movement record
            return IncomingStock::create([
                'barang_id' => $barang->id,
                'jumlah' => $request->jumlah,
                'tanggal_masuk' => $request->tanggal_masuk,
                'keterangan' => $request->keterangan,
                'user_id' => auth()->id(),
                'status' => 'approved', // Auto approve
                'sumber' => 'Barang Masuk Manual',
                'nomor_dokumen' => null,
            ]);
        });

        return redirect()->route('barang-masuk.show', $incomingStock)
            ->with('success', 'Barang baru berhasil ditambahkan dan stok telah tercatat.');
    }

    /**
     * Display the specified incoming stock.
     */
    public function show(IncomingStock $barangMasuk): Response
    {
        $this->authorize('view', $barangMasuk);

        $barangMasuk->load(['barang', 'user']);

        // Get related stock movement
        $stockMovement = $barangMasuk->barang->stockMovements()
            ->where('keterangan', 'like', "%{$barangMasuk->kode_barang_masuk}%")
            ->first();

        return Inertia::render('stok/barang-masuk/Show', [
            'incomingStock' => $barangMasuk,
            'stockMovement' => $stockMovement,
        ]);
    }

    /**
     * Show the form for editing the specified incoming stock.
     */
    public function edit(IncomingStock $barangMasuk): Response
    {
        $this->authorize('update', $barangMasuk);

        $barangMasuk->load('barang');

        return Inertia::render('stok/barang-masuk/Edit', [
            'incomingStock' => $barangMasuk,
            'barangs' => Barang::where('is_active', true)
                ->select('id', 'kode', 'nama', 'satuan', 'stok')
                ->orderBy('nama')
                ->get(),
        ]);
    }

    /**
     * Update the specified incoming stock.
     */
    public function update(IncomingStockRequest $request, IncomingStock $barangMasuk): RedirectResponse
    {
        $this->authorize('update', $barangMasuk);

        // Only allow edit if not yet approved or if status change
        if ($barangMasuk->status === 'approved' && !$request->has('status')) {
            return back()->withErrors([
                'message' => 'Data yang sudah diapprove tidak dapat diubah.'
            ]);
        }

        $barangMasuk->update($request->validated());

        return redirect()->route('barang-masuk.show', $barangMasuk)
            ->with('success', 'Data barang masuk berhasil diperbarui.');
    }

    /**
     * Remove the specified incoming stock.
     */
    public function destroy(IncomingStock $barangMasuk): RedirectResponse
    {
        $this->authorize('delete', $barangMasuk);

        if ($barangMasuk->status === 'approved') {
            return back()->withErrors([
                'message' => 'Data yang sudah diapprove tidak dapat dihapus. Hubungi administrator.'
            ]);
        }

        $barangMasuk->delete();

        return redirect()->route('barang-masuk.index')
            ->with('success', 'Data barang masuk berhasil dihapus.');
    }

    /**
     * Export incoming stocks data
     */
    public function export(Request $request)
    {
        $this->authorize('viewAny', IncomingStock::class);

        $query = IncomingStock::with(['barang', 'user'])
            ->latest();

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->dateRange($request->start_date, $request->end_date);
        }

        $data = $query->get();

        // Return as CSV or Excel based on request
        // Implementation depends on your export library (e.g., Laravel Excel)
        
        return response()->json([
            'message' => 'Export feature coming soon',
            'data' => $data
        ]);
    }
}
