import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowDown, ArrowLeft, ArrowUp, Check, Package, Trash, X, Edit } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [reviseDialogOpen, setReviseDialogOpen] = useState(false);

    const rejectForm = useForm({
        rejection_reason: '',
    });

    const reviseForm = useForm({
        revision_notes: '',
    });

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

    const getStatusBadge = (status?: string) => {
        if (!status || status === 'pending') {
            return (
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Menunggu Persetujuan
                </Badge>
            );
        }
        if (status === 'approved') {
            return (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <Check className="mr-1 size-3" />
                    Disetujui
                </Badge>
            );
        }
        if (status === 'rejected') {
            return (
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    <X className="mr-1 size-3" />
                    Ditolak
                </Badge>
            );
        }
        if (status === 'revised') {
            return (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    <Edit className="mr-1 size-3" />
                    Perlu Revisi
                </Badge>
            );
        }
        return null;
    };

    const handleApprove = () => {
        if (confirm('Apakah Anda yakin ingin menyetujui transaksi ini?')) {
            router.post(`/transaksi/permintaan/${transaction.id}/approve`, {}, {
                preserveScroll: true,
            });
        }
    };

    const handleReject = () => {
        rejectForm.post(`/transaksi/permintaan/${transaction.id}/reject`, {
            preserveScroll: true,
            onSuccess: () => {
                setRejectDialogOpen(false);
                rejectForm.reset();
            },
        });
    };

    const handleRevise = () => {
        reviseForm.post(`/transaksi/permintaan/${transaction.id}/revise`, {
            preserveScroll: true,
            onSuccess: () => {
                setReviseDialogOpen(false);
                reviseForm.reset();
            },
        });
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
                            {getStatusBadge(transaction.status)}
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
                        {(!transaction.status || transaction.status === 'pending' || transaction.status === 'revised') && (
                            <Button
                                variant="default"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={handleApprove}
                            >
                                <Check className="mr-2 size-4" />
                                Setujui
                            </Button>
                        )}
                        {(!transaction.status || transaction.status === 'pending') && (
                            <>
                                <Button
                                    variant="default"
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={() => setReviseDialogOpen(true)}
                                >
                                    <Edit className="mr-2 size-4" />
                                    Revisi
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => setRejectDialogOpen(true)}
                                >
                                    <X className="mr-2 size-4" />
                                    Tolak
                                </Button>
                            </>
                        )}
                        <Button
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
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

                                {/* Approval Information */}
                                {transaction.status && transaction.status !== 'pending' && (
                                    <>
                                        <Separator className="my-4 border-t-2" />
                                        <div className="pt-2">
                                            <h4 className="font-semibold text-sm mb-3">Informasi Persetujuan:</h4>

                                            {transaction.status === 'approved' && transaction.approver && (
                                                <>
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-muted-foreground">Disetujui oleh:</span>
                                                        <span className="font-medium">{transaction.approver.name}</span>
                                                    </div>
                                                    {transaction.approved_at && (
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Tanggal:</span>
                                                            <span className="font-medium">{formatDateTime(transaction.approved_at)}</span>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {transaction.status === 'rejected' && transaction.rejector && (
                                                <>
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-muted-foreground">Ditolak oleh:</span>
                                                        <span className="font-medium">{transaction.rejector.name}</span>
                                                    </div>
                                                    {transaction.rejected_at && (
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-muted-foreground">Tanggal:</span>
                                                            <span className="font-medium">{formatDateTime(transaction.rejected_at)}</span>
                                                        </div>
                                                    )}
                                                    {transaction.rejection_reason && (
                                                        <div className="mt-3">
                                                            <span className="text-muted-foreground block mb-1">Alasan Penolakan:</span>
                                                            <p className="text-sm bg-red-50 p-3 rounded border border-red-200">
                                                                {transaction.rejection_reason}
                                                            </p>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {transaction.status === 'revised' && transaction.revisor && (
                                                <>
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-muted-foreground">Diminta revisi oleh:</span>
                                                        <span className="font-medium">{transaction.revisor.name}</span>
                                                    </div>
                                                    {transaction.revised_at && (
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-muted-foreground">Tanggal:</span>
                                                            <span className="font-medium">{formatDateTime(transaction.revised_at)}</span>
                                                        </div>
                                                    )}
                                                    {transaction.revision_notes && (
                                                        <div className="mt-3">
                                                            <span className="text-muted-foreground block mb-1">Catatan Revisi:</span>
                                                            <p className="text-sm bg-blue-50 p-3 rounded border border-blue-200">
                                                                {transaction.revision_notes}
                                                            </p>
                                                        </div>
                                                    )}
                                                </>
                                            )}
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
                                                            ?.kode || '-'}
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

            {/* Reject Dialog */}
            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tolak Transaksi</DialogTitle>
                        <DialogDescription>
                            Tuliskan alasan penolakan transaksi ini. Alasan minimal 10 karakter.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="rejection_reason">Alasan Penolakan *</Label>
                            <Textarea
                                id="rejection_reason"
                                placeholder="Contoh: Stok tidak mencukupi untuk permintaan ini..."
                                value={rejectForm.data.rejection_reason}
                                onChange={(e) => rejectForm.setData('rejection_reason', e.target.value)}
                                rows={4}
                                className={rejectForm.errors.rejection_reason ? 'border-red-500' : ''}
                            />
                            {rejectForm.errors.rejection_reason && (
                                <p className="text-sm text-red-600">{rejectForm.errors.rejection_reason}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setRejectDialogOpen(false)}
                            disabled={rejectForm.processing}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleReject}
                            disabled={rejectForm.processing || rejectForm.data.rejection_reason.length < 10}
                        >
                            {rejectForm.processing ? 'Memproses...' : 'Tolak Transaksi'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Revise Dialog */}
            <Dialog open={reviseDialogOpen} onOpenChange={setReviseDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Minta Revisi Transaksi</DialogTitle>
                        <DialogDescription>
                            Tuliskan catatan revisi untuk transaksi ini. Catatan minimal 10 karakter.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="revision_notes">Catatan Revisi *</Label>
                            <Textarea
                                id="revision_notes"
                                placeholder="Contoh: Mohon perbaiki jumlah barang yang diminta..."
                                value={reviseForm.data.revision_notes}
                                onChange={(e) => reviseForm.setData('revision_notes', e.target.value)}
                                rows={4}
                                className={reviseForm.errors.revision_notes ? 'border-red-500' : ''}
                            />
                            {reviseForm.errors.revision_notes && (
                                <p className="text-sm text-red-600">{reviseForm.errors.revision_notes}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setReviseDialogOpen(false)}
                            disabled={reviseForm.processing}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={handleRevise}
                            disabled={reviseForm.processing || reviseForm.data.revision_notes.length < 10}
                        >
                            {reviseForm.processing ? 'Memproses...' : 'Kirim Revisi'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
