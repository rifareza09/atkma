import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Eye, Trash2, FileText, Download, Search, Package } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { FilterSelect, type FilterOption } from '@/components/filter-select';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { barangCreate, barangEdit, barangShow, barangIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Barang, BreadcrumbItem, PaginatedResponse, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Master Data', href: '#' },
    { title: 'Data Barang', href: barangIndex() },
];

interface BarangIndexProps {
    barangs: PaginatedResponse<Barang>;
    filters: {
        search?: string;
        status?: string;
        low_stock?: boolean;
    };
}

const statusOptions: FilterOption[] = [
    { value: 'all', label: 'Semua Status' },
    { value: '1', label: 'Aktif' },
    { value: '0', label: 'Tidak Aktif' },
];

const stockOptions: FilterOption[] = [
    { value: 'all', label: 'Semua Stok' },
    { value: '1', label: 'Stok Rendah' },
];

export default function BarangIndex({ barangs, filters }: BarangIndexProps) {
    const { toast } = useToast();
    const { auth } = usePage<SharedData>().props;

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleSearchSubmit = () => {
        router.get(
            barangIndex(),
            { ...filters, search: searchQuery },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            barangIndex(),
            { ...filters, [key]: value === 'all' ? undefined : value },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleDelete = () => {
        if (!deleteId) return;
        router.delete(`/master/barang/${deleteId}`, {
            onSuccess: () => {
                toast({ title: 'Berhasil', description: 'Barang berhasil dihapus' });
                setDeleteId(null);
            },
            onError: () => {
                toast({ title: 'Gagal', description: 'Terjadi kesalahan saat menghapus barang', variant: 'destructive' });
            },
        });
    };

    const getStockPercent = (barang: Barang) => {
        if (!barang.stok_minimum || barang.stok_minimum === 0) return 100;
        return Math.min(100, Math.round((barang.stok / (barang.stok_minimum * 2)) * 100));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Barang" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Master Barang</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola data master barang ATK — {barangs.meta?.total ?? barangs.data.length} barang terdaftar
                        </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open('/reports/inventory/pdf', '_blank')}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            PDF
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open('/reports/inventory/excel', '_blank')}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Excel
                        </Button>
                        <Button asChild>
                            <Link href={barangCreate()}>
                                <Plus className="mr-2 size-4" />
                                Tambah Barang
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari kode atau nama barang..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline" onClick={handleSearchSubmit}>Cari</Button>
                    <FilterSelect
                        value={filters.status || 'all'}
                        onValueChange={(value) => handleFilterChange('status', value)}
                        options={statusOptions}
                        placeholder="Status"
                    />
                    <FilterSelect
                        value={filters.low_stock ? '1' : 'all'}
                        onValueChange={(value) => handleFilterChange('low_stock', value)}
                        options={stockOptions}
                        placeholder="Filter Stok"
                    />
                </div>

                {/* Card Grid */}
                {barangs.data.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                        <Package className="mx-auto mb-4 h-12 w-12 opacity-30" />
                        <p>Tidak ada barang ditemukan</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {barangs.data.map((barang) => {
                            const isLowStock = barang.stok <= barang.stok_minimum;
                            const stockPct = getStockPercent(barang);
                            return (
                                <Card key={barang.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <Badge
                                            variant={isLowStock ? 'destructive' : 'default'}
                                            className={`absolute top-3 left-3 ${isLowStock ? 'bg-red-500' : 'bg-green-500'}`}
                                        >
                                            {isLowStock ? 'Stok Menipis' : 'Stok Aman'}
                                        </Badge>
                                        {!barang.is_active && (
                                            <Badge variant="secondary" className="absolute top-3 right-3">
                                                Nonaktif
                                            </Badge>
                                        )}
                                        <div className="text-5xl text-gray-300">📦</div>
                                    </div>

                                    <CardContent className="p-4 space-y-3">
                                        {/* Info */}
                                        <div>
                                            <p className="text-xs text-muted-foreground font-mono">{barang.kode}</p>
                                            <h3 className="font-semibold text-base leading-tight mt-0.5 line-clamp-2">
                                                {barang.nama}
                                            </h3>
                                        </div>

                                        {/* Stock Progress */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Stok</span>
                                                <span className="font-semibold text-foreground">
                                                    {barang.stok} {barang.satuan}
                                                </span>
                                            </div>
                                            <Progress
                                                value={stockPct}
                                                className={`h-1.5 ${isLowStock ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Min. {barang.stok_minimum} {barang.satuan}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-1.5 pt-1 border-t">
                                            <Button size="sm" variant="outline" className="flex-1" asChild>
                                                <Link href={barangShow(barang.id)}>
                                                    <Eye className="size-3.5 mr-1" />
                                                    Detail
                                                </Link>
                                            </Button>
                                            <Button size="sm" variant="outline" className="flex-1" asChild>
                                                <Link href={barangEdit(barang.id)}>
                                                    <Pencil className="size-3.5 mr-1" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => setDeleteId(barang.id)}
                                            >
                                                <Trash2 className="size-3.5" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {barangs.meta && (
                    <Pagination
                        meta={barangs.meta}
                        onPageChange={(page) => {
                            router.get(
                                barangIndex(),
                                { ...filters, page },
                                { preserveState: true, preserveScroll: true },
                            );
                        }}
                    />
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={deleteId !== null}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={handleDelete}
                title="Hapus Barang"
                description="Yakin ingin menghapus barang ini? Data akan disimpan dalam soft delete."
                confirmText="Hapus"
                cancelText="Batal"
            />
        </AppLayout>
    );
}
