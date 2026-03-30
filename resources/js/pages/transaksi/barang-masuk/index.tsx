import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Eye, TrendingUp, FileText } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { AutocompleteInput } from '@/components/autocomplete-input';
import { useNameHistory } from '@/hooks/useNameHistory';
import AppLayout from '@/layouts/app-layout';
import { barangMasukIndex, barangMasukCreate, barangMasukShow } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { IncomingStock, PaginatedData, BreadcrumbItem, ColumnDef, SharedData } from '@/types';

interface GroupedIncomingStock extends IncomingStock { total_items: number; total_jumlah: number; nomor_faktur: string | null; nomor_surat_jalan: string | null; } interface BarangMasukIndexProps {
    incomingStocks: PaginatedData<GroupedIncomingStock>; availableYears: number[];
    filters: {
        search?: string; year?: string; month?: string;
    };
}

export default function BarangMasukIndex({ incomingStocks, availableYears, filters }: BarangMasukIndexProps) {
    const [search, setSearch] = useState(filters.search || ''); const [year, setYear] = useState(filters.year || ''); const [month, setMonth] = useState(filters.month || '');
    const { auth } = usePage<SharedData>().props;
    const userRole = auth?.user?.role;

    const [showExportDialog, setShowExportDialog] = useState(false);
    const [signaturePlaceDate, setSignaturePlaceDate] = useState(() => {
        const d = new Date();
        return 'Jakarta, ' + d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    });
    const [namaPpk, setNamaPpk] = useState('');
    const [namaMengetahui, setNamaMengetahui] = useState('');
    const [namaPjawab, setNamaPjawab] = useState('');

    const ppkHistory = useNameHistory('laporan_ppk_history');
    const mengetahuiHistory = useNameHistory('laporan_mengetahui_history');
    const pjawabHistory = useNameHistory('laporan_pjawab_history');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Barang Masuk', href: barangMasukIndex() },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(barangMasukIndex(), { search, year, month }, { preserveState: true });
    };

    const handlePrint = () => {
        setShowExportDialog(true);
    };

    const handleConfirmExport = () => {
        if (namaPpk.trim()) ppkHistory.addToHistory(namaPpk);
        if (namaMengetahui.trim()) mengetahuiHistory.addToHistory(namaMengetahui);
        if (namaPjawab.trim()) pjawabHistory.addToHistory(namaPjawab);

        const params = new URLSearchParams();
        if (year) params.append('year', year);
        if (month) params.append('month', month);
        if (search) params.append('search', search);

        params.append('signature_place_date', signaturePlaceDate);
        params.append('nama_ppk', namaPpk);
        params.append('nama_mengetahui', namaMengetahui);
        params.append('nama_pjawab', namaPjawab);

        window.open(`/stok/barang-masuk/export?` + params.toString(), '_blank');
        setShowExportDialog(false);
    };

    const columns: ColumnDef<GroupedIncomingStock>[] = [
        {
            key: 'kode_barang_masuk',
            label: 'Transaksi',
            render: (stock) => (
                <div>
                    <p className="font-medium text-blue-600">{stock.kode_barang_masuk}</p>    
                    <p className="text-xs text-muted-foreground">
                        {new Date(stock.tanggal_masuk).toLocaleDateString('id-ID')}
                    </p>
                </div>
            ),
        },
        {
            key: 'referensi',
            label: 'Referensi',
            render: (stock) => (
                <div className="text-sm">
                    {stock.nomor_dokumen && <div>Ref: {stock.nomor_dokumen}</div>}
                    {stock.nomor_faktur && <div>Faktur: {stock.nomor_faktur}</div>}
                    {stock.nomor_surat_jalan && <div>SJ: {stock.nomor_surat_jalan}</div>}
                    {!stock.nomor_dokumen && !stock.nomor_faktur && !stock.nomor_surat_jalan && '-'}
                </div>
            ),
        },
        {
            key: 'jumlah',
            label: 'Item / Qty',
            render: (stock) => (
                <div className="flex items-center gap-1">
                    <TrendingUp className="size-4 text-green-600" />
                    <div>
                        <p className="font-semibold text-green-600">+{stock.total_jumlah} unit</p>
                        <p className="text-xs text-muted-foreground">{stock.total_items} jenis barang</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'sumber',
            label: 'Supplier/Sumber',
            render: (stock) => (
                <p className="text-sm">{stock.sumber || '-'}</p>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            render: (stock) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                        <Link href={barangMasukShow(stock.id)}>
                            <Eye className="size-4 mr-1" />
                            Detail
                        </Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Barang Masuk" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Barang Masuk</h1>
                        <p className="text-muted-foreground">
                            Kelola transaksi barang masuk ke gudang
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={barangMasukCreate()}>
                            <Plus className="mr-2 size-4" />
                            Tambah Barang Masuk
                        </Link>
                    </Button>
                </div>

                {/* Search */}
                                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-2">
                    <div className="flex-1 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Cari kode atau referensi..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select 
                            value={year} 
                            onChange={(e) => { setYear(e.target.value); setTimeout(() => document.getElementById('btnCari')?.click(), 0); }}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Semua Tahun</option>
                            {availableYears.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <select 
                            value={month} 
                            onChange={(e) => { setMonth(e.target.value); setTimeout(() => document.getElementById('btnCari')?.click(), 0); }}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Bulan</option>
                            {Array.from({length: 12}).map((_, i) => (
                                <option key={i+1} value={i+1}>{new Date(2000, i).toLocaleString('id-ID', { month: 'long' })}</option>
                            ))}
                        </select>
                        <Button id="btnCari" type="submit">Cari</Button>
                        <Button type="button" variant="outline" onClick={handlePrint} className="gap-2">
                            {/* Adding a dynamic lucide icon or SVG can be done here, we just use text for now or you can import Printer */}
                            Print Report
                        </Button>
                    </div>
                </form>

                {/* Data Table */}
                <DataTable<GroupedIncomingStock> data={incomingStocks.data} columns={columns} />

                {/* Pagination */}
                {incomingStocks.data.length > 0 && (
                    <Pagination
                        meta={incomingStocks.meta}
                        onPageChange={(page) => {
                            router.get(barangMasukIndex(), { ...filters, page });
                        }}
                    />
                )}
            </div>

            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="size-5 text-blue-600" />
                            Export PDF — Laporan Barang Masuk
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
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
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleConfirmExport} className="bg-blue-600 hover:bg-blue-700">
                            <FileText className="mr-2 size-4" />
                            Export PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </AppLayout>
    );
}




