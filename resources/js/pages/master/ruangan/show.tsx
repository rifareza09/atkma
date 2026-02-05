import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil, Building2, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { ruanganIndex, ruanganEdit } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Ruangan, BreadcrumbItem } from '@/types';

interface RuanganShowProps {
    ruangan: Ruangan;
}

export default function RuanganShow({ ruangan }: RuanganShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Master Data', href: '#' },
        { title: 'Data Ruangan', href: ruanganIndex() },
        { title: ruangan.nama_ruangan, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={ruangan.nama_ruangan} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{ruangan.nama_ruangan}</h1>
                            <Badge variant={ruangan.status === 'aktif' ? 'default' : 'secondary'}>
                                {ruangan.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            {ruangan.kode_ruangan}
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
                                    <p className="text-lg font-semibold">{ruangan.kode_ruangan}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Nama Ruangan
                                    </p>
                                    <p className="text-lg font-semibold">{ruangan.nama_ruangan}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Gedung
                                    </p>
                                    <p className="text-lg">{ruangan.gedung}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Lantai
                                    </p>
                                    <p className="text-lg">Lantai {ruangan.lantai}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Kapasitas
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {ruangan.kapasitas} Orang
                                    </p>
                                </div>
                                {ruangan.penanggung_jawab && (
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Penanggung Jawab
                                        </p>
                                        <p className="text-lg">{ruangan.penanggung_jawab}</p>
                                    </div>
                                )}
                            </div>

                            {ruangan.keterangan && (
                                <>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Keterangan
                                        </p>
                                        <p className="mt-1 text-sm">{ruangan.keterangan}</p>
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
                                    Lokasi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Gedung</p>
                                    <p className="text-xl font-bold">{ruangan.gedung}</p>
                                </div>
                                
                                <Separator />
                                
                                <div>
                                    <p className="text-sm text-muted-foreground">Lantai</p>
                                    <p className="text-xl font-semibold">
                                        Lantai {ruangan.lantai}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="size-5" />
                                    Kapasitas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <p className="text-sm text-muted-foreground">Maksimal Orang</p>
                                    <p className="text-3xl font-bold">
                                        {ruangan.kapasitas}
                                        <span className="text-lg font-normal text-muted-foreground ml-2">
                                            Orang
                                        </span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
