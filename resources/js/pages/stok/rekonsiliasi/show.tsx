import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, User, FileCheck, AlertCircle, TrendingUp, TrendingDown, Check } from 'lucide-react';
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { BreadcrumbItem, StockReconciliationShowProps } from '@/types';

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
        title: 'Detail',
        href: '#',
    },
];

export default function Show({
    reconciliation,
    matched_items,
    discrepancies,
    stats
}: StockReconciliationShowProps) {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Rekonsiliasi ${formatDate(reconciliation.reconciliation_date)}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Rekonsiliasi Stok
                            </h1>
                            <Badge className="bg-blue-100 text-blue-800">
                                <FileCheck className="mr-1 size-3" />
                                #{reconciliation.id}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            Detail hasil rekonsiliasi stok fisik dengan sistem
                        </p>
                    </div>
                    <Link href="/stok/rekonsiliasi">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Button>
                    </Link>
                </div>

                {/* Summary Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Item</p>
                                    <p className="text-3xl font-bold mt-2">{stats.total}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                                    <FileCheck className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Item Cocok</p>
                                    <p className="text-3xl font-bold mt-2 text-green-600">{stats.matched}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                                    <Check className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Surplus</p>
                                    <p className="text-3xl font-bold mt-2 text-blue-600">{stats.surplus}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                                    <TrendingUp className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Shortage</p>
                                    <p className="text-3xl font-bold mt-2 text-red-600">{stats.shortage}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
                                    <TrendingDown className="h-6 w-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reconciliation Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Rekonsiliasi</CardTitle>
                        <CardDescription>Detail informasi rekonsiliasi</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Calendar className="size-4" />
                                    Tanggal Rekonsiliasi:
                                </span>
                                <span className="font-medium">
                                    {formatDate(reconciliation.reconciliation_date)}
                                </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <User className="size-4" />
                                    Penanggung Jawab:
                                </span>
                                <span className="font-medium">
                                    {reconciliation.user?.name || '-'}
                                </span>
                            </div>
                            {reconciliation.notes && (
                                <>
                                    <Separator />
                                    <div>
                                        <span className="text-muted-foreground block mb-2">
                                            Catatan:
                                        </span>
                                        <p className="text-sm bg-muted p-3 rounded">
                                            {reconciliation.notes}
                                        </p>
                                    </div>
                                </>
                            )}
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Dibuat:
                                </span>
                                <span className="font-medium">
                                    {formatDateTime(reconciliation.created_at)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Items Tabs */}
                <Tabs defaultValue="discrepancies" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="discrepancies" className="relative">
                            Selisih Ditemukan
                            {discrepancies.length > 0 && (
                                <Badge className="ml-2 bg-orange-600">
                                    {discrepancies.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="matched">
                            Item Cocok
                            <Badge className="ml-2 bg-green-600">
                                {matched_items.length}
                            </Badge>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="discrepancies">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertCircle className="size-5 text-orange-600" />
                                    Barang dengan Selisih
                                </CardTitle>
                                <CardDescription>
                                    Barang yang memiliki perbedaan antara stok sistem dan stok fisik
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {discrepancies.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Check className="size-12 text-green-600 mx-auto mb-2" />
                                        <p className="text-muted-foreground">
                                            Tidak ada selisih! Semua stok sudah cocok.
                                        </p>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>#</TableHead>
                                                <TableHead>Kode</TableHead>
                                                <TableHead>Nama Barang</TableHead>
                                                <TableHead className="text-center">Stok Sistem</TableHead>
                                                <TableHead className="text-center">Stok Fisik</TableHead>
                                                <TableHead className="text-center">Selisih</TableHead>
                                                <TableHead className="text-center">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {discrepancies.map((item, index) => {
                                                const difference = item.difference;
                                                return (
                                                    <TableRow key={item.id}>
                                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                                        <TableCell>
                                                            <code className="rounded bg-muted px-2 py-1 text-sm">
                                                                {item.barang?.kode}
                                                            </code>
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            {item.barang?.nama}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {item.system_stock.toLocaleString('id-ID')}
                                                        </TableCell>
                                                        <TableCell className="text-center font-semibold">
                                                            {item.physical_stock.toLocaleString('id-ID')}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {difference > 0 ? (
                                                                <Badge className="bg-blue-100 text-blue-800">
                                                                    <TrendingUp className="mr-1 size-3" />
                                                                    +{difference.toLocaleString('id-ID')}
                                                                </Badge>
                                                            ) : (
                                                                <Badge className="bg-red-100 text-red-800">
                                                                    <TrendingDown className="mr-1 size-3" />
                                                                    {difference.toLocaleString('id-ID')}
                                                                </Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {difference > 0 ? (
                                                                <Badge className="bg-blue-100 text-blue-800">
                                                                    Surplus
                                                                </Badge>
                                                            ) : (
                                                                <Badge className="bg-red-100 text-red-800">
                                                                    Shortage
                                                                </Badge>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="matched">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Check className="size-5 text-green-600" />
                                    Barang Cocok
                                </CardTitle>
                                <CardDescription>
                                    Barang yang stok fisiknya sama dengan stok di sistem
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {matched_items.length === 0 ? (
                                    <div className="text-center py-8">
                                        <AlertCircle className="size-12 text-orange-600 mx-auto mb-2" />
                                        <p className="text-muted-foreground">
                                            Tidak ada barang yang cocok. Semua barang memiliki selisih.
                                        </p>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>#</TableHead>
                                                <TableHead>Kode</TableHead>
                                                <TableHead>Nama Barang</TableHead>
                                                <TableHead className="text-center">Stok</TableHead>
                                                <TableHead className="text-center">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {matched_items.map((item, index) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>
                                                        <code className="rounded bg-muted px-2 py-1 text-sm">
                                                            {item.barang?.kode}
                                                        </code>
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {item.barang?.nama}
                                                    </TableCell>
                                                    <TableCell className="text-center font-semibold">
                                                        {item.system_stock.toLocaleString('id-ID')}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge className="bg-green-100 text-green-800">
                                                            <Check className="mr-1 size-3" />
                                                            Cocok
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
