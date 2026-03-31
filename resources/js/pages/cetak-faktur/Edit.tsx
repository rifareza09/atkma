import { Head } from '@inertiajs/react';
import { Plus, Printer, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
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

export default function CetakFakturEdit({ id }: { id: string }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Laporan', href: '#' },
        { title: 'Cetakan Faktur', href: '/laporan/cetak-faktur' },
        { title: 'Detail & Edit', href: '#' },
    ];

    // Form inputs initialized empty, wait for load
    const [tanggalTransaksi, setTanggalTransaksi] = useState('');
    const [kopPerusahaan, setKopPerusahaan] = useState('');
    const [tanggalSurat, setTanggalSurat] = useState('');
    const [kepadaYth, setKepadaYth] = useState('');
    const [nomorFaktur, setNomorFaktur] = useState('');

    // Signatures
    const [hormatKami, setHormatKami] = useState('');
    const [direktur, setDirektur] = useState('');

    // Items
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [terbilang, setTerbilang] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('cetak_fakturs');
        if (stored) {
            try {
                const fakturs = JSON.parse(stored);
                // Find our faktur
                const f = fakturs.find((fk: any) => fk.id === id);
                if (f && f.raw_data) {
                    setTanggalTransaksi(f.tanggalTransaksi || f.raw_data.tanggalTransaksi || f.createdAt.split('T')[0] || '');
                    setKopPerusahaan(f.raw_data.kopPerusahaan || '');
                    setTanggalSurat(f.raw_data.tanggalSurat || '');
                    setKepadaYth(f.raw_data.kepadaYth || '');
                    setNomorFaktur(f.raw_data.nomorFaktur || '');
                    setHormatKami(f.raw_data.hormatKami || '');
                    setDirektur(f.raw_data.direktur || '');
                    setTerbilang(f.raw_data.terbilang || '');
                    setItems(f.raw_data.items || []);
                }
            } catch (e) {
                console.error("Error loading for edit", e);
            }
        }
    }, [id]);

    const handleAddItem = () => {
        setItems([...items, { banyaknya: 0, volume: '', namaBarang: '', hargaSatuan: 0 }]);
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

    const handlePrintAndSave = () => {
        // Save back to localStorage
        const stored = localStorage.getItem('cetak_fakturs');
        if (stored) {
            let existingFakturs = JSON.parse(stored);
            const supplierName = kopPerusahaan.split('\n')[0] || 'Supplier Tidak Diketahui';

            existingFakturs = existingFakturs.map((f: any) => {
                if (f.id === id) {
                    return {
                        ...f,
                        nomorFaktur,
                        tanggalFakturSurat: tanggalSurat,
                        tanggalTransaksi: tanggalTransaksi,
                        supplier: supplierName,
                        totalItems: items.length,
                        totalQty: items.reduce((acc, item: any) => acc + (item.banyaknya || 0), 0),
                        createdAt: f.createdAt, // keep original timestamp or could update to new Date(tanggalTransaksi).toISOString()
                        raw_data: {
                            kopPerusahaan, tanggalSurat, kepadaYth, nomorFaktur, hormatKami, direktur, items, terbilang, tanggalTransaksi
                        }
                    };
                }
                return f;
            });

            localStorage.setItem('cetak_fakturs', JSON.stringify(existingFakturs));
        }

        setTimeout(() => {
            window.print();
        }, 100);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit & Cetak Faktur" />

            {/* FORM CONTAINER - Hidden during print */}
            <div className="flex flex-1 flex-col gap-6 p-6 print:hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Detail / Edit Faktur</h1>
                        <p className="text-muted-foreground">Sesuaikan data jika ada yang salah sebelum di-print ulang</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => window.location.href = '/laporan/cetak-faktur'}>
                            Kembali
                        </Button>
                        <Button onClick={handlePrintAndSave}>
                            <Printer className="mr-2 size-4" />
                            Simpan & Cetak
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
                                <Label>Kop Surat</Label>
                                <Textarea
                                    rows={5}
                                    value={kopPerusahaan}
                                    onChange={(e) => setKopPerusahaan(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Tanggal</Label>
                                    <Input
                                        value={tanggalSurat}
                                        onChange={(e) => setTanggalSurat(e.target.value)}
                                        placeholder="Contoh: Jakarta, 12 Desember 2025"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Nomor Faktur</Label>
                                    <Input
                                        value={nomorFaktur}
                                        onChange={(e) => setNomorFaktur(e.target.value)}
                                        placeholder="FAKTUR : ..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Kepada Yth.</Label>
                                <Textarea
                                    rows={4}
                                    value={kepadaYth}
                                    onChange={(e) => setKepadaYth(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Nama Penyetuju / Hormat Kami</Label>
                                    <Input
                                        value={hormatKami}
                                        onChange={(e) => setHormatKami(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Nama Direktur / Pejabat</Label>
                                    <Input
                                        value={direktur}
                                        onChange={(e) => setDirektur(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Terbilang</Label>
                                <Input
                                    value={terbilang}
                                    onChange={(e) => setTerbilang(e.target.value)}
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
                                        <div className="col-span-12 md:col-span-6 space-y-1">
                                            <Label>Nama Barang</Label>
                                            <Input
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
                                                value={item.banyaknya}
                                                onChange={(e) => updateItem(index, 'banyaknya', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-2 space-y-1">
                                            <Label>Harga Satuan</Label>
                                            <Input
                                                type="number"
                                                value={item.hargaSatuan}
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
                {/* Header Kop */}
                <div className="text-center font-bold" style={{ lineHeight: '1.2' }}>
                    {kopPerusahaan.split('\n').map((line, idx) => {
                        // Make first line title-like
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
                        {items.map((item, idx) => (
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
                    Terbilang : {terbilang.charAt(0).toUpperCase() + terbilang.slice(1)}
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
        </AppLayout>
    );
}
