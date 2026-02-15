<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Ruangan;
use App\Models\StockMovement;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display dashboard
     */
    public function index(): Response
    {
        // Stats cards
        $totalBarang = Barang::active()->count();
        $totalStock = Barang::active()->sum('stok');
        $lowStockCount = Barang::active()
            ->whereRaw('stok < stok_minimum')
            ->count();
        $totalRuangan = Ruangan::where('is_active', true)->count();
        $totalTransactions = Transaction::count();

        // Pending review - transactions awaiting approval
        $pendingReview = Transaction::where('status', 'pending')->count();

        // Chart Data - Last 7 days stock in/out
        $chartData = $this->getLast7DaysStockMovement();

        // Top 5 Barang by quantity
        $topBarang = Barang::active()
            ->orderBy('stok', 'desc')
            ->limit(5)
            ->get(['id', 'kode', 'nama', 'stok', 'satuan'])
            ->map(function ($barang) {
                return [
                    'id' => $barang->id,
                    'nama' => $barang->nama,
                    'stok' => $barang->stok,
                    'satuan' => $barang->satuan,
                ];
            });

        // Top 5 Ruangan by transaction count
        $topRuangan = Ruangan::where('is_active', true)
            ->withCount('transactions')
            ->orderBy('transactions_count', 'desc')
            ->limit(5)
            ->get(['id', 'nama', 'transactions_count'])
            ->map(function ($ruangan) {
                return [
                    'id' => $ruangan->id,
                    'nama' => $ruangan->nama,
                    'total' => $ruangan->transactions_count,
                ];
            });

        // Pending Approvals with details
        $pendingApprovals = Transaction::with(['ruangan', 'items.barang'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'date' => $transaction->created_at->format('d/m/Y'),
                    'requester_room' => $transaction->ruangan->nama ?? '-',
                    'items' => $transaction->items->map(function ($item) {
                        return $item->barang->nama ?? 'Unknown';
                    })->take(2)->toArray(),
                    'items_count' => $transaction->items->count(),
                    'status' => $transaction->status,
                ];
            });

        // Low stock alert items (for table)
        $lowStockItems = Barang::active()
            ->whereRaw('stok < stok_minimum')
            ->orderBy('stok')
            ->limit(10)
            ->get()
            ->map(function ($barang) {
                $remaining = $barang->stok;
                $status = $remaining == 0 ? 'Critical' : 'Low';

                return [
                    'id' => $barang->id,
                    'kode' => $barang->kode,
                    'name' => $barang->nama,
                    'remaining' => $remaining,
                    'minimum' => $barang->stok_minimum,
                    'unit' => $barang->satuan,
                    'status' => $status,
                    'shortage' => max(0, $barang->stok_minimum - $remaining),
                ];
            });

        // Workflow statistics
        $approvedCount = Transaction::where('status', 'approved')->count();
        $rejectedCount = Transaction::where('status', 'rejected')->count();
        $revisedCount = Transaction::where('status', 'revised')->count();
        $pendingCount = Transaction::where('status', 'pending')->count();

        $workflowStats = [
            'approved' => $totalTransactions > 0 ? round(($approvedCount / $totalTransactions) * 100) : 0,
            'rejected' => $totalTransactions > 0 ? round(($rejectedCount / $totalTransactions) * 100) : 0,
            'revised' => $totalTransactions > 0 ? round(($revisedCount / $totalTransactions) * 100) : 0,
            'pending' => $totalTransactions > 0 ? round(($pendingCount / $totalTransactions) * 100) : 0,
        ];

        // Cache the response for 5 minutes
        $data = cache()->remember('dashboard-data', 300, function () use (
            $totalBarang, $totalStock, $lowStockCount, $totalRuangan, $totalTransactions,
            $pendingReview, $chartData, $topBarang, $topRuangan, $pendingApprovals,
            $lowStockItems, $workflowStats
        ) {
            return [
                'stats' => [
                    'total_barang' => $totalBarang,
                    'total_stock' => $totalStock,
                    'low_stock_count' => $lowStockCount,
                    'total_ruangan' => $totalRuangan,
                    'total_transactions' => $totalTransactions,
                    'pending_review' => $pendingReview,
                ],
                'chart_data' => $chartData,
                'top_barang' => $topBarang,
                'top_ruangan' => $topRuangan,
                'pending_approvals' => $pendingApprovals,
                'low_stock_items' => $lowStockItems,
                'workflow_stats' => $workflowStats,
            ];
        });

        return Inertia::render('dashboard', $data);
    }

    /**
     * Get last 7 days stock movement data
     */
    private function getLast7DaysStockMovement(): array
    {
        $last7Days = collect();
        
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->startOfDay();
            
            $stockIn = StockMovement::whereDate('created_at', $date)
                ->where('type', 'penambahan')
                ->sum('jumlah');
            
            $stockOut = StockMovement::whereDate('created_at', $date)
                ->where('type', 'pengurangan')
                ->sum('jumlah');
            
            $last7Days->push([
                'date' => $date->format('Y-m-d'),
                'label' => $date->format('d M'),
                'stock_in' => $stockIn,
                'stock_out' => $stockOut,
            ]);
        }

        return $last7Days->toArray();
    }

    /**
     * Get detailed low stock items data
     */
    public function getLowStockData()
    {
        $lowStockItems = Barang::where('is_active', true)
            ->whereRaw('stok <= stok_minimum')
            ->select('id', 'kode', 'nama', 'satuan', 'stok', 'stok_minimum')
            ->selectRaw('(stok * 100.0 / NULLIF(stok_minimum, 0)) as stock_percentage')
            ->orderByRaw('(stok * 100.0 / NULLIF(stok_minimum, 0)) ASC, stok ASC')
            ->limit(10)
            ->get()
            ->map(function ($item) {
                $item->stock_percentage = $item->stok_minimum > 0
                    ? round(($item->stok / $item->stok_minimum) * 100, 2)
                    : 0;
                $item->critical = $item->stok == 0;
                $item->shortage = max(0, $item->stok_minimum - $item->stok);
                return $item;
            });

        return response()->json([
            'items' => $lowStockItems,
            'total_count' => Barang::where('is_active', true)
                ->whereRaw('stok <= stok_minimum')
                ->count(),
            'critical_count' => Barang::where('is_active', true)
                ->where('stok', 0)
                ->count(),
        ]);
    }

    /**
     * Get stock movements today
     */
    public function getTodayStockMovements()
    {
        $movements = StockMovement::with(['barang', 'user'])
            ->whereDate('created_at', today())
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json($movements);
    }
}
