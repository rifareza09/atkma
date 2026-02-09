import { Head, Link } from '@inertiajs/react';
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
    RefreshCw,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
import { show as transaksiPermintaanShow } from '@/routes/permintaan';
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

export default function Dashboard({
    stats,
<<<<<<< HEAD
    pending_approvals,
    low_stock_items,
    workflow_stats,
=======
    chart_data,
    top_barang = [],
    top_ruangan = [],
    barang_stok_rendah = [], 
    transaksi_terbaru = []
>>>>>>> 4016ad9 (Add user management (migration, controller, userpolicy. routes), Setting management backend(migrations, seed, controller, routes, cache)
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

<<<<<<< HEAD
=======
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

>>>>>>> 4016ad9 (Add user management (migration, controller, userpolicy. routes), Setting management backend(migrations, seed, controller, routes, cache)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-50">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Inventory Dashboard Overview</h1>
                </div>

<<<<<<< HEAD
                {/* Stats Cards and Monthly Quota */}
=======
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
>>>>>>> 4016ad9 (Add user management (migration, controller, userpolicy. routes), Setting management backend(migrations, seed, controller, routes, cache)
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Total Items Card */}
                    <Card>
<<<<<<< HEAD
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">TOTAL ITEMS</p>
                                    <p className="text-3xl font-bold mt-2">{stats.total_items.toLocaleString()}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                                    <Package2 className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
=======
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
>>>>>>> 4016ad9 (Add user management (migration, controller, userpolicy. routes), Setting management backend(migrations, seed, controller, routes, cache)
                        </CardContent>
                    </Card>

                    {/* Low Stock Card */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">LOW STOCK</p>
                                    <p className="text-3xl font-bold mt-2 text-orange-600">{stats.low_stock}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                                    <AlertCircle className="h-6 w-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Review Card */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">PENDING REVIEW</p>
                                    <p className="text-3xl font-bold mt-2 text-amber-600">{stats.pending_review}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50">
                                    <FileCheck className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Monthly Quota Status */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded bg-green-50">
                                    <CheckCheck className="h-4 w-4 text-green-600" />
                                </div>
                                <p className="text-sm font-semibold text-gray-700">MONTHLY QUOTA STATUS</p>
                            </div>
                            <span className="text-sm font-bold text-green-600">{stats.monthly_quota_percentage}% Used</span>
                        </div>
                        <Progress value={stats.monthly_quota_percentage} className="h-2" />
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Pending Approvals & Workflow Statistics */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Pending Approvals */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-4">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-lg">Pending Approvals</CardTitle>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                        Priority View
                                    </Badge>
                                </div>
                                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    View Approval Management
                                    <ExternalLink className="h-3 w-3" />
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>REQUEST DATE</TableHead>
                                            <TableHead>REQUESTER ROOM</TableHead>
                                            <TableHead>ITEMS</TableHead>
                                            <TableHead>STATUS</TableHead>
                                            <TableHead>ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
<<<<<<< HEAD
                                        {pending_approvals.map((approval) => (
                                            <TableRow key={approval.id}>
                                                <TableCell className="font-medium">{approval.date}</TableCell>
                                                <TableCell>{approval.requester_room}</TableCell>
                                                <TableCell>
                                                    {approval.items.slice(0, 2).join(', ')}
                                                    {approval.items_count > 2 && ` (+${approval.items_count - 2})`}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                                                        Diproses
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="h-4 w-4 text-blue-600" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {pending_approvals.length === 0 && (
                                    <p className="py-8 text-center text-sm text-muted-foreground">
                                        No pending approvals
                                    </p>
                                )}
                                <div className="mt-4 text-center">
                                    <Button variant="link" className="text-blue-600">
                                        Load more pending requests
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Workflow Statistics & Quick Actions */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Workflow Statistics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative mx-auto w-48 h-48">
                                        {/* Donut Chart - Using CSS */}
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke="#22c55e"
                                                strokeWidth="20"
                                                strokeDasharray={`${workflow_stats.approved * 2.51} ${251 - workflow_stats.approved * 2.51}`}
                                                transform="rotate(-90 50 50)"
                                            />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="20"
                                                strokeDasharray={`${workflow_stats.rejected * 2.51} ${251 - workflow_stats.rejected * 2.51}`}
                                                strokeDashoffset={-workflow_stats.approved * 2.51}
                                                transform="rotate(-90 50 50)"
                                            />
                                            <text x="50" y="50" textAnchor="middle" dy=".3em" className="text-2xl font-bold fill-gray-900">
                                                {workflow_stats.approved + workflow_stats.rejected + workflow_stats.pending}
                                            </text>
                                            <text x="50" y="65" textAnchor="middle" className="text-xs fill-gray-500">
                                                Total
                                            </text>
                                        </svg>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-green-500" />
                                                <span>Diterima (Approved)</span>
                                            </div>
                                            <span className="font-semibold">{workflow_stats.approved}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                                <span>Ditolak (Rejected)</span>
                                            </div>
                                            <span className="font-semibold">{workflow_stats.rejected}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-blue-500" />
                                                <span>Di revisi (Revised)</span>
                                            </div>
                                            <span className="font-semibold">{workflow_stats.revised}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-amber-500" />
                                                <span>Diproses (Pending)</span>
                                            </div>
                                            <span className="font-semibold">{workflow_stats.pending}%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                                    <CardDescription>Commonly used workflow tools</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        <CheckCheck className="mr-2 h-4 w-4" />
                                        Bulk Approve
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export Logs
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column - Low Stock Alert & Workflow Tip */}
                    <div className="flex flex-col gap-6">
                        {/* Low Stock Alert - Enhanced with API Data */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-4">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-lg">Low Stock Alert</CardTitle>
                                    {lowStockData && (
                                        <Badge className="bg-red-600">
                                            {lowStockData.critical_count} Critical
                                        </Badge>
                                    )}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={fetchLowStockData}
                                    disabled={loadingLowStock}
                                >
                                    <RefreshCw className={`size-4 ${loadingLowStock ? 'animate-spin' : ''}`} />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {loadingLowStock ? (
                                    <div className="text-center py-8">
                                        <RefreshCw className="size-8 text-muted-foreground mx-auto mb-2 animate-spin" />
                                        <p className="text-sm text-muted-foreground">Memuat data...</p>
                                    </div>
                                ) : lowStockData && lowStockData.items.length > 0 ? (
                                    <>
                                        {lowStockData.items.map((item: any) => (
                                            <div key={item.id} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`flex h-2 w-2 rounded-full ${item.critical ? 'bg-red-600' : 'bg-orange-500'}`} />
                                                        <div>
                                                            <p className="font-semibold text-sm">{item.nama}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {item.stok} / {item.stok_minimum} {item.satuan}
                                                                {item.critical && (
                                                                    <span className="text-red-600 font-semibold ml-1">(Habis!)</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className={`${item.critical ? 'text-red-600 border-red-600' : 'text-orange-600 border-orange-600'}`}>
                                                        {item.stock_percentage.toFixed(0)}%
                                                    </Badge>
                                                </div>
                                                <Progress
                                                    value={item.stock_percentage}
                                                    className="h-2"
                                                    indicatorClassName={item.critical ? 'bg-red-600' : 'bg-orange-500'}
                                                />
                                            </div>
                                        ))}
                                        <div className="pt-2 border-t">
                                            <p className="text-xs text-muted-foreground">
                                                Total {lowStockData.total_count} barang low stock
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <CheckCheck className="size-12 text-green-600 mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            Semua stok dalam kondisi baik
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Today's Stock Movements */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-4">
                                <CardTitle className="text-lg">Aktivitas Stok Hari Ini</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={fetchStockMovements}
                                    disabled={loadingMovements}
                                >
                                    <RefreshCw className={`size-4 ${loadingMovements ? 'animate-spin' : ''}`} />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {loadingMovements ? (
                                    <div className="text-center py-4">
                                        <RefreshCw className="size-6 text-muted-foreground mx-auto mb-2 animate-spin" />
                                        <p className="text-xs text-muted-foreground">Memuat...</p>
                                    </div>
                                ) : stockMovements.length > 0 ? (
                                    <>
                                        {stockMovements.map((movement: any) => (
                                            <div key={movement.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                                                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                    movement.type === 'penambahan' ? 'bg-green-100' : 'bg-red-100'
                                                }`}>
                                                    {movement.type === 'penambahan' ? (
                                                        <TrendingDown className="h-4 w-4 text-green-600 rotate-180" />
                                                    ) : (
                                                        <TrendingDown className="h-4 w-4 text-red-600" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{movement.barang?.nama}</p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {movement.keterangan || '-'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        oleh {movement.user?.name}
                                                    </p>
                                                </div>
                                                <Badge variant={movement.type === 'penambahan' ? 'default' : 'destructive'} className="shrink-0">
                                                    {movement.type === 'penambahan' ? '+' : '-'}{movement.jumlah}
                                                </Badge>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="text-center py-4">
                                        <Info className="size-8 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-xs text-muted-foreground">
                                            Belum ada aktivitas hari ini
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Workflow Tip */}
                        <Card className="bg-gray-900 text-white border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg text-white">Workflow Tip</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Items with status 'Diproses' require your final verification before they can be released from the stock. Check the "Approval Management" tab for detailed breakdowns.
                                </p>
                                <Button variant="secondary" size="sm" className="w-full">
                                    <Info className="mr-2 h-4 w-4" />
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
=======
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
>>>>>>> 4016ad9 (Add user management (migration, controller, userpolicy. routes), Setting management backend(migrations, seed, controller, routes, cache)
            </div>
        </AppLayout>
    );
}
