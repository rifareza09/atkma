import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { InputWithLabel, SelectWithLabel, TextareaWithLabel } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { barangIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { BarangFormData, BarangSatuan, BreadcrumbItem, SelectOption } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Master Data', href: '#' },
    { title: 'Data Barang', href: barangIndex() },
    { title: 'Tambah Barang', href: '#' },
];

const satuanOptions: SelectOption[] = [
    { value: 'pcs', label: 'Pcs (Pieces)' },
    { value: 'box', label: 'Box' },
    { value: 'rim', label: 'Rim' },
    { value: 'set', label: 'Set' },
    { value: 'pack', label: 'Pack' },
    { value: 'lusin', label: 'Lusin' },
    { value: 'unit', label: 'Unit' },
];

const statusOptions: SelectOption[] = [
    { value: 'true', label: 'Aktif' },
    { value: 'false', label: 'Tidak Aktif' },
];

export default function BarangCreate() {
    const { toast } = useToast();
    
    const { data, setData, post, processing, errors } = useForm<BarangFormData>({
        kode: '',
        nama: '',
        satuan: 'pcs',
        stok: 0,
        stok_minimum: 10,
        is_active: true,
        deskripsi: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/master/barang', {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Barang berhasil ditambahkan',
                });
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat menambahkan barang',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Barang" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Tambah Barang</h1>
                        <p className="text-muted-foreground">
                            Tambah data barang ATK baru
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={barangIndex()}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Barang</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Kode Barang */}
                                <InputWithLabel
                                    label="Kode Barang"
                                    value={data.kode}
                                    onChange={(e) =>
                                        setData('kode', e.target.value)
                                    }
                                    error={errors.kode}
                                    required
                                    placeholder="Contoh: ATK-001"
                                />

                                {/* Nama Barang */}
                                <InputWithLabel
                                    label="Nama Barang"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData('nama', e.target.value)
                                    }
                                    error={errors.nama}
                                    required
                                    placeholder="Contoh: Kertas A4 80gsm"
                                />

                                {/* Satuan */}
                                <SelectWithLabel
                                    label="Satuan"
                                    value={data.satuan}
                                    onValueChange={(value) =>
                                        setData('satuan', value as BarangSatuan)
                                    }
                                    options={satuanOptions}
                                    error={errors.satuan}
                                    required
                                />

                                {/* Stok Minimum */}
                                <InputWithLabel
                                    label="Stok Minimum"
                                    type="number"
                                    value={data.stok_minimum.toString()}
                                    onChange={(e) =>
                                        setData('stok_minimum', parseInt(e.target.value) || 10)
                                    }
                                    error={errors.stok_minimum}
                                    required
                                    min="0"
                                    helperText="Peringatan stok rendah"
                                />

                                {/* Stok Awal */}
                                <InputWithLabel
                                    label="Stok Awal"
                                    type="number"
                                    value={data.stok?.toString() || '0'}
                                    onChange={(e) =>
                                        setData('stok', parseInt(e.target.value) || 0)
                                    }
                                    error={errors.stok}
                                    min="0"
                                    helperText="Stok awal saat barang ditambahkan"
                                />

                                {/* Status */}
                                <SelectWithLabel
                                    label="Status"
                                    value={data.is_active ? 'true' : 'false'}
                                    onValueChange={(value) =>
                                        setData('is_active', value === 'true')
                                    }
                                    options={statusOptions}
                                    error={errors.is_active}
                                    required
                                />
                            </div>

                            {/* Deskripsi */}
                            <TextareaWithLabel
                                label="Deskripsi"
                                value={data.deskripsi || ''}
                                onChange={(e) =>
                                    setData('deskripsi', e.target.value)
                                }
                                error={errors.deskripsi}
                                placeholder="Deskripsi barang (opsional)"
                                rows={4}
                            />

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    disabled={processing}
                                >
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 size-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
