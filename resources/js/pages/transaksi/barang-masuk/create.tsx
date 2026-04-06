import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Check, ChevronsUpDown, Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { InputWithLabel, TextareaWithLabel } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { barangMasukIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Barang, BreadcrumbItem } from '@/types';

interface BarangMasukCreateProps {
    barangs: Barang[];
}

interface ItemRow {
    barang_id: number;
    jumlah: number;
}

export default function BarangMasukCreate({ barangs }: BarangMasukCreateProps) {
    const { toast } = useToast();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Barang Masuk', href: barangMasukIndex() },
        { title: 'Tambah Barang Masuk', href: '#' },
    ];

    const today = new Date().toISOString().split('T')[0];

    const [tanggal, setTanggal] = useState(today);
    const [sumberTujuan, setSumberTujuan] = useState('');
    const [nomorReferensi, setNomorReferensi] = useState('');
    const [nomorFaktur, setNomorFaktur] = useState('');
    const [nomorSuratJalan, setNomorSuratJalan] = useState('');
    const [tanggalFaktur, setTanggalFaktur] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [items, setItems] = useState<ItemRow[]>([{ barang_id: 0, jumlah: 0 }]);
    const [openStates, setOpenStates] = useState<boolean[]>([false]);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const setOpen = (index: number, value: boolean) => {
        setOpenStates((prev) => prev.map((v, i) => (i === index ? value : v)));
    };

    const addItem = () => {
        setItems((prev) => [...prev, { barang_id: 0, jumlah: 0 }]);
        setOpenStates((prev) => [...prev, false]);
    };

    const removeItem = (index: number) => {
        if (items.length === 1) return;
        setItems((prev) => prev.filter((_, i) => i !== index));
        setOpenStates((prev) => prev.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof ItemRow, value: number) => {
        setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!confirm("Apakah Anda yakin ingin menyimpan transaksi barang masuk ini?")) return;

        setProcessing(true);
        setErrors({});

        router.post(
            barangMasukIndex(),
            {
                tanggal,
                sumber_tujuan: sumberTujuan,
                nomor_referensi: nomorReferensi,
                nomor_faktur: nomorFaktur,
                nomor_surat_jalan: nomorSuratJalan,
                tanggal_faktur: tanggalFaktur,
                keterangan,
                items,
            },
            {
                onSuccess: () => {
                    toast({ title: 'Berhasil', description: 'Barang masuk berhasil dicatat' });
                },
                onError: (errs) => {
                    setErrors(errs as Record<string, string>);
                    toast({
                        title: 'Gagal',
                        description: 'Periksa kembali data yang diisi',
                        variant: 'destructive',
                    });
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Barang Masuk" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Tambah Barang Masuk</h1>
                        <p className="text-muted-foreground">Catat barang masuk ke gudang</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={barangMasukIndex()}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informasi Umum */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Umum</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <InputWithLabel
                                    label="Tanggal Masuk"
                                    type="date"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    error={errors.tanggal}
                                    required
                                />
                                <InputWithLabel
                                    label="Supplier/Sumber"
                                    value={sumberTujuan}
                                    onChange={(e) => setSumberTujuan(e.target.value)}
                                    error={errors.sumber_tujuan}
                                    placeholder="Nama supplier atau sumber barang"
                                />
                                <InputWithLabel
                                    label="Nomor Referensi"
                                    value={nomorReferensi}
                                    onChange={(e) => setNomorReferensi(e.target.value)}
                                    error={errors.nomor_referensi}
                                    placeholder="Contoh: PO-2024-001"
                                />
                                <InputWithLabel
                                    label="Nomor Surat Jalan"
                                    value={nomorSuratJalan}
                                    onChange={(e) => setNomorSuratJalan(e.target.value)}
                                    error={errors.nomor_surat_jalan}
                                    placeholder="Contoh: SJ-2024-001"
                                />
                                <InputWithLabel
                                    label="Nomor Faktur"
                                    value={nomorFaktur}
                                    onChange={(e) => setNomorFaktur(e.target.value)}
                                    error={errors.nomor_faktur}
                                    placeholder="Contoh: INV-2024-001"
                                />
                                <InputWithLabel
                                    label="Tanggal Faktur"
                                    type="date"
                                    value={tanggalFaktur}
                                    onChange={(e) => setTanggalFaktur(e.target.value)}
                                    error={errors.tanggal_faktur}
                                />
                                <div className="md:col-span-2">
                                    <TextareaWithLabel
                                        label="Keterangan"
                                        value={keterangan}
                                        onChange={(e) => setKeterangan(e.target.value)}
                                        error={errors.keterangan}
                                        placeholder="Keterangan barang masuk (opsional)"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daftar Barang */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Daftar Barang</CardTitle>
                            <Button type="button" size="sm" onClick={addItem}>
                                <Plus className="mr-1 size-4" />
                                Tambah Barang
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Header kolom */}
                            <div className="hidden md:grid md:grid-cols-12 gap-3 text-sm font-medium text-muted-foreground px-1">
                                <div className="col-span-1">No</div>
                                <div className="col-span-6">Barang</div>
                                <div className="col-span-2">Jumlah</div>
                                <div className="col-span-2">Preview Stok</div>
                                <div className="col-span-1"></div>
                            </div>

                            {items.map((item, index) => {
                                const selected = barangs.find((b) => b.id === item.barang_id);
                                const itemErrors = {
                                    barang_id: errors[`items.${index}.barang_id`],
                                    jumlah: errors[`items.${index}.jumlah`],
                                };

                                return (
                                    <div
                                        key={index}
                                        className="grid md:grid-cols-12 gap-3 items-start rounded-lg border p-3 bg-muted/20"
                                    >
                                        {/* Nomor */}
                                        <div className="md:col-span-1 flex items-center h-10">
                                            <span className="text-sm font-medium text-muted-foreground">
                                                {index + 1}
                                            </span>
                                        </div>

                                        {/* Barang — Searchable Combobox */}
                                        <div className="md:col-span-6 space-y-1">
                                            <Label className="text-xs md:hidden">Barang</Label>
                                            <Popover
                                                open={openStates[index]}
                                                onOpenChange={(v) => setOpen(index, v)}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        type="button"
                                                        className={cn(
                                                            'w-full justify-between font-normal',
                                                            !item.barang_id && 'text-muted-foreground',
                                                            itemErrors.barang_id && 'border-destructive',
                                                        )}
                                                    >
                                                        <span className="truncate">
                                                            {item.barang_id
                                                                ? (() => {
                                                                      const b = barangs.find((b) => b.id === item.barang_id);
                                                                      return b ? `${b.kode} - ${b.nama}` : 'Pilih barang...';
                                                                  })()
                                                                : 'Pilih barang...'}
                                                        </span>
                                                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[400px] p-0" align="start">
                                                    <Command>
                                                        <CommandInput placeholder="Cari kode atau nama barang..." />
                                                        <CommandList>
                                                            <CommandEmpty>Barang tidak ditemukan.</CommandEmpty>
                                                            <CommandGroup>
                                                                {barangs.map((b) => (
                                                                    <CommandItem
                                                                        key={b.id}
                                                                        value={`${b.kode} ${b.nama}`}
                                                                        onSelect={() => {
                                                                            updateItem(index, 'barang_id', b.id);
                                                                            setOpen(index, false);
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 size-4',
                                                                                item.barang_id === b.id
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        <div className="flex flex-col">
                                                                            <span className="font-medium">{b.kode} — {b.nama}</span>
                                                                            <span className="text-xs text-muted-foreground">
                                                                                Stok: {b.stok} {b.satuan}
                                                                            </span>
                                                                        </div>
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            {itemErrors.barang_id && (
                                                <p className="text-xs text-destructive">{itemErrors.barang_id}</p>
                                            )}
                                        </div>

                                        {/* Jumlah */}
                                        <div className="md:col-span-2 space-y-1">
                                            <Label className="text-xs md:hidden">Jumlah</Label>
                                            <div className="flex items-center gap-1">
                                                <Input
                                                    type="number"
                                                    value={item.jumlah === 0 ? '' : item.jumlah}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val === '' || val === '-') {
                                                            updateItem(index, 'jumlah', 0);
                                                        } else {
                                                            const num = parseInt(val);
                                                            if (!isNaN(num) && num >= 0) {
                                                                updateItem(index, 'jumlah', num);
                                                            }
                                                        }
                                                    }}
                                                    placeholder="0"
                                                    className={itemErrors.jumlah ? 'border-destructive' : ''}
                                                />
                                                {selected && (
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                        {selected.satuan}
                                                    </span>
                                                )}
                                            </div>
                                            {itemErrors.jumlah && (
                                                <p className="text-xs text-destructive">{itemErrors.jumlah}</p>
                                            )}
                                        </div>

                                        {/* Preview Stok */}
                                        <div className="md:col-span-2 flex items-center h-10 text-sm">
                                            {selected ? (
                                                <span>
                                                    <span className="text-muted-foreground">{selected.stok}</span>
                                                    <span className="mx-1 text-muted-foreground">→</span>
                                                    <span className="font-semibold text-green-600">
                                                        {selected.stok + item.jumlah}
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground text-xs">—</span>
                                            )}
                                        </div>

                                        {/* Hapus */}
                                        <div className="md:col-span-1 flex items-center h-10 justify-end">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeItem(index)}
                                                disabled={items.length === 1}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}

                            {errors['items'] && (
                                <p className="text-sm text-destructive">{errors['items']}</p>
                            )}

                            {/* Summary */}
                            <div className="flex items-center justify-between rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm">
                                <span className="font-medium text-blue-700">
                                    Total {items.length} jenis barang
                                </span>
                                <span className="font-semibold text-blue-800">
                                    {items.reduce((sum, i) => sum + (i.jumlah || 0), 0)} unit masuk
                                </span>
                            </div>
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
                            {processing ? 'Menyimpan...' : 'Simpan Barang Masuk'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
