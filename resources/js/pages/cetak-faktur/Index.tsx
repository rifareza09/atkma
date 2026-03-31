import { Head, Link } from '@inertiajs/react';
import { Plus, Search, Eye, TrendingUp, Trash2, Printer, Pencil, CheckSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface SimulatedFaktur {
    id: string;
    nomorFaktur: string;
    tanggalFakturSurat: string;
    supplier: string;
    totalItems: number;
    totalQty: number;
    createdAt: string;
    raw_data: any; // We store the full form data here to view/print later if needed
}

export default function CetakFakturIndex() {
    const [fakturs, setFakturs] = useState<SimulatedFaktur[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [printingFakturs, setPrintingFakturs] = useState<SimulatedFaktur[]>([]);
    const [printMode, setPrintMode] = useState<'none' | 'list' | 'batch' | 'single'>('none');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Laporan', href: '#' },
        { title: 'Cetakan Faktur', href: '/laporan/cetak-faktur' },
    ];

    useEffect(() => {
        const stored = localStorage.getItem('cetak_fakturs');
        if (stored) {
            try {
                setFakturs(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse fakturs", e);
            }
        }
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Yakin ingin menghapus riwayat faktur ini? (Hanya dihapus dari browser Anda)')) {
            const updated = fakturs.filter(f => f.id !== id);
            setFakturs(updated);
            localStorage.setItem('cetak_fakturs', JSON.stringify(updated));
            setSelectedIds(prev => prev.filter(selId => selId !== id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSelectAll = (filtered: SimulatedFaktur[]) => {
        if (selectedIds.length === filtered.length && filtered.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filtered.map(f => f.id));
        }
    };

    const handlePrintSingle = (faktur: SimulatedFaktur) => {
        setPrintingFakturs([faktur]);
        setPrintMode('single');
        setTimeout(() => {
            window.print();
            setPrintMode('none');
        }, 100);
    };

    const handlePrintMultiple = () => {
        if (selectedIds.length === 0) return;
        const toPrint = fakturs.filter(f => selectedIds.includes(f.id));
        setPrintingFakturs(toPrint);
        setPrintMode('batch');
        setTimeout(() => {
            window.print();
            setPrintMode('none');
        }, 100);
    };

    const handlePrintList = () => {
        setPrintMode('list');
        setTimeout(() => {
            window.print();
            setPrintMode('none');
        }, 100);
    };

    // Filter logic
    const filteredFakturs = fakturs.filter(faktur => {
        const d = new Date(faktur.createdAt);
        const y = d.getFullYear().toString();
        const m = (d.getMonth() + 1).toString().padStart(2, '0');

        const matchSearch = (faktur.nomorFaktur?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                            (faktur.supplier?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchYear = yearFilter ? y === yearFilter : true;
        const matchMonth = monthFilter ? m === monthFilter : true;

        return matchSearch && matchYear && matchMonth;
    });

    // Extract available years for filter
    const availableYears = Array.from(new Set(fakturs.map(f => new Date(f.createdAt).getFullYear()))).sort((a, b) => b - a);

    const formatRp = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cetak Faktur (Simulasi)" />

            <style>
                {`
                    @media print {
                        @page {
                            size: ${printMode === 'list' ? 'A4 landscape' : 'A4 portrait'};
                            margin: 0.5cm;
                        }

                        /* Reset semua parent boundaries agar support halaman lebih dari 1 */
                        html, body, #app, #app > div, main {
                            height: auto !important;
                            min-height: 100% !important;
                            max-height: none !important;
                            overflow: visible !important;
                            position: static !important;
                            display: block !important;
                            background: white !important;
                        }

                        /* Menyembunyikan seluruh UI luar dari Inertia/React saat print dokumen cetak asli */
                        ${(printMode === 'batch' || printMode === 'single') ? `
                            body * { visibility: hidden; }

                            #print-batch-faktur, #print-batch-faktur * {
                                visibility: visible;
                            }

                            #print-batch-faktur {
                                position: absolute !important;
                                left: 0;
                                top: 0;
                                right: 0;
                                width: 100%;
                                display: block !important;
                                font-family: 'Times New Roman', Times, serif;
                                font-size: 14px;
                                color: black;
                                background: white;
                                height: auto !important;
                                z-index: 9999;
                            }

                            /* Agar page break berfungsi di mode absolute (Webkit Fix) */
                            @page { margin: 1cm; }
                        ` : ''}

                        /* Kalo lagi print Tabel Report/List */
                        ${printMode === 'list' ? `
                            body * { visibility: hidden; }
                            .print-main-view, .print-main-view * { visibility: visible; }
                            .print-main-view { position: absolute !important; left: 0; top: 0; width: 100%; padding: 10px; background: white; display: block !important; height: auto !important; }
                            .no-print { display: none !important; }
                            #print-batch-faktur { display: none !important; }
                            @page { margin: 1cm; size: A4 landscape; }
                        ` : ''}

                        /* Common Print Utilities */
                        .print-page {
                            page-break-after: always !important;
                            break-after: page !important;
                            padding-top: 5px;
                            position: static !important;
                            display: block !important;
                            width: 100%;
                            height: auto !important;
                        }
                        .print-page:last-child { page-break-after: auto !important; break-after: auto !important; }
                        .print-table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
                        .print-table th, .print-table td { border: 1px solid black; padding: 4px 8px; }
                        .print-table th { text-align: center; font-weight: bold; }
                        .text-center { text-align: center; }
                        .text-right { text-align: right; }
                        .text-left { text-align: left; }
                        .font-bold { font-weight: bold; }
                        .w-full { width: 100%; }

                        /* Surat features */
                        .kop-text { white-space: pre-wrap; text-align: center; font-weight: bold; font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.2;}
                        .kepada-box { margin-left: 55%; margin-top: 20px; white-space: pre-wrap; line-height: 1.2; }
                        .faktur-no { font-weight: bold; margin-bottom: 5px; }
                        .terbilang-text { font-style: italic; font-weight: bold; margin-top: 10px;}
                        .ttd-box-right { text-align: center; width: 250px; margin-left: auto; margin-right: 0; margin-bottom: 40px;}
                        .hr-double { border-top: 3px double black; margin: 15px 0;}
                        .currency-col { display: flex; justify-content: space-between; }
                    }
                    @media screen {
                        #print-batch-faktur { display: none; }
                    }
                `}
            </style>

            <div className={`flex h-full flex-1 flex-col gap-6 p-6 print-main-view ${printMode === 'list' ? '' : 'print:hidden'}`}>
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Cetakan Faktur</h1>
                        <p className="text-muted-foreground">Kelola simulasi cetakan faktur barang masuk (tersimpan lokal)</p>
                    </div>
                    <div className="flex gap-2 no-print">
                        <Button variant="outline" onClick={handlePrintList}>
                            <Printer className="mr-2 size-4" />
                            Print Daftar Tabel
                        </Button>
                        {selectedIds.length > 0 && (
                            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={handlePrintMultiple}>
                                <Printer className="mr-2 size-4" />
                                Cetak {selectedIds.length} Dokumen Faktur
                            </Button>
                        )}
                        <Button asChild>
                            <Link href="/laporan/cetak-faktur/create">
                                <Plus className="mr-2 size-4" />
                                Tambah Faktur
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between no-print">
                    <div className="flex flex-1 items-center space-x-2">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Cari kode atau referensi..."
                                className="w-full bg-background pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 sm:w-[150px]"
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                        >
                            <option value="">Semua Tahun</option>
                            {availableYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>

                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 sm:w-[150px]"
                            value={monthFilter}
                            onChange={(e) => setMonthFilter(e.target.value)}
                        >
                            <option value="">Bulan</option>
                            <option value="01">Januari</option>
                            <option value="02">Februari</option>
                            <option value="03">Maret</option>
                            <option value="04">April</option>
                            <option value="05">Mei</option>
                            <option value="06">Juni</option>
                            <option value="07">Juli</option>
                            <option value="08">Agustus</option>
                            <option value="09">September</option>
                            <option value="10">Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Desember</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-md border bg-white">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr className="text-left font-medium text-muted-foreground">
                                <th className="p-4 py-3 w-[50px]">
                                    <Checkbox
                                        checked={filteredFakturs.length > 0 && selectedIds.length === filteredFakturs.length}
                                        onCheckedChange={() => toggleSelectAll(filteredFakturs)}
                                    />
                                </th>
                                <th className="p-4 py-3">Transaksi (Simulasi)</th>
                                <th className="p-4 py-3">Referensi</th>
                                <th className="p-4 py-3">Item / Qty</th>
                                <th className="p-4 py-3">Supplier/Sumber</th>
                                <th className="p-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFakturs.length > 0 ? (
                                filteredFakturs.map((faktur) => (
                                    <tr key={faktur.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4">
                                            <Checkbox
                                                checked={selectedIds.includes(faktur.id)}
                                                onCheckedChange={() => toggleSelect(faktur.id)}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-blue-600">{faktur.id}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {faktur.tanggalTransaksi 
                                                    ? new Date(faktur.tanggalTransaksi).toLocaleDateString('id-ID')
                                                    : new Date(faktur.createdAt).toLocaleDateString('id-ID')}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm">Ref: {faktur.nomorFaktur}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                <TrendingUp className="size-4 text-green-600" />
                                                <div>
                                                    <p className="font-semibold text-green-600">+{faktur.totalQty} unit</p>
                                                    <p className="text-xs text-muted-foreground">{faktur.totalItems} jenis barang</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm">{faktur.supplier}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button size="sm" variant="outline" onClick={() => handlePrintSingle(faktur)}>
                                                    <Printer className="size-4" />
                                                </Button>
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={`/laporan/cetak-faktur/${faktur.id}/edit`}>
                                                        <Pencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <Button size="icon" variant="destructive" onClick={() => handleDelete(faktur.id)}>
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="h-24 text-center">
                                        Tidak ada data faktur tersimpan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* BATCH PRINT CONTAINER */}
            <div id="print-batch-faktur">
                {printingFakturs.map((faktur, pageIdx) => {
                    const { kopPerusahaan, tanggalSurat, kepadaYth, nomorFaktur, hormatKami, direktur, terbilang } = faktur.raw_data;
                    const items = faktur.raw_data.items || [];

                    const subtotal = items.reduce((acc: number, item: any) => acc + (item.banyaknya * item.hargaSatuan), 0);
                    const ppn = subtotal * 0.11;
                    const total = subtotal + ppn;

                    return (
                        <div key={pageIdx} className="print-page">
                            {/* Header Kop */}
                            <div className="text-center font-bold" style={{ lineHeight: '1.2' }}>
                                {(kopPerusahaan || '').split('\n').map((line: string, idx: number) => {
                                    if (idx === 0) {
                                        return <div key={idx} style={{ fontSize: '24px', whiteSpace: 'pre-wrap' }}>{line}</div>;
                                    }
                                    return <div key={idx} style={{ fontSize: '13px', whiteSpace: 'pre-wrap', fontWeight: 'normal' }}>{line}</div>;
                                })}
                            </div>

                            <div className="hr-double"></div>

                            {/* Surat Info */}
                            <div className="w-full" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <div style={{ width: '45%' }}>
                                    <div>{tanggalSurat}</div>
                                    <div className="mt-4">Kepada Yth.</div>
                                    <div style={{ whiteSpace: 'pre-wrap' }}>
                                        {kepadaYth}
                                    </div>
                                </div>
                            </div>

                            <div className="faktur-no" style={{ marginTop: '30px' }}>
                                FAKTUR : {nomorFaktur}
                            </div>

                            {/* Table */}
                            <table className="print-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}>No.</th>
                                        <th style={{ width: '10%' }}>Banyaknya</th>
                                        <th style={{ width: '10%' }}>Volume</th>
                                        <th style={{ width: '40%' }}>Nama Barang</th>
                                        <th style={{ width: '15%' }}>Harga Satuan</th>
                                        <th style={{ width: '20%' }}>Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item: any, idx: number) => (
                                        <tr key={idx}>
                                            <td className="text-center">{idx + 1}</td>
                                            <td className="text-center">{new Intl.NumberFormat('id-ID').format(item.banyaknya)}</td>
                                            <td className="text-center">{item.volume}</td>
                                            <td>{item.namaBarang}</td>
                                            <td>
                                                <div className="currency-col">
                                                    <span>Rp</span>
                                                    <span>{formatRp(item.hargaSatuan)}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="currency-col">
                                                    <span>Rp</span>
                                                    <span>{formatRp(item.banyaknya * item.hargaSatuan)}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot style={{ fontWeight: 'bold' }}>
                                    <tr>
                                        <td colSpan={4} rowSpan={3} style={{ border: 'none', borderRight: '1px solid black' }}></td>
                                        <td>Subtotal</td>
                                        <td>
                                            <div className="currency-col">
                                                <span>Rp</span>
                                                <span>{formatRp(subtotal)}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ppn 11%</td>
                                        <td>
                                            <div className="currency-col">
                                                <span>Rp</span>
                                                <span>{formatRp(ppn)}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>JUMLAH</td>
                                        <td>
                                            <div className="currency-col">
                                                <span>Rp</span>
                                                <span>{formatRp(total)}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            {/* Terbilang */}
                            <div className="terbilang-text">
                                Terbilang : {(terbilang || '').charAt(0).toUpperCase() + (terbilang || '').slice(1)}
                            </div>

                            {/* Tanda Tangan */}
                            <div className="ttd-box-right mb-4">
                                <div className="mb-20">
                                    <div>Hormat kami,</div>
                                    <div>{hormatKami}</div>
                                </div>
                                <div style={{ height: '80px' }}></div>
                                <div className="font-bold underline" style={{ textDecoration: 'underline' }}>{direktur}</div>
                                <div>Direktur</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AppLayout>
    );
}
