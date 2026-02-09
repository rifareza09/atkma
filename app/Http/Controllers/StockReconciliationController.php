<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\StockReconciliation;
use App\Models\StockReconciliationItem;
use App\Services\StockService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class StockReconciliationController extends Controller
{
    public function __construct(
        protected StockService $stockService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = StockReconciliation::with(['user', 'items'])
            ->withCount('items');

        // Filter by date range
        if ($request->has('from_date') && $request->from_date) {
            $query->whereDate('reconciliation_date', '>=', $request->from_date);
        }

        if ($request->has('to_date') && $request->to_date) {
            $query->whereDate('reconciliation_date', '<=', $request->to_date);
        }

        $reconciliations = $query->latest('reconciliation_date')
            ->latest('created_at')
            ->paginate(15);

        return Inertia::render('stok/rekonsiliasi/index', [
            'reconciliations' => $reconciliations,
            'filters' => $request->only(['from_date', 'to_date']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        // Get all active items with current stock
        $barangs = Barang::where('is_active', true)
            ->select('id', 'kode', 'nama', 'satuan', 'stok')
            ->orderBy('nama')
            ->get();

        return Inertia::render('stok/rekonsiliasi/create', [
            'barangs' => $barangs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reconciliation_date' => ['required', 'date'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.barang_id' => ['required', 'exists:barangs,id'],
            'items.*.physical_stock' => ['required', 'integer', 'min:0'],
        ], [
            'reconciliation_date.required' => 'Tanggal rekonsiliasi harus diisi',
            'items.required' => 'Minimal harus ada 1 item',
            'items.*.physical_stock.required' => 'Stok fisik harus diisi',
            'items.*.physical_stock.min' => 'Stok fisik tidak boleh negatif',
        ]);

        try {
            return DB::transaction(function () use ($validated, $request) {
                // Create reconciliation record
                $reconciliation = StockReconciliation::create([
                    'user_id' => auth()->id(),
                    'reconciliation_date' => $validated['reconciliation_date'],
                    'notes' => $validated['notes'] ?? null,
                ]);

                // Process each item
                foreach ($validated['items'] as $itemData) {
                    $barang = Barang::findOrFail($itemData['barang_id']);
                    $systemStock = $barang->stok;
                    $physicalStock = $itemData['physical_stock'];
                    $difference = $physicalStock - $systemStock;

                    // Create reconciliation item
                    StockReconciliationItem::create([
                        'stock_reconciliation_id' => $reconciliation->id,
                        'barang_id' => $barang->id,
                        'system_stock' => $systemStock,
                        'physical_stock' => $physicalStock,
                        'difference' => $difference,
                    ]);

                    // Adjust stock if there's a difference
                    if ($difference != 0) {
                        $this->stockService->adjustStock(
                            barang: $barang,
                            newQty: $physicalStock,
                            user: auth()->user(),
                            keterangan: "Rekonsiliasi stok tanggal {$validated['reconciliation_date']}"
                                . ($validated['notes'] ? " - {$validated['notes']}" : '')
                        );
                    }
                }

                return redirect()
                    ->route('rekonsiliasi.show', $reconciliation)
                    ->with('success', 'Rekonsiliasi stok berhasil disimpan');
            });
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Gagal menyimpan rekonsiliasi: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(StockReconciliation $reconciliation): Response
    {
        $reconciliation->load(['user', 'items.barang']);

        // Separate items into matched and discrepancies
        $matchedItems = $reconciliation->items->where('difference', 0);
        $discrepancies = $reconciliation->items->where('difference', '!=', 0);

        return Inertia::render('stok/rekonsiliasi/show', [
            'reconciliation' => $reconciliation,
            'matchedItems' => $matchedItems,
            'discrepancies' => $discrepancies,
            'stats' => [
                'total_items' => $reconciliation->items->count(),
                'matched' => $matchedItems->count(),
                'discrepancies' => $discrepancies->count(),
                'surplus' => $discrepancies->where('difference', '>', 0)->count(),
                'shortage' => $discrepancies->where('difference', '<', 0)->count(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StockReconciliation $reconciliation)
    {
        // Reconciliations should not be edited after creation
        // This maintains audit trail integrity
        return back()->withErrors(['error' => 'Rekonsiliasi tidak dapat diubah setelah dibuat']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StockReconciliation $reconciliation)
    {
        // Reconciliations should not be updated
        return back()->withErrors(['error' => 'Rekonsiliasi tidak dapat diubah setelah dibuat']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StockReconciliation $reconciliation)
    {
        // Deleting reconciliations would break audit trail
        // Consider soft deletes if needed
        return back()->withErrors(['error' => 'Rekonsiliasi tidak dapat dihapus (audit trail)']);
    }
}
