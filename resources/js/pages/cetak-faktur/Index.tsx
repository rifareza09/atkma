import { Head, Link } from '@inertiajs/react';
import { Plus, Search, Eye, TrendingUp, Trash2, Printer, Pencil, CheckSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface SimulatedFaktur {
    id: string;
    nomorFaktur: string;
    tanggalFakturSurat: string;
    supplier: string;
    namaPT?: string;
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
    }).sort((a, b) => {
        const dateA = new Date(a.raw_data?.tanggalTransaksi || a.createdAt).getTime();
        const dateB = new Date(b.raw_data?.tanggalTransaksi || b.createdAt).getTime();
        return dateA - dateB; // Earliest first
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
                        .print-table { 
                            width: 100%; 
                            border-collapse: collapse; 
                            margin-top: 10px; 
                            margin-bottom: 20px; 
                            font-size: 12px;
                        }
                        .print-table th, .print-table td { 
                            border: 1px solid black; 
                            padding: 5px 6px; 
                            font-size: 11px;
                        }
                        .print-table th { 
                            text-align: center; 
                            font-weight: bold; 
                            background-color: #f5f5f5;
                        }
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

                {/* Table - Horizontal Scroll Container */}
                <div className="rounded-md border bg-white overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader className="bg-muted/50">
                            <TableRow className="text-left py-2 font-medium text-muted-foreground border-b">
                                <TableHead className="w-[40px] p-2 text-center text-xs">
                                    <Checkbox
                                        checked={filteredFakturs.length > 0 && selectedIds.length === filteredFakturs.length}
                                        onCheckedChange={() => toggleSelectAll(filteredFakturs)}
                                    />
                                </TableHead>
                                <TableHead className="w-[30px] p-2 text-center text-xs font-semibold">No.</TableHead>
                                <TableHead className="p-2 text-xs font-semibold whitespace-nowrap min-w-[80px]">Tanggal</TableHead>
                                <TableHead className="p-2 text-xs font-semibold whitespace-nowrap min-w-[100px]">No Faktur</TableHead>
                                <TableHead className="p-2 text-xs font-semibold whitespace-nowrap min-w-[120px]">Tgl Faktur</TableHead>
                                <TableHead className="p-2 text-xs font-semibold whitespace-nowrap min-w-[100px]">No SJ</TableHead>
                                <TableHead className="p-2 text-xs font-semibold whitespace-nowrap min-w-[120px]">Tgl SJ</TableHead>
                                <TableHead className="p-2 text-xs font-semibold whitespace-nowrap min-w-[120px]">Nama PT/CV</TableHead>
                                <TableHead className="p-2 text-xs font-semibold whitespace-nowrap min-w-[150px]">Nama Barang</TableHead>
                                <TableHead className="p-2 text-center text-xs font-semibold whitespace-nowrap">Vol</TableHead>
                                <TableHead className="p-2 text-right text-xs font-semibold whitespace-nowrap">Qty</TableHead>
                                <TableHead className="p-2 text-right text-xs font-semibold">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFakturs.length > 0 ? (
                                filteredFakturs.flatMap((faktur, fakturIdx) => {
                                    const items = faktur.raw_data?.items || [];
                                    const rowCount = Math.max(1, items.length);
                                    const dateStr = faktur.tanggalTransaksi ? new Date(faktur.tanggalTransaksi).toLocaleDateString('id-ID') : new Date(faktur.createdAt).toLocaleDateString('id-ID');

                                    const isSelected = selectedIds.includes(faktur.id);

                                    const aksiCell = (
                                        <TableCell rowSpan={rowCount} className="align-top p-2 border-b text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button size="sm" variant="outline" onClick={() => handlePrintSingle(faktur)} className="h-7 w-7 p-0">
                                                    <Printer className="size-3" />
                                                </Button>
                                                <Button size="sm" variant="outline" asChild className="h-7 w-7 p-0">
                                                    <Link href={`/laporan/cetak-faktur/${faktur.id}/edit`}>
                                                        <Pencil className="size-3" />
                                                    </Link>
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDelete(faktur.id)} className="h-7 w-7 p-0">
                                                    <Trash2 className="size-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    );

                                    if (items.length === 0) {
                                        return [
                                            <TableRow key={`${faktur.id}-empty`} className="border-b transition-colors hover:bg-muted/50" data-state={isSelected ? 'selected' : undefined}>
                                                <TableCell className="align-top text-center p-2"><Checkbox checked={isSelected} onCheckedChange={() => toggleSelect(faktur.id)} /></TableCell>
                                                <TableCell rowSpan={rowCount} className="align-top text-center p-2 text-xs font-bold">{fakturIdx + 1}</TableCell>
                                                <TableCell className="align-top p-2 font-medium text-blue-600 text-xs whitespace-nowrap">{dateStr}</TableCell>
                                                <TableCell className="align-top p-2 text-xs whitespace-nowrap">{faktur.raw_data?.nomorFaktur || '-'}</TableCell>
                                                <TableCell className="align-top p-2 text-xs whitespace-nowrap">{faktur.raw_data?.tanggalFaktur?.substring(0, 20) || '-'}</TableCell>
                                                <TableCell className="align-top p-2 text-xs whitespace-nowrap">{faktur.raw_data?.nomorSuratJalan || '-'}</TableCell>
                                                <TableCell className="align-top p-2 text-xs whitespace-nowrap">{faktur.raw_data?.tanggalSuratJalan?.substring(0, 20) || '-'}</TableCell>
                                                <TableCell className="align-top p-2 text-xs">{faktur.raw_data?.namaPT || '-'}</TableCell>
                                                <TableCell colSpan={3} className="text-muted-foreground italic text-xs p-2">Tidak ada item</TableCell>
                                                {aksiCell}
                                            </TableRow>
                                        ];
                                    }

                                    return items.map((item, itemIdx) => (
                                        <TableRow key={`${faktur.id}-${itemIdx}`} className="hover:bg-muted/30 border-b-0 text-xs" data-state={isSelected ? 'selected' : undefined}>
                                            {itemIdx === 0 && (
                                                <>
                                                    <TableCell rowSpan={rowCount} className="align-top text-center p-2 border-b">
                                                        <Checkbox checked={isSelected} onCheckedChange={() => toggleSelect(faktur.id)} />
                                                    </TableCell>
                                                    <TableCell rowSpan={rowCount} className="align-top text-center p-2 border-b font-bold text-xs">{fakturIdx + 1}</TableCell>
                                                </>
                                            )}
                                            {itemIdx === 0 && (
                                                <>
                                                    <TableCell rowSpan={rowCount} className="align-top p-2 border-b font-medium text-blue-600 text-xs whitespace-nowrap">
                                                        {dateStr}
                                                    </TableCell>
                                                    <TableCell rowSpan={rowCount} className="align-top p-2 border-b text-xs whitespace-nowrap">
                                                        {faktur.raw_data?.nomorFaktur || '-'}
                                                    </TableCell>
                                                    <TableCell rowSpan={rowCount} className="align-top p-2 border-b text-xs whitespace-nowrap">
                                                        {faktur.raw_data?.tanggalFaktur?.substring(0, 20) || '-'}
                                                    </TableCell>
                                                    <TableCell rowSpan={rowCount} className="align-top p-2 border-b text-xs whitespace-nowrap">
                                                        {faktur.raw_data?.nomorSuratJalan || '-'}
                                                    </TableCell>
                                                    <TableCell rowSpan={rowCount} className="align-top p-2 border-b text-xs whitespace-nowrap">
                                                        {faktur.raw_data?.tanggalSuratJalan?.substring(0, 20) || '-'}
                                                    </TableCell>
                                                    <TableCell rowSpan={rowCount} className="align-top p-2 border-b text-xs">
                                                        {faktur.raw_data?.namaPT || '-'}
                                                    </TableCell>
                                                </>
                                            )}
                                            <TableCell className={`p-2 ${itemIdx === items.length - 1 ? 'pb-2 border-b' : ''}`}>
                                                <span className="font-medium text-xs">{itemIdx + 1}.</span> <span className="text-xs">{item.namaBarang}</span>
                                            </TableCell>
                                            <TableCell className={`p-2 text-center text-muted-foreground text-xs whitespace-nowrap ${itemIdx === items.length - 1 ? 'pb-2 border-b' : ''}`}>{item.volume}</TableCell>
                                            <TableCell className={`p-2 text-right font-bold text-green-600 text-xs ${itemIdx === items.length - 1 ? 'pb-2 border-b' : ''}`}>{item.banyaknya}</TableCell>
                                            {itemIdx === 0 && aksiCell}
                                        </TableRow>
                                    ));
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center">
                                        Tidak ada data faktur tersimpan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div id="print-batch-faktur">
                <div className="print-page">
                    {/* Collect all items from all transactions */}
                    {(() => {
                        let rowNumber = 1;
                        let allItems: any[] = [];
                        printingFakturs.forEach((faktur) => {
                            const items = faktur.raw_data.items || [];
                            items.forEach((item: any) => {
                                allItems.push({
                                    ...faktur.raw_data,
                                    item,
                                    rowNo: rowNumber++
                                });
                            });
                        });

                        const grandTotal = allItems.reduce((acc: number, row: any) => 
                            acc + (row.item.banyaknya * row.item.hargaSatuan), 0
                        );

                        return (
                            <table className="print-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '3%' }}>NO</th>
                                        <th style={{ width: '7%' }}>NO FAKTUR</th>
                                        <th style={{ width: '8%' }}>TGL FAKTUR</th>
                                        <th style={{ width: '7%' }}>NO SJ</th>
                                        <th style={{ width: '8%' }}>TGL SJ</th>
                                        <th style={{ width: '9%' }}>NAMA PT</th>
                                        <th style={{ width: '16%' }}>NAMA BARANG</th>
                                        <th style={{ width: '6%' }}>SAT</th>
                                        <th style={{ width: '10%' }}>HARGA SAT</th>
                                        <th style={{ width: '10%' }}>JUMLAH HARGA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allItems.map((row: any, idx: number) => (
                                        <tr key={idx}>
                                            <td className="text-center" style={{ fontSize: '11px' }}>{row.rowNo}</td>
                                            <td className="text-center" style={{ fontSize: '10px' }}>{row.nomorFaktur}</td>
                                            <td className="text-center" style={{ fontSize: '9px' }}>{row.tanggalFaktur?.substring(0, 15) || '-'}</td>
                                            <td className="text-center" style={{ fontSize: '10px' }}>{row.nomorSuratJalan}</td>
                                            <td className="text-center" style={{ fontSize: '9px' }}>{row.tanggalSuratJalan?.substring(0, 15) || '-'}</td>
                                            <td style={{ fontSize: '9px' }}>{row.namaPT?.substring(0, 12) || '-'}</td>
                                            <td style={{ fontSize: '9px' }}>{row.item.namaBarang?.substring(0, 18) || '-'}</td>
                                            <td className="text-center" style={{ fontSize: '10px' }}>{row.item.volume}</td>
                                            <td style={{ textAlign: 'right', fontSize: '9px' }}>Rp {formatRp(row.item.hargaSatuan)}</td>
                                            <td style={{ textAlign: 'right', fontSize: '9px' }}>Rp {formatRp(row.item.banyaknya * row.item.hargaSatuan)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot style={{ fontWeight: 'bold' }}>
                                    <tr>
                                        <td colSpan={8} style={{ border: 'none', borderRight: '1px solid black', textAlign: 'right', paddingRight: '8px' }}>TOTAL</td>
                                        <td colSpan={2} style={{ textAlign: 'right', paddingRight: '8px' }}>
                                            Rp {formatRp(grandTotal)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        );
                    })()}
                </div>
            </div>
        </AppLayout>
    );
}
