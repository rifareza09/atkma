import { Head, Link, router } from '@inertiajs/react';
import { History, Filter, FileDown, FileSpreadsheet, X, Package, Users, CalendarDays, ArrowUp, ArrowDown, Pencil, Trash2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { historyIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'History Transaksi', href: historyIndex() },
];

const MONTHS = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

interface TransactionItem {
    nama_barang: string;
    kode_barang: string;
    satuan: string;
    jumlah: number;
}

interface TransactionRow {
    id: number;
    kode_transaksi: string;
    tanggal: string;
    ruangan_nama: string;
    nama_peminta: string;
    status: string;
    items: TransactionItem[];
}

interface RuanganOption {
    id: number;
    nama: string;
    kode: string;
}

interface HistoryIndexProps {
    transactions: TransactionRow[];
    ruangans: RuanganOption[];
    available_years: number[];
    filters: {
        tanggal?: string;
        bulan?: string;
        tahun?: string;
        ruangan_id?: string;
        sort?: string;
    };
}

export default function HistoryIndex({
    transactions,
    ruangans,
    available_years,
    filters,
}: HistoryIndexProps) {
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = String(new Date().getMonth() + 1);

    const [form, setForm] = useState({
        tanggal:    filters.tanggal    ?? '',
        bulan:      filters.bulan      ?? currentMonth,
        tahun:      filters.tahun      ?? currentYear,
        ruangan_id: filters.ruangan_id ?? 'all',
    });

    const [sort, setSort] = useState<'asc' | 'desc'>(filters.sort === 'desc' ? 'desc' : 'asc');

    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const allIds = transactions.map((t) => t.id);
    const isAllSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));

    const toggleSelectAll = () => {
        if (isAllSelected) setSelectedIds(new Set());
        else setSelectedIds(new Set(allIds));
    };

    const toggleId = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setDeletingId(id);
        router.delete(`/transaksi/permintaan/${id}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeletingId(null);
                setConfirmDeleteId(null);
            },
        });
    };

    const applyFilters = (overrideSort?: 'asc' | 'desc') => {
        const params: Record<string, string> = {};
        if (form.tanggal) {
            params.tanggal = form.tanggal;
        } else {
            if (form.bulan && form.bulan !== 'all') params.bulan = form.bulan;
            if (form.tahun && form.tahun !== 'all') params.tahun = form.tahun;
        }
        if (form.ruangan_id !== 'all') params.ruangan_id = form.ruangan_id;
        const activeSort = overrideSort ?? sort;
        if (activeSort === 'desc') params.sort = 'desc';
        router.get(historyIndex(), params, { preserveState: true, preserveScroll: true });
    };

    const toggleSort = () => {
        const newSort = sort === 'asc' ? 'desc' : 'asc';
        setSort(newSort);
        applyFilters(newSort);
    };

    const resetFilters = () => {
        const defaults = { tanggal: '', bulan: currentMonth, tahun: currentYear, ruangan_id: 'all' };
        setForm(defaults);
        setSort('asc');
        router.get(historyIndex(), { bulan: currentMonth, tahun: currentYear }, { preserveState: true, preserveScroll: true });
    };

    const handleExportPdf = () => {
        const params = new URLSearchParams();
        if (selectedIds.size > 0) {
            selectedIds.forEach((id) => params.append('ids[]', String(id)));
        } else {
            if (form.tanggal) {
                params.set('tanggal', form.tanggal);
            } else {
                if (form.bulan && form.bulan !== 'all') params.set('bulan', form.bulan);
                if (form.tahun && form.tahun !== 'all') params.set('tahun', form.tahun);
            }
            if (form.ruangan_id !== 'all') params.set('ruangan_id', form.ruangan_id);
        }
        window.open(`/history/export-pdf?${params.toString()}`, '_blank');
    };

    const handleExportExcel = () => {
        const params = new URLSearchParams();
        if (form.tanggal) {
            params.set('tanggal', form.tanggal);
        } else {
            if (form.bulan && form.bulan !== 'all') params.set('bulan', form.bulan);
            if (form.tahun && form.tahun !== 'all') params.set('tahun', form.tahun);
        }
        if (form.ruangan_id !== 'all') params.set('ruangan_id', form.ruangan_id);
        window.open(`/history/export-excel?${params.toString()}`, '_blank');
    };

    const totalItems = transactions.reduce((sum, t) => sum + t.items.reduce((s, i) => s + i.jumlah, 0), 0);
    const uniqueRuangan = new Set(transactions.map((t) => t.ruangan_nama)).size;

    const hasActiveFilter =
        form.tanggal !== '' ||
        form.bulan !== currentMonth ||
        form.tahun !== currentYear ||
        form.ruangan_id !== 'all';

    // Bangun baris tabel: flat per transaksi DB, pemisah bulan, nomor reset per bulan
    const MONTH_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const tableRows: React.ReactNode[] = [];
    let prevMonthKey = '';
    let monthCounter = 0;

    transactions.forEach((trx, tIdx) => {
        const isSelected = selectedIds.has(trx.id);
        const parts = trx.tanggal.split('/'); // ['dd','mm','YYYY']
        const thisMonthKey = parts.length === 3 ? `${parts[1]}/${parts[2]}` : trx.tanggal;

        if (thisMonthKey !== prevMonthKey) {
            prevMonthKey = thisMonthKey;
            monthCounter = 0;
            const monthNum = parts.length === 3 ? parseInt(parts[1]) - 1 : -1;
            const monthLabel = monthNum >= 0 ? `${MONTH_ID[monthNum]} ${parts[2]}` : thisMonthKey;
            tableRows.push(
                <TableRow key={`month-${thisMonthKey}-${tIdx}`} className="bg-muted/60 hover:bg-muted/60 border-0">
                    <TableCell colSpan={9} className="py-2 px-4">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            📅 {monthLabel}
                        </span>
                    </TableCell>
                </TableRow>
            );
        }
        monthCounter += 1;
        const trxNo = monthCounter;
        const rowCount = Math.max(trx.items.length, 1);

        const aksiCell = (
            <TableCell key={`aksi-${trx.id}`} rowSpan={rowCount} className="align-top pt-2">
                <div className="flex flex-col gap-1 items-start">
                    <Link href={`/transaksi/permintaan/${trx.id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:bg-blue-50">
                            <Pencil className="size-3.5" />
                        </Button>
                    </Link>
                    {confirmDeleteId === trx.id ? (
                        <div className="flex flex-col gap-1">
                            <Button variant="destructive" size="sm" className="h-7 text-xs px-2"
                                disabled={deletingId === trx.id} onClick={() => handleDelete(trx.id)}>
                                {deletingId === trx.id ? '...' : 'Hapus'}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs px-2"
                                onClick={() => setConfirmDeleteId(null)}>
                                Batal
                            </Button>
                        </div>
                    ) : (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-red-50"
                            onClick={() => setConfirmDeleteId(trx.id)}>
                            <Trash2 className="size-3.5" />
                        </Button>
                    )}
                </div>
            </TableCell>
        );

        if (trx.items.length === 0) {
            tableRows.push(
                <TableRow key={`trx-${trx.id}`}>
                    <TableCell><Checkbox checked={isSelected} onCheckedChange={() => toggleId(trx.id)} /></TableCell>
                    <TableCell className="text-center text-sm font-semibold">{trxNo}</TableCell>
                    <TableCell className="text-sm">{trx.tanggal}</TableCell>
                    <TableCell className="font-medium">{trx.ruangan_nama}</TableCell>
                    <TableCell colSpan={4} className="text-muted-foreground italic text-xs">Tidak ada item</TableCell>
                    {aksiCell}
                </TableRow>
            );
        } else {
            trx.items.forEach((item, itemIdx) => {
                tableRows.push(
                    <TableRow key={`trx-${trx.id}-i${itemIdx}`} className="hover:bg-muted/30">
                        {itemIdx === 0 && (
                            <>
                                <TableCell rowSpan={rowCount} className="align-top pt-3">
                                    <Checkbox checked={isSelected} onCheckedChange={() => toggleId(trx.id)} />
                                </TableCell>
                                <TableCell rowSpan={rowCount} className="text-center text-sm font-semibold align-top pt-3">{trxNo}</TableCell>
                                <TableCell rowSpan={rowCount} className="align-top pt-3 text-sm">{trx.tanggal}</TableCell>
                                <TableCell rowSpan={rowCount} className="align-top pt-3 font-medium">{trx.ruangan_nama}</TableCell>
                            </>
                        )}
                        <TableCell className="text-center text-xs text-muted-foreground">{itemIdx + 1}</TableCell>
                        <TableCell>{item.nama_barang}</TableCell>
                        <TableCell className="text-right font-semibold">{item.jumlah}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">{item.satuan}</TableCell>
                        {itemIdx === 0 && aksiCell}
                    </TableRow>
                );
            });
        }
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="History Transaksi" />

            <div className="space-y-6 p-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <History className="size-7 text-blue-600" />
                            History Transaksi
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Riwayat semua transaksi permintaan barang keluar
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleExportPdf}
                            disabled={transactions.length === 0}
                            className={`gap-2${selectedIds.size > 0 ? ' bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                        >
                            <FileDown className="size-4" />
                            {selectedIds.size > 0
                                ? `Export Terpilih (${selectedIds.size})`
                                : 'Export PDF'}
                        </Button>
                        <Button
                            onClick={handleExportExcel}
                            disabled={transactions.length === 0}
                            variant="outline"
                            className="gap-2"
                        >
                            <FileSpreadsheet className="size-4" />
                            Export Excel
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <History className="size-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{transactions.length}</p>
                                    <p className="text-xs text-muted-foreground">Total Transaksi</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                    <Package className="size-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{totalItems.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">Total Item Diminta</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                                    <Users className="size-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{uniqueRuangan}</p>
                                    <p className="text-xs text-muted-foreground">Ruangan Aktif</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Filter className="size-4" />
                            Filter Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">

                            {/* Tanggal spesifik */}
                            <div className="space-y-1">
                                <Label className="text-xs">Tanggal Spesifik</Label>
                                <Input
                                    type="date"
                                    value={form.tanggal}
                                    onChange={(e) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            tanggal: e.target.value,
                                            bulan: e.target.value ? 'all' : currentMonth,
                                            tahun: e.target.value ? 'all' : currentYear,
                                        }));
                                    }}
                                    className="h-9 text-sm"
                                />
                            </div>

                            {/* Bulan */}
                            <div className="space-y-1">
                                <Label className="text-xs">Bulan</Label>
                                <Select
                                    value={form.bulan}
                                    onValueChange={(v) => setForm((p) => ({ ...p, bulan: v, tanggal: '' }))}
                                >
                                    <SelectTrigger className="h-9 text-sm">
                                        <SelectValue placeholder="Semua Bulan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Bulan</SelectItem>
                                        {MONTHS.map((m) => (
                                            <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tahun */}
                            <div className="space-y-1">
                                <Label className="text-xs">Tahun</Label>
                                <Select
                                    value={form.tahun}
                                    onValueChange={(v) => setForm((p) => ({ ...p, tahun: v, tanggal: '' }))}
                                >
                                    <SelectTrigger className="h-9 text-sm">
                                        <SelectValue placeholder="Semua Tahun" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Tahun</SelectItem>
                                        {available_years.map((y) => (
                                            <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Ruangan */}
                            <div className="space-y-1">
                                <Label className="text-xs">Ruangan / Unit Kerja</Label>
                                <Select
                                    value={form.ruangan_id}
                                    onValueChange={(v) => setForm((p) => ({ ...p, ruangan_id: v }))}
                                >
                                    <SelectTrigger className="h-9 text-sm">
                                        <SelectValue placeholder="Semua Ruangan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Ruangan</SelectItem>
                                        {ruangans.map((r) => (
                                            <SelectItem key={r.id} value={String(r.id)}>
                                                {r.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-2">
                                <Button onClick={() => applyFilters()} size="sm" className="h-9 flex-1">
                                    <Filter className="size-3 mr-1" />
                                    Terapkan
                                </Button>
                                {hasActiveFilter && (
                                    <Button onClick={resetFilters} size="sm" variant="outline" className="h-9">
                                        <X className="size-3" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <CalendarDays className="size-5" />
                            Riwayat Transaksi
                            <Badge variant="secondary" className="ml-1">
                                {transactions.length} transaksi
                            </Badge>
                        </CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-xs h-8"
                            onClick={toggleSort}
                        >
                            {sort === 'desc' ? (
                                <><ArrowDown className="size-3.5" /> Terbaru dulu</>
                            ) : (
                                <><ArrowUp className="size-3.5" /> Terlama dulu</>
                            )}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {transactions.length === 0 ? (
                            <p className="py-12 text-center text-sm text-muted-foreground">
                                Tidak ada transaksi untuk filter yang dipilih.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-10">
                                                <Checkbox
                                                    checked={isAllSelected}
                                                    onCheckedChange={toggleSelectAll}
                                                />
                                            </TableHead>
                                            <TableHead className="w-16 text-center">Transaksi</TableHead>
                                            <TableHead className="w-28">Tanggal</TableHead>
                                            <TableHead className="w-44">Ruangan / Unit Kerja</TableHead>
                                            <TableHead className="w-8 text-center text-muted-foreground">No.</TableHead>
                                            <TableHead>Nama Barang</TableHead>
                                            <TableHead className="text-right w-24">Jumlah</TableHead>
                                            <TableHead className="w-20">Satuan</TableHead>
                                            <TableHead className="w-24">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tableRows}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}
