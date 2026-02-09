import { Head, router } from '@inertiajs/react';
import { Calendar, FileText, Download, Filter } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import type { Transaction, Ruangan, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Laporan', href: '#' },
    { title: 'Laporan Transaksi', href: '/laporan/transaksi' },
];

interface LaporanTransaksiProps {
    transactions?: Transaction[];
    ruangans?: Ruangan[];
    filters?: {
        ruangan_id?: string;
        type?: string;
        from_date?: string;
        to_date?: string;
    };
}

export default function LaporanTransaksi({
    transactions = [],
    ruangans = [],
    filters = {},
}: LaporanTransaksiProps) {
    const [filterForm, setFilterForm] = useState({
        ruangan_id: filters.ruangan_id || 'all',
        type: filters.type || 'all',
        from_date: filters.from_date || '',
        to_date: filters.to_date || '',
    });

    const applyFilters = () => {
        const params: Record<string, any> = {};

        if (filterForm.ruangan_id !== 'all') params.ruangan_id = filterForm.ruangan_id;
        if (filterForm.type !== 'all') params.type = filterForm.type;
        if (filterForm.from_date) params.from_date = filterForm.from_date;
        if (filterForm.to_date) params.to_date = filterForm.to_date;

        router.get('/laporan/transaksi', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setFilterForm({
            ruangan_id: 'all',
            type: 'all',
            from_date: '',
            to_date: '',
        });
        router.get('/laporan/transaksi', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleExport = (type: 'pdf' | 'excel') => {
        const params = new URLSearchParams();
        if (filterForm.ruangan_id !== 'all') params.append('ruangan_id', filterForm.ruangan_id);
        if (filterForm.type !== 'all') params.append('type', filterForm.type);
        if (filterForm.from_date) params.append('from_date', filterForm.from_date);
        if (filterForm.to_date) params.append('to_date', filterForm.to_date);

        const url =
            type === 'pdf'
                ? `/reports/transactions/pdf?${params.toString()}`
                : `/reports/transactions/excel?${params.toString()}`;

        window.open(url, '_blank');
    };

    const getTypeBadge = (type: string) => {
        return type === 'masuk' ? (
            <Badge className="bg-green-500 text-white">Masuk</Badge>
        ) : (
            <Badge className="bg-blue-500 text-white">Keluar</Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Transaksi" />

            <div className="flex h-full flex-1 gap-6 p-6">
                {/* Filter Sidebar */}
                <Card className="w-80 h-fit">
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            <h3 className="font-bold text-lg">Filter Laporan</h3>
                        </div>

                        {/* Date Range */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-600">
                                PERIODE TRANSAKSI
                            </Label>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Label htmlFor="from_date" className="text-sm">
                                        Dari Tanggal
                                    </Label>
                                    <Input
                                        id="from_date"
                                        type="date"
                                        value={filterForm.from_date}
                                        onChange={(e) =>
                                            setFilterForm({ ...filterForm, from_date: e.target.value })
                                        }
                                        className="text-sm mt-1"
                                    />
                                    <Calendar className="absolute right-3 bottom-3 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="relative">
                                    <Label htmlFor="to_date" className="text-sm">
                                        Sampai Tanggal
                                    </Label>
                                    <Input
                                        id="to_date"
                                        type="date"
                                        value={filterForm.to_date}
                                        onChange={(e) =>
                                            setFilterForm({ ...filterForm, to_date: e.target.value })
                                        }
                                        className="text-sm mt-1"
                                    />
                                    <Calendar className="absolute right-3 bottom-3 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Jenis Transaksi */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-600">
                                JENIS TRANSAKSI
                            </Label>
                            <Select
                                value={filterForm.type}
                                onValueChange={(value) =>
                                    setFilterForm({ ...filterForm, type: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua Jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Jenis</SelectItem>
                                    <SelectItem value="masuk">Barang Masuk</SelectItem>
                                    <SelectItem value="keluar">Barang Keluar</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Unit Kerja */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-600">UNIT KERJA</Label>
                            <Select
                                value={filterForm.ruangan_id}
                                onValueChange={(value) =>
                                    setFilterForm({ ...filterForm, ruangan_id: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Unit</SelectItem>
                                    {ruangans.map((ruangan) => (
                                        <SelectItem key={ruangan.id} value={ruangan.id.toString()}>
                                            {ruangan.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4">
                            <Button
                                onClick={applyFilters}
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                                Terapkan
                            </Button>
                            <Button onClick={resetFilters} variant="outline" className="flex-1">
                                Reset
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Page Header */}
                    <div className="space-y-2">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold">Laporan Transaksi</h1>
                                <p className="text-muted-foreground mt-1">
                                    Laporan transaksi barang masuk dan keluar dengan filter periode
                                    dan unit kerja
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExport('pdf')}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Export PDF
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExport('excel')}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Excel
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Transaksi
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{transactions.length}</div>
                                <p className="text-xs text-muted-foreground">Transaksi</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Barang Masuk</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {transactions.filter((t) => t.type === 'masuk').length}
                                </div>
                                <p className="text-xs text-muted-foreground">Transaksi</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Barang Keluar
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">
                                    {transactions.filter((t) => t.type === 'keluar').length}
                                </div>
                                <p className="text-xs text-muted-foreground">Transaksi</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Item</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {transactions.reduce(
                                        (sum, t) => sum + (t.items?.length || 0),
                                        0
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">Item</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Table Card */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm text-muted-foreground">
                                    Menampilkan {transactions.length} data transaksi
                                </p>
                            </div>

                            {/* Table */}
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="font-bold">KODE</TableHead>
                                            <TableHead className="font-bold">TANGGAL</TableHead>
                                            <TableHead className="font-bold">JENIS</TableHead>
                                            <TableHead className="font-bold">RUANGAN</TableHead>
                                            <TableHead className="font-bold text-center">
                                                JML ITEM
                                            </TableHead>
                                            <TableHead className="font-bold">KETERANGAN</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="text-center py-8 text-muted-foreground"
                                                >
                                                    Tidak ada data transaksi
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            transactions.map((transaction) => (
                                                <TableRow key={transaction.id}>
                                                    <TableCell className="font-medium">
                                                        {transaction.kode_transaksi}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            transaction.tanggal
                                                        ).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </TableCell>
                                                    <TableCell>
                                                        {getTypeBadge(transaction.type)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {transaction.ruangan?.nama || '-'}
                                                    </TableCell>
                                                    <TableCell className="text-center font-semibold">
                                                        {transaction.items?.length || 0}
                                                    </TableCell>
                                                    <TableCell className="max-w-xs truncate">
                                                        {transaction.keterangan || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="text-center text-sm text-muted-foreground py-4">
                        © 2023 Mahkamah Agung Republik Indonesia. Sistem Inventaris ATK v2.1
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
