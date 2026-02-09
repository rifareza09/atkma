import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, TrendingUp, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { barangMasukIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { StockMovement, BreadcrumbItem } from '@/types';

interface BarangMasukShowProps {
    movement: StockMovement;
}

export default function BarangMasukShow({ movement }: BarangMasukShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Barang Masuk', href: barangMasukIndex() },
        { title: movement.nomor_referensi, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Barang Masuk ${movement.nomor_referensi}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{movement.nomor_referensi}</h1>
                            <Badge variant="default" className="gap-1">
                                <TrendingUp className="size-4" />
                                Barang Masuk
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            Detail transaksi barang masuk
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={barangMasukIndex()}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Informasi Transaksi */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Transaksi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Nomor Referensi
                                    </p>
                                    <p className="text-lg font-semibold">{movement.nomor_referensi}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Tanggal Masuk
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {new Date(movement.tanggal).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Supplier/Sumber
                                    </p>
                                    <p className="text-lg">{movement.sumber_tujuan}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Jenis Transaksi
                                    </p>
                                    <Badge variant="default">
                                        {movement.jenis === 'in' ? 'Masuk' : 'Keluar'}
                                    </Badge>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                    Informasi Barang
                                </p>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Kode Barang</p>
                                        <p className="text-lg font-medium">{movement.barang?.kode}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Nama Barang</p>
                                        <p className="text-lg font-medium">{movement.barang?.nama}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Kategori</p>
                                        <p className="text-lg">{movement.barang?.kategori}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Satuan</p>
                                        <p className="text-lg">{movement.barang?.satuan.toUpperCase()}</p>
                                    </div>
                                </div>
                            </div>

                            {movement.keterangan && (
                                <>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Keterangan
                                        </p>
                                        <p className="mt-1 text-sm">{movement.keterangan}</p>
                                    </div>
                                </>
                            )}

                            <Separator />
                            <div className="grid gap-4 md:grid-cols-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Dibuat pada</p>
                                    <p>{new Date(movement.created_at).toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Terakhir diperbarui</p>
                                    <p>{new Date(movement.updated_at).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary Card */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="size-5" />
                                    Jumlah Masuk
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Barang Masuk</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        +{movement.jumlah}
                                        <span className="text-lg font-normal text-muted-foreground ml-2">
                                            {movement.barang?.satuan}
                                        </span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Stok Barang</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Stok Saat Ini</p>
                                    <p className="text-2xl font-bold">
                                        {movement.barang?.stok}
                                        <span className="text-sm font-normal text-muted-foreground ml-2">
                                            {movement.barang?.satuan}
                                        </span>
                                    </p>
                                </div>
                                
                                <Separator />
                                
                                <div>
                                    <p className="text-sm text-muted-foreground">Stok Minimum</p>
                                    <p className="text-lg font-semibold">
                                        {movement.barang?.stok_minimum} {movement.barang?.satuan}
                                    </p>
                                </div>

                                {movement.barang && movement.barang.stok <= movement.barang.stok_minimum && (
                                    <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                                        <p className="font-medium">⚠️ Peringatan</p>
                                        <p className="mt-1">
                                            Stok masih dibawah batas minimum
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
