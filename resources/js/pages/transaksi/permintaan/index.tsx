import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { permintaanIndex, permintaanCreate, permintaanShow } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Transaction, PaginatedData, BreadcrumbItem, ColumnDef } from '@/types';

interface PermintaanIndexProps {
    transactions: PaginatedData<Transaction>;
    filters: {
        search?: string;
    };
}

export default function PermintaanIndex({ transactions, filters }: PermintaanIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Transaksi', href: '#' },
        { title: 'Permintaan Barang', href: permintaanIndex() },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(permintaanIndex(), { search }, { preserveState: true });
    };

    const getStatusIcon = (status: Transaction['status']) => {
        switch (status) {
            case 'disetujui':
                return <CheckCircle className="size-4" />;
            case 'ditolak':
                return <XCircle className="size-4" />;
            default:
                return <Clock className="size-4" />;
        }
    };

    const getStatusVariant = (status: Transaction['status']) => {
        switch (status) {
            case 'disetujui':
                return 'default';
            case 'ditolak':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const columns: ColumnDef<Transaction>[] = [
        {
            key: 'nomor_transaksi',
            label: 'Nomor Transaksi',
            render: (transaction) => (
                <div>
                    <p className="font-medium">{transaction.nomor_transaksi}</p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(transaction.tanggal_transaksi).toLocaleDateString('id-ID')}
                    </p>
                </div>
            ),
        },
        {
            key: 'pemohon',
            label: 'Pemohon',
            render: (transaction) => (
                <div>
                    <p className="font-medium">{transaction.pemohon}</p>
                    <p className="text-xs text-muted-foreground">{transaction.ruangan?.nama_ruangan}</p>
                </div>
            ),
        },
        {
            key: 'total_item',
            label: 'Total Item',
            render: (transaction) => (
                <p className="text-center font-semibold">
                    {transaction.items?.length || 0} Item
                </p>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (transaction) => (
                <Badge variant={getStatusVariant(transaction.status)} className="gap-1">
                    {getStatusIcon(transaction.status)}
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            render: (transaction) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                        <Link href={permintaanShow(transaction.id)}>
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
            <Head title="Permintaan Barang" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Permintaan Barang</h1>
                        <p className="text-muted-foreground">
                            Kelola permintaan barang dari berbagai ruangan
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={permintaanCreate()}>
                            <Plus className="mr-2 size-4" />
                            Buat Permintaan
                        </Link>
                    </Button>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari nomor transaksi atau pemohon..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Button type="submit">Cari</Button>
                </form>

                {/* Data Table */}
                <DataTable<Transaction> data={transactions.data} columns={columns} />

                {/* Pagination */}
                {transactions.data.length > 0 && (
                    <Pagination
                        meta={transactions.meta}
                        onPageChange={(page) => {
                            router.get(permintaanIndex(), { ...filters, page });
                        }}
                    />
                )}
            </div>
        </AppLayout>
    );
}
