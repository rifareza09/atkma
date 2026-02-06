import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { InputWithLabel, SelectWithLabel, TextareaWithLabel } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { ruanganIndex, ruanganShow } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Ruangan, RuanganFormData, BreadcrumbItem, SelectOption } from '@/types';

const statusOptions: SelectOption[] = [
    { value: 'true', label: 'Aktif' },
    { value: 'false', label: 'Tidak Aktif' },
];

interface RuanganEditProps {
    ruangan: Ruangan;
}

export default function RuanganEdit({ ruangan }: RuanganEditProps) {
    const { toast } = useToast();
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Master Data', href: '#' },
        { title: 'Data Ruangan', href: ruanganIndex() },
        { title: ruangan.nama, href: ruanganShow(ruangan.id) },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm<RuanganFormData>({
        kode: ruangan.kode,
        nama: ruangan.nama,
        penanggung_jawab: ruangan.penanggung_jawab || '',
        deskripsi: ruangan.deskripsi || '',
        is_active: ruangan.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        put(`/master/ruangan/${ruangan.id}`, {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Ruangan berhasil diperbarui',
                });
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat memperbarui ruangan',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${ruangan.nama}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Ruangan</h1>
                        <p className="text-muted-foreground">
                            Perbarui informasi ruangan {ruangan.kode}
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={ruanganShow(ruangan.id)}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Ruangan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Kode Ruangan */}
                                <InputWithLabel
                                    label="Kode Ruangan"
                                    value={data.kode}
                                    onChange={(e) =>
                                        setData('kode', e.target.value)
                                    }
                                    error={errors.kode}
                                    required
                                    placeholder="Contoh: R-101"
                                />

                                {/* Nama Ruangan */}
                                <InputWithLabel
                                    label="Nama Ruangan"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData('nama', e.target.value)
                                    }
                                    error={errors.nama}
                                    required
                                    placeholder="Contoh: Ruang Rapat A"
                                />

                                {/* Penanggung Jawab */}
                                <InputWithLabel
                                    label="Penanggung Jawab"
                                    value={data.penanggung_jawab || ''}
                                    onChange={(e) =>
                                        setData('penanggung_jawab', e.target.value)
                                    }
                                    error={errors.penanggung_jawab}
                                    placeholder="Nama penanggung jawab ruangan"
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
                                placeholder="Deskripsi ruangan (opsional)"
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
