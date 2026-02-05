import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { InputWithLabel, SelectWithLabel, TextareaWithLabel } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { barangIndex, barangShow } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Barang, BarangFormData, BarangSatuan, BarangStatus, BreadcrumbItem, SelectOption } from '@/types';

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
    { value: 'aktif', label: 'Aktif' },
    { value: 'tidak_aktif', label: 'Tidak Aktif' },
];

interface BarangEditProps {
    barang: Barang;
}

export default function BarangEdit({ barang }: BarangEditProps) {
    const { toast } = useToast();
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Master Data', href: '#' },
        { title: 'Data Barang', href: barangIndex() },
        { title: barang.nama_barang, href: barangShow(barang.id) },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm<BarangFormData>({
        kode_barang: barang.kode_barang,
        nama_barang: barang.nama_barang,
        kategori: barang.kategori,
        satuan: barang.satuan,
        stok: barang.stok,
        stok_minimum: barang.stok_minimum,
        harga_satuan: barang.harga_satuan,
        status: barang.status,
        deskripsi: barang.deskripsi || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        put(`/master/barang/${barang.id}`, {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Barang berhasil diperbarui',
                });
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat memperbarui barang',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${barang.nama_barang}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Barang</h1>
                        <p className="text-muted-foreground">
                            Perbarui informasi barang {barang.kode_barang}
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={barangShow(barang.id)}>
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
                                    value={data.kode_barang}
                                    onChange={(e) =>
                                        setData('kode_barang', e.target.value)
                                    }
                                    error={errors.kode_barang}
                                    required
                                    placeholder="Contoh: ATK-001"
                                />

                                {/* Nama Barang */}
                                <InputWithLabel
                                    label="Nama Barang"
                                    value={data.nama_barang}
                                    onChange={(e) =>
                                        setData('nama_barang', e.target.value)
                                    }
                                    error={errors.nama_barang}
                                    required
                                    placeholder="Contoh: Kertas A4 80gsm"
                                />

                                {/* Kategori */}
                                <InputWithLabel
                                    label="Kategori"
                                    value={data.kategori}
                                    onChange={(e) =>
                                        setData('kategori', e.target.value)
                                    }
                                    error={errors.kategori}
                                    required
                                    placeholder="Contoh: Kertas, Alat Tulis"
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

                                {/* Stok */}
                                <InputWithLabel
                                    label="Stok Saat Ini"
                                    type="number"
                                    value={data.stok?.toString() || '0'}
                                    onChange={(e) =>
                                        setData('stok', parseInt(e.target.value) || 0)
                                    }
                                    error={errors.stok}
                                    min="0"
                                />

                                {/* Stok Minimum */}
                                <InputWithLabel
                                    label="Stok Minimum"
                                    type="number"
                                    value={data.stok_minimum.toString()}
                                    onChange={(e) =>
                                        setData('stok_minimum', parseInt(e.target.value) || 0)
                                    }
                                    error={errors.stok_minimum}
                                    required
                                    min="0"
                                    helperText="Peringatan stok rendah"
                                />

                                {/* Harga Satuan */}
                                <InputWithLabel
                                    label="Harga Satuan (Rp)"
                                    type="number"
                                    value={data.harga_satuan.toString()}
                                    onChange={(e) =>
                                        setData('harga_satuan', parseInt(e.target.value) || 0)
                                    }
                                    error={errors.harga_satuan}
                                    required
                                    min="0"
                                />

                                {/* Status */}
                                <SelectWithLabel
                                    label="Status"
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData('status', value as BarangStatus)
                                    }
                                    options={statusOptions}
                                    error={errors.status}
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
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
