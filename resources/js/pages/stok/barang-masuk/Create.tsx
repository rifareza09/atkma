import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Stok', href: '#' },
    { title: 'Barang Masuk', href: '/stok/barang-masuk' },
    { title: 'Catat Baru', href: '#' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama_barang: '',
        jumlah: '',
        tanggal_masuk: new Date().toISOString().split('T')[0],
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/stok/barang-masuk');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catat Barang Masuk" />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Catat Barang Masuk Baru
                        </h1>
                        <p className="text-muted-foreground">
                            Input data barang masuk untuk menambah stok secara manual
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/stok/barang-masuk">
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {/* Info Alert */}
                <Alert>
                    <AlertCircle className="size-4" />
                    <AlertDescription>
                        Setelah data disimpan, stok barang akan otomatis bertambah dan
                        perubahan akan tercatat di riwayat pergerakan stok.
                    </AlertDescription>
                </Alert>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Form Section */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Barang Masuk</CardTitle>
                            <CardDescription>
                                Lengkapi data barang yang masuk ke gudang
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Kode Barang */}
                                <div className="space-y-2">
                                    <Label htmlFor="kode_barang">
                                        Kode Barang
                                    </Label>
                                    <Input
                                        id="kode_barang"
                                        value="Auto Generate"
                                        disabled
                                        className="bg-muted"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Kode akan otomatis dibuat sistem
                                    </p>
                                </div>

                                {/* Nama Barang */}
                                <div className="space-y-2">
                                    <Label htmlFor="nama_barang" className="required">
                                        Nama Barang
                                    </Label>
                                    <Input
                                        id="nama_barang"
                                        placeholder="Contoh: Pulpen Joyko 0.5mm"
                                        value={data.nama_barang}
                                        onChange={(e) => setData('nama_barang', e.target.value)}
                                        className={errors.nama_barang ? 'border-destructive' : ''}
                                    />
                                    {errors.nama_barang && (
                                        <p className="text-sm text-destructive">{errors.nama_barang}</p>
                                    )}
                                </div>

                                {/* Jumlah */}
                                <div className="space-y-2">
                                    <Label htmlFor="jumlah" className="required">
                                        Jumlah Barang Masuk
                                    </Label>
                                    <Input
                                        id="jumlah"
                                        type="number"
                                        min="1"
                                        placeholder="Masukkan jumlah"
                                        value={data.jumlah}
                                        onChange={(e) => setData('jumlah', e.target.value)}
                                        className={errors.jumlah ? 'border-destructive' : ''}
                                    />
                                    {errors.jumlah && (
                                        <p className="text-sm text-destructive">{errors.jumlah}</p>
                                    )}
                                </div>

                                {/* Tanggal Masuk */}
                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_masuk" className="required">
                                        Tanggal Barang Masuk
                                    </Label>
                                    <Input
                                        id="tanggal_masuk"
                                        type="date"
                                        max={new Date().toISOString().split('T')[0]}
                                        value={data.tanggal_masuk}
                                        onChange={(e) => setData('tanggal_masuk', e.target.value)}
                                        className={errors.tanggal_masuk ? 'border-destructive' : ''}
                                    />
                                    {errors.tanggal_masuk && (
                                        <p className="text-sm text-destructive">{errors.tanggal_masuk}</p>
                                    )}
                                </div>

                                {/* Keterangan */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="keterangan">
                                        Keterangan
                                    </Label>
                                    <Textarea
                                        id="keterangan"
                                        placeholder="Catatan tambahan (opsional)"
                                        rows={3}
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                        className={errors.keterangan ? 'border-destructive' : ''}
                                    />
                                    {errors.keterangan && (
                                        <p className="text-sm text-destructive">{errors.keterangan}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" asChild>
                        <Link href="/stok/barang-masuk">
                            Batal
                        </Link>
                    </Button>
                    <Button type="submit" disabled={processing}>
                        <Save className="mr-2 size-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Data'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
