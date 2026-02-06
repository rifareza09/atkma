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
import { ruanganCreate, ruanganEdit, ruanganShow, ruanganIndex } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Ruangan, BreadcrumbItem, PaginatedResponse } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Master Data', href: '#' },
    { title: 'Data Ruangan', href: ruanganIndex() },
];

interface RuanganIndexProps {
    ruangans: PaginatedResponse<Ruangan>;
    filters: {
        search?: string;
        status?: string;
    };
}

const statusOptions: FilterOption[] = [
    { value: '', label: 'Semua Status' },
    { value: '1', label: 'Aktif' },
    { value: '0', label: 'Tidak Aktif' },
];

export default function RuanganIndex({ ruangans, filters }: RuanganIndexProps) {
    const { toast } = useToast();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleSearch = (search: string) => {
        router.get(
            ruanganIndex(),
            { ...filters, search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            ruanganIndex(),
            { ...filters, [key]: value || undefined },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = () => {
        if (!deleteId) return;

        router.delete(`/master/ruangan/${deleteId}`, {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Ruangan berhasil dihapus',
                });
                setDeleteId(null);
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat menghapus ruangan',
                    variant: 'destructive',
                });
            },
        });
    };

    const columns: Column<Ruangan>[] = [
        {
            key: 'kode',
            label: 'Kode Ruangan',
            render: (item) => (
                <span className="font-medium">{item.kode}</span>
            ),
        },
        {
            key: 'nama',
            label: 'Nama Ruangan',
        },
        {
            key: 'penanggung_jawab',
            label: 'Penanggung Jawab',
            render: (item) => (
                <span className="text-muted-foreground">
                    {item.penanggung_jawab || '-'}
                </span>
            ),
        },
        {
            key: 'transactions_count',
            label: 'Total Transaksi',
            render: (item) => (
                <span className="text-center">
                    {item.transactions_count || 0}
                </span>
            ),
            className: 'text-center',
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
                        <Link href={ruanganShow(item.id)}>
                            <Eye className="size-4" />
                        </Link>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                        <Link href={ruanganEdit(item.id)}>
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
            <Head title="Data Ruangan" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Data Ruangan</h1>
                        <p className="text-muted-foreground">
                            Kelola data master ruangan
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={ruanganCreate()}>
                            <Plus className="mr-2 size-4" />
                            Tambah Ruangan
                        </Link>
                    </Button>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-4">
                    <SearchInput
                        value={filters.search}
                        onSearch={handleSearch}
                        placeholder="Cari kode, nama, atau penanggung jawab..."
                        className="max-w-md"
                    />
                    <FilterSelect
                        value={filters.status}
                        onValueChange={(value) => handleFilterChange('status', value)}
                        options={statusOptions}
                        placeholder="Status"
                    />
                </div>

                {/* Data Table */}
                <DataTable<Ruangan>
                    columns={columns}
                    data={ruangans.data}
                    keyField="id"
                />

                {/* Pagination */}
                {ruangans.meta && (
                    <Pagination
                        meta={ruangans.meta}
                        onPageChange={(page) => {
                            router.get(
                                ruanganIndex(),
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
                title="Hapus Ruangan"
                description="Yakin ingin menghapus ruangan ini? Data akan disimpan dalam soft delete."
                confirmText="Hapus"
                cancelText="Batal"
            />
        </AppLayout>
    );
}
