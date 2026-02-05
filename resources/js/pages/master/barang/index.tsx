import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Eye, Trash2, Search } from 'lucide-react';
import { useState } from 'react';
import type { Column } from '@/components/data-table';
import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        kategori?: string;
        status?: string;
    };
}

export default function BarangIndex({ barangs, filters }: BarangIndexProps) {
    const { toast } = useToast();
    const [search, setSearch] = useState(filters.search || '');

    // Mock data untuk development
    const mockBarangs: PaginatedResponse<Barang> = barangs || {
        data: [
            {
                id: 1,
                kode_barang: 'ATK-001',
                nama_barang: 'Kertas A4 80gsm',
                kategori: 'Kertas',
                satuan: 'rim',
                stok: 50,
                stok_minimum: 20,
                harga_satuan: 45000,
                status: 'aktif',
                deskripsi: 'Kertas A4 putih 80gsm isi 500 lembar',
                created_at: '2025-01-01T00:00:00.000Z',
                updated_at: '2025-02-01T00:00:00.000Z',
            },
            {
                id: 2,
                kode_barang: 'ATK-002',
                nama_barang: 'Pulpen Hitam Standard',
                kategori: 'Alat Tulis',
                satuan: 'pcs',
                stok: 200,
                stok_minimum: 100,
                harga_satuan: 2500,
                status: 'aktif',
                created_at: '2025-01-01T00:00:00.000Z',
                updated_at: '2025-02-01T00:00:00.000Z',
            },
        ],
        meta: {
            current_page: 1,
            from: 1,
            last_page: 1,
            per_page: 15,
            to: 2,
            total: 2,
        },
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            barangIndex(),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
            router.delete(`/master/barang/${id}`, {
                onSuccess: () => {
                    toast({
                        title: 'Berhasil',
                        description: 'Barang berhasil dihapus',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Gagal',
                        description: 'Terjadi kesalahan saat menghapus barang',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    const columns: Column<Barang>[] = [
        {
            key: 'kode_barang',
            label: 'Kode Barang',
            render: (item) => (
                <span className="font-medium">{item.kode_barang}</span>
            ),
        },
        {
            key: 'nama_barang',
            label: 'Nama Barang',
        },
        {
            key: 'kategori',
            label: 'Kategori',
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
            key: 'harga_satuan',
            label: 'Harga',
            render: (item) => (
                <span>
                    Rp {item.harga_satuan.toLocaleString('id-ID')}
                </span>
            ),
            className: 'text-right',
        },
        {
            key: 'status',
            label: 'Status',
            render: (item) => (
                <Badge variant={item.status === 'aktif' ? 'default' : 'secondary'}>
                    {item.status}
                </Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            render: (item) => (
                <div className="flex gap-2">
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
                        onClick={() => handleDelete(item.id)}
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
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                        <Input
                            placeholder="Cari kode atau nama barang..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-md"
                        />
                        <Button type="submit">
                            <Search className="mr-2 size-4" />
                            Cari
                        </Button>
                    </form>
                </div>

                {/* Data Table */}
                <DataTable<Barang>
                    columns={columns}
                    data={mockBarangs.data}
                    keyField="id"
                />

                {/* Pagination */}
                <Pagination
                    meta={mockBarangs.meta}
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
            </div>
        </AppLayout>
    );
}
