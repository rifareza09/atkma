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
        $totalRuangan = Ruangan::where('is_active', true)->count();
        $totalTransaksiHariIni = Transaction::whereDate('created_at', today())->count();
        $totalTransaksiBulanIni = Transaction::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        $totalBarangStokRendah = Barang::active()
            ->whereRaw('stok <= stok_minimum')
            ->count();

        // Chart Data - Last 7 days transactions
        $transaksi7Hari = collect();
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $total = Transaction::whereDate('created_at', $date)->count();
            
            $transaksi7Hari->push([
                'tanggal' => $date->format('Y-m-d'),
                'total' => $total,
            ]);
        }

        // Top 5 Barang by request count (from transaction items)
        $topBarang = DB::table('transaction_items')
            ->join('barangs', 'transaction_items.barang_id', '=', 'barangs.id')
            ->select('barangs.id', 'barangs.nama', DB::raw('SUM(transaction_items.jumlah) as total_permintaan'))
            ->where('barangs.is_active', true)
            ->groupBy('barangs.id', 'barangs.nama')
            ->orderBy('total_permintaan', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama' => $item->nama,
                    'total_permintaan' => (int) $item->total_permintaan,
                ];
            });

        // Top 5 Ruangan by transaction count
        $topRuangan = DB::table('transactions')
            ->select('ruangan_nama as nama', DB::raw('COUNT(*) as total_transaksi'))
            ->whereNotNull('ruangan_nama')
            ->groupBy('ruangan_nama')
            ->orderBy('total_transaksi', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'nama' => $item->nama,
                    'total_transaksi' => (int) $item->total_transaksi,
                ];
            });

        // Low stock items
        $barangStokRendah = Barang::active()
            ->whereRaw('stok <= stok_minimum')
            ->orderBy('stok')
            ->limit(10)
            ->get()
            ->map(function ($barang) {
                return [
                    'id' => $barang->id,
                    'kode' => $barang->kode,
                    'nama' => $barang->nama,
                    'stok' => $barang->stok,
                    'stok_minimum' => $barang->stok_minimum,
                    'satuan' => $barang->satuan,
                ];
            });

        // Recent transactions
        $transaksiTerbaru = Transaction::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'kode_transaksi' => $transaction->kode_transaksi,
                    'tanggal' => $transaction->tanggal->format('Y-m-d'),
                    'created_at' => $transaction->created_at->format('Y-m-d H:i:s'),
                    'jenis_transaksi' => $transaction->type->value,
                    'ruangan' => [
                        'nama' => $transaction->ruangan_nama ?? '-',
                    ],
                    'status' => $transaction->status,
                    'pemohon' => $transaction->user->name ?? '-',
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => [
                'total_barang' => $totalBarang,
                'total_ruangan' => $totalRuangan,
                'total_transaksi_hari_ini' => $totalTransaksiHariIni,
                'total_transaksi_bulan_ini' => $totalTransaksiBulanIni,
                'total_barang_stok_rendah' => $totalBarangStokRendah,
            ],
            'chart_data' => [
                'transaksi_7_hari' => $transaksi7Hari->toArray(),
            ],
            'top_barang' => $topBarang->toArray(),
            'top_ruangan' => $topRuangan->toArray(),
            'barang_stok_rendah' => $barangStokRendah->toArray(),
            'transaksi_terbaru' => $transaksiTerbaru->toArray(),
        ]);
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
