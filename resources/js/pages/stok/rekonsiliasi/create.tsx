import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Package, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { BreadcrumbItem, StockReconciliationCreateProps, Barang } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stok',
        href: '#',
    },
    {
        title: 'Rekonsiliasi Stok',
        href: '/stok/rekonsiliasi',
    },
    {
        title: 'Buat Baru',
        href: '#',
    },
];

interface ReconciliationItem {
    barang_id: number;
    system_stock: number;
    physical_stock: number;
}

export default function Create({ barangs }: StockReconciliationCreateProps) {
    const [items, setItems] = useState<ReconciliationItem[]>(
        barangs.map(barang => ({
            barang_id: barang.id,
            system_stock: barang.stok,
            physical_stock: barang.stok, // Default sama dengan system stock
        }))
    );

    const { data, setData, post, processing, errors } = useForm({
        reconciliation_date: new Date().toISOString().split('T')[0],
        notes: '',
        items: items,
    });

    const updatePhysicalStock = (barangId: number, value: string) => {
        const physicalStock = parseInt(value) || 0;
        const updatedItems = items.map(item =>
            item.barang_id === barangId
                ? { ...item, physical_stock: physicalStock }
                : item
        );
        setItems(updatedItems);
        setData('items', updatedItems);
    };

    const getTotalDiscrepancies = () => {
        return items.filter(item => item.physical_stock !== item.system_stock).length;
    };

    const getBarangById = (id: number): Barang | undefined => {
        return barangs.find(b => b.id === id);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/stok/rekonsiliasi');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Rekonsiliasi Stok" />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Buat Rekonsiliasi Stok Baru
                        </h1>
                        <p className="text-muted-foreground">
                            Input stok fisik untuk semua barang aktif
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/stok/rekonsiliasi">
                            <Button type="button" variant="outline">
                                <ArrowLeft className="mr-2 size-4" />
                                Kembali
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 size-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Rekonsiliasi'}
                        </Button>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Barang</p>
                                    <p className="text-3xl font-bold mt-2">{items.length}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                                    <Package className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Selisih Ditemukan</p>
                                    <p className="text-3xl font-bold mt-2 text-orange-600">
                                        {getTotalDiscrepancies()}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                                    <AlertCircle className="h-6 w-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <Label htmlFor="reconciliation_date">Tanggal Rekonsiliasi *</Label>
                                <Input
                                    id="reconciliation_date"
                                    type="date"
                                    value={data.reconciliation_date}
                                    onChange={(e) => setData('reconciliation_date', e.target.value)}
                                    className={errors.reconciliation_date ? 'border-red-500' : ''}
                                />
                                {errors.reconciliation_date && (
                                    <p className="text-sm text-red-600">{errors.reconciliation_date}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Notes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Catatan</CardTitle>
                        <CardDescription>Catatan tambahan untuk rekonsiliasi ini (opsional)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="Contoh: Rekonsiliasi rutin bulanan..."
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            rows={3}
                        />
                        {errors.notes && (
                            <p className="text-sm text-red-600 mt-2">{errors.notes}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Items Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Input Stok Fisik</CardTitle>
                        <CardDescription>
                            Masukkan jumlah stok fisik untuk setiap barang. Kolom "Stok Sistem" adalah data dari database.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Kode Barang</TableHead>
                                    <TableHead>Nama Barang</TableHead>
                                    <TableHead className="text-center">Satuan</TableHead>
                                    <TableHead className="text-center">Stok Sistem</TableHead>
                                    <TableHead className="text-center">Stok Fisik *</TableHead>
                                    <TableHead className="text-center">Selisih</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item, index) => {
                                    const barang = getBarangById(item.barang_id);
                                    const difference = item.physical_stock - item.system_stock;

                                    return (
                                        <TableRow key={item.barang_id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <code className="rounded bg-muted px-2 py-1 text-sm">
                                                    {barang?.kode}
                                                </code>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {barang?.nama}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline">
                                                    {barang?.satuan}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center font-semibold">
                                                {item.system_stock.toLocaleString('id-ID')}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={item.physical_stock}
                                                    onChange={(e) => updatePhysicalStock(item.barang_id, e.target.value)}
                                                    className="w-24 text-center"
                                                />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {difference === 0 ? (
                                                    <Badge className="bg-green-100 text-green-800">
                                                        Cocok
                                                    </Badge>
                                                ) : difference > 0 ? (
                                                    <Badge className="bg-blue-100 text-blue-800">
                                                        +{difference.toLocaleString('id-ID')}
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-red-100 text-red-800">
                                                        {difference.toLocaleString('id-ID')}
                                                    </Badge>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        {errors.items && (
                            <p className="text-sm text-red-600 mt-2">{errors.items}</p>
                        )}
                    </CardContent>
                </Card>
            </form>
        </AppLayout>
    );
}
