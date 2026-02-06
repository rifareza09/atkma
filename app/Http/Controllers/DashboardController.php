<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Ruangan;
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
        $totalBarangStokRendah = Barang::active()
            ->whereRaw('stok < stok_minimum')
            ->count();

        // Pending review - transactions awaiting approval
        $pendingReview = Transaction::where('status', 'pending')->count();

        // Monthly quota status (simulated - 75% used)
        $monthlyQuotaPercentage = 75;

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

        // Low stock alert items
        $lowStockItems = Barang::active()
            ->whereRaw('stok < stok_minimum')
            ->orderBy('stok')
            ->limit(3)
            ->get()
            ->map(function ($barang) {
                $remaining = $barang->stok;
                $unit = $remaining == 2 ? 'units' : ($remaining == 5 ? 'rooms' : 'pcs');
                $status = $remaining <= 2 ? 'Critical' : 'remaining';

                return [
                    'id' => $barang->id,
                    'name' => $barang->nama,
                    'remaining' => $remaining,
                    'unit' => $unit,
                    'status' => $status,
                ];
            });

        // Workflow statistics
        $totalTransactions = Transaction::count();
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

        return Inertia::render('dashboard', [
            'stats' => [
                'total_items' => $totalBarang,
                'low_stock' => $totalBarangStokRendah,
                'pending_review' => $pendingReview,
                'monthly_quota_percentage' => $monthlyQuotaPercentage,
            ],
            'pending_approvals' => $pendingApprovals,
            'low_stock_items' => $lowStockItems,
            'workflow_stats' => $workflowStats,
        ]);
    }
}
