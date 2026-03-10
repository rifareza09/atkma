import { Head, Link } from '@inertiajs/react';
import { Eye, FileText, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AutocompleteInput } from '@/components/autocomplete-input';
import { useNameHistory } from '@/hooks/useNameHistory';
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
import type { Barang, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Laporan', href: '#' },
    { title: 'Laporan Inventaris', href: '/laporan/inventaris' },
];

interface LaporanInventarisProps {
    barangs?: Barang[];
}

export default function LaporanInventaris({
    barangs = [],
}: LaporanInventarisProps) {
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
    const [judulLaporan, setJudulLaporan]           = useState('DAFTAR PERMINTAAN BARANG ATK');
    const [signaturePlaceDate, setSignaturePlaceDate] = useState(() => {
        const d = new Date();
        return 'Jakarta, ' + d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    });
    const [namaPpk, setNamaPpk]                   = useState('');
    const [namaMengetahui, setNamaMengetahui]     = useState('');
    const [namaPjawab, setNamaPjawab]             = useState('');

    // History untuk autocomplete nama
    const ppkHistory = useNameHistory('laporan_ppk_history');
    const mengetahuiHistory = useNameHistory('laporan_mengetahui_history');
    const pjawabHistory = useNameHistory('laporan_pjawab_history');

    const handleOpenExportDialog = () => {
        if (selectedIds.size === 0) return;
        setShowExportDialog(true);
    };

    const handleConfirmExportSelected = () => {
        // Simpan nama ke history
        if (namaPpk.trim()) ppkHistory.addToHistory(namaPpk);
        if (namaMengetahui.trim()) mengetahuiHistory.addToHistory(namaMengetahui);
        if (namaPjawab.trim()) pjawabHistory.addToHistory(namaPjawab);

        const params = new URLSearchParams({
            month:                exportMonth,
            year:                 exportYear,
            judul_laporan:        judulLaporan,
            signature_place_date: signaturePlaceDate,
            nama_ppk:             namaPpk,
            nama_mengetahui:      namaMengetahui,
            nama_pjawab:          namaPjawab,
        });
        selectedIds.forEach((id) => params.append('ids[]', String(id)));
        window.open(`/laporan/barang/export-pdf-bulk?${params.toString()}`, '_blank');
        setShowExportDialog(false);
    };

    const handleExportExcel = () => {
        window.open('/reports/inventory/excel', '_blank');
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

                        {/* Judul & Tanda Tangan */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Judul Laporan
                            </Label>
                            <Input
                                value={judulLaporan}
                                onChange={(e) => setJudulLaporan(e.target.value)}
                                placeholder="DAFTAR PERMINTAAN BARANG ATK"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tempat &amp; Tanggal
                            </Label>
                            <Input
                                value={signaturePlaceDate}
                                onChange={(e) => setSignaturePlaceDate(e.target.value)}
                                placeholder="Jakarta, 9 Maret 2026"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                PPK Biaya Proses
                            </Label>
                            <AutocompleteInput
                                value={namaPpk}
                                onChange={setNamaPpk}
                                suggestions={ppkHistory.history}
                                placeholder="Nama PPK Biaya Proses"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mengetahui — Kuasa Pengelola Biaya Proses
                            </Label>
                            <AutocompleteInput
                                value={namaMengetahui}
                                onChange={setNamaMengetahui}
                                suggestions={mengetahuiHistory.history}
                                placeholder="Nama Mengetahui"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Penanggung Jawab ATK
                            </Label>
                            <AutocompleteInput
                                value={namaPjawab}
                                onChange={setNamaPjawab}
                                suggestions={pjawabHistory.history}
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

            <div className="space-y-6 p-6">
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
        </AppLayout>
    );
}
