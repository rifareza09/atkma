import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { InputWithLabel, SelectWithLabel } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { ruanganIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { RuanganFormData, BreadcrumbItem, SelectOption } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Master Data', href: '#' },
    { title: 'Data Ruangan', href: ruanganIndex() },
    { title: 'Tambah Ruangan', href: '#' },
];

const statusOptions: SelectOption[] = [
    { value: 'aktif', label: 'Aktif' },
    { value: 'tidak_aktif', label: 'Tidak Aktif' },
];

export default function RuanganCreate() {
    const { toast } = useToast();
    
    const { data, setData, post, processing, errors } = useForm<RuanganFormData>({
        kode_ruangan: '',
        nama_ruangan: '',
        gedung: '',
        lantai: 1,
        kapasitas: 0,
        lokasi: '',
        penanggung_jawab: '',
        kontak_penanggung_jawab: '',
        jatah_bulanan: undefined,
        status: 'aktif',
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/master/ruangan', {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Ruangan berhasil ditambahkan',
                });
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat menambahkan ruangan',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Ruangan" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Tambah Ruangan</h1>
                        <p className="text-muted-foreground">Tambah data ruangan baru</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={ruanganIndex()}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Ruangan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <InputWithLabel
                                    label="Kode Ruangan"
                                    value={data.kode_ruangan}
                                    onChange={(e) => setData('kode_ruangan', e.target.value)}
                                    error={errors.kode_ruangan}
                                    required
                                    placeholder="Contoh: RG-001"
                                />

                                <InputWithLabel
                                    label="Nama Ruangan"
                                    value={data.nama_ruangan}
                                    onChange={(e) => setData('nama_ruangan', e.target.value)}
                                    error={errors.nama_ruangan}
                                    required
                                    placeholder="Contoh: Ruang Administrasi"
                                />

                                <InputWithLabel
                                    label="Lokasi"
                                    value={data.lokasi}
                                    onChange={(e) => setData('lokasi', e.target.value)}
                                    error={errors.lokasi}
                                    required
                                    placeholder="Contoh: Lantai 1, Gedung A"
                                />

                                <InputWithLabel
                                    label="Penanggung Jawab"
                                    value={data.penanggung_jawab}
                                    onChange={(e) => setData('penanggung_jawab', e.target.value)}
                                    error={errors.penanggung_jawab}
                                    required
                                    placeholder="Nama lengkap"
                                />

                                <InputWithLabel
                                    label="Kontak Penanggung Jawab"
                                    value={data.kontak_penanggung_jawab || ''}
                                    onChange={(e) => setData('kontak_penanggung_jawab', e.target.value)}
                                    error={errors.kontak_penanggung_jawab}
                                    placeholder="Nomor telepon"
                                />

                                <InputWithLabel
                                    label="Jatah Bulanan (Rp)"
                                    type="number"
                                    value={data.jatah_bulanan?.toString() || ''}
                                    onChange={(e) => setData('jatah_bulanan', parseInt(e.target.value) || undefined)}
                                    error={errors.jatah_bulanan}
                                    min="0"
                                    placeholder="Opsional"
                                    helperText="Batas anggaran ATK per bulan"
                                />

                                <SelectWithLabel
                                    label="Status"
                                    value={data.status}
                                    onValueChange={(value) => setData('status', value as 'aktif' | 'tidak_aktif')}
                                    options={statusOptions}
                                    error={errors.status}
                                    required
                                />
                            </div>

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