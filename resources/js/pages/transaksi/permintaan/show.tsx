import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Package, Download, ShoppingCart, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { permintaanIndex, inventoryIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Transaction, BreadcrumbItem } from '@/types';

interface PermintaanShowProps {
    transaction: Transaction;
}

export default function PermintaanShow({ transaction }: PermintaanShowProps) {
    const { flash } = usePage<{ flash: { success?: string } }>().props;
    const isNewRequest = !!flash?.success;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Permintaan Barang', href: permintaanIndex() },
        { title: transaction.nomor_transaksi, href: '#' },
    ];

    const getStatusIcon = (status: Transaction['status']) => {
        switch (status) {
            case 'disetujui':
                return <CheckCircle className="size-5" />;
            case 'ditolak':
                return <XCircle className="size-5" />;
            default:
                return <Clock className="size-5" />;
        }
    };

    const getStatusVariant = (status: Transaction['status']) => {
        switch (status) {
            case 'disetujui':
                return 'default';
            case 'ditolak':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permintaan ${transaction.nomor_transaksi}`} />

            {isNewRequest ? (
                // Success View - New Request
                <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 p-6">
                    <Card className="w-full max-w-2xl">
                        <CardContent className="pt-8">
                            {/* Success Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                            </div>

                            {/* Success Title */}
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold mb-2">Permintaan Berhasil Dikirim</h1>
                                <p className="text-muted-foreground">
                                    Permintaan ATK Anda telah kami terima dan akan segera diproses.
                                </p>
                            </div>

                            {/* Transaction Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between py-2">
                                    <span className="text-sm font-medium text-muted-foreground uppercase">ID Transaksi</span>
                                    <span className="text-sm font-semibold text-blue-600">
                                        {transaction.nomor_transaksi}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between py-2">
                                    <span className="text-sm font-medium text-muted-foreground uppercase">Tanggal</span>
                                    <span className="text-sm font-medium">
                                        {new Date(transaction.tanggal).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between py-2">
                                    <span className="text-sm font-medium text-muted-foreground uppercase">Ruangan</span>
                                    <span className="text-sm font-medium">{transaction.ruangan?.nama}</span>
                                </div>
                            </div>

                            {/* Items Summary */}
                            <div className="mb-6">
                                <div className="text-sm font-medium text-muted-foreground uppercase mb-3">
                                    Ringkasan Barang
                                </div>
                                <div className="space-y-2">
                                    {transaction.items?.map((item, index) => (
                                        <div key={item.id} className="flex items-center gap-3 py-2">
                                            <div className="flex items-center justify-center w-8 h-8 rounded bg-muted">
                                                {item.barang?.kode === 'KRT-A4-80GSM' ? (
                                                    <FileText className="w-4 h-4" />
                                                ) : (
                                                    <Package className="w-4 h-4" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{item.barang?.nama}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-semibold">
                                                    {item.jumlah} {item.barang?.satuan}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Status Timeline */}
                            <div className="mb-6">
                                <div className="text-sm font-medium text-muted-foreground uppercase mb-3">
                                    Status Permintaan
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">Permintaan Terkirim</p>
                                            <p className="text-xs text-green-600">
                                                Berhasil - {new Date().toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })} WIB
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Menunggu Persetujuan Kasubbag
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Estimasi proses 1 hari kerja
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button 
                                    variant="outline" 
                                    className="w-full"
                                    onClick={() => window.open(`/reports/permintaan/${transaction.id}/pdf`, '_blank')}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Unduh Bukti (PDF)
                                </Button>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" asChild>
                                        <Link href={inventoryIndex()}>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Kembali ke Katalog
                                        </Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={permintaanIndex()}>
                                            <FileText className="mr-2 h-4 w-4" />
                                            Lihat Status Permintaan
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                // Default Detail View
                <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{transaction.nomor_transaksi}</h1>
                            <Badge variant={getStatusVariant(transaction.status)} className="gap-1">
                                {getStatusIcon(transaction.status)}
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            Detail permintaan barang
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={permintaanIndex()}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Informasi Permintaan */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Permintaan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Nomor Transaksi
                                    </p>
                                    <p className="text-lg font-semibold">{transaction.nomor_transaksi}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Tanggal Permintaan
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {new Date(transaction.tanggal_transaksi).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Pemohon
                                    </p>
                                    <p className="text-lg">{transaction.pemohon}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Ruangan
                                    </p>
                                    <p className="text-lg">{transaction.ruangan?.nama}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {transaction.ruangan?.kode}
                                    </p>
                                </div>
                            </div>

                            {transaction.keterangan && (
                                <>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Keterangan
                                        </p>
                                        <p className="mt-1 text-sm">{transaction.keterangan}</p>
                                    </div>
                                </>
                            )}

                            <Separator />
                            <div className="grid gap-4 md:grid-cols-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Dibuat pada</p>
                                    <p>{new Date(transaction.created_at).toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Terakhir diperbarui</p>
                                    <p>{new Date(transaction.updated_at).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="size-5" />
                                Ringkasan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Item</p>
                                <p className="text-3xl font-bold">
                                    {transaction.items?.length || 0}
                                    <span className="text-lg font-normal text-muted-foreground ml-2">
                                        Item
                                    </span>
                                </p>
                            </div>
                            
                            <Separator />
                            
                            <div>
                                <p className="text-sm text-muted-foreground">Total Jumlah</p>
                                <p className="text-xl font-semibold">
                                    {transaction.items?.reduce((sum, item) => sum + item.jumlah, 0) || 0}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Daftar Barang */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Barang</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Kode Barang</TableHead>
                                    <TableHead>Nama Barang</TableHead>
                                    <TableHead className="text-center">Jumlah</TableHead>
                                    <TableHead className="text-center">Satuan</TableHead>
                                    <TableHead>Keterangan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transaction.items && transaction.items.length > 0 ? (
                                    transaction.items.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">
                                                {item.barang?.kode}
                                            </TableCell>
                                            <TableCell>{item.barang?.nama}</TableCell>
                                            <TableCell className="text-center font-semibold">
                                                {item.jumlah}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {item.barang?.satuan.toUpperCase()}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {item.keterangan || '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                                            Tidak ada item
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            )}
        </AppLayout>
    );
}
