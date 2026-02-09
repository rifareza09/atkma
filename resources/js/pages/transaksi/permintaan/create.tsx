import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { InputWithLabel, SelectWithLabel, TextareaWithLabel } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { permintaanIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Barang, Ruangan, BreadcrumbItem, SelectOption } from '@/types';

interface PermintaanCreateProps {
    barangs: Barang[];
    ruangans: Ruangan[];
}

interface PermintaanItem {
    barang_id: number;
    jumlah: number;
    keterangan: string;
}

interface PermintaanFormData {
    ruangan_id: number;
    pemohon: string;
    tanggal_transaksi: string;
    keterangan: string;
    items: PermintaanItem[];
}

export default function PermintaanCreate({ barangs, ruangans }: PermintaanCreateProps) {
    const { toast } = useToast();
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Permintaan Barang', href: permintaanIndex() },
        { title: 'Buat Permintaan', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm<PermintaanFormData>({
        ruangan_id: 0,
        pemohon: '',
        tanggal_transaksi: new Date().toISOString().split('T')[0],
        keterangan: '',
        items: [{ barang_id: 0, jumlah: 1, keterangan: '' }],
    });

    const ruanganOptions: SelectOption[] = ruangans.map((r) => ({
        value: r.id.toString(),
        label: `${r.kode} - ${r.nama}`,
    }));

    const barangOptions: SelectOption[] = barangs.map((b) => ({
        value: b.id.toString(),
        label: `${b.kode} - ${b.nama} (Stok: ${b.stok})`,
    }));

    const addItem = () => {
        setData('items', [...data.items, { barang_id: 0, jumlah: 1, keterangan: '' }]);
    };

    const removeItem = (index: number) => {
        if (data.items.length > 1) {
            setData('items', data.items.filter((_, i) => i !== index));
        }
    };

    const updateItem = (index: number, field: keyof PermintaanItem, value: string | number) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData('items', newItems);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/transaksi/permintaan', {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Permintaan barang berhasil dibuat',
                });
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat membuat permintaan',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Permintaan Barang" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Buat Permintaan Barang</h1>
                        <p className="text-muted-foreground">
                            Buat permintaan barang baru
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={permintaanIndex()}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informasi Permintaan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Permintaan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <SelectWithLabel
                                    label="Ruangan"
                                    value={data.ruangan_id.toString()}
                                    onValueChange={(value) =>
                                        setData('ruangan_id', parseInt(value))
                                    }
                                    options={ruanganOptions}
                                    error={errors.ruangan_id}
                                    required
                                />

                                <InputWithLabel
                                    label="Pemohon"
                                    value={data.pemohon}
                                    onChange={(e) =>
                                        setData('pemohon', e.target.value)
                                    }
                                    error={errors.pemohon}
                                    required
                                    placeholder="Nama pemohon"
                                />

                                <InputWithLabel
                                    label="Tanggal Permintaan"
                                    type="date"
                                    value={data.tanggal_transaksi}
                                    onChange={(e) =>
                                        setData('tanggal_transaksi', e.target.value)
                                    }
                                    error={errors.tanggal_transaksi}
                                    required
                                />
                            </div>

                            <div className="mt-6">
                                <TextareaWithLabel
                                    label="Keterangan"
                                    value={data.keterangan}
                                    onChange={(e) =>
                                        setData('keterangan', e.target.value)
                                    }
                                    error={errors.keterangan}
                                    placeholder="Keterangan permintaan (opsional)"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daftar Barang */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Daftar Barang</CardTitle>
                            <Button type="button" size="sm" onClick={addItem}>
                                <Plus className="mr-2 size-4" />
                                Tambah Item
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-start p-4 border rounded-lg"
                                >
                                    <div className="flex-1 grid gap-4 md:grid-cols-3">
                                        <SelectWithLabel
                                            label="Barang"
                                            value={item.barang_id.toString()}
                                            onValueChange={(value) =>
                                                updateItem(index, 'barang_id', parseInt(value))
                                            }
                                            options={barangOptions}
                                            error={errors[`items.${index}.barang_id`]}
                                            required
                                        />

                                        <InputWithLabel
                                            label="Jumlah"
                                            type="number"
                                            value={item.jumlah.toString()}
                                            onChange={(e) =>
                                                updateItem(index, 'jumlah', parseInt(e.target.value) || 0)
                                            }
                                            error={errors[`items.${index}.jumlah`]}
                                            required
                                            min="1"
                                        />

                                        <InputWithLabel
                                            label="Keterangan"
                                            value={item.keterangan}
                                            onChange={(e) =>
                                                updateItem(index, 'keterangan', e.target.value)
                                            }
                                            error={errors[`items.${index}.keterangan`]}
                                            placeholder="Keterangan item (opsional)"
                                        />
                                    </div>

                                    {data.items.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeItem(index)}
                                            className="mt-8"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

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
                            {processing ? 'Menyimpan...' : 'Simpan Permintaan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
