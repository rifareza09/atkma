import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Package, User, Calendar, FileText, TrendingUp, Edit, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type{ BreadcrumbItem, IncomingStockShowProps, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Stok', href: '#' },
    { title: 'Barang Masuk', href: '/stok/barang-masuk' },
    { title: 'Detail', href: '#' },
];

export default function Show({ incomingStock, stockMovement }: IncomingStockShowProps) {
    const { auth } = usePage<PageProps>().props;
    const canEdit = auth.user.role === 'admin' && incomingStock.status !== 'approved';
    const canDelete = auth.user.role === 'admin' && incomingStock.status !== 'approved';

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive'; label: string }> = {
            pending: { variant: 'secondary', label: 'Pending' },
            approved: { variant: 'default', label: 'Approved' },
            rejected: { variant: 'destructive', label: 'Rejected' },
        };
        const config = variants[status] || variants.approved;
        return <Badge variant={config.variant} className="text-sm">{config.label}</Badge>;
    };

    const handleDelete = () => {
        router.delete(`/stok/barang-masuk/${incomingStock.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Barang Masuk - ${incomingStock.kode_barang_masuk}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {incomingStock.kode_barang_masuk}
                            </h1>
                            {getStatusBadge(incomingStock.status)}
                        </div>
                        <p className="text-muted-foreground">
                            Detail informasi barang masuk dan perubahan stok
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/stok/barang-masuk">
                                <ArrowLeft className="mr-2 size-4" />
                                Kembali
                            </Link>
                        </Button>
                        {canEdit && (
                            <Button variant="outline" asChild>
                                <Link href={`/stok/barang-masuk/${incomingStock.id}/edit`}>
                                    <Edit className="mr-2 size-4" />
                                    Edit
                                </Link>
                            </Button>
                        )}
                        {canDelete && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">
                                        <Trash2 className="mr-2 size-4" />
                                        Hapus
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Hapus Data Barang Masuk?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Tindakan ini tidak dapat dibatalkan. Data barang masuk akan
                                            dihapus permanen dari sistem.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete}>
                                            Hapus
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Info */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Barang Masuk</CardTitle>
                            <CardDescription>
                                Detail lengkap pencatatan barang masuk
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Barang Info */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Package className="size-5 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground">Barang</p>
                                        <p className="font-semibold text-lg">
                                            {incomingStock.barang?.nama}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Kode: {incomingStock.barang?.kode}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Quantity & Date */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <TrendingUp className="size-5 text-green-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Jumlah Masuk</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            +{incomingStock.jumlah} {incomingStock.barang?.satuan}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="size-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Tanggal Masuk</p>
                                        <p className="font-semibold">
                                            {formatDate(incomingStock.tanggal_masuk)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Additional Info */}
                            <div className="space-y-4">
                                {incomingStock.sumber && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            Sumber Pengadaan
                                        </p>
                                        <p className="font-medium">{incomingStock.sumber}</p>
                                    </div>
                                )}

                                {incomingStock.nomor_dokumen && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            Nomor Dokumen
                                        </p>
                                        <p className="font-medium font-mono">
                                            {incomingStock.nomor_dokumen}
                                        </p>
                                    </div>
                                )}

                                {incomingStock.keterangan && (
                                    <div className="flex items-start gap-3">
                                        <FileText className="size-5 text-muted-foreground mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm text-muted-foreground mb-1">
                                                Keterangan
                                            </p>
                                            <p className="text-sm leading-relaxed">
                                                {incomingStock.keterangan}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* User Info */}
                            <div className="flex items-start gap-3">
                                <User className="size-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Dicatat Oleh</p>
                                    <p className="font-semibold">{incomingStock.user?.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDateTime(incomingStock.created_at)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stock Movement Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pergerakan Stok</CardTitle>
                            <CardDescription>
                                Riwayat perubahan stok barang
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {stockMovement ? (
                                <>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">
                                                Stok Sebelum
                                            </span>
                                            <span className="font-semibold">
                                                {stockMovement.stok_sebelum} {incomingStock.barang?.satuan}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-green-600">
                                            <span className="text-sm">Penambahan</span>
                                            <span className="font-semibold">
                                                +{stockMovement.jumlah} {incomingStock.barang?.satuan}
                                            </span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Stok Sesudah</span>
                                            <span className="text-xl font-bold">
                                                {stockMovement.stok_sesudah} {incomingStock.barang?.satuan}
                                            </span>
                                        </div>
                                    </div>

                                    {stockMovement.keterangan && (
                                        <div className="mt-4 p-3 bg-muted rounded-md">
                                            <p className="text-xs text-muted-foreground mb-1">
                                                Keterangan Pergerakan
                                            </p>
                                            <p className="text-sm">{stockMovement.keterangan}</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    Belum ada riwayat pergerakan stok
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
