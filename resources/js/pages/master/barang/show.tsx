 
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { barangIndex, barangEdit } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Barang, BreadcrumbItem } from '@/types';

interface BarangShowProps {
    barang: Barang;
}

export default function BarangShow({ barang }: BarangShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Master Data', href: '#' },
        { title: 'Data Barang', href: barangIndex() },
        { title: barang.nama_barang, href: '#' },
    ];

    const persentaseStok = barang.stok_minimum > 0 
        ? (barang.stok / barang.stok_minimum) * 100 
        : 100;

    const isStokRendah = barang.stok <= barang.stok_minimum;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={barang.nama_barang} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{barang.nama_barang}</h1>
                            <Badge variant={barang.status === 'aktif' ? 'default' : 'secondary'}>
                                {barang.status}
                            </Badge>
                            {isStokRendah && (
                                <Badge variant="destructive">Stok Rendah</Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground">
                            {barang.kode_barang}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={barangIndex()}>
                                <ArrowLeft className="mr-2 size-4" />
                                Kembali
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={barangEdit(barang.id)}>
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
                            <CardTitle>Informasi Barang</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Kode Barang
                                    </p>
                                    <p className="text-lg font-semibold">{barang.kode_barang}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Nama Barang
                                    </p>
                                    <p className="text-lg font-semibold">{barang.nama_barang}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Kategori
                                    </p>
                                    <p className="text-lg">{barang.kategori}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Satuan
                                    </p>
                                    <p className="text-lg">{barang.satuan.toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Harga Satuan
                                    </p>
                                    <p className="text-lg font-semibold">
                                        Rp {barang.harga_satuan.toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Total Nilai Stok
                                    </p>
                                    <p className="text-lg font-semibold">
                                        Rp {(barang.stok * barang.harga_satuan).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>

                            {barang.deskripsi && (
                                <>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Deskripsi
                                        </p>
                                        <p className="mt-1 text-sm">{barang.deskripsi}</p>
                                    </div>
                                </>
                            )}

                            <Separator />
                            <div className="grid gap-4 md:grid-cols-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Dibuat pada</p>
                                    <p>{new Date(barang.created_at).toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Terakhir diperbarui</p>
                                    <p>{new Date(barang.updated_at).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Informasi Stok */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="size-5" />
                                    Informasi Stok
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Stok Saat Ini</p>
                                    <p className="text-3xl font-bold">
                                        {barang.stok}
                                        <span className="text-lg font-normal text-muted-foreground ml-2">
                                            {barang.satuan}
                                        </span>
                                    </p>
                                </div>
                                
                                <Separator />
                                
                                <div>
                                    <p className="text-sm text-muted-foreground">Stok Minimum</p>
                                    <p className="text-xl font-semibold">
                                        {barang.stok_minimum} {barang.satuan}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Persentase Stok
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all ${
                                                    isStokRendah
                                                        ? 'bg-destructive'
                                                        : 'bg-primary'
                                                }`}
                                                style={{
                                                    width: `${Math.min(persentaseStok, 100)}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium">
                                            {persentaseStok.toFixed(0)}%
                                        </span>
                                    </div>
                                </div>

                                {isStokRendah && (
                                    <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                                        <p className="font-medium">⚠️ Peringatan</p>
                                        <p className="mt-1">
                                            Stok barang dibawah batas minimum. Segera lakukan restok.
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
