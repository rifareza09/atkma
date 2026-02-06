import { Head, Link, router } from '@inertiajs/react';
import { ArrowDown, ArrowLeft, ArrowUp, Package, Trash } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { BreadcrumbItem, TransactionShowProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transaksi',
        href: '/transactions',
    },
    {
        title: 'Detail Transaksi',
        href: '#',
    },
];

export default function Show({ transaction }: TransactionShowProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getTypeBadge = (type: string) => {
        return type === 'masuk' ? (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <ArrowDown className="mr-1 size-3" />
                Barang Masuk
            </Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                <ArrowUp className="mr-1 size-3" />
                Barang Keluar
            </Badge>
        );
    };

    const handleDelete = () => {
        if (
            confirm(
                'Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi stok barang.'
            )
        ) {
            router.delete(`/transactions/${transaction.id}`, {
                onSuccess: () => {
                    router.visit('/transactions');
                },
            });
        }
    };

    const totalItems = transaction.items?.reduce(
        (sum: number, item: any) => sum + item.jumlah,
        0
    ) || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Transaksi ${transaction.kode_transaksi}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {transaction.kode_transaksi}
                            </h1>
                            {getTypeBadge(transaction.type)}
                        </div>
                        <p className="text-muted-foreground">
                            Detail lengkap transaksi barang
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/transactions">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 size-4" />
                                Kembali
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            <Trash className="mr-2 size-4" />
                            Hapus
                        </Button>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Transaksi</CardTitle>
                            <CardDescription>
                                Detail informasi transaksi
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Kode Transaksi:
                                    </span>
                                    <span className="font-medium">
                                        {transaction.kode_transaksi}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Jenis Transaksi:
                                    </span>
                                    <span>{getTypeBadge(transaction.type)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Tanggal:
                                    </span>
                                    <span className="font-medium">
                                        {formatDate(transaction.tanggal)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Ruangan:
                                    </span>
                                    <span className="font-medium">
                                        {transaction.ruangan?.nama || '-'}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Penanggung Jawab:
                                    </span>
                                    <span className="font-medium">
                                        {transaction.user?.name || '-'}
                                    </span>
                                </div>
                                {transaction.keterangan && (
                                    <>
                                        <Separator />
                                        <div>
                                            <span className="text-muted-foreground block mb-2">
                                                Keterangan:
                                            </span>
                                            <p className="text-sm">
                                                {transaction.keterangan}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ringkasan</CardTitle>
                            <CardDescription>
                                Ringkasan transaksi barang
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Total Item:
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {transaction.items?.length || 0}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Total Jumlah:
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {totalItems}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Dibuat:
                                    </span>
                                    <span className="font-medium">
                                        {formatDateTime(transaction.created_at)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Terakhir Update:
                                    </span>
                                    <span className="font-medium">
                                        {formatDateTime(transaction.updated_at)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transaction Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Barang</CardTitle>
                        <CardDescription>
                            Barang yang ditransaksikan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!transaction.items || transaction.items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Package className="mb-4 size-12 text-muted-foreground" />
                                <p className="text-lg font-medium">
                                    Tidak ada item
                                </p>
                                <p className="text-muted-foreground">
                                    Belum ada barang dalam transaksi ini
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="pb-3 text-left font-medium text-muted-foreground">
                                                #
                                            </th>
                                            <th className="pb-3 text-left font-medium text-muted-foreground">
                                                Kode Barang
                                            </th>
                                            <th className="pb-3 text-left font-medium text-muted-foreground">
                                                Nama Barang
                                            </th>
                                            <th className="pb-3 text-right font-medium text-muted-foreground">
                                                Jumlah
                                            </th>
                                            <th className="pb-3 text-center font-medium text-muted-foreground">
                                                Satuan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transaction.items.map((item: any, index: number) => (
                                            <tr
                                                key={item.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4 text-muted-foreground">
                                                    {index + 1}
                                                </td>
                                                <td className="py-4">
                                                    <code className="rounded bg-muted px-2 py-1 text-sm">
                                                        {item.barang
                                                            ?.kode_barang || '-'}
                                                    </code>
                                                </td>
                                                <td className="py-4 font-medium">
                                                    {item.barang?.nama || '-'}
                                                </td>
                                                <td className="py-4 text-right font-semibold">
                                                    {item.jumlah.toLocaleString(
                                                        'id-ID'
                                                    )}
                                                </td>
                                                <td className="py-4 text-center">
                                                    <Badge variant="outline">
                                                        {item.barang?.satuan ||
                                                            '-'}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t-2 font-bold">
                                            <td
                                                colSpan={3}
                                                className="py-4 text-right"
                                            >
                                                Total:
                                            </td>
                                            <td className="py-4 text-right text-lg">
                                                {totalItems.toLocaleString(
                                                    'id-ID'
                                                )}
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Stock Movements (if available) */}
                {transaction.stockMovements &&
                    transaction.stockMovements.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Pergerakan Stok</CardTitle>
                                <CardDescription>
                                    Riwayat perubahan stok dari transaksi ini
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {transaction.stockMovements.map(
                                        (movement: any) => (
                                            <div
                                                key={movement.id}
                                                className="flex items-center justify-between rounded-lg border p-4"
                                            >
                                                <div className="space-y-1">
                                                    <p className="font-medium">
                                                        {movement.barang?.nama}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {movement.keterangan}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-muted-foreground">
                                                        {movement.stok_sebelum} →{' '}
                                                        {movement.stok_sesudah}
                                                    </p>
                                                    <p
                                                        className={`font-semibold ${
                                                            movement.type ===
                                                            'penambahan'
                                                                ? 'text-green-600'
                                                                : 'text-red-600'
                                                        }`}
                                                    >
                                                        {movement.type ===
                                                        'penambahan'
                                                            ? '+'
                                                            : '-'}
                                                        {movement.jumlah}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
            </div>
        </AppLayout>
    );
}
