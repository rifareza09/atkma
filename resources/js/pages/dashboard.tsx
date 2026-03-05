import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Package2,
    AlertCircle,
    FileCheck,
    Eye,
    ExternalLink,
    Download,
    CheckCheck,
    Info,
    TrendingDown,
    TrendingUp,
    BarChart3,
    Users,
    Package,
    Building2,
    ArrowRightLeft,
    X,
    ChevronRight,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { transaksiPermintaanShow, barangMasukShow } from '@/lib/atk-routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        total_barang: number;
        total_ruangan: number;
        total_transaksi_hari_ini: number;
        total_transaksi_bulan_ini: number;
        total_barang_stok_rendah: number;
    };
    chart_data?: {
        transaksi_7_hari: Array<{
            tanggal: string;
            total: number;
        }>;
    };
    top_barang?: Array<{
        id: number;
        nama: string;
        total_permintaan: number;
    }>;
    top_ruangan?: Array<{
        id: number;
        nama: string;
        total_transaksi: number;
    }>;
    barang_stok_rendah?: Array<{
        id: number;
        kode: string;
        nama: string;
        stok: number;
        stok_minimum: number;
        satuan: string;
    }>;
    transaksi_terbaru?: Array<{
        id: number;
        source_type?: string;
        kode_transaksi: string;
        tanggal_transaksi?: string;
        created_at: string;
        jenis_transaksi: string;
        ruangan?: {
            nama: string;
        };
    }>;
    transaksi_hari_ini_detail?: TransaksiDetail[];
    transaksi_bulan_ini_detail?: TransaksiDetail[];
}

interface TransaksiDetailItem {
    nama_barang: string;
    kode_barang: string;
    satuan: string;
    jumlah: number;
    saldo: number;
}

interface TransaksiDetail {
    id: number;
    kode_transaksi: string;
    ruangan: string;
    tanggal: string;
    items: TransaksiDetailItem[];
}

// Warna untuk charts
const COLORS = ['#2563eb', '#16a34a', '#ea580c', '#ca8a04', '#7c3aed'];

export default function Dashboard({
    stats,
    chart_data,
    top_barang = [],
    top_ruangan = [],
    barang_stok_rendah = [],
    transaksi_terbaru = [],
    transaksi_hari_ini_detail = [],
    transaksi_bulan_ini_detail = [],
}: DashboardProps) {
    const [lowStockData, setLowStockData] = useState<any>(null);
    const [stockMovements, setStockMovements] = useState<any[]>([]);
    const [loadingLowStock, setLoadingLowStock] = useState(false);
    const [loadingMovements, setLoadingMovements] = useState(false);
    const [dialogHariIni, setDialogHariIni] = useState(false);
    const [dialogBulanIni, setDialogBulanIni] = useState(false);
    const [activeTab, setActiveTab] = useState<'semua' | 'masuk' | 'keluar'>('semua');

    const fetchLowStockData = async () => {
        setLoadingLowStock(true);
        try {
            const response = await fetch('/api/dashboard/low-stock');
            const data = await response.json();
            setLowStockData(data);
        } catch (error) {
            console.error('Error fetching low stock data:', error);
        } finally {
            setLoadingLowStock(false);
        }
    };

    const fetchStockMovements = async () => {
        setLoadingMovements(true);
        try {
            const response = await fetch('/api/dashboard/stock-movements/today');
            const data = await response.json();
            setStockMovements(data);
        } catch (error) {
            console.error('Error fetching stock movements:', error);
        } finally {
            setLoadingMovements(false);
        }
    };

    useEffect(() => {
        fetchLowStockData();
        fetchStockMovements();
    }, []);

    // Format data untuk line chart
    const lineChartData = chart_data?.transaksi_7_hari?.filter(item => item?.tanggal).map(item => ({
        date: new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        total: item.total || 0
    })) || [];

    // Format data untuk top barang bar chart
    const topBarangData = top_barang?.filter(item => item?.nama).map(item => ({
        name: item.nama.length > 20 ? item.nama.substring(0, 20) + '...' : item.nama,
        total: item.total_permintaan || 0
    })) || [];

    // Format data untuk top ruangan pie chart
    const topRuanganData = top_ruangan?.filter(item => item?.nama).map(item => ({
        name: item.nama,
        value: item.total_transaksi || 0
    })) || [];

    // Filter transaksi berdasarkan tab aktif
    const filteredTransaksi = transaksi_terbaru.filter(transaksi => {
        if (activeTab === 'semua') return true;
        return transaksi.jenis_transaksi === activeTab;
    });

    return (
        <>
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4 md:p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Top Row: Main Stats */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Total Revenue Card - Styled prominently */}
                    <button
                        type="button"
                        onClick={() => setDialogBulanIni(true)}
                        className="text-left w-full group"
                    >
                        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-white/80 text-sm font-medium">Transaksi Bulan Ini</span>
                                    <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <h2 className="text-4xl md:text-5xl font-bold">
                                        {stats.total_transaksi_bulan_ini}
                                    </h2>
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-xs font-medium">
                                        <TrendingUp className="h-3 w-3" />
                                        +8.2%
                                    </span>
                                </div>
                                <p className="text-white/70 text-sm mt-2">vs bulan lalu</p>
                            </CardContent>
                        </Card>
                    </button>

                    {/* Total Orders Card */}
                    <button
                        type="button"
                        onClick={() => setDialogHariIni(true)}
                        className="text-left w-full group"
                    >
                        <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-600 text-sm font-medium">Transaksi Hari Ini</span>
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <ArrowRightLeft className="h-5 w-5 text-red-600" />
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        {stats.total_transaksi_hari_ini}
                                    </h2>
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                        <TrendingDown className="h-3 w-3" />
                                        -4.3%
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm mt-2">vs hari kemarin</p>
                            </CardContent>
                        </Card>
                    </button>
                </div>

                {/* Secondary Stats Row */}
                <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-600 font-medium">Total Visitors</span>
                                <div className="p-1.5 bg-blue-100 rounded">
                                    <Users className="h-4 w-4 text-blue-600" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <h3 className="text-2xl font-bold text-gray-900">{stats.total_ruangan}</h3>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Ruangan aktif</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-600 font-medium">Net profit</span>
                                <div className="p-1.5 bg-green-100 rounded">
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <h3 className="text-2xl font-bold text-gray-900">{stats.total_barang}</h3>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Jenis barang</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all lg:col-span-2">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 bg-amber-100 rounded">
                                            <AlertCircle className="h-4 w-4 text-amber-600" />
                                        </div>
                                        <span className="text-xs text-gray-600 font-medium">Stok Rendah</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-2xl font-bold text-gray-900">{stats.total_barang_stok_rendah}</h3>
                                        <span className="text-xs text-gray-500">barang perlu restok</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-gray-500">{stats.total_barang_stok_rendah} barang</span>
                                    <div className="text-amber-600">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold">
                                            !
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Bar Chart - Transaksi 7 Hari (Revenue Style) */}
                    <Card className="bg-white shadow-md border-gray-100">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-semibold">Transaksi</CardTitle>
                                    <CardDescription className="text-xs">Bulan ini vs bulan lalu</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {lineChartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={lineChartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="date"
                                            fontSize={11}
                                            stroke="#9ca3af"
                                        />
                                        <YAxis fontSize={11} stroke="#9ca3af" />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#fff', 
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Bar
                                            dataKey="total"
                                            fill="#6366f1"
                                            radius={[8, 8, 0, 0]}
                                            name="Transaksi"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="py-12 text-center text-sm text-muted-foreground">
                                    Belum ada data transaksi
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Orders and Customers Stats */}
                    <div className="grid gap-4 grid-rows-2">
                        {/* Orders Section */}
                        <Card className="bg-white shadow-md border-gray-100">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Package className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <h2 className="text-4xl font-bold text-gray-900">
                                                {transaksi_terbaru.filter(t => t.jenis_transaksi === 'keluar').length}
                                            </h2>
                                            <span className="text-sm text-gray-600">permintaan</span>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {transaksi_terbaru.filter(t => t.jenis_transaksi === 'keluar').length} permintaan <span className="text-blue-600">sedang dikonfirmasi</span>
                                        </p>
                                    </div>
                                    <button 
                                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                        aria-label="Lihat detail permintaan"
                                    >
                                        <ChevronRight className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customers Section */}
                        <Card className="bg-white shadow-md border-gray-100">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                <Users className="h-5 w-5 text-indigo-600" />
                                            </div>
                                        </div>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <h2 className="text-4xl font-bold text-gray-900">
                                                {stats.total_ruangan}
                                            </h2>
                                            <span className="text-sm text-gray-600">ruangan</span>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {stats.total_ruangan} ruangan <span className="text-indigo-600">menunggu respon</span>
                                        </p>
                                    </div>
                                    <button 
                                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                        aria-label="Lihat detail ruangan"
                                    >
                                        <ChevronRight className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Pie Chart & Low Stock Row */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Pie Chart - Sales by Category */}
                    <Card className="bg-white shadow-md border-gray-100">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">Barang Populer</CardTitle>
                                <button 
                                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                    aria-label="Lihat detail barang populer"
                                >
                                    <ChevronRight className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                            <CardDescription className="text-xs">Bulan ini vs bulan lalu</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {topBarangData.length > 0 ? (
                                <div className="space-y-3">
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={topBarangData.slice(0, 5)}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="total"
                                                paddingAngle={2}
                                            >
                                                {topBarangData.slice(0, 5).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="space-y-2">
                                        {topBarangData.slice(0, 5).map((item, index) => {
                                            const colorClasses = [
                                                'bg-[#2563eb]',
                                                'bg-[#16a34a]',
                                                'bg-[#ea580c]',
                                                'bg-[#ca8a04]',
                                                'bg-[#7c3aed]'
                                            ];
                                            return (
                                                <div key={index} className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <div 
                                                            className={`w-3 h-3 rounded-full ${colorClasses[index % colorClasses.length]}`}
                                                        />
                                                        <span className="text-gray-700 truncate max-w-[120px]">{item.name}</span>
                                                    </div>
                                                    <span className="text-gray-500 font-medium">{item.total}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <p className="py-12 text-center text-sm text-muted-foreground">
                                    Belum ada data permintaan barang
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Barang Stok Rendah */}
                    <Card className="md:col-span-2 bg-white shadow-md border-gray-100">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <TrendingDown className="size-5 text-amber-600" />
                                    Barang Stok Rendah
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Barang yang perlu segera direstock
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {barang_stok_rendah.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-gray-100">
                                                <TableHead className="text-xs">Kode</TableHead>
                                                <TableHead className="text-xs">Nama Barang</TableHead>
                                                <TableHead className="text-right text-xs">Stok Saat Ini</TableHead>
                                                <TableHead className="text-right text-xs">Minimum</TableHead>
                                                <TableHead className="text-right text-xs">Selisih</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {barang_stok_rendah.filter(barang => barang?.kode && barang?.nama).slice(0, 4).map((barang) => {
                                                const selisih = (barang.stok_minimum || 0) - (barang.stok || 0);
                                                return (
                                                    <TableRow key={barang.id} className="border-gray-50">
                                                        <TableCell className="font-medium text-xs">
                                                            {barang.kode}
                                                        </TableCell>
                                                        <TableCell className="text-xs">{barang.nama}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Badge variant="destructive" className="text-xs">
                                                                {barang.stok} {barang.satuan}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right text-muted-foreground text-xs">
                                                            {barang.stok_minimum} {barang.satuan}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <span className="text-xs text-destructive font-medium">
                                                                -{selisih}
                                                            </span>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <>
                                    <p className="py-4 text-center text-sm text-muted-foreground">
                                        ✓ Semua barang stok aman
                                    </p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Transaksi Terbaru dengan Tabs */}
                <Card className="bg-white shadow-md border-gray-100">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    Daftar Transaksi
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    {filteredTransaksi.length} transaksi
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" className="h-8 text-xs">
                                    <Download className="mr-1 h-3 w-3" />
                                    Export
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 text-xs">
                                    Sortir: Default
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Tabs untuk filter jenis transaksi */}
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            <button
                                onClick={() => setActiveTab('semua')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                    activeTab === 'semua'
                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Semua Transaksi
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                    activeTab === 'semua' ? 'bg-blue-200' : 'bg-gray-200'
                                }`}>
                                    {transaksi_terbaru.length}
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab('masuk')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                    activeTab === 'masuk'
                                        ? 'bg-green-100 text-green-700 shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Barang Masuk
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                    activeTab === 'masuk' ? 'bg-green-200' : 'bg-gray-200'
                                }`}>
                                    {transaksi_terbaru.filter(t => t.jenis_transaksi === 'masuk').length}
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab('keluar')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                    activeTab === 'keluar'
                                        ? 'bg-amber-100 text-amber-700 shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Barang Keluar
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                    activeTab === 'keluar' ? 'bg-amber-200' : 'bg-gray-200'
                                }`}>
                                    {transaksi_terbaru.filter(t => t.jenis_transaksi === 'keluar').length}
                                </span>
                            </button>
                        </div>

                        {/* Tabel Transaksi */}
                        {filteredTransaksi.length > 0 ? (
                            <div className="overflow-x-auto rounded-lg border border-gray-100">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50 border-gray-100">
                                            <TableHead className="text-xs font-semibold text-gray-700">
                                                <input type="checkbox" className="rounded" aria-label="Pilih semua transaksi" />
                                            </TableHead>
                                            <TableHead className="text-xs font-semibold text-gray-700">KODE TRANSAKSI</TableHead>
                                            <TableHead className="text-xs font-semibold text-gray-700">RUANGAN</TableHead>
                                            <TableHead className="text-xs font-semibold text-gray-700">JENIS</TableHead>
                                            <TableHead className="text-xs font-semibold text-gray-700">TANGGAL</TableHead>
                                            <TableHead className="text-xs font-semibold text-gray-700">STATUS</TableHead>
                                            <TableHead className="text-right text-xs font-semibold text-gray-700">AKSI</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredTransaksi.filter(transaksi => transaksi?.id && transaksi?.kode_transaksi).map((transaksi) => (
                                            <TableRow key={transaksi.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                <TableCell>
                                                    <input type="checkbox" className="rounded" aria-label={`Pilih transaksi ${transaksi.kode_transaksi}`} />
                                                </TableCell>
                                                <TableCell className="font-mono text-xs font-medium text-gray-900">
                                                    {transaksi.kode_transaksi}
                                                </TableCell>
                                                <TableCell className="text-xs text-gray-700">
                                                    {transaksi.ruangan?.nama || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            transaksi.jenis_transaksi === 'masuk'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                        className="text-xs"
                                                    >
                                                        {transaksi.jenis_transaksi}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs text-gray-600">
                                                    {new Date(
                                                        transaksi.tanggal_transaksi || transaksi.created_at,
                                                    ).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        variant={
                                                            transaksi.jenis_transaksi === 'masuk' 
                                                                ? 'default' 
                                                                : 'outline'
                                                        }
                                                        className="text-xs"
                                                    >
                                                        {transaksi.jenis_transaksi === 'masuk' ? 'completed' : 'on way'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            asChild
                                                            className="h-8 px-2 text-xs hover:bg-blue-50"
                                                        >
                                                            <Link
                                                                href={
                                                                    transaksi.source_type === 'incoming_stock'
                                                                        ? barangMasukShow(transaksi.id)
                                                                        : transaksiPermintaanShow(transaksi.id)
                                                                }
                                                            >
                                                                <Eye className="h-3 w-3" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 px-2 text-xs hover:bg-gray-100"
                                                        >
                                                            ⋯
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                <p className="text-sm text-muted-foreground">
                                    Belum ada transaksi dengan filter ini
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredTransaksi.length > 0 && (
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <div className="text-xs text-gray-500">
                                    Menampilkan 1-{Math.min(10, filteredTransaksi.length)} dari {filteredTransaksi.length}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="h-8 px-2">
                                        <span className="sr-only">Previous</span>
                                        ‹
                                    </Button>
                                    <Button size="sm" variant="default" className="h-8 w-8">1</Button>
                                    <Button size="sm" variant="outline" className="h-8 w-8">2</Button>
                                    <Button size="sm" variant="outline" className="h-8 w-8">3</Button>
                                    <Button size="sm" variant="outline" className="h-8 px-2">
                                        <span className="sr-only">Next</span>
                                        ›
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>

        {/* Dialog: Transaksi Hari Ini */}
        <Dialog open={dialogHariIni} onOpenChange={setDialogHariIni}>
            <DialogContent className="sm:max-w-[90vw] max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ArrowRightLeft className="size-5 text-blue-600" />
                        Detail Transaksi Hari Ini
                        <Badge className="ml-2">{transaksi_hari_ini_detail.length} transaksi</Badge>
                    </DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto flex-1 pr-1">
                    {transaksi_hari_ini_detail.length === 0 ? (
                        <p className="py-12 text-center text-sm text-muted-foreground">Belum ada transaksi hari ini</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-40">Kode Transaksi</TableHead>
                                    <TableHead className="w-44">Ruangan</TableHead>
                                    <TableHead className="w-24">Jam</TableHead>
                                    <TableHead>Barang</TableHead>
                                    <TableHead className="text-right w-36">Jumlah Diminta</TableHead>
                                    <TableHead className="text-right w-36">Saldo Barang</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transaksi_hari_ini_detail.map((trx) =>
                                    trx.items.length === 0 ? (
                                        <TableRow key={trx.id}>
                                            <TableCell className="font-mono text-sm">{trx.kode_transaksi}</TableCell>
                                            <TableCell>{trx.ruangan}</TableCell>
                                            <TableCell>{trx.tanggal}</TableCell>
                                            <TableCell colSpan={3} className="text-muted-foreground text-xs">—</TableCell>
                                        </TableRow>
                                    ) : (
                                        trx.items.map((item, i) => (
                                            <TableRow key={`${trx.id}-${i}`}>
                                                {i === 0 && (
                                                    <>
                                                        <TableCell
                                                            rowSpan={trx.items.length}
                                                            className="font-mono text-sm align-top pt-3"
                                                        >
                                                            {trx.kode_transaksi}
                                                        </TableCell>
                                                        <TableCell
                                                            rowSpan={trx.items.length}
                                                            className="font-medium align-top pt-3"
                                                        >
                                                            {trx.ruangan}
                                                        </TableCell>
                                                        <TableCell
                                                            rowSpan={trx.items.length}
                                                            className="text-muted-foreground text-xs align-top pt-3"
                                                        >
                                                            {trx.tanggal}
                                                        </TableCell>
                                                    </>
                                                )}
                                                <TableCell>
                                                    <span className="text-xs text-muted-foreground font-mono">{item.kode_barang}</span>
                                                    <br />
                                                    <span>{item.nama_barang}</span>
                                                </TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    {item.jumlah} <span className="text-xs text-muted-foreground">{item.satuan}</span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant={item.saldo <= 0 ? 'destructive' : 'secondary'}>
                                                        {item.saldo} {item.satuan}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </DialogContent>
        </Dialog>

        {/* Dialog: Transaksi Bulan Ini */}
        <Dialog open={dialogBulanIni} onOpenChange={setDialogBulanIni}>
            <DialogContent className="sm:max-w-[90vw] max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <TrendingUp className="size-5 text-blue-600" />
                        Detail Transaksi Bulan Ini
                        <Badge className="ml-2">{transaksi_bulan_ini_detail.length} transaksi</Badge>
                    </DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto flex-1 pr-1">
                    {transaksi_bulan_ini_detail.length === 0 ? (
                        <p className="py-12 text-center text-sm text-muted-foreground">Belum ada transaksi bulan ini</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-40">Kode Transaksi</TableHead>
                                    <TableHead className="w-44">Ruangan</TableHead>
                                    <TableHead className="w-28">Tanggal</TableHead>
                                    <TableHead>Barang</TableHead>
                                    <TableHead className="text-right w-36">Jumlah Diminta</TableHead>
                                    <TableHead className="text-right w-36">Saldo Barang</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transaksi_bulan_ini_detail.map((trx) =>
                                    trx.items.length === 0 ? (
                                        <TableRow key={trx.id}>
                                            <TableCell className="font-mono text-sm">{trx.kode_transaksi}</TableCell>
                                            <TableCell>{trx.ruangan}</TableCell>
                                            <TableCell>{trx.tanggal}</TableCell>
                                            <TableCell colSpan={3} className="text-muted-foreground text-xs">—</TableCell>
                                        </TableRow>
                                    ) : (
                                        trx.items.map((item, i) => (
                                            <TableRow key={`${trx.id}-${i}`}>
                                                {i === 0 && (
                                                    <>
                                                        <TableCell
                                                            rowSpan={trx.items.length}
                                                            className="font-mono text-sm align-top pt-3"
                                                        >
                                                            {trx.kode_transaksi}
                                                        </TableCell>
                                                        <TableCell
                                                            rowSpan={trx.items.length}
                                                            className="font-medium align-top pt-3"
                                                        >
                                                            {trx.ruangan}
                                                        </TableCell>
                                                        <TableCell
                                                            rowSpan={trx.items.length}
                                                            className="text-muted-foreground text-xs align-top pt-3"
                                                        >
                                                            {trx.tanggal}
                                                        </TableCell>
                                                    </>
                                                )}
                                                <TableCell>
                                                    <span className="text-xs text-muted-foreground font-mono">{item.kode_barang}</span>
                                                    <br />
                                                    <span>{item.nama_barang}</span>
                                                </TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    {item.jumlah} <span className="text-xs text-muted-foreground">{item.satuan}</span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant={item.saldo <= 0 ? 'destructive' : 'secondary'}>
                                                        {item.saldo} {item.satuan}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    </>
    );
}

