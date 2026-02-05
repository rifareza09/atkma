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

export default function RuanganIndex({ ruangans, filters }: RuanganIndexProps) {
    const { toast } = useToast();
    const [search, setSearch] = useState(filters.search || '');

    // Mock data untuk development
    const mockRuangans: PaginatedResponse<Ruangan> = ruangans || {
        data: [
            {
                id: 1,
                kode_ruangan: 'RG-001',
                nama_ruangan: 'Ruang Administrasi',
                lokasi: 'Lantai 1, Gedung A',
                penanggung_jawab: 'Budi Santoso',
                kontak_penanggung_jawab: '081234567890',
                jatah_bulanan: 500000,
                status: 'aktif',
                created_at: '2025-01-01T00:00:00.000Z',
                updated_at: '2025-02-01T00:00:00.000Z',
            },
            {
                id: 2,
                kode_ruangan: 'RG-002',
                nama_ruangan: 'Ruang Arsip',
                lokasi: 'Lantai 2, Gedung A',
                penanggung_jawab: 'Siti Aminah',
                kontak_penanggung_jawab: '081234567891',
                jatah_bulanan: 300000,
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
            ruanganIndex(),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus ruangan ini?')) {
            router.delete(`/master/ruangan/${id}`, {
                onSuccess: () => {
                    toast({
                        title: 'Berhasil',
                        description: 'Ruangan berhasil dihapus',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Gagal',
                        description: 'Terjadi kesalahan saat menghapus ruangan',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    const columns: Column<Ruangan>[] = [
        {
            key: 'kode_ruangan',
            label: 'Kode Ruangan',
            render: (item) => (
                <span className="font-medium">{item.kode_ruangan}</span>
            ),
        },
        {
            key: 'nama_ruangan',
            label: 'Nama Ruangan',
        },
        {
            key: 'lokasi',
            label: 'Lokasi',
        },
        {
            key: 'penanggung_jawab',
            label: 'Penanggung Jawab',
        },
        {
            key: 'jatah_bulanan',
            label: 'Jatah Bulanan',
            render: (item) => (
                <span>
                    {item.jatah_bulanan 
                        ? `Rp ${item.jatah_bulanan.toLocaleString('id-ID')}`
                        : '-'}
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
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                        <Input
                            placeholder="Cari kode atau nama ruangan..."
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
                <DataTable<Ruangan>
                    columns={columns}
                    data={mockRuangans.data}
                    keyField="id"
                />

                {/* Pagination */}
                <Pagination
                    meta={mockRuangans.meta}
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
            </div>
        </AppLayout>
    );
}
