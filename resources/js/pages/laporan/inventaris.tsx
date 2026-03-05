import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Eye, FileText, Download, Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
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
import type { Barang, Ruangan, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Laporan', href: '#' },
    { title: 'Laporan Inventaris', href: '/laporan/inventaris' },
];

interface LaporanInventarisProps {
    barangs?: Barang[];
    ruangans?: Ruangan[];
    filters?: {
        ruangan_id?: string;
        status?: string;
        from_date?: string;
        to_date?: string;
    };
}

export default function LaporanInventaris({
    barangs = [],
    ruangans = [],
    filters = {},
}: LaporanInventarisProps) {
    const [filterForm, setFilterForm] = useState({
        ruangan_id: filters.ruangan_id || 'all',
        status: filters.status || 'all',
        from_date: filters.from_date || '',
        to_date: filters.to_date || '',
    });

    const currentYear  = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const MONTHS = [
        { value: '1',  label: 'Januari' },
        { value: '2',  label: 'Februari' },
        { value: '3',  label: 'Maret' },
        { value: '4',  label: 'April' },
        { value: '5',  label: 'Mei' },
        { value: '6',  label: 'Juni' },
        { value: '7',  label: 'Juli' },
        { value: '8',  label: 'Agustus' },
        { value: '9',  label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];
    const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const allBarangIds = barangs.map((b) => b.id);
    const isAllSelected = allBarangIds.length > 0 && allBarangIds.every((id) => selectedIds.has(id));

    const toggleSelectAll = () => {
        if (isAllSelected) setSelectedIds(new Set());
        else setSelectedIds(new Set(allBarangIds));
    };

    const toggleId = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // Dialog export per-barang
    const [showExportDialog, setShowExportDialog] = useState(false);
    const [exportMonth, setExportMonth]           = useState(String(currentMonth));
    const [exportYear, setExportYear]             = useState(String(currentYear));
    const [namaPpk, setNamaPpk]                   = useState('');
    const [namaMengetahui, setNamaMengetahui]     = useState('');
    const [namaPjawab, setNamaPjawab]             = useState('');

    const handleOpenExportDialog = () => {
        if (selectedIds.size === 0) return;
        setShowExportDialog(true);
    };

    const handleConfirmExportSelected = () => {
        const params = new URLSearchParams({
            month:           exportMonth,
            year:            exportYear,
            nama_ppk:        namaPpk,
            nama_mengetahui: namaMengetahui,
            nama_pjawab:     namaPjawab,
        });
        selectedIds.forEach((id) => params.append('ids[]', String(id)));
        window.open(`/laporan/barang/export-pdf-bulk?${params.toString()}`, '_blank');
        setShowExportDialog(false);
    };

    const applyFilters = () => {
        const params: Record<string, any> = {};

        if (filterForm.ruangan_id !== 'all') params.ruangan_id = filterForm.ruangan_id;
        if (filterForm.status !== 'all') params.status = filterForm.status;
        if (filterForm.from_date) params.from_date = filterForm.from_date;
        if (filterForm.to_date) params.to_date = filterForm.to_date;

        router.get('/laporan/inventaris', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setFilterForm({
            ruangan_id: 'all',
            status: 'all',
            from_date: '',
            to_date: '',
        });
        router.get('/laporan/inventaris', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleExportExcel = () => {
        const params = new URLSearchParams();
        if (filterForm.ruangan_id !== 'all') params.append('ruangan_id', filterForm.ruangan_id);
        if (filterForm.status !== 'all') params.append('status', filterForm.status);
        if (filterForm.from_date) params.append('from_date', filterForm.from_date);
        if (filterForm.to_date) params.append('to_date', filterForm.to_date);
        window.open(`/reports/inventory/excel?${params.toString()}`, '_blank');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Inventaris" />

            {/* Dialog Export Barang Terpilih */}
            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="size-5 text-blue-600" />
                            Export PDF — {selectedIds.size} Barang Terpilih
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        {/* Bulan & Tahun */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Bulan
                                </Label>
                                <Select value={exportMonth} onValueChange={setExportMonth}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {MONTHS.map((m) => (
                                            <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Tahun
                                </Label>
                                <Select value={exportYear} onValueChange={setExportYear}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {YEARS.map((y) => (
                                            <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Nama Tanda Tangan */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                PPK Biaya Proses
                            </Label>
                            <Input
                                value={namaPpk}
                                onChange={(e) => setNamaPpk(e.target.value)}
                                placeholder="Nama PPK Biaya Proses"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mengetahui — Kuasa Pengelola Biaya Proses
                            </Label>
                            <Input
                                value={namaMengetahui}
                                onChange={(e) => setNamaMengetahui(e.target.value)}
                                placeholder="Nama Mengetahui"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Penanggung Jawab ATK
                            </Label>
                            <Input
                                value={namaPjawab}
                                onChange={(e) => setNamaPjawab(e.target.value)}
                                placeholder="Nama Penanggung Jawab ATK"
                            />
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Akan mengunduh <strong>1 file PDF</strong> berisi <strong>{selectedIds.size}</strong> halaman (1 barang per halaman).
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowExportDialog(false)}>Batal</Button>
                        <Button onClick={handleConfirmExportSelected} className="bg-blue-600 hover:bg-blue-700">
                            <FileText className="mr-2 size-4" />
                            Export PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
                                PERIODE LAPORAN
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

                        {/* Status Barang */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-600">STATUS BARANG</Label>
                            <Select
                                value={filterForm.status}
                                onValueChange={(value) =>
                                    setFilterForm({ ...filterForm, status: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="1">Aktif</SelectItem>
                                    <SelectItem value="0">Tidak Aktif</SelectItem>
                                    <SelectItem value="low_stock">Stok Rendah</SelectItem>
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
                                <h1 className="text-3xl font-bold">Laporan Inventaris</h1>
                                <p className="text-muted-foreground mt-1">
                                    Laporan data inventaris barang ATK dengan filter periode dan unit
                                    kerja
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {selectedIds.size > 0 && (
                                    <Button
                                        size="sm"
                                        onClick={handleOpenExportDialog}
                                        className="bg-blue-600 hover:bg-blue-700 gap-2"
                                    >
                                        <FileText className="h-4 w-4" />
                                        Export PDF Terpilih ({selectedIds.size})
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleExportExcel}
                                    className="gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Export Excel
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Barang</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{barangs.length}</div>
                                <p className="text-xs text-muted-foreground">Item terdaftar</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Barang Aktif</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {barangs.filter((b) => b.is_active).length}
                                </div>
                                <p className="text-xs text-muted-foreground">Item aktif</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Stok Rendah</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-destructive">
                                    {barangs.filter((b) => b.stok <= b.stok_minimum).length}
                                </div>
                                <p className="text-xs text-muted-foreground">Perlu restock</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Stok</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {barangs.reduce((sum, b) => sum + b.stok, 0)}
                                </div>
                                <p className="text-xs text-muted-foreground">Unit total</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Table Card */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm text-muted-foreground">
                                    Menampilkan {barangs.length} data barang
                                </p>
                            </div>

                            {/* Table */}
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="w-10">
                                                <Checkbox
                                                    checked={isAllSelected}
                                                    onCheckedChange={toggleSelectAll}
                                                />
                                            </TableHead>
                                            <TableHead className="font-bold">KODE</TableHead>
                                            <TableHead className="font-bold">NAMA BARANG</TableHead>
                                            <TableHead className="font-bold text-center">
                                                SALDO
                                            </TableHead>
                                            <TableHead className="font-bold text-center">
                                                SATUAN
                                            </TableHead>
                                            <TableHead className="font-bold text-center">AKSI</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {barangs.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="text-center py-8 text-muted-foreground"
                                                >
                                                    Tidak ada data barang
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            barangs.map((barang) => (
                                                <TableRow
                                                    key={barang.id}
                                                    className={selectedIds.has(barang.id) ? 'bg-blue-50' : ''}
                                                >
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedIds.has(barang.id)}
                                                            onCheckedChange={() => toggleId(barang.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {barang.kode}
                                                    </TableCell>
                                                    <TableCell>{barang.nama}</TableCell>
                                                    <TableCell className="text-center font-semibold">
                                                        {barang.stok}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {barang.satuan.toUpperCase()}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Link href={`/laporan/barang/${barang.id}/bulan`}>
                                                            <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                                                                <Eye className="size-3" />
                                                                Detail
                                                            </button>
                                                        </Link>
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
