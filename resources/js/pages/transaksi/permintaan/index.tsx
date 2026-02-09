import { Head, Link, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    Eye, 
    CheckCircle, 
    RefreshCw, 
    FileText,
    ChevronDown,
    Calendar
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { permintaanCreate, permintaanShow } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Transaction, Ruangan, BreadcrumbItem, PaginatedResponse } from '@/types';

interface PermintaanIndexProps {
    transactions: PaginatedResponse<Transaction>;
    ruangans: Ruangan[];
    filters: {
        search?: string;
        ruangan_id?: string;
        status?: string[];
        from_date?: string;
        to_date?: string;
    };
}

const statusOptions = [
    { value: 'pending', label: 'Diproses', color: 'bg-blue-500' },
    { value: 'approved', label: 'Diterima', color: 'bg-green-500' },
    { value: 'rejected', label: 'Ditolak', color: 'bg-red-500' },
    { value: 'revised', label: 'Direvisi', color: 'bg-orange-500' },
];

export default function PermintaanIndex({ transactions, ruangans, filters }: PermintaanIndexProps) {
    const [filterForm, setFilterForm] = useState({
        search: filters.search || '',
        ruangan_id: filters.ruangan_id || 'all',
        status: filters.status || [],
        from_date: filters.from_date || '',
        to_date: filters.to_date || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Manajemen Permintaan', href: '#' },
    ];

    const applyFilters = () => {
        const params: Record<string, any> = {};
        
        if (filterForm.search) params.search = filterForm.search;
        if (filterForm.ruangan_id !== 'all') params.ruangan_id = filterForm.ruangan_id;
        if (filterForm.status.length > 0) params.status = filterForm.status;
        if (filterForm.from_date) params.from_date = filterForm.from_date;
        if (filterForm.to_date) params.to_date = filterForm.to_date;

        router.get('/transaksi/permintaan', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setFilterForm({
            search: '',
            ruangan_id: 'all',
            status: [],
            from_date: '',
            to_date: '',
        });
        router.get('/transaksi/permintaan', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleStatus = (status: string) => {
        setFilterForm((prev) => ({
            ...prev,
            status: prev.status.includes(status)
                ? prev.status.filter((s) => s !== status)
                : [...prev.status, status],
        }));
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = statusOptions.find((s) => s.value === status);
        if (!statusConfig) return null;

        return (
            <Badge className={`${statusConfig.color} text-white border-0`}>
                {statusConfig.label}
            </Badge>
        );
    };

    const handleExport = (type: 'pdf' | 'excel') => {
        // TODO: Implement export functionality
        console.log(`Export as ${type}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Permintaan ATK" />

            <div className="flex h-full flex-1 gap-6 p-6">
                {/* Filter Sidebar */}
                <Card className="w-80 h-fit">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <ChevronDown className="h-5 w-5" />
                                <h3 className="font-bold text-lg">Filter Data</h3>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-600">
                                CARI ID / KEYWORD
                            </Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Contoh: REQ-2023-..."
                                    value={filterForm.search}
                                    onChange={(e) =>
                                        setFilterForm({ ...filterForm, search: e.target.value })
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Date Range */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-600">
                                TANGGAL PERMINTAAN
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="relative">
                                    <Input
                                        type="date"
                                        value={filterForm.from_date}
                                        onChange={(e) =>
                                            setFilterForm({ ...filterForm, from_date: e.target.value })
                                        }
                                        className="text-sm"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        value={filterForm.to_date}
                                        onChange={(e) =>
                                            setFilterForm({ ...filterForm, to_date: e.target.value })
                                        }
                                        className="text-sm"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Unit Kerja */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-600">
                                UNIT KERJA
                            </Label>
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

                        {/* Status Permintaan */}
                        <div className="space-y-3">
                            <Label className="text-xs font-bold text-gray-600">
                                STATUS PERMINTAAN
                            </Label>
                            {statusOptions.map((status) => (
                                <div key={status.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={status.value}
                                        checked={filterForm.status.includes(status.value)}
                                        onCheckedChange={() => toggleStatus(status.value)}
                                    />
                                    <label
                                        htmlFor={status.value}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                        {status.label}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4">
                            <Button
                                onClick={applyFilters}
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                                Terapkan
                            </Button>
                            <Button
                                onClick={resetFilters}
                                variant="outline"
                                className="flex-1"
                            >
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
                                <h1 className="text-3xl font-bold">Daftar Permintaan ATK</h1>
                                <p className="text-muted-foreground mt-1">
                                    Kelola, verifikasi, dan pantau status permintaan dari unit kerja.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExport('pdf')}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    PDF
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExport('excel')}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Excel
                                </Button>
                                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                    <Link href={permintaanCreate()}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Input Permintaan Baru
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Table Card */}
                    <Card>
                        <CardContent className="p-6">
                            {/* Table Header */}
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm text-muted-foreground">
                                    Menampilkan <span className="font-semibold">1-10</span> dari{' '}
                                    <span className="font-semibold">{transactions.total}</span> data
                                </p>
                                <Select defaultValue="newest">
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Terbaru</SelectItem>
                                        <SelectItem value="oldest">Terlama</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Table */}
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="font-bold">ID PERMINTAAN</TableHead>
                                            <TableHead className="font-bold">TANGGAL</TableHead>
                                            <TableHead className="font-bold">UNIT KERJA</TableHead>
                                            <TableHead className="font-bold text-center">
                                                JML ITEM
                                            </TableHead>
                                            <TableHead className="font-bold">STATUS</TableHead>
                                            <TableHead className="font-bold text-center">
                                                AKSI
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="text-center py-8 text-muted-foreground"
                                                >
                                                    Tidak ada data permintaan
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            transactions.data.map((transaction) => (
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
                                                        {transaction.ruangan?.nama || '-'}
                                                    </TableCell>
                                                    <TableCell className="text-center font-semibold">
                                                        {transaction.items?.length || 0}
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusBadge(transaction.status)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                                                            >
                                                                <RefreshCw className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                asChild
                                                                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                                                            >
                                                                <Link href={permintaanShow(transaction.id)}>
                                                                    <Eye className="h-4 w-4" />
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                                                            >
                                                                <CheckCircle className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {transactions.data.length > 0 && (
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Halaman {transactions.current_page} dari{' '}
                                        {transactions.last_page}
                                    </p>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(transactions.prev_page_url || '#')
                                            }
                                            disabled={!transactions.prev_page_url}
                                        >
                                            Previous
                                        </Button>
                                        {[...Array(Math.min(transactions.last_page, 5))].map(
                                            (_, i) => {
                                                const page = i + 1;
                                                return (
                                                    <Button
                                                        key={page}
                                                        variant={
                                                            transactions.current_page === page
                                                                ? 'default'
                                                                : 'outline'
                                                        }
                                                        size="sm"
                                                        className={
                                                            transactions.current_page === page
                                                                ? 'bg-blue-600 hover:bg-blue-700'
                                                                : ''
                                                        }
                                                        onClick={() =>
                                                            router.get(
                                                                `/transaksi/permintaan?page=${page}`
                                                            )
                                                        }
                                                    >
                                                        {page}
                                                    </Button>
                                                );
                                            }
                                        )}
                                        {transactions.last_page > 5 && (
                                            <>
                                                <Button variant="outline" size="sm" disabled>
                                                    ...
                                                </Button>
                                            </>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(transactions.next_page_url || '#')
                                            }
                                            disabled={!transactions.next_page_url}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
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
