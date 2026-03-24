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

interface TransactionItem {
    barang_id: number;
    jumlah: number;
    keterangan: string;
}

interface TransactionData {
    id: number;
    kode_transaksi: string;
    ruangan_nama: string;
    nama_peminta: string;
    type: string;
    tanggal: string;
    keterangan: string;
    items: TransactionItem[];
}

interface PermintaanEditProps {
    transaction: TransactionData;
    barangs: Barang[];
    ruangans: Ruangan[];
}

interface FormData {
    ruangan_nama: string;
    nama_peminta: string;
    type: string;
    tanggal: string;
    keterangan: string;
    items: TransactionItem[];
}

export default function PermintaanEdit({ transaction, barangs, ruangans }: PermintaanEditProps) {
    const { toast } = useToast();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Permintaan Barang', href: permintaanIndex() },
        { title: `Edit ${transaction.kode_transaksi}`, href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm<FormData>({
        ruangan_nama: transaction.ruangan_nama,
        nama_peminta: transaction.nama_peminta,
        type: transaction.type,
        tanggal: transaction.tanggal,
        keterangan: transaction.keterangan,
        items: transaction.items.length > 0
            ? transaction.items
            : [{ barang_id: 0, jumlah: 1, keterangan: '' }],
    });

    const ruanganNames = ruangans.map((r) => r.nama);

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

    const updateItem = (index: number, field: keyof TransactionItem, value: string | number) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData('items', newItems);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/transaksi/permintaan/${transaction.id}`, {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Transaksi berhasil diperbarui',
                });
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat menyimpan perubahan',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${transaction.kode_transaksi}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Permintaan</h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            {transaction.kode_transaksi}
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={permintaanIndex()}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {(errors as Record<string, string>).error && (
                    <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
                        {(errors as Record<string, string>).error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informasi Permintaan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Permintaan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="ruangan_nama" className="text-sm font-medium">
                                        Ruangan / Unit Kerja <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="ruangan_nama"
                                        type="text"
                                        list="ruangan-suggestions"
                                        value={data.ruangan_nama}
                                        onChange={(e) => setData('ruangan_nama', e.target.value)}
                                        placeholder="Ketik atau pilih nama ruangan/unit kerja"
                                        className={`flex h-10 w-full rounded-md border ${
                                            errors.ruangan_nama ? 'border-destructive' : 'border-input'
                                        } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                                        required
                                    />
                                    <datalist id="ruangan-suggestions">
                                        {ruanganNames.map((nama, index) => (
                                            <option key={index} value={nama} />
                                        ))}
                                    </datalist>
                                    {errors.ruangan_nama && (
                                        <p className="text-sm text-destructive">{errors.ruangan_nama}</p>
                                    )}
                                </div>

                                <InputWithLabel
                                    label="Nama Peminta"
                                    value={data.nama_peminta}
                                    onChange={(e) => setData('nama_peminta', e.target.value)}
                                    error={errors.nama_peminta}
                                    placeholder="Nama peminta"
                                />

                                <InputWithLabel
                                    label="Tanggal Permintaan"
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) => setData('tanggal', e.target.value)}
                                    error={errors.tanggal}
                                    required
                                />
                            </div>

                            <div className="mt-6">
                                <TextareaWithLabel
                                    label="Keterangan"
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
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
                                            error={errors[`items.${index}.barang_id` as keyof typeof errors]}
                                            required
                                        />

                                        <InputWithLabel
                                            label="Jumlah"
                                            type="number"
                                            value={item.jumlah.toString()}
                                            onChange={(e) =>
                                                updateItem(index, 'jumlah', parseInt(e.target.value) || 0)
                                            }
                                            error={errors[`items.${index}.jumlah` as keyof typeof errors]}
                                            required
                                            min="1"
                                        />

                                        <InputWithLabel
                                            label="Keterangan"
                                            value={item.keterangan}
                                            onChange={(e) =>
                                                updateItem(index, 'keterangan', e.target.value)
                                            }
                                            error={errors[`items.${index}.keterangan` as keyof typeof errors]}
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
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
