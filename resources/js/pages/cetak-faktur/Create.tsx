import { Head } from '@inertiajs/react';
import { Plus, Printer, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface InvoiceItem {
    banyaknya: number;
    volume: string;
    namaBarang: string;
    hargaSatuan: number;
}

export default function CetakFaktur() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Laporan', href: '#' },
        { title: 'Cetakan Faktur', href: '/laporan/cetak-faktur' },
        { title: 'Tambah Faktur', href: '#' },
    ];

    // Form inputs matching the requirements
    const [tanggalTransaksi, setTanggalTransaksi] = useState(() => new Date().toISOString().split('T')[0]); // Added: specific date for sorting/table
    const [tanggalFaktur, setTanggalFaktur] = useState(() => new Date().toISOString().split('T')[0]);
    const [lokasiTanggalFaktur, setLokasiTanggalFaktur] = useState('Jakarta');
    const [nomorFaktur, setNomorFaktur] = useState('');
    const [tanggalSuratJalan, setTanggalSuratJalan] = useState(() => new Date().toISOString().split('T')[0]);
    const [lokasiTanggalSuratJalan, setLokasiTanggalSuratJalan] = useState('Jakarta');
    const [nomorSuratJalan, setNomorSuratJalan] = useState('');

    // Company info
    const [namaPT, setNamaPT] = useState('');

    // Items
    const [items, setItems] = useState<InvoiceItem[]>([
        { banyaknya: 0, volume: '', namaBarang: '', hargaSatuan: 0 },
    ]);

    const handleAddItem = () => {
        const newItems = [...items, { banyaknya: 0, volume: '', namaBarang: '', hargaSatuan: 0 }];
        setItems(newItems);
    };

    const handleRemoveItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    // Calculations
    const subtotal = items.reduce((acc, item) => acc + (item.banyaknya * item.hargaSatuan), 0);
    const ppn = subtotal * 0.11;
    const total = subtotal + ppn;

    // Formatting currency
    const formatRp = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format date to Indonesian format
    const formatDate = (dateStr: string, lokasi: string) => {
        if (!dateStr) return lokasi + ', --';
        const date = new Date(dateStr + 'T00:00:00');
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${lokasi}, ${day} ${month} ${year}`;
    };

    const handleSave = () => {
        if (!confirm("Apakah Anda yakin ingin menyimpan faktur ini?")) return;

        // Save to localStorage
        const existingFakturs = JSON.parse(localStorage.getItem('cetak_fakturs') || '[]');

        // Simple distinct ID
        const dateObj = new Date();
        const id = 'CF-' + dateObj.getTime();

        const newFaktur = {
            id,
            nomorFaktur,
            tanggalFakturSurat: tanggalFaktur,
            tanggalTransaksi: tanggalTransaksi,
            supplier: namaPT || 'PT/CV',
            totalItems: items.length,
            totalQty: items.reduce((acc, item) => acc + (item.banyaknya || 0), 0),
            createdAt: new Date(tanggalTransaksi).toISOString(), // Updated to use the selected date
            raw_data: {
                namaPT, 
                tanggalFaktur: formatDate(tanggalFaktur, lokasiTanggalFaktur), 
                nomorFaktur, 
                tanggalSuratJalan: formatDate(tanggalSuratJalan, lokasiTanggalSuratJalan),
                nomorSuratJalan, 
                items, 
                tanggalTransaksi
            }
        };

        existingFakturs.unshift(newFaktur);
        localStorage.setItem('cetak_fakturs', JSON.stringify(existingFakturs));
        alert("Faktur berhasil disimpan!");
        // Redirect ke dashboard
        window.location.href = '/laporan/cetak-faktur';
        // return id to be used if needed
        return id;
    };

    const handlePrintAndSave = () => {
        const id = handleSave();
        if (id) {
            setTimeout(() => {
                window.print();
            }, 100);
        }
    };

    const handlePrintOnly = () => {
        window.print();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Faktur" />

            {/* FORM CONTAINER - Hidden during print */}
            <div className="flex flex-1 flex-col gap-6 p-6 print:hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Buat Faktur (Simulasi)</h1>
                        <p className="text-muted-foreground">Buat dan cetak faktur kustom tanpa terhubung ke stok (murni simulasi)</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => window.location.href = '/laporan/cetak-faktur'}>
                            Kembali
                        </Button>
                        <Button variant="secondary" onClick={handleSave}>
                            Simpan
                        </Button>
                        <Button onClick={handlePrintOnly}>
                            <Printer className="mr-2 size-4" />
                            Cetak
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Header Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengaturan Surat & TTD</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Tanggal Transaksi (Untuk di Tabel)</Label>
                                <Input
                                    type="date"
                                    value={tanggalTransaksi}
                                    onChange={(e) => setTanggalTransaksi(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal Faktur</Label>
                                <Input
                                    type="date"
                                    value={tanggalFaktur}
                                    onChange={(e) => setTanggalFaktur(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Nomor Faktur</Label>
                                <Input
                                    value={nomorFaktur}
                                    onChange={(e) => setNomorFaktur(e.target.value)}
                                    placeholder="Contoh: TMDJ/F/036.12.2025"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal Surat Jalan</Label>
                                <Input
                                    type="date"
                                    value={tanggalSuratJalan}
                                    onChange={(e) => setTanggalSuratJalan(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Nomor Surat Jalan</Label>
                                <Input
                                    value={nomorSuratJalan}
                                    onChange={(e) => setNomorSuratJalan(e.target.value)}
                                    placeholder="Contoh: TMDJ/SJ/036.12.2025"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Nama PT / CV</Label>
                                <Input
                                    value={namaPT}
                                    onChange={(e) => setNamaPT(e.target.value)}
                                    placeholder="Contoh: CV. TAMADO JAYA"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Barang */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Daftar Barang (Bebas Ketik)</CardTitle>
                            <Button type="button" size="sm" onClick={handleAddItem}>
                                <Plus className="mr-1 size-4" />
                                Tambah Barang
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {items.map((item, index) => (
                                <div key={index} className="flex flex-col gap-2 p-4 border rounded-md relative">
                                    {items.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-6 w-6"
                                            onClick={() => handleRemoveItem(index)}
                                        >
                                            <Trash2 className="size-3" />
                                        </Button>
                                    )}
                                    <div className="grid grid-cols-12 gap-3">
                                        <div className="col-span-12 md:col-span-5 space-y-1">
                                            <Label>Nama Barang</Label>
                                            <Input
                                                placeholder="Contoh: Map Mahkamah Agung RI"
                                                value={item.namaBarang}
                                                onChange={(e) => updateItem(index, 'namaBarang', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-6 md:col-span-2 space-y-1">
                                            <Label>Volume (Satuan)</Label>
                                            <Input
                                                placeholder="bh/rim/pc"
                                                value={item.volume}
                                                onChange={(e) => updateItem(index, 'volume', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-6 md:col-span-2 space-y-1">
                                            <Label>Banyaknya</Label>
                                            <Input
                                                type="number"
                                                value={item.banyaknya || ''}
                                                onChange={(e) => updateItem(index, 'banyaknya', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-3 space-y-1">
                                            <Label>Harga Satuan</Label>
                                            <Input
                                                type="number"
                                                value={item.hargaSatuan || ''}
                                                onChange={(e) => updateItem(index, 'hargaSatuan', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right text-sm font-semibold text-muted-foreground mt-2">
                                        Subtotal: Rp {formatRp(item.banyaknya * item.hargaSatuan)}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* PRINT TEMPLATE - Hidden on screen, visible only when printing */}
            {/* The styling tries to match the requested image heavily using print media queries */}
            <style>
                {`
                    @media print {
                        @page {
                            size: A4 portrait;
                            margin: 1cm;
                        }
                        body * {
                            visibility: hidden;
                        }
                        #print-faktur, #print-faktur * {
                            visibility: visible;
                        }
                        #print-faktur {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            padding: 20px;
                            font-family: 'Times New Roman', Times, serif, sans-serif;
                            font-size: 14px;
                            color: black;
                            background: white;
                        }
                        .print-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 10px;
                            margin-bottom: 20px;
                        }
                        .print-table th, .print-table td {
                            border: 1px solid black;
                            padding: 4px 8px;
                        }
                        .print-table th {
                            text-align: center;
                            font-weight: bold;
                        }
                        .text-center { text-align: center; }
                        .text-right { text-align: right; }
                        .text-left { text-align: left; }
                        .font-bold { font-weight: bold; }
                        .mb-4 { margin-bottom: 1rem; }
                        .mt-4 { margin-top: 1rem; }
                        .mt-10 { margin-top: 2.5rem; }
                        .pull-right-box { float: right; width: 300px; }
                        .w-full { width: 100%; }

                        /* Layout fixes */
                        .kop-text { white-space: pre-wrap; text-align: center; font-weight: bold; font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.2;}
                        .kop-text div:first-child { font-size: 20px; text-decoration: underline; margin-bottom: 4px;}
                        .kepada-box { margin-left: 55%; margin-top: 20px; white-space: pre-wrap; line-height: 1.2; }
                        .faktur-no { font-weight: bold; margin-bottom: 5px; }
                        .terbilang-text { font-style: italic; font-weight: bold; margin-top: 10px;}
                        .ttd-box { text-align: center; width: 250px; margin-left: auto; margin-right: auto; margin-top: 40px;}
                        .ttd-box-right { text-align: center; width: 250px; margin-left: auto; margin-right: 0;}
                        .border-t-2 { border-top: 2px solid black; margin-top: 10px; padding-top: 10px;}
                        .hr-double { border-top: 3px double black; margin: 15px 0;}

                        .currency-col { display: flex; justify-content: space-between; }
                    }
                    /* Simple on-screen preview hidden to not clutter */
                    @media screen {
                        #print-faktur { display: none; }
                    }
                `}
            </style>

            <div id="print-faktur">
                <div className="print-page">
                    {/* Header Section */}
                    <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>MAHKAMAH AGUNG RI — SISTEM INVENTARIS ATK</div>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>Transaksi Barang Keluar</div>
                    </div>

                    {/* Summary Info */}
                    <div style={{ marginBottom: '15px', fontSize: '10px' }}>
                        <div style={{ marginBottom: '3px' }}>
                            <strong>No. Transaksi</strong> : {nomorFaktur}
                        </div>
                        <div style={{ marginBottom: '3px' }}>
                            <strong>Tanggal</strong> : {tanggalFaktur || '-'}
                        </div>
                        <div style={{ marginBottom: '3px' }}>
                            <strong>Dicetak</strong> : {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })} {new Date().toLocaleTimeString('id-ID')}
                        </div>
                    </div>

                    {/* Main Table */}
                    {items && items.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginTop: '10px' }}>
                            <thead>
                                <tr style={{ border: '1px solid #999' }}>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '2%' }}>No</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '10%' }}>Nama PT</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '10%' }}>No Faktur</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '10%' }}>No Surat Jalan</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '8%' }}>Tanggal</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '8%' }}>Tgl Surat Jalan</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '6%' }}>Kode Barang</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'left', fontWeight: 'bold', width: '16%' }}>Nama Barang</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '7%' }}>Harga Satuan</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '6%' }}>Jumlah</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '8%' }}>Jumlah Harga</th>
                                    <th style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', width: '6%' }}>Satuan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Header Row */}
                                <tr style={{ border: '1px solid #999' }}>
                                    <td rowSpan={items.length} style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontWeight: 'bold', verticalAlign: 'top', fontSize: '9px' }}>
                                        1
                                    </td>
                                    <td rowSpan={items.length} style={{ border: '1px solid #999', padding: '6px', textAlign: 'left', verticalAlign: 'top', fontSize: '9px' }}>
                                        {namaPT || '-'}
                                    </td>
                                    <td rowSpan={items.length} style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', verticalAlign: 'top', fontSize: '9px' }}>
                                        {nomorFaktur || '-'}
                                    </td>
                                    <td rowSpan={items.length} style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', verticalAlign: 'top', fontSize: '9px' }}>
                                        {nomorSuratJalan || '-'}
                                    </td>
                                    <td rowSpan={items.length} style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', verticalAlign: 'top', fontSize: '9px' }}>
                                        {tanggalFaktur?.substring(0, 10) || '-'}
                                    </td>
                                    <td rowSpan={items.length} style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', verticalAlign: 'top', fontSize: '9px' }}>
                                        {tanggalSuratJalan?.substring(0, 10) || '-'}
                                    </td>
                                    <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontSize: '9px' }}>
                                        ATK-001
                                    </td>
                                    <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'left', fontSize: '9px' }}>
                                        1. {items[0]?.namaBarang}
                                    </td>
                                    <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'right', fontSize: '9px' }}>
                                        {items[0]?.hargaSatuan ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(items[0]?.hargaSatuan) : '-'}
                                    </td>
                                    <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontSize: '9px' }}>
                                        {items[0]?.banyaknya}
                                    </td>
                                    <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'right', fontSize: '9px' }}>
                                        {items[0]?.hargaSatuan ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format((items[0]?.hargaSatuan || 0) * (items[0]?.banyaknya || 0)) : '-'}
                                    </td>
                                    <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontSize: '9px' }}>
                                        {items[0]?.volume}
                                    </td>
                                </tr>

                                {/* Item Rows - skip item pertama */}
                                {items.slice(1).map((item: any, itemIdx: number) => (
                                    <tr key={itemIdx} style={{ border: '1px solid #999' }}>
                                        <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontSize: '9px' }}>
                                            ATK-{String(itemIdx + 2).padStart(3, '0')}
                                        </td>
                                        <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'left', fontSize: '9px' }}>
                                            {itemIdx + 2}. {item.namaBarang}
                                        </td>
                                        <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'right', fontSize: '9px' }}>
                                            {item.hargaSatuan ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.hargaSatuan) : '-'}
                                        </td>
                                        <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontSize: '9px' }}>
                                            {item.banyaknya}
                                        </td>
                                        <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'right', fontSize: '9px' }}>
                                            {item.hargaSatuan ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format((item.hargaSatuan || 0) * (item.banyaknya || 0)) : '-'}
                                        </td>
                                        <td style={{ border: '1px solid #999', padding: '6px', textAlign: 'center', fontSize: '9px' }}>
                                            {item.volume}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#999' }}>
                            Tidak ada item
                        </div>
                    )}

                    {/* Footer */}
                    {items && items.length > 0 && (
                        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                            <div style={{ textAlign: 'right', paddingRight: '10px', fontWeight: 'bold', fontSize: '10px', marginBottom: '5px' }}>
                                Total Jumlah: <span style={{ marginLeft: '50px', display: 'inline-block', width: '150px', textAlign: 'right' }}>
                                    {items.reduce((sum: number, item: any) => sum + (item.banyaknya || 0), 0)}
                                </span>
                            </div>
                            <div style={{ textAlign: 'right', paddingRight: '10px', fontWeight: 'bold', fontSize: '10px' }}>
                                Total Harga: <span style={{ marginLeft: '50px', display: 'inline-block', width: '150px', textAlign: 'right' }}>
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(
                                        items.reduce((sum: number, item: any) => sum + ((item.hargaSatuan || 0) * (item.banyaknya || 0)), 0)
                                    )}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Print Footer */}
                    <div style={{ fontSize: '8px', textAlign: 'center', color: '#999', borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '30px' }}>
                        Dicetak pada {new Date().toLocaleString('id-ID')} • Sistem Inventaris ATK Mahkamah Agung RI
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
