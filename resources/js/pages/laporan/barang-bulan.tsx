import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, ChevronRight, Calendar, Package, FileText, Download } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AutocompleteInput } from '@/components/autocomplete-input';
import { useNameHistory } from '@/hooks/useNameHistory';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

interface Barang {
    id: number;
    kode: string;
    nama: string;
    satuan: string;
    stok: number;
}

interface Props {
    barang: Barang;
}

const MONTHS = [
    { number: 1,  name: 'Januari',   short: 'Jan' },
    { number: 2,  name: 'Februari',  short: 'Feb' },
    { number: 3,  name: 'Maret',     short: 'Mar' },
    { number: 4,  name: 'April',     short: 'Apr' },
    { number: 5,  name: 'Mei',       short: 'Mei' },
    { number: 6,  name: 'Juni',      short: 'Jun' },
    { number: 7,  name: 'Juli',      short: 'Jul' },
    { number: 8,  name: 'Agustus',   short: 'Agu' },
    { number: 9,  name: 'September', short: 'Sep' },
    { number: 10, name: 'Oktober',   short: 'Okt' },
    { number: 11, name: 'November',  short: 'Nov' },
    { number: 12, name: 'Desember',  short: 'Des' },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i);

export default function BarangBulan({ barang }: Props) {
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [showExportAllDialog, setShowExportAllDialog] = useState(false);
    
    // Form data untuk export all
    const [exportYear, setExportYear] = useState(currentYear.toString());
    const [signaturePlaceDate, setSignaturePlaceDate] = useState(() => {
        const d = new Date();
        return 'Jakarta, ' + d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    });
    const [namaPpk, setNamaPpk] = useState('');
    const [namaMengetahui, setNamaMengetahui] = useState('');
    const [namaPjawab, setNamaPjawab] = useState('');

    // History untuk autocomplete nama
    const ppkHistory = useNameHistory('laporan_ppk_history');
    const mengetahuiHistory = useNameHistory('laporan_mengetahui_history');
    const pjawabHistory = useNameHistory('laporan_pjawab_history');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Laporan Inventaris', href: '/laporan/inventaris' },
        { title: barang.nama, href: '#' },
    ];

    const handleNavigate = (month: number) => {
        router.visit(`/laporan/barang/${barang.id}/bulan/${month}/${selectedYear}`);
    };

    const handleExportAll = () => {
        setExportYear(selectedYear); // Set export year sesuai tahun yang sedang dipilih
        setShowExportAllDialog(true);
    };

    const handleConfirmExportAll = () => {
        // Simpan nama ke history
        if (namaPpk.trim()) ppkHistory.addToHistory(namaPpk);
        if (namaMengetahui.trim()) mengetahuiHistory.addToHistory(namaMengetahui);
        if (namaPjawab.trim()) pjawabHistory.addToHistory(namaPjawab);

        const params = new URLSearchParams({
            year: exportYear,
            signature_place_date: signaturePlaceDate,
            nama_ppk: namaPpk,
            nama_mengetahui: namaMengetahui,
            nama_pjawab: namaPjawab,
        });
        window.open(`/laporan/barang/${barang.id}/export-pdf-all?${params.toString()}`, '_blank');
        setShowExportAllDialog(false);
    };

    const currentMonth = new Date().getMonth() + 1;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Laporan ${barang.nama}`} />

            {/* Dialog Export All */}
            <Dialog open={showExportAllDialog} onOpenChange={setShowExportAllDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="size-5 text-blue-600" />
                            Export PDF — Semua Bulan
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Pilih Tahun
                            </Label>
                            <Select value={exportYear} onValueChange={setExportYear}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {YEARS.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tempat &amp; Tanggal
                            </Label>
                            <Input
                                value={signaturePlaceDate}
                                onChange={(e) => setSignaturePlaceDate(e.target.value)}
                                placeholder="Jakarta, 10 Maret 2026"
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
                            Akan mengunduh <strong>1 file PDF</strong> berisi semua bulan di tahun <strong>{exportYear}</strong> (12 bulan).
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowExportAllDialog(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleConfirmExportAll} className="bg-blue-600 hover:bg-blue-700">
                            <FileText className="mr-2 size-4" />
                            Export PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <Link href="/laporan/inventaris">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="size-4" />
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Package className="size-5 text-blue-600" />
                            <h1 className="text-2xl font-bold tracking-tight">{barang.nama}</h1>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Kode: <span className="font-mono font-medium text-gray-700">{barang.kode}</span>
                            &ensp;·&ensp;
                            Satuan: <span className="font-medium text-gray-700">{barang.satuan}</span>
                            &ensp;·&ensp;
                            Saldo Saat Ini: <span className="font-semibold text-blue-600">{barang.stok}</span>
                        </p>
                    </div>
                    <Button
                        onClick={handleExportAll}
                        className="bg-blue-600 hover:bg-blue-700 gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Export All Months
                    </Button>
                </div>

                {/* Year Selector */}
                <Card className="border-blue-100 bg-blue-50/40">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <Calendar className="size-5 text-blue-600 shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-700">Pilih Tahun Laporan</p>
                                <p className="text-xs text-muted-foreground">Kemudian klik bulan untuk melihat detail distribusi</p>
                            </div>
                            <div className="ml-auto w-36">
                                <Label className="sr-only">Tahun</Label>
                                <Select value={selectedYear} onValueChange={setSelectedYear}>
                                    <SelectTrigger className="bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {YEARS.map((year) => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Month Grid */}
                <div>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                        Pilih Bulan — Tahun {selectedYear}
                    </h2>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                        {MONTHS.map((month) => {
                            const isCurrent =
                                Number.parseInt(selectedYear) === currentYear && month.number === currentMonth;

                            return (
                                <Card
                                    key={month.number}
                                    className={`cursor-pointer transition-all hover:shadow-md hover:scale-105 group ${
                                        isCurrent
                                            ? 'border-blue-500 bg-blue-600 text-white shadow-md'
                                            : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                                    }`}
                                    onClick={() => handleNavigate(month.number)}
                                >
                                    <CardContent className="p-4 flex flex-col items-center gap-2">
                                        <span
                                            className={`text-lg font-bold uppercase tracking-wide ${
                                                isCurrent ? 'text-white' : 'text-gray-700 group-hover:text-blue-600'
                                            }`}
                                        >
                                            {month.name}
                                        </span>
                                        <div
                                            className={`flex items-center gap-1 text-xs ${
                                                isCurrent ? 'text-blue-200' : 'text-muted-foreground'
                                            }`}
                                        >
                                            <ChevronRight className="size-3" />
                                            <span>Lihat</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Info */}
                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-gray-50 rounded-lg p-3 border">
                    <span>ℹ️</span>
                    <p>
                        Klik pada bulan yang tersedia untuk melihat detail distribusi barang{' '}
                        <strong>{barang.nama}</strong>. Halaman detail menampilkan daftar ruangan
                        beserta tanggal pengambilan dan dapat diekspor ke PDF.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
