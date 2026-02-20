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
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { show as transaksiPermintaanShow } from '@/routes/transactions';
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
        kode_transaksi: string;
        tanggal_transaksi?: string;
        created_at: string;
        jenis_transaksi: string;
        ruangan?: {
            nama: string;
        };
    }>;
}

// Warna untuk charts
const COLORS = ['#2563eb', '#16a34a', '#ea580c', '#ca8a04', '#7c3aed'];

export default function Dashboard({
    stats,
    chart_data,
    top_barang = [],
    top_ruangan = [],
    barang_stok_rendah = [],
    transaksi_terbaru = []
}: DashboardProps) {
    const [lowStockData, setLowStockData] = useState<any>(null);
    const [stockMovements, setStockMovements] = useState<any[]>([]);
    const [loadingLowStock, setLoadingLowStock] = useState(false);
    const [loadingMovements, setLoadingMovements] = useState(false);

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-50">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Inventory Dashboard Overview</h1>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        title="Total Barang"
                        value={stats.total_barang}
                        icon={<Package className="size-4" />}
                        description="Jenis barang terdaftar"
                    />
                    <StatCard
                        title="Total Ruangan"
                        value={stats.total_ruangan}
                        icon={<Building2 className="size-4" />}
                        description="Ruangan aktif"
                    />
                    <StatCard
                        title="Transaksi Hari Ini"
                        value={stats.total_transaksi_hari_ini}
                        icon={<ArrowRightLeft className="size-4" />}
                        description="Transaksi hari ini"
                    />
                    <StatCard
                        title="Transaksi Bulan Ini"
                        value={stats.total_transaksi_bulan_ini}
                        icon={<TrendingUp className="size-4" />}
                        description="Total bulan ini"
                    />
                    <StatCard
                        title="Stok Rendah"
                        value={stats.total_barang_stok_rendah}
                        icon={<AlertCircle className="size-4 text-destructive" />}
                        description="Barang perlu restok"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Line Chart - Transaksi 7 Hari */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="size-5 text-blue-600" />
                                Tren Transaksi 7 Hari Terakhir
                            </CardTitle>
                            <CardDescription>
                                Grafik jumlah transaksi harian
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {lineChartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={lineChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            fontSize={12}
                                        />
                                        <YAxis fontSize={12} />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="total"
                                            stroke="#2563eb"
                                            strokeWidth={2}
                                            name="Jumlah Transaksi"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="py-12 text-center text-sm text-muted-foreground">
                                    Belum ada data transaksi
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Bar Chart - Top 5 Barang */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="size-5 text-green-600" />
                                Top 5 Barang Paling Diminta
                            </CardTitle>
                            <CardDescription>
                                Barang dengan permintaan tertinggi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {topBarangData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={topBarangData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="name"
                                            fontSize={11}
                                            angle={-45}
                                            textAnchor="end"
                                            height={80}
                                        />
                                        <YAxis fontSize={12} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="total"
                                            fill="#16a34a"
                                            name="Total Permintaan"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="py-12 text-center text-sm text-muted-foreground">
                                    Belum ada data permintaan barang
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Pie Chart & Stats Row */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Pie Chart - Top 5 Ruangan */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="size-5 text-purple-600" />
                                Top 5 Ruangan Aktif
                            </CardTitle>
                            <CardDescription>
                                Ruangan dengan transaksi terbanyak
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {topRuanganData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={topRuanganData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={(entry) => entry?.name && entry?.value ? `${entry.name}: ${entry.value}` : ''}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {topRuanganData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="py-12 text-center text-sm text-muted-foreground">
                                    Belum ada data ruangan
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Barang Stok Rendah */}
                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingDown className="size-5 text-destructive" />
                                    Barang Stok Rendah
                                </CardTitle>
                                <CardDescription>
                                    Barang yang perlu segera direstock
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {barang_stok_rendah.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kode</TableHead>
                                            <TableHead>Nama Barang</TableHead>
                                            <TableHead className="text-right">Stok Saat Ini</TableHead>
                                            <TableHead className="text-right">Minimum</TableHead>
                                            <TableHead className="text-right">Selisih</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {barang_stok_rendah.filter(barang => barang?.kode && barang?.nama).map((barang) => {
                                            const selisih = (barang.stok_minimum || 0) - (barang.stok || 0);
                                            return (
                                                <TableRow key={barang.id}>
                                                    <TableCell className="font-medium">
                                                        {barang.kode}
                                                    </TableCell>
                                                    <TableCell>{barang.nama}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Badge variant="destructive">
                                                            {barang.stok} {barang.satuan}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right text-muted-foreground">
                                                        {barang.stok_minimum} {barang.satuan}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="text-sm text-destructive font-medium">
                                                            Kurang {selisih} {barang.satuan}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            ) : (
                                <>
                                    <p className="py-4 text-center text-sm text-muted-foreground">
                                        ✓ Semua barang stok aman
                                    </p>
                                    <Button variant="secondary" size="sm" className="w-full">
                                        <Info className="mr-2 h-4 w-4" />
                                        Learn More
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Transaksi Terbaru */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ArrowRightLeft className="size-5" />
                            Transaksi Terbaru
                        </CardTitle>
                        <CardDescription>
                            10 transaksi terakhir yang tercatat
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {transaksi_terbaru.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Kode Transaksi</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Ruangan</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transaksi_terbaru.filter(transaksi => transaksi?.id && transaksi?.kode_transaksi).map((transaksi) => (
                                        <TableRow key={transaksi.id}>
                                            <TableCell className="font-medium">
                                                {transaksi.kode_transaksi}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    transaksi.tanggal_transaksi || transaksi.created_at,
                                                ).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        transaksi.jenis_transaksi === 'masuk'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {transaksi.jenis_transaksi}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {transaksi.ruangan?.nama || '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    asChild
                                                >
                                                    <Link
                                                        href={transaksiPermintaanShow(
                                                            transaksi.id,
                                                        ).url}
                                                    >
                                                        <Eye className="mr-2 size-4" />
                                                        Detail
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                Belum ada transaksi tercatat
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

