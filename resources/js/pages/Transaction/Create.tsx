import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    AlertCircle,
    ArrowLeft,
    Check,
    Loader2,
    Plus,
    Trash,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import InputError from '@/components/input-error';
import type {
    BreadcrumbItem,
    TransactionCreateProps,
    TransactionFormData,
    TransactionItemFormData,
} from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transaksi',
        href: '/transactions',
    },
    {
        title: 'Tambah Transaksi',
        href: '/transactions/create',
    },
];

export default function Create({
    barangs,
    ruangans,
    transactionTypes,
}: TransactionCreateProps) {
    const [selectedType, setSelectedType] = useState<'masuk' | 'keluar'>(
        'masuk'
    );

    const { data, setData, post, processing, errors } =
        useForm<TransactionFormData>({
            type: 'masuk',
            ruangan_id: '',
            tanggal: new Date().toISOString().split('T')[0],
            keterangan: '',
            items: [{ barang_id: '', jumlah: '' }],
        });

    const addItem = () => {
        setData('items', [...data.items, { barang_id: '', jumlah: '' }]);
    };

    const removeItem = (index: number) => {
        const newItems = data.items.filter((_: any, i: number) => i !== index);
        setData('items', newItems.length > 0 ? newItems : [{ barang_id: '', jumlah: '' }]);
    };

    const updateItem = (
        index: number,
        field: keyof TransactionItemFormData,
        value: string | number
    ) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData('items', newItems);
    };

    const getStokInfo = (barangId: number | '') => {
        if (!barangId) return null;
        const barang = barangs.find((b: any) => b.id === barangId);
        return barang;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transactions', {
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/transactions');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Transaksi" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Tambah Transaksi
                        </h1>
                        <p className="text-muted-foreground">
                            Buat transaksi barang masuk atau keluar
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => router.visit('/transactions')}
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Kembali
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Transaction Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Transaksi</CardTitle>
                            <CardDescription>
                                Masukkan detail transaksi barang
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="type">
                                        Jenis Transaksi
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(value: any) => {
                                            setData('type', value);
                                            setSelectedType(value);
                                        }}
                                    >
                                        <SelectTrigger
                                            id="type"
                                            aria-invalid={!!errors.type}
                                        >
                                            <SelectValue placeholder="Pilih jenis transaksi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {transactionTypes.map((t: { value: string; label: string }) => (
                                                <SelectItem
                                                    key={t.value}
                                                    value={t.value}
                                                >
                                                    {t.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.type} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ruangan">
                                        Ruangan
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Select
                                        value={data.ruangan_id.toString()}
                                        onValueChange={(value) =>
                                            setData(
                                                'ruangan_id',
                                                value ? parseInt(value) : ''
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            id="ruangan"
                                            aria-invalid={!!errors.ruangan_id}
                                        >
                                            <SelectValue placeholder="Pilih ruangan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ruangans.map((r: any) => (
                                                <SelectItem
                                                    key={r.id}
                                                    value={r.id.toString()}
                                                >
                                                    {r.kode} - {r.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.ruangan_id} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tanggal">
                                        Tanggal
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        id="tanggal"
                                        type="date"
                                        value={data.tanggal}
                                        onChange={(e) =>
                                            setData('tanggal', e.target.value)
                                        }
                                        aria-invalid={!!errors.tanggal}
                                    />
                                    <InputError message={errors.tanggal} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="keterangan">
                                        Keterangan
                                    </Label>
                                    <Input
                                        id="keterangan"
                                        placeholder="Keterangan transaksi (opsional)"
                                        value={data.keterangan}
                                        onChange={(e) =>
                                            setData('keterangan', e.target.value)
                                        }
                                        aria-invalid={!!errors.keterangan}
                                    />
                                    <InputError message={errors.keterangan} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Items */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Daftar Barang</CardTitle>
                                    <CardDescription>
                                        Tambahkan barang yang akan ditransaksikan
                                    </CardDescription>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addItem}
                                >
                                    <Plus className="mr-2 size-4" />
                                    Tambah Item
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.items.map((item: any, index: number) => {
                                const stokInfo = getStokInfo(item.barang_id);
                                const itemError =
                                    errors[`items.${index}` as keyof typeof errors];

                                return (
                                    <div
                                        key={index}
                                        className="rounded-lg border p-4 space-y-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-sm">
                                                Item #{index + 1}
                                            </span>
                                            {data.items.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                >
                                                    <Trash className="mr-2 size-4" />
                                                    Hapus
                                                </Button>
                                            )}
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor={`barang-${index}`}
                                                >
                                                    Barang
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </Label>
                                                <Select
                                                    value={item.barang_id.toString()}
                                                    onValueChange={(value) =>
                                                        updateItem(
                                                            index,
                                                            'barang_id',
                                                            parseInt(value)
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger
                                                        id={`barang-${index}`}
                                                    >
                                                        <SelectValue placeholder="Pilih barang" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {barangs.map((b: any) => (
                                                            <SelectItem
                                                                key={b.id}
                                                                value={b.id.toString()}
                                                            >
                                                                {b.kode}{' '}
                                                                - {b.nama} (Stok:{' '}
                                                                {b.stok}{' '}
                                                                {b.satuan})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <InputError
                                                    message={
                                                        errors[
                                                            `items.${index}.barang_id` as keyof typeof errors
                                                        ] as string
                                                    }
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor={`jumlah-${index}`}
                                                >
                                                    Jumlah
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    id={`jumlah-${index}`}
                                                    type="number"
                                                    min="1"
                                                    placeholder="Jumlah"
                                                    value={item.jumlah}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'jumlah',
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `items.${index}.jumlah` as keyof typeof errors
                                                        ] as string
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {stokInfo && (
                                            <div className="rounded-md bg-muted p-3 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-medium">
                                                            Stok Tersedia:
                                                        </span>
                                                        <span className="ml-2">
                                                            {stokInfo.stok}{' '}
                                                            {stokInfo.satuan}
                                                        </span>
                                                    </div>
                                                    {selectedType ===
                                                        'keluar' &&
                                                        item.jumlah &&
                                                        Number(item.jumlah) >
                                                            stokInfo.stok && (
                                                            <span className="text-destructive font-medium">
                                                                <AlertCircle className="mr-1 inline size-4" />
                                                                Stok tidak cukup!
                                                            </span>
                                                        )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {errors.items && typeof errors.items === 'string' && (
                                <InputError message={errors.items} />
                            )}
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/transactions')}
                            disabled={processing}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Check className="mr-2 size-4" />
                                    Simpan Transaksi
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
