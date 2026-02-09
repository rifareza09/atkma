import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil, Package, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
        { title: barang.nama, href: '#' },
    ];

    const persentaseStok = barang.stok_minimum > 0 
        ? Math.min((barang.stok / barang.stok_minimum) * 100, 100)
        : 100;

    const isStokRendah = barang.stok <= barang.stok_minimum;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={barang.nama} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{barang.nama}</h1>
                            <Badge variant={barang.is_active ? 'default' : 'secondary'}>
                                {barang.is_active ? 'Aktif' : 'Tidak Aktif'}
                            </Badge>
                            {isStokRendah && (
                                <Badge variant="destructive">Stok Rendah</Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground">
                            {barang.kode}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={barangIndex()}>
                                <ArrowLeft className="mr-2 size-4" />
                                Kembali
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.open(`/reports/kartu-stok/${barang.id}`, '_blank')}
                        >
                            <FileText className="mr-2 size-4" />
                            Lihat Kartu Stok
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
                                    <p className="text-lg font-semibold">{barang.kode}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Nama Barang
                                    </p>
                                    <p className="text-lg font-semibold">{barang.nama}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Satuan
                                    </p>
                                    <p className="text-lg">{barang.satuan.toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Status
                                    </p>
                                    <Badge variant={barang.is_active ? 'default' : 'secondary'}>
                                        {barang.is_active ? 'Aktif' : 'Tidak Aktif'}
                                    </Badge>
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

                    {/* Info Stok */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="size-5" />
                                Informasi Stok
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-end justify-between mb-2">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Stok Saat Ini</p>
                                        <p className="text-3xl font-bold">
                                            {barang.stok}
                                        </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                        {barang.satuan}
                                    </p>
                                </div>
                                
                                <Progress 
                                    value={persentaseStok} 
                                    className={`h-2 ${isStokRendah ? 'bg-destructive/20' : ''}`}
                                />
                                
                                <p className="text-xs text-muted-foreground mt-2">
                                    {persentaseStok.toFixed(0)}% dari stok minimum
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm text-muted-foreground">Stok Minimum</p>
                                <p className="text-xl font-semibold">
                                    {barang.stok_minimum} {barang.satuan}
                                </p>
                            </div>

                            {isStokRendah && (
                                <>
                                    <Separator />
                                    <div className="rounded-lg bg-destructive/10 p-3">
                                        <p className="text-sm font-medium text-destructive">
                                            ⚠️ Stok di bawah minimum!
                                        </p>
                                        <p className="text-xs text-destructive/80 mt-1">
                                            Segera lakukan restok barang
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
