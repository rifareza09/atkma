import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, TrendingUp, Save, Edit, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { barangMasukIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { IncomingStock, BreadcrumbItem } from '@/types';

interface BarangMasukShowProps {
    movement: IncomingStock;
    items: IncomingStock[];
}

function ItemRow({ item }: { item: IncomingStock }) {
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        jumlah: item.jumlah,
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/stok/barang-masuk/item/${item.id}`, {
            preserveScroll: true,
            onSuccess: () => setIsEditing(false),
        });
    };

    return (
        <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
            <div>
                <p className="font-semibold">{item.barang?.nama}</p>
                <p className="text-sm text-muted-foreground">{item.barang?.kode}</p>
            </div>
            <div className="text-right">
                {!isEditing ? (
                    <div className="flex items-center justify-end gap-3">
                        <p className="text-lg font-bold text-green-600">+{item.jumlah} {item.barang?.satuan}</p>
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => setIsEditing(true)}>
                            <Edit className="size-4 text-blue-600" />
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="flex items-center justify-end gap-2">
                        <div className="w-24">
                            <Input
                                type="number"
                                value={data.jumlah}
                                onChange={(e) => setData('jumlah', parseInt(e.target.value))}
                                className="h-8 text-right"
                                min="1"
                                required
                            />
                            {errors.jumlah && <p className="text-xs text-red-500 mt-1 text-left">{errors.jumlah}</p>}
                        </div>
                        <span className="text-sm text-muted-foreground">{item.barang?.satuan}</span>
                        <Button type="button" variant="ghost" size="icon" className="size-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => { setIsEditing(false); setData('jumlah', item.jumlah); }}>
                            <X className="size-4" />
                        </Button>
                        <Button type="submit" variant="ghost" size="icon" className="size-8 text-green-600 hover:text-green-700 hover:bg-green-50" disabled={processing}>
                            <Save className="size-4" />
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function BarangMasukShow({ movement, items }: BarangMasukShowProps) {
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        tanggal_masuk: movement.tanggal_masuk ? movement.tanggal_masuk.split('T')[0] : '',
        sumber: movement.sumber || '',
        nomor_dokumen: movement.nomor_dokumen || '',
        nomor_faktur: movement.nomor_faktur || '',
        nomor_surat_jalan: movement.nomor_surat_jalan || '',
        tanggal_faktur: movement.tanggal_faktur ? movement.tanggal_faktur.split('T')[0] : '',
        keterangan: movement.keterangan || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Barang Masuk', href: barangMasukIndex() },
        { title: movement.kode_barang_masuk || 'Detail', href: '#' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/stok/barang-masuk/${movement.id}`, {
            onSuccess: () => setIsEditing(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Barang Masuk ${movement.kode_barang_masuk}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{movement.kode_barang_masuk}</h1>
                            <Badge variant="default" className="gap-1">
                                <TrendingUp className="size-4" /> Barang Masuk
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">Detail transaksi barang masuk</p>
                    </div>
                    <div className="flex gap-2">
                        {!isEditing ? (
                            <Button onClick={() => setIsEditing(true)}>
                                <Edit className="mr-2 size-4" /> Edit Referensi
                            </Button>
                        ) : (
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                <X className="mr-2 size-4" /> Batal
                            </Button>
                        )}
                        <Button variant="outline" asChild>
                            <Link href={barangMasukIndex()}>
                                <ArrowLeft className="mr-2 size-4" /> Kembali
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle>Informasi Transaksi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!isEditing ? (
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Nomor Dokumen (PO)</p>
                                        <p className="text-lg font-semibold">{movement.nomor_dokumen || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Nomor Faktur</p>
                                        <p className="text-lg font-semibold">{movement.nomor_faktur || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Nomor Surat Jalan</p>
                                        <p className="text-lg font-semibold">{movement.nomor_surat_jalan || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Tanggal Masuk</p>
                                        <p className="text-lg font-semibold">{new Date(movement.tanggal_masuk).toLocaleDateString('id-ID')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Tanggal Faktur</p>
                                        <p className="text-lg font-semibold">{movement.tanggal_faktur ? new Date(movement.tanggal_faktur).toLocaleDateString('id-ID') : '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Supplier/Sumber</p>
                                        <p className="text-lg">{movement.sumber || '-'}</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Nomor Dokumen (PO)</Label>
                                        <Input value={data.nomor_dokumen} onChange={e => setData('nomor_dokumen', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nomor Faktur</Label>
                                        <Input value={data.nomor_faktur} onChange={e => setData('nomor_faktur', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nomor Surat Jalan</Label>
                                        <Input value={data.nomor_surat_jalan} onChange={e => setData('nomor_surat_jalan', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tanggal Masuk</Label>
                                        <Input type="date" value={data.tanggal_masuk} onChange={e => setData('tanggal_masuk', e.target.value)} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tanggal Faktur</Label>
                                        <Input type="date" value={data.tanggal_faktur} onChange={e => setData('tanggal_faktur', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Supplier/Sumber</Label>
                                        <Input value={data.sumber} onChange={e => setData('sumber', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-3">
                                        <Button type="submit" disabled={processing}><Save className="mr-2 size-4" /> Simpan Perubahan</Button>
                                    </div>
                                </form>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle>Daftar Barang</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <ItemRow key={item.id} item={item} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
