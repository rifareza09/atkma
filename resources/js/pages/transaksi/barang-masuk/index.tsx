import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Eye, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { barangMasukIndex, barangMasukCreate, barangMasukShow } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { IncomingStock, PaginatedData, BreadcrumbItem, ColumnDef, SharedData } from '@/types';

interface BarangMasukIndexProps {
    incomingStocks: PaginatedData<IncomingStock>;
    filters: {
        search?: string;
    };
}

export default function BarangMasukIndex({ incomingStocks, filters }: BarangMasukIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const { auth } = usePage<SharedData>().props;
    const userRole = auth?.user?.role;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Barang Masuk', href: barangMasukIndex() },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(barangMasukIndex(), { search }, { preserveState: true });
    };

    const columns: ColumnDef<IncomingStock>[] = [
        {
            key: 'kode_barang_masuk',
            label: 'Kode Barang Masuk',
            render: (stock) => (
                <div>
                    <p className="font-medium">{stock.kode_barang_masuk}</p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(stock.tanggal_masuk).toLocaleDateString('id-ID')}
                    </p>
                </div>
            ),
        },
        {
            key: 'barang',
            label: 'Barang',
            render: (stock) => (
                <div>
                    <p className="font-medium">{stock.barang?.nama}</p>
                    <p className="text-xs text-muted-foreground">{stock.barang?.kode}</p>
                </div>
            ),
        },
        {
            key: 'jumlah',
            label: 'Jumlah',
            render: (stock) => (
                <div className="flex items-center gap-1">
                    <TrendingUp className="size-4 text-green-600" />
                    <p className="font-semibold text-green-600">
                        +{stock.jumlah} {stock.barang?.satuan}
                    </p>
                </div>
            ),
        },
        {
            key: 'sumber',
            label: 'Supplier/Sumber',
            render: (stock) => (
                <p className="text-sm">{stock.sumber || '-'}</p>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            render: (stock) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                        <Link href={barangMasukShow(stock.id)}>
                            <Eye className="size-4 mr-1" />
                            Detail
                        </Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Barang Masuk" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Barang Masuk</h1>
                        <p className="text-muted-foreground">
                            Kelola transaksi barang masuk ke gudang
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={barangMasukCreate()}>
                            <Plus className="mr-2 size-4" />
                            Tambah Barang Masuk
                        </Link>
                    </Button>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari nomor referensi atau nama barang..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Button type="submit">Cari</Button>
                </form>

                {/* Data Table */}
                <DataTable<IncomingStock> data={incomingStocks.data} columns={columns} />

                {/* Pagination */}
                {incomingStocks.data.length > 0 && (
                    <Pagination
                        meta={incomingStocks.meta}
                        onPageChange={(page) => {
                            router.get(barangMasukIndex(), { ...filters, page });
                        }}
                    />
                )}
            </div>
        </AppLayout>
    );
}
