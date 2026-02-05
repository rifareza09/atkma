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
    { value: 'aktif', label: 'Aktif' },
    { value: 'tidak_aktif', label: 'Tidak Aktif' },
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
        { title: ruangan.nama_ruangan, href: ruanganShow(ruangan.id) },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm<RuanganFormData>({
        kode_ruangan: ruangan.kode_ruangan,
        nama_ruangan: ruangan.nama_ruangan,
        gedung: ruangan.gedung,
        lantai: ruangan.lantai,
        kapasitas: ruangan.kapasitas,
        lokasi: ruangan.lokasi,
        penanggung_jawab: ruangan.penanggung_jawab || '',
        status: ruangan.status,
        keterangan: ruangan.keterangan || '',
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
            <Head title={`Edit ${ruangan.nama_ruangan}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Ruangan</h1>
                        <p className="text-muted-foreground">
                            Perbarui informasi ruangan {ruangan.kode_ruangan}
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
                                    value={data.kode_ruangan}
                                    onChange={(e) =>
                                        setData('kode_ruangan', e.target.value)
                                    }
                                    error={errors.kode_ruangan}
                                    required
                                    placeholder="Contoh: R-101"
                                />

                                {/* Nama Ruangan */}
                                <InputWithLabel
                                    label="Nama Ruangan"
                                    value={data.nama_ruangan}
                                    onChange={(e) =>
                                        setData('nama_ruangan', e.target.value)
                                    }
                                    error={errors.nama_ruangan}
                                    required
                                    placeholder="Contoh: Ruang Rapat A"
                                />

                                {/* Gedung */}
                                <InputWithLabel
                                    label="Gedung"
                                    value={data.gedung}
                                    onChange={(e) =>
                                        setData('gedung', e.target.value)
                                    }
                                    error={errors.gedung}
                                    required
                                    placeholder="Contoh: Gedung A"
                                />

                                {/* Lantai */}
                                <InputWithLabel
                                    label="Lantai"
                                    type="number"
                                    value={data.lantai.toString()}
                                    onChange={(e) =>
                                        setData('lantai', parseInt(e.target.value) || 1)
                                    }
                                    error={errors.lantai}
                                    required
                                    min="1"
                                />

                                {/* Kapasitas */}
                                <InputWithLabel
                                    label="Kapasitas"
                                    type="number"
                                    value={data.kapasitas.toString()}
                                    onChange={(e) =>
                                        setData('kapasitas', parseInt(e.target.value) || 0)
                                    }
                                    error={errors.kapasitas}
                                    required
                                    min="0"
                                    helperText="Jumlah orang"
                                />

                                {/* Penanggung Jawab */}
                                <InputWithLabel
                                    label="Penanggung Jawab"
                                    value={data.penanggung_jawab || ''}
                                    onChange={(e) =>
                                        setData('penanggung_jawab', e.target.value)
                                    }
                                    error={errors.penanggung_jawab}
                                    placeholder="Nama penanggung jawab (opsional)"
                                />

                                {/* Status */}
                                <SelectWithLabel
                                    label="Status"
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData('status', value as 'aktif' | 'tidak_aktif')
                                    }
                                    options={statusOptions}
                                    error={errors.status}
                                    required
                                />
                            </div>

                            {/* Keterangan */}
                            <TextareaWithLabel
                                label="Keterangan"
                                value={data.keterangan || ''}
                                onChange={(e) =>
                                    setData('keterangan', e.target.value)
                                }
                                error={errors.keterangan}
                                placeholder="Keterangan ruangan (opsional)"
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
