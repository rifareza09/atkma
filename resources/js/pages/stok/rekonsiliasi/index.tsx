import { Head, Link, router, usePage } from '@inertiajs/react';
import { FileCheck, Eye, Plus, Calendar, Filter } from 'lucide-react';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem, StockReconciliationIndexProps, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stok',
        href: '#',
    },
    {
        title: 'Rekonsiliasi Stok',
        href: '/stok/rekonsiliasi',
    },
];

export default function Index({ reconciliations, filters }: StockReconciliationIndexProps) {
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    const { auth } = usePage<SharedData>().props;
    const userRole = auth?.user?.role;
    const isSuperadmin = userRole === 'superadmin';

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleFilter = () => {
        router.get(
            '/stok/rekonsiliasi',
            {
                date_from: dateFrom,
                date_to: dateTo,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleReset = () => {
        setDateFrom('');
        setDateTo('');
        router.get('/stok/rekonsiliasi', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekonsiliasi Stok" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Rekonsiliasi Stok
                        </h1>
                        <p className="text-muted-foreground">
                            Kelola rekonsiliasi stok fisik dengan sistem
                        </p>
                    </div>
                    {!isSuperadmin && (
                        <Link href="/stok/rekonsiliasi/create">
                            <Button>
                                <Plus className="mr-2 size-4" />
                                Buat Rekonsiliasi Baru
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="size-5" />
                            Filter
                        </CardTitle>
                        <CardDescription>
                            Filter data rekonsiliasi berdasarkan tanggal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="date_from">Dari Tanggal</Label>
                                <Input
                                    id="date_from"
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date_to">Sampai Tanggal</Label>
                                <Input
                                    id="date_to"
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                />
                            </div>
                            <div className="flex items-end gap-2">
                                <Button onClick={handleFilter} className="flex-1">
                                    Terapkan
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleReset}
                                    className="flex-1"
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reconciliations Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileCheck className="size-5" />
                            Riwayat Rekonsiliasi
                        </CardTitle>
                        <CardDescription>
                            Total {reconciliations.total} rekonsiliasi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Penanggung Jawab</TableHead>
                                    <TableHead className="text-center">Total Item</TableHead>
                                    <TableHead className="text-center">Selisih</TableHead>
                                    <TableHead>Catatan</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reconciliations.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-8"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <FileCheck className="size-12 text-muted-foreground" />
                                                <p className="text-muted-foreground">
                                                    Belum ada data rekonsiliasi
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    reconciliations.data.map((reconciliation, index) => (
                                        <TableRow key={reconciliation.id}>
                                            <TableCell className="font-medium">
                                                {reconciliations.from! + index}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="size-4 text-muted-foreground" />
                                                    {formatDate(reconciliation.reconciliation_date)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {reconciliation.user?.name || '-'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline">
                                                    {reconciliation.total_items || 0} item
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {reconciliation.total_discrepancies === 0 ? (
                                                    <Badge className="bg-green-100 text-green-800">
                                                        Cocok
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-orange-100 text-orange-800">
                                                        {reconciliation.total_discrepancies} selisih
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {reconciliation.notes || '-'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Link href={`/stok/rekonsiliasi/${reconciliation.id}`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="size-4" />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {reconciliations.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Menampilkan {reconciliations.from} - {reconciliations.to} dari{' '}
                                    {reconciliations.total} data
                                </div>
                                <div className="flex gap-2">
                                    {reconciliations.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => {
                                                if (link.url) {
                                                    router.get(link.url);
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
