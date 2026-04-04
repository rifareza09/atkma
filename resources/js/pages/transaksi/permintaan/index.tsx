import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Plus,
    Search,
    Eye,
    RefreshCw,
    FileText,
    ChevronDown,
    Calendar
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import type { Transaction, Ruangan, BreadcrumbItem, PaginatedResponse, SharedData } from '@/types';

// Helper untuk convert format tanggal
const formatDateToISO = (year: string, month: string, day: string): string => {
    if (!year || !month || !day) return '';
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const parseDateFromISO = (isoDate: string): { year: string; month: string; day: string } => {
    if (!isoDate) return { year: '', month: '', day: '' };
    const [y, m, d] = isoDate.split('-');
    return { year: y || '', month: m || '', day: d || '' };
};

interface PermintaanIndexProps {
    transactions: PaginatedResponse<Transaction>;
    ruangans: Ruangan[];
    filters: {
        search?: string;
        ruangan_id?: string;
        from_date?: string;
        to_date?: string;
    };
}

export default function PermintaanIndex({ transactions, ruangans, filters }: PermintaanIndexProps) {
    const { auth } = usePage<SharedData>().props;

    const [filterForm, setFilterForm] = useState({
        search: filters.search || '',
        ruangan_id: filters.ruangan_id || 'all',
        from_date: filters.from_date || '',
        to_date: filters.to_date || '',
    });

    // State untuk date parts
    const [fromDateParts, setFromDateParts] = useState(parseDateFromISO(filters.from_date || ''));
    const [toDateParts, setToDateParts] = useState(parseDateFromISO(filters.to_date || ''));

    // Array bulan
    const months = [
        { value: '01', label: 'Januari' },
        { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' },
        { value: '04', label: 'April' },
        { value: '05', label: 'Mei' },
        { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' },
        { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];

    // Generate tahun dari 2020 sampai tahun depan
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Manajemen Permintaan', href: '#' },
    ];

    const applyFilters = () => {
        const params: Record<string, any> = {};

        if (filterForm.search) params.search = filterForm.search;
        if (filterForm.ruangan_id !== 'all') params.ruangan_id = filterForm.ruangan_id;
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
            from_date: '',
            to_date: '',
        });
        setFromDateParts({ year: '', month: '', day: '' });
        setToDateParts({ year: '', month: '', day: '' });
        router.get('/transaksi/permintaan', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleExport = (type: 'pdf' | 'excel') => {
        const params = new URLSearchParams();

        if (filterForm.search) params.append('search', filterForm.search);
        if (filterForm.ruangan_id !== 'all') params.append('ruangan_id', filterForm.ruangan_id);
        if (filterForm.from_date) params.append('from_date', filterForm.from_date);
        if (filterForm.to_date) params.append('to_date', filterForm.to_date);

        const url = type === 'pdf'
            ? `/transaksi/permintaan-export/pdf?${params.toString()}`
            : `/transaksi/permintaan-export/excel?${params.toString()}`;

        window.location.href = url;
    };

    const handleRefresh = () => {
        router.reload({
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Permintaan ATK" />

            <div className="flex flex-col lg:flex-row h-full flex-1 gap-4 lg:gap-6 p-3 sm:p-6">
                {/* Filter Sidebar */}
                <Card className="w-full lg:w-80 h-fit lg:sticky lg:top-6">
                    <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
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
                        <div className="space-y-3">
                            <Label className="text-xs font-bold text-gray-600">
                                TANGGAL PERMINTAAN
                            </Label>
                            
                            {/* Dari Tanggal */}
                            <div className="space-y-1">
                                <p className="text-xs text-gray-600 font-medium">Dari Tanggal</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Hari</p>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="31"
                                            placeholder="01"
                                            value={fromDateParts.day}
                                            onChange={(e) => {
                                                const newVal = e.target.value;
                                                setFromDateParts({ ...fromDateParts, day: newVal });
                                                const isoDate = formatDateToISO(fromDateParts.year, fromDateParts.month, newVal);
                                                setFilterForm({ ...filterForm, from_date: isoDate });
                                            }}
                                            className="text-center text-sm"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Bulan</p>
                                        <Select
                                            value={fromDateParts.month}
                                            onValueChange={(value) => {
                                                setFromDateParts({ ...fromDateParts, month: value });
                                                const isoDate = formatDateToISO(fromDateParts.year, value, fromDateParts.day);
                                                setFilterForm({ ...filterForm, from_date: isoDate });
                                            }}
                                        >
                                            <SelectTrigger className="text-sm">
                                                <SelectValue placeholder="Bln" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {months.map((m) => (
                                                    <SelectItem key={m.value} value={m.value}>
                                                        {m.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Tahun</p>
                                        <Select
                                            value={fromDateParts.year}
                                            onValueChange={(value) => {
                                                setFromDateParts({ ...fromDateParts, year: value });
                                                const isoDate = formatDateToISO(value, fromDateParts.month, fromDateParts.day);
                                                setFilterForm({ ...filterForm, from_date: isoDate });
                                            }}
                                        >
                                            <SelectTrigger className="text-sm">
                                                <SelectValue placeholder="Thn" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {years.map((y) => (
                                                    <SelectItem key={y} value={y.toString()}>
                                                        {y}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Sampai Tanggal */}
                            <div className="space-y-1">
                                <p className="text-xs text-gray-600 font-medium">Sampai Tanggal</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Hari</p>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="31"
                                            placeholder="31"
                                            value={toDateParts.day}
                                            onChange={(e) => {
                                                const newVal = e.target.value;
                                                setToDateParts({ ...toDateParts, day: newVal });
                                                const isoDate = formatDateToISO(toDateParts.year, toDateParts.month, newVal);
                                                setFilterForm({ ...filterForm, to_date: isoDate });
                                            }}
                                            className="text-center text-sm"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Bulan</p>
                                        <Select
                                            value={toDateParts.month}
                                            onValueChange={(value) => {
                                                setToDateParts({ ...toDateParts, month: value });
                                                const isoDate = formatDateToISO(toDateParts.year, value, toDateParts.day);
                                                setFilterForm({ ...filterForm, to_date: isoDate });
                                            }}
                                        >
                                            <SelectTrigger className="text-sm">
                                                <SelectValue placeholder="Bln" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {months.map((m) => (
                                                    <SelectItem key={m.value} value={m.value}>
                                                        {m.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Tahun</p>
                                        <Select
                                            value={toDateParts.year}
                                            onValueChange={(value) => {
                                                setToDateParts({ ...toDateParts, year: value });
                                                const isoDate = formatDateToISO(value, toDateParts.month, toDateParts.day);
                                                setFilterForm({ ...filterForm, to_date: isoDate });
                                            }}
                                        >
                                            <SelectTrigger className="text-sm">
                                                <SelectValue placeholder="Thn" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {years.map((y) => (
                                                    <SelectItem key={y} value={y.toString()}>
                                                        {y}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
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
                <div className="flex-1 space-y-4 lg:space-y-6">
                    {/* Page Header */}
                    <div className="space-y-2">
                        <div className="flex flex-col lg:flex-row items-start justify-between gap-3">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">Daftar Permintaan ATK</h1>
                                <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                                    Kelola, verifikasi, dan pantau status permintaan dari unit kerja.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExport('pdf')}
                                    className="flex-1 sm:flex-none"
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    PDF
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleExport('excel')}
                                    className="flex-1 sm:flex-none"
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Excel
                                </Button>
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
                                    <Link href={permintaanCreate()}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">Input Permintaan Baru</span>
                                        <span className="sm:hidden">Baru</span>
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
                            <div className="border rounded-lg overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="font-bold">ID PERMINTAAN</TableHead>
                                            <TableHead className="font-bold">TANGGAL</TableHead>
                                            <TableHead className="font-bold">UNIT KERJA</TableHead>
                                            <TableHead className="font-bold text-center">
                                                JML ITEM
                                            </TableHead>
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
                                                        {transaction.ruangan_nama || '-'}
                                                    </TableCell>
                                                    <TableCell className="text-center font-semibold">
                                                        {transaction.items?.length || 0}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                                                                onClick={handleRefresh}
                                                                title="Refresh Data"
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
