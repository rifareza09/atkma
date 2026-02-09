import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { InputWithLabel, SelectWithLabel, TextareaWithLabel } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { barangMasukIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Barang, BreadcrumbItem, SelectOption } from '@/types';

interface BarangMasukCreateProps {
    barangs: Barang[];
}

interface BarangMasukFormData {
    barang_id: number;
    jumlah: number;
    tanggal: string;
    sumber_tujuan: string;
    nomor_referensi: string;
    keterangan: string;
}

export default function BarangMasukCreate({ barangs }: BarangMasukCreateProps) {
    const { toast } = useToast();
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Barang Masuk', href: barangMasukIndex() },
        { title: 'Tambah Barang Masuk', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm<BarangMasukFormData>({
        barang_id: 0,
        jumlah: 1,
        tanggal: new Date().toISOString().split('T')[0],
        sumber_tujuan: '',
        nomor_referensi: '',
        keterangan: '',
    });

    const barangOptions: SelectOption[] = barangs.map((b) => ({
        value: b.id.toString(),
        label: `${b.kode} - ${b.nama} (Stok: ${b.stok})`,
    }));

    const selectedBarang = barangs.find(b => b.id === data.barang_id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/transaksi/barang-masuk', {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Barang masuk berhasil dicatat',
                });
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat mencatat barang masuk',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Barang Masuk" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Tambah Barang Masuk</h1>
                        <p className="text-muted-foreground">
                            Catat barang masuk ke gudang
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={barangMasukIndex()}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Barang Masuk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Barang */}
                                <SelectWithLabel
                                    label="Barang"
                                    value={data.barang_id.toString()}
                                    onValueChange={(value) =>
                                        setData('barang_id', parseInt(value))
                                    }
                                    options={barangOptions}
                                    error={errors.barang_id}
                                    required
                                />

                                {/* Jumlah */}
                                <InputWithLabel
                                    label="Jumlah"
                                    type="number"
                                    value={data.jumlah.toString()}
                                    onChange={(e) =>
                                        setData('jumlah', parseInt(e.target.value) || 0)
                                    }
                                    error={errors.jumlah}
                                    required
                                    min="1"
                                    helperText={selectedBarang ? `Satuan: ${selectedBarang.satuan}` : ''}
                                />

                                {/* Tanggal */}
                                <InputWithLabel
                                    label="Tanggal Masuk"
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) =>
                                        setData('tanggal', e.target.value)
                                    }
                                    error={errors.tanggal}
                                    required
                                />

                                {/* Supplier/Sumber */}
                                <InputWithLabel
                                    label="Supplier/Sumber"
                                    value={data.sumber_tujuan}
                                    onChange={(e) =>
                                        setData('sumber_tujuan', e.target.value)
                                    }
                                    error={errors.sumber_tujuan}
                                    required
                                    placeholder="Nama supplier atau sumber barang"
                                />

                                {/* Nomor Referensi */}
                                <InputWithLabel
                                    label="Nomor Referensi"
                                    value={data.nomor_referensi}
                                    onChange={(e) =>
                                        setData('nomor_referensi', e.target.value)
                                    }
                                    error={errors.nomor_referensi}
                                    required
                                    placeholder="Contoh: PO-2024-001"
                                />
                            </div>

                            {/* Keterangan */}
                            <TextareaWithLabel
                                label="Keterangan"
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData('keterangan', e.target.value)
                                }
                                error={errors.keterangan}
                                placeholder="Keterangan barang masuk (opsional)"
                                rows={4}
                            />

                            {/* Preview Stok */}
                            {selectedBarang && (
                                <div className="rounded-lg border p-4 bg-muted/50">
                                    <p className="text-sm font-medium mb-2">Preview Stok</p>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Stok Saat Ini:</span>
                                            <span className="ml-2 font-semibold">{selectedBarang.stok}</span>
                                        </div>
                                        <span className="text-muted-foreground">→</span>
                                        <div>
                                            <span className="text-muted-foreground">Stok Setelah Masuk:</span>
                                            <span className="ml-2 font-semibold text-green-600">
                                                {selectedBarang.stok + data.jumlah}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                                    {processing ? 'Menyimpan...' : 'Simpan Barang Masuk'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
