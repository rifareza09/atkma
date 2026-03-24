import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, Trash2, Building2, Package, CalendarDays, X, FileDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { ruanganIndex, ruanganEdit } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Ruangan, BreadcrumbItem } from '@/types';

interface TransactionItemRow {
    id: number;
    nama_barang: string;
    kode_barang: string;
    satuan: string;
    jumlah: number;
}

interface TransactionRow {
    id: number;
    kode_transaksi: string;
    tanggal: string;
    nama_peminta: string;
    keterangan?: string;
    status: string;
    items: TransactionItemRow[];
}

interface RuanganShowProps {
    ruangan: Ruangan;
    transactions: TransactionRow[];
}

export default function RuanganShow({ ruangan, transactions }: RuanganShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Master Data', href: '#' },
        { title: 'Data Ruangan', href: ruanganIndex() },
        { title: ruangan.nama, href: '#' },
    ];

    // Kumpulkan semua tahun yang ada di data transaksi
    const availableYears = useMemo(() => {
        const years = new Set(transactions.map((t) => {
            const raw = t.tanggal ?? '';
            if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
                return raw.substring(6, 10); // ambil tahun dari DD/MM/YYYY
            }
            return raw.substring(0, 4); // ambil tahun dari YYYY-MM-DD
        }));
        return Array.from(years).sort((a, b) => Number(b) - Number(a));
    }, [transactions]);

    const currentYear = new Date().getFullYear().toString();
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

    const [filterTanggal, setFilterTanggal] = useState('');
    const [filterBulan, setFilterBulan] = useState(currentMonth);
    const [filterTahun, setFilterTahun] = useState(currentYear);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

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

    const MONTHS = [
        { value: '01', label: 'Januari' },
        { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' },
        { value: '04', label: 'April' },
        { value: '05', label: 'Mei' },
        { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' },
        { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];

    const filteredTransactions = useMemo(() => {
        return transactions.filter((trx) => {
            // tanggal format: YYYY-MM-DD atau DD/MM/YYYY — normalize
            const raw = trx.tanggal ?? '';
            // coba parse berbagai format
            let dateStr = raw; // asumsikan YYYY-MM-DD
            if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
                // DD/MM/YYYY → YYYY-MM-DD
                const [d, m, y] = raw.split('/');
                dateStr = `${y}-${m}-${d}`;
            }

            if (filterTanggal) {
                return dateStr === filterTanggal;
            }
            const yearMatch = filterTahun && filterTahun !== 'all' ? dateStr.startsWith(filterTahun) : true;
            const monthMatch = filterBulan && filterBulan !== 'all' ? dateStr.substring(5, 7) === filterBulan : true;
            return yearMatch && monthMatch;
        });
    }, [transactions, filterTanggal, filterBulan, filterTahun]);

    const hasFilter = filterTanggal !== '' || filterBulan !== currentMonth || filterTahun !== currentYear;

    const resetFilter = () => {
        setFilterTanggal('');
        setFilterBulan(currentMonth);
        setFilterTahun(currentYear);
    };

    const handleExportPdf = () => {
        const params = new URLSearchParams();
        if (filterTanggal) {
            params.set('tanggal', filterTanggal);
        } else {
            if (filterBulan && filterBulan !== 'all') params.set('bulan', filterBulan);
            if (filterTahun && filterTahun !== 'all') params.set('tahun', filterTahun);
        }
        const qs = params.toString();
        window.open(`/master/ruangan/${ruangan.id}/export-pdf${qs ? '?' + qs : ''}`, '_blank');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={ruangan.nama} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{ruangan.nama}</h1>
                            <Badge variant={ruangan.is_active ? 'default' : 'secondary'}>
                                {ruangan.is_active ? 'Aktif' : 'Tidak Aktif'}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            {ruangan.kode}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={ruanganIndex()}>
                                <ArrowLeft className="mr-2 size-4" />
                                Kembali
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={ruanganEdit(ruangan.id)}>
                                <Pencil className="mr-2 size-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Informasi Utama */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Ruangan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Kode Ruangan
                                    </p>
                                    <p className="text-lg font-semibold">{ruangan.kode}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Nama Ruangan
                                    </p>
                                    <p className="text-lg font-semibold">{ruangan.nama}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Status
                                    </p>
                                    <Badge variant={ruangan.is_active ? 'default' : 'secondary'}>
                                        {ruangan.is_active ? 'Aktif' : 'Tidak Aktif'}
                                    </Badge>
                                </div>
                            </div>

                            {ruangan.deskripsi && (
                                <>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Deskripsi
                                        </p>
                                        <p className="mt-1 text-sm">{ruangan.deskripsi}</p>
                                    </div>
                                </>
                            )}

                            <Separator />
                            <div className="grid gap-4 md:grid-cols-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Dibuat pada</p>
                                    <p>{new Date(ruangan.created_at).toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Terakhir diperbarui</p>
                                    <p>{new Date(ruangan.updated_at).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Info Cards */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="size-5" />
                                    Informasi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Kode</p>
                                    <p className="text-xl font-bold">{ruangan.kode}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="text-sm text-muted-foreground">Total Transaksi</p>
                                    <p className="text-2xl font-bold">
                                        {ruangan.transactions_count || 0}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Riwayat Peminjaman Barang */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <CardTitle className="flex items-center gap-2">
                                <Package className="size-5" />
                                Riwayat Peminjaman Barang
                                <Badge variant="secondary" className="ml-1">
                                    {filteredTransactions.length} transaksi
                                </Badge>
                            </CardTitle>

                            {/* Filter Bar */}
                            <div className="flex flex-wrap items-end gap-2">
                                {/* Filter Tanggal spesifik */}
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">Tanggal</Label>
                                    <Input
                                        type="date"
                                        value={filterTanggal}
                                        onChange={(e) => {
                                            setFilterTanggal(e.target.value);
                                            if (e.target.value) {
                                                setFilterBulan('all');
                                                setFilterTahun('all');
                                            } else {
                                                setFilterBulan(currentMonth);
                                                setFilterTahun(currentYear);
                                            }
                                        }}
                                        className="h-8 text-sm w-36"
                                    />
                                </div>

                                {/* Filter Bulan */}
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">Bulan</Label>
                                    <Select
                                        value={filterBulan}
                                        onValueChange={(v) => {
                                            setFilterBulan(v);
                                            setFilterTanggal('');
                                        }}
                                    >
                                        <SelectTrigger className="h-8 text-sm w-32">
                                            <SelectValue placeholder="Semua" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Bulan</SelectItem>
                                            {MONTHS.map((m) => (
                                                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Filter Tahun */}
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">Tahun</Label>
                                    <Select
                                        value={filterTahun}
                                        onValueChange={(v) => {
                                            setFilterTahun(v);
                                            setFilterTanggal('');
                                        }}
                                    >
                                        <SelectTrigger className="h-8 text-sm w-24">
                                            <SelectValue placeholder="Semua" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Tahun</SelectItem>
                                            {availableYears.map((y) => (
                                                <SelectItem key={y} value={y}>{y}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Reset */}
                                {hasFilter && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetFilter}
                                        className="h-8 text-xs text-muted-foreground"
                                    >
                                        <X className="size-3 mr-1" />
                                        Reset
                                    </Button>
                                )}

                                {/* Export PDF */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleExportPdf}
                                    className="h-8 text-xs"
                                    disabled={filteredTransactions.length === 0}
                                >
                                    <FileDown className="size-3 mr-1" />
                                    Export PDF
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filteredTransactions.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center">
                                {transactions.length === 0
                                    ? 'Belum ada riwayat peminjaman barang untuk ruangan ini.'
                                    : 'Tidak ada transaksi pada filter yang dipilih.'}
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left text-muted-foreground">
                                            <th className="pb-3 pr-4 font-semibold">No. Transaksi</th>
                                            <th className="pb-3 pr-4 font-semibold">Tanggal</th>
                                            <th className="pb-3 pr-4 font-semibold">Nama Peminta</th>
                                            <th className="pb-3 pr-4 font-semibold">Kode Barang</th>
                                            <th className="pb-3 pr-4 font-semibold">Nama Barang</th>
                                            <th className="pb-3 pr-4 font-semibold text-right">Jumlah</th>
                                            <th className="pb-3 font-semibold">Satuan</th>
                                            <th className="pb-3 font-semibold text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTransactions.map((trx) =>
                                            trx.items.length === 0 ? (
                                                <tr key={trx.id} className="border-b last:border-0">
                                                    <td className="py-3 pr-4 font-mono">{trx.kode_transaksi}</td>
                                                    <td className="py-3 pr-4">{trx.tanggal}</td>
                                                    <td className="py-3 pr-4">{trx.nama_peminta}</td>
                                                    <td colSpan={4} className="py-3 text-muted-foreground italic">Tidak ada item</td>
                                                    <td className="py-3 text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Link href={`/transaksi/permintaan/${trx.id}/edit`}>
                                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                                    <Pencil className="size-3.5" />
                                                                </Button>
                                                            </Link>
                                                            {confirmDeleteId === trx.id ? (
                                                                <div className="flex items-center gap-1">
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="sm"
                                                                        className="h-7 text-xs px-2"
                                                                        disabled={deletingId === trx.id}
                                                                        onClick={() => handleDelete(trx.id)}
                                                                    >
                                                                        {deletingId === trx.id ? 'Menghapus...' : 'Ya, Hapus'}
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={() => setConfirmDeleteId(null)}>
                                                                        Batal
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-red-50"
                                                                    onClick={() => setConfirmDeleteId(trx.id)}
                                                                >
                                                                    <Trash2 className="size-3.5" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                trx.items.map((item, idx) => (
                                                    <tr key={`${trx.id}-${item.id}`} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                                                        {idx === 0 && (
                                                            <>
                                                                <td className="py-3 pr-4 font-mono align-top" rowSpan={trx.items.length}>
                                                                    {trx.kode_transaksi}
                                                                </td>
                                                                <td className="py-3 pr-4 align-top" rowSpan={trx.items.length}>
                                                                    {trx.tanggal}
                                                                </td>
                                                                <td className="py-3 pr-4 align-top" rowSpan={trx.items.length}>
                                                                    {trx.nama_peminta}
                                                                </td>
                                                            </>
                                                        )}
                                                        <td className="py-3 pr-4 font-mono">{item.kode_barang}</td>
                                                        <td className="py-3 pr-4">{item.nama_barang}</td>
                                                        <td className="py-3 pr-4 text-right font-semibold">{item.jumlah}</td>
                                                        <td className="py-3">{item.satuan}</td>
                                                        {idx === 0 && (
                                                            <td className="py-3 text-center align-top" rowSpan={trx.items.length}>
                                                                <div className="flex items-center justify-center gap-1">
                                                                    <Link href={`/transaksi/permintaan/${trx.id}/edit`}>
                                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                                            <Pencil className="size-3.5" />
                                                                        </Button>
                                                                    </Link>
                                                                    {confirmDeleteId === trx.id ? (
                                                                        <div className="flex items-center gap-1">
                                                                            <Button
                                                                                variant="destructive"
                                                                                size="sm"
                                                                                className="h-7 text-xs px-2"
                                                                                disabled={deletingId === trx.id}
                                                                                onClick={() => handleDelete(trx.id)}
                                                                            >
                                                                                {deletingId === trx.id ? 'Menghapus...' : 'Ya, Hapus'}
                                                                            </Button>
                                                                            <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={() => setConfirmDeleteId(null)}>
                                                                                Batal
                                                                            </Button>
                                                                        </div>
                                                                    ) : (
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-red-50"
                                                                            onClick={() => setConfirmDeleteId(trx.id)}
                                                                        >
                                                                            <Trash2 className="size-3.5" />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
