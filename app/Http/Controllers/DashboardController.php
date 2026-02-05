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
        $totalRuangan = Ruangan::active()->count();
        $totalTransaksiHariIni = Transaction::whereDate('tanggal', today())->count();
        $totalTransaksiBulanIni = Transaction::whereMonth('tanggal', now()->month)
            ->whereYear('tanggal', now()->year)
            ->count();

        // Chart data: Transaksi 7 hari terakhir
        $transaksi7Hari = Transaction::select(
                DB::raw('DATE(tanggal) as tanggal'),
                DB::raw('COUNT(*) as total')
            )
            ->where('tanggal', '>=', now()->subDays(6))
            ->groupBy('tanggal')
            ->orderBy('tanggal')
            ->get();

        // Top 5 barang paling banyak diminta
        $topBarang = DB::table('transaction_items')
            ->join('barangs', 'transaction_items.barang_id', '=', 'barangs.id')
            ->join('transactions', 'transaction_items.transaction_id', '=', 'transactions.id')
            ->where('transactions.type', 'keluar')
            ->select(
                'barangs.nama',
                DB::raw('SUM(transaction_items.jumlah) as total_permintaan')
            )
            ->groupBy('barangs.id', 'barangs.nama')
            ->orderByDesc('total_permintaan')
            ->limit(5)
            ->get();

        // Top 5 ruangan dengan permintaan terbanyak
        $topRuangan = DB::table('transactions')
            ->join('ruangans', 'transactions.ruangan_id', '=', 'ruangans.id')
            ->where('transactions.type', 'keluar')
            ->select(
                'ruangans.nama',
                DB::raw('COUNT(*) as total_transaksi')
            )
            ->groupBy('ruangans.id', 'ruangans.nama')
            ->orderByDesc('total_transaksi')
            ->limit(5)
            ->get();

        // Barang dengan stok rendah
        $barangStokRendah = Barang::active()
            ->whereRaw('stok < stok_minimum')
            ->orderBy('stok')
            ->limit(10)
            ->get();

        // Transaksi terbaru
        $transaksiTerbaru = Transaction::with(['ruangan', 'user'])
            ->latest('tanggal')
            ->latest('created_at')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'total_barang' => $totalBarang,
                'total_barang_stok_rendah' => $totalBarangStokRendah,
                'total_ruangan' => $totalRuangan,
                'total_transaksi_hari_ini' => $totalTransaksiHariIni,
                'total_transaksi_bulan_ini' => $totalTransaksiBulanIni,
            ],
            'chart_data' => [
                'transaksi_7_hari' => $transaksi7Hari,
            ],
            'top_barang' => $topBarang,
            'top_ruangan' => $topRuangan,
            'barang_stok_rendah' => $barangStokRendah,
            'transaksi_terbaru' => $transaksiTerbaru,
        ]);
    }
}
