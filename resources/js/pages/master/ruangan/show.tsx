import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil, Building2, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
                        <CardTitle className="flex items-center gap-2">
                            <Package className="size-5" />
                            Riwayat Peminjaman Barang
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {transactions.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center">
                                Belum ada riwayat peminjaman barang untuk ruangan ini.
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((trx) =>
                                            trx.items.length === 0 ? (
                                                <tr key={trx.id} className="border-b last:border-0">
                                                    <td className="py-3 pr-4 font-mono">{trx.kode_transaksi}</td>
                                                    <td className="py-3 pr-4">{trx.tanggal}</td>
                                                    <td className="py-3 pr-4">{trx.nama_peminta}</td>
                                                    <td colSpan={4} className="py-3 text-muted-foreground italic">Tidak ada item</td>
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
