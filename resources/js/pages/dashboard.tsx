import { Head, Link } from '@inertiajs/react';
import { 
    Package, 
    Building2, 
    ArrowRightLeft, 
    AlertCircle,
    TrendingDown,
    Eye
} from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { 
    transaksiPermintaanShow 
} from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { 
    BreadcrumbItem, 
    DashboardData,
} from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    dashboardData: DashboardData;
}

export default function Dashboard({ dashboardData }: DashboardProps) {
    const { stats, barang_stok_rendah, transaksi_terbaru } = dashboardData;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Sistem Manajemen Alat Tulis Kantor - Mahkamah Agung RI
                        </p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                        title="Transaksi Bulan Ini"
                        value={stats.total_transaksi_bulan_ini}
                        icon={<ArrowRightLeft className="size-4" />}
                        description="Total transaksi masuk & keluar"
                    />
                    <StatCard
                        title="Stok Rendah"
                        value={stats.barang_stok_rendah}
                        icon={<AlertCircle className="size-4 text-destructive" />}
                        description="Barang perlu restok"
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Barang Stok Rendah */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <TrendingDown className="size-5 text-destructive" />
                                Barang Stok Rendah
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {barang_stok_rendah.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kode</TableHead>
                                            <TableHead>Nama Barang</TableHead>
                                            <TableHead className="text-right">Stok</TableHead>
                                            <TableHead className="text-right">Min</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {barang_stok_rendah.map((barang) => (
                                            <TableRow key={barang.id}>
                                                <TableCell className="font-medium">
                                                    {barang.kode_barang}
                                                </TableCell>
                                                <TableCell>{barang.nama_barang}</TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant="destructive">
                                                        {barang.stok} {barang.satuan}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right text-muted-foreground">
                                                    {barang.stok_minimum}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="py-4 text-center text-sm text-muted-foreground">
                                    Semua barang stok aman
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Transaksi Terbaru */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ArrowRightLeft className="size-5" />
                                Transaksi Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {transaksi_terbaru.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kode</TableHead>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Jenis</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transaksi_terbaru.map((transaksi) => (
                                            <TableRow key={transaksi.id}>
                                                <TableCell className="font-medium">
                                                    {transaksi.kode_transaksi}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        transaksi.tanggal_transaksi,
                                                    ).toLocaleDateString('id-ID')}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            transaksi.jenis_transaksi ===
                                                            'masuk'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {transaksi.jenis_transaksi}
                                                    </Badge>
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
                                                            )}
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
                                <p className="py-4 text-center text-sm text-muted-foreground">
                                    Belum ada transaksi
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
