import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, Filter, Download, Eye, Calendar, Package } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { BreadcrumbItem, IncomingStockIndexProps, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Stok', href: '#' },
    { title: 'Barang Masuk', href: '/stok/barang-masuk' },
];

export default function Index({ incomingStocks, filters, barangs }: IncomingStockIndexProps) {
    const { auth } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search || '');
    const canCreate = auth.user.role === 'admin';

    const handleFilter = () => {
        router.get('/stok/barang-masuk', {
            search,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setSearch('');
        router.get('/stok/barang-masuk');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Barang Masuk" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Barang Masuk</h1>
                        <p className="text-muted-foreground">
                            Kelola pencatatan barang masuk dan penambahan stok
                        </p>
                    </div>
                    {canCreate && (
                        <Button asChild>
                            <Link href="/stok/barang-masuk/create">
                                <Plus className="mr-2 size-4" />
                                Catat Barang Masuk
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Filter & Pencarian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2 md:col-span-2">
                                <Label>Cari</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Cari kode barang masuk, nama barang..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div className="flex items-end gap-2">
                                <Button onClick={handleFilter} className="flex-1">
                                    <Filter className="mr-2 size-4" />
                                    Filter
                                </Button>
                                <Button onClick={handleReset} variant="outline">
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardDescription>
                                Menampilkan {incomingStocks.data.length} dari {incomingStocks.total} data
                            </CardDescription>
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 size-4" />
                                Export
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Barang</TableHead>
                                    <TableHead className="text-right">Jumlah</TableHead>
                                    <TableHead>Sumber</TableHead>
                                    <TableHead>Dicatat Oleh</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incomingStocks.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                            Tidak ada data barang masuk
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    incomingStocks.data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">
                                                {item.kode_barang_masuk}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="size-4 text-muted-foreground" />
                                                    {formatDate(item.tanggal_masuk)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Package className="size-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="font-medium">{item.barang?.nama}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {item.barang?.kode}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className="font-semibold">{item.jumlah}</span>
                                                <span className="text-muted-foreground ml-1">
                                                    {item.barang?.satuan}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {item.sumber || '-'}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {item.user?.name}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`/stok/barang-masuk/${item.id}`}>
                                                        <Eye className="mr-2 size-4" />
                                                        Detail
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {incomingStocks.links.length > 3 && (
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-muted-foreground">
                                    Halaman {incomingStocks.current_page} dari {incomingStocks.last_page}
                                </div>
                                <div className="flex gap-1">
                                    {incomingStocks.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
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
