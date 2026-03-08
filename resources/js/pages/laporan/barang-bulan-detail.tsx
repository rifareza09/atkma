import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowLeft,
    Building2,
    Calendar,
    FileText,
    Package,
    TrendingDown,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const MONTH_NAMES = [
    '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

interface BarangInfo {
    id: number;
    kode: string;
    nama: string;
    satuan: string;
    stok: number;
}

interface TransactionRow {
    tanggal: string;
    jumlah: number;
    keterangan: string;
}

interface RuanganGroup {
    ruangan: string;
    rows: TransactionRow[];
    subtotal: number;
}

interface Props {
    barang: BarangInfo;
    ruangans: RuanganGroup[];
    grand_total: number;
    month: number;
    year: number;
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function formatDateShort(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function BarangBulanDetail({ barang, ruangans, grand_total, month, year }: Props) {
    const monthName = MONTH_NAMES[month] ?? '-';

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Laporan Inventaris', href: '/laporan/inventaris' },
        { title: barang.nama, href: `/laporan/barang/${barang.id}/bulan` },
        { title: `${monthName} ${year}`, href: '#' },
    ];

    const [showDialog, setShowDialog] = useState(false);
    const [signaturePlaceDate, setSignaturePlaceDate] = useState(() => {
        const d = new Date();
        return 'Jakarta, ' + d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    });
    const [namaPpk, setNamaPpk] = useState('');
    const [namaMengetahui, setNamaMengetahui] = useState('');
    const [namaPjawab, setNamaPjawab] = useState('');

    const handleExportPdf = () => {
        setShowDialog(true);
    };

    const handleConfirmExport = () => {
        const params = new URLSearchParams({
            month: String(month),
            year: String(year),
            signature_place_date: signaturePlaceDate,
            nama_ppk: namaPpk,
            nama_mengetahui: namaMengetahui,
            nama_pjawab: namaPjawab,
        });
        window.open(`/laporan/barang/${barang.id}/export-pdf?${params.toString()}`, '_blank');
        setShowDialog(false);
    };

    const totalTransactions = ruangans.reduce((sum, r) => sum + r.rows.length, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${barang.nama} — ${monthName} ${year}`} />

            {/* Dialog Tanda Tangan */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="size-5 text-blue-600" />
                            Pengaturan Tanda Tangan PDF
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tempat &amp; Tanggal
                            </Label>
                            <Input
                                value={signaturePlaceDate}
                                onChange={e => setSignaturePlaceDate(e.target.value)}
                                placeholder="Jakarta, 9 Maret 2026"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                PPK Biaya Proses
                            </Label>
                            <Input
                                value={namaPpk}
                                onChange={e => setNamaPpk(e.target.value)}
                                placeholder="Nama PPK Biaya Proses"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mengetahui — Kuasa Pengelola Biaya Proses
                            </Label>
                            <Input
                                value={namaMengetahui}
                                onChange={e => setNamaMengetahui(e.target.value)}
                                placeholder="Nama Mengetahui"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Penanggung Jawab ATK
                            </Label>
                            <Input
                                value={namaPjawab}
                                onChange={e => setNamaPjawab(e.target.value)}
                                placeholder="Nama Penanggung Jawab ATK"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDialog(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleConfirmExport} className="bg-blue-600 hover:bg-blue-700">
                            <FileText className="mr-2 size-4" />
                            Export PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="space-y-6 p-6">
                {/* ── Header ── */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <Link href={`/laporan/barang/${barang.id}/bulan`}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="size-4" />
                            </Button>
                        </Link>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Package className="size-5 text-blue-600" />
                                <h1 className="text-2xl font-bold tracking-tight">{barang.nama}</h1>
                                <Badge variant="outline" className="ml-1 font-mono text-xs">
                                    {barang.kode}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="size-3.5" />
                                <span>
                                    Laporan Distribusi —{' '}
                                    <span className="font-semibold text-gray-700">
                                        {monthName} {year}
                                    </span>
                                </span>
                                <span className="text-gray-300">|</span>
                                <span>
                                    Satuan:{' '}
                                    <span className="font-medium text-gray-700">
                                        {barang.satuan.toUpperCase()}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleExportPdf}
                        className="bg-blue-600 hover:bg-blue-700 shrink-0"
                    >
                        <FileText className="mr-2 size-4" />
                        Export PDF
                    </Button>
                </div>

                {/* ── Summary Cards ── */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <Card className="border-blue-100 bg-blue-50/50">
                        <CardHeader className="pb-1 pt-4 px-4">
                            <CardTitle className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                Total Distribusi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <p className="text-3xl font-extrabold text-blue-700">
                                {grand_total}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {barang.satuan.toUpperCase()} keluar
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-1 pt-4 px-4">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Jumlah Ruangan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <p className="text-3xl font-extrabold text-gray-800">
                                {ruangans.length}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                unit / ruangan
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-1 pt-4 px-4">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Total Transaksi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <p className="text-3xl font-extrabold text-gray-800">
                                {totalTransactions}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                pengambilan
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-1 pt-4 px-4">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Saldo Saat Ini
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <p className="text-3xl font-extrabold text-gray-800">
                                {barang.stok}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {barang.satuan.toUpperCase()} tersisa
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* ── Content ── */}
                {ruangans.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
                            <TrendingDown className="size-12 text-gray-200" />
                            <p className="text-base font-semibold text-gray-500">Tidak ada distribusi</p>
                            <p className="text-sm text-muted-foreground text-center max-w-sm">
                                Tidak ditemukan pengambilan barang{' '}
                                <strong>{barang.nama}</strong> pada{' '}
                                {monthName} {year}.
                            </p>
                            <Link href={`/laporan/barang/${barang.id}/bulan`}>
                                <Button variant="outline" size="sm" className="mt-2">
                                    <ArrowLeft className="mr-2 size-3.5" />
                                    Pilih Bulan Lain
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {ruangans.map((group, idx) => (
                            <Card key={idx} className="overflow-hidden">
                                {/* Ruangan Header */}
                                <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-8 items-center justify-center rounded-full bg-white/20">
                                            <Building2 className="size-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-200">
                                                Unit / Ruangan
                                            </p>
                                            <p className="text-sm font-bold text-white">
                                                {group.ruangan}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-200">
                                            Total Diambil
                                        </p>
                                        <p className="text-xl font-extrabold text-white">
                                            {group.subtotal}{' '}
                                            <span className="text-sm font-medium text-blue-200">
                                                {barang.satuan.toUpperCase()}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Transactions Table */}
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-blue-50/60 hover:bg-blue-50/60">
                                            <TableHead className="w-10 text-center text-xs font-bold text-gray-500">
                                                No
                                            </TableHead>
                                            <TableHead className="w-52 text-xs font-bold text-gray-600">
                                                Tanggal Pengambilan
                                            </TableHead>
                                            <TableHead className="text-xs font-bold text-gray-600">
                                                Keterangan
                                            </TableHead>
                                            <TableHead className="w-28 text-center text-xs font-bold text-gray-600">
                                                Jumlah
                                            </TableHead>
                                            <TableHead className="w-20 text-center text-xs font-bold text-gray-600">
                                                Satuan
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {group.rows.map((row, rowIdx) => (
                                            <TableRow
                                                key={rowIdx}
                                                className="hover:bg-blue-50/30 transition-colors"
                                            >
                                                <TableCell className="text-center text-xs text-gray-400">
                                                    {rowIdx + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-800">
                                                            {formatDate(row.tanggal)}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatDateShort(row.tanggal)}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-700">
                                                    {row.keterangan}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-bold text-blue-700">
                                                        {row.jumlah}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center text-xs text-gray-500">
                                                    {barang.satuan.toUpperCase()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {/* Subtotal row */}
                                        <TableRow className="border-t-2 border-blue-200 bg-blue-50/40 font-semibold">
                                            <TableCell
                                                colSpan={3}
                                                className="text-right text-xs text-gray-500"
                                            >
                                                Subtotal {group.ruangan}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="inline-flex items-center justify-center rounded-full bg-blue-600 px-2.5 py-0.5 text-sm font-bold text-white">
                                                    {group.subtotal}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center text-xs font-bold text-blue-700">
                                                {barang.satuan.toUpperCase()}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Card>
                        ))}

                    </div>
                )}
            </div>
        </AppLayout>
    );
}
