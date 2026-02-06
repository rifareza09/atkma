import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Column } from '@/components/data-table';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { DataTable } from '@/components/data-table';
import { FilterSelect, type FilterOption } from '@/components/filter-select';
import { Pagination } from '@/components/pagination';
import { SearchInput } from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { barangCreate, barangEdit, barangShow, barangIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Barang, BreadcrumbItem, PaginatedResponse } from '@/types';

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
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleSearch = (search: string) => {
        router.get(
            barangIndex(),
            { ...filters, search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            barangIndex(),
            { ...filters, [key]: value === 'all' ? undefined : value },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = () => {
        if (!deleteId) return;

        router.delete(`/master/barang/${deleteId}`, {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Barang berhasil dihapus',
                });
                setDeleteId(null);
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat menghapus barang',
                    variant: 'destructive',
                });
            },
        });
    };

    const columns: Column<Barang>[] = [
        {
            key: 'kode',
            label: 'Kode Barang',
            render: (item) => (
                <span className="font-medium">{item.kode}</span>
            ),
        },
        {
            key: 'nama',
            label: 'Nama Barang',
        },
        {
            key: 'stok',
            label: 'Stok',
            render: (item) => (
                <div className="text-right">
                    <Badge
                        variant={
                            item.stok <= item.stok_minimum
                                ? 'destructive'
                                : 'default'
                        }
                    >
                        {item.stok} {item.satuan}
                    </Badge>
                </div>
            ),
            className: 'text-right',
        },
        {
            key: 'stok_minimum',
            label: 'Stok Minimum',
            render: (item) => (
                <span className="text-muted-foreground">
                    {item.stok_minimum} {item.satuan}
                </span>
            ),
            className: 'text-right',
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (item) => (
                <Badge variant={item.is_active ? 'default' : 'secondary'}>
                    {item.is_active ? 'Aktif' : 'Tidak Aktif'}
                </Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            render: (item) => (
                <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" asChild>
                        <Link href={barangShow(item.id)}>
                            <Eye className="size-4" />
                        </Link>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                        <Link href={barangEdit(item.id)}>
                            <Pencil className="size-4" />
                        </Link>
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteId(item.id)}
                    >
                        <Trash2 className="size-4 text-destructive" />
                    </Button>
                </div>
            ),
            className: 'text-right',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Barang" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Data Barang</h1>
                        <p className="text-muted-foreground">
                            Kelola data master barang ATK
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={barangCreate()}>
                            <Plus className="mr-2 size-4" />
                            Tambah Barang
                        </Link>
                    </Button>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-4">
                    <SearchInput
                        value={filters.search}
                        onSearch={handleSearch}
                        placeholder="Cari kode atau nama barang..."
                        className="max-w-md"
                    />
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

                {/* Data Table */}
                <DataTable<Barang>
                    columns={columns}
                    data={barangs.data}
                    keyField="id"
                />

                {/* Pagination */}
                {barangs.meta && (
                    <Pagination
                        meta={barangs.meta}
                        onPageChange={(page) => {
                            router.get(
                                barangIndex(),
                                { ...filters, page },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                },
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
