import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowDown,
    ArrowLeft,
    ArrowUp,
    Eye,
    Inbox,
    Package,
    Plus,
    Search,
    X,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem, TransactionIndexProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transaksi',
        href: '/transactions',
    },
];

export default function Index({
    transactions,
    filters,
    ruangans,
    barangs,
    transactionTypes,
}: TransactionIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [ruanganId, setRuanganId] = useState(
        filters.ruangan_id?.toString() || ''
    );
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const handleFilter = () => {
        router.get(
            '/transactions',
            {
                search,
                type,
                ruangan_id: ruanganId,
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
        setSearch('');
        setType('');
        setRuanganId('');
        setDateFrom('');
        setDateTo('');
        router.get('/transactions', {}, { preserveState: true });
    };

    const getTypeBadge = (transactionType: string) => {
        return transactionType === 'masuk' ? (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <ArrowDown className="mr-1 size-3" />
                Masuk
            </Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                <ArrowUp className="mr-1 size-3" />
                Keluar
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaksi" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Transaksi
                        </h1>
                        <p className="text-muted-foreground">
                            Kelola transaksi barang masuk dan keluar
                        </p>
                    </div>
                    <Link href="/transactions/create">
                        <Button>
                            <Plus className="mr-2 size-4" />
                            Tambah Transaksi
                        </Button>
                    </Link>
                </div>

                {/* Filter Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter</CardTitle>
                        <CardDescription>
                            Filter transaksi berdasarkan kriteria
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="search">Cari</Label>
                                <Input
                                    id="search"
                                    placeholder="Kode transaksi..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleFilter();
                                    }}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Jenis Transaksi</Label>
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder="Semua jenis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            Semua jenis
                                        </SelectItem>
                                        {transactionTypes.map((t: { value: string; label: string }) => (
                                            <SelectItem
                                                key={t.value}
                                                value={t.value}
                                            >
                                                {t.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ruangan">Ruangan</Label>
                                <Select
                                    value={ruanganId}
                                    onValueChange={setRuanganId}
                                >
                                    <SelectTrigger id="ruangan">
                                        <SelectValue placeholder="Semua ruangan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            Semua ruangan
                                        </SelectItem>
                                        {ruangans.map((r) => (
                                            <SelectItem
                                                key={r.id}
                                                value={r.id.toString()}
                                            >
                                                {r.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dateFrom">Dari Tanggal</Label>
                                <Input
                                    id="dateFrom"
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dateTo">Sampai Tanggal</Label>
                                <Input
                                    id="dateTo"
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                />
                            </div>

                            <div className="flex items-end gap-2">
                                <Button onClick={handleFilter} className="flex-1">
                                    <Search className="mr-2 size-4" />
                                    Filter
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleReset}
                                >
                                    <X className="mr-2 size-4" />
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction List */}
                <div className="space-y-4">
                    {transactions.data.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Inbox className="mb-4 size-12 text-muted-foreground" />
                                <p className="text-lg font-medium">
                                    Tidak ada transaksi
                                </p>
                                <p className="text-muted-foreground">
                                    Transaksi yang Anda cari tidak ditemukan
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {transactions.data.map((transaction) => (
                                <Card
                                    key={transaction.id}
                                    className="hover:border-primary/50 transition-colors"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-semibold">
                                                        {transaction.kode_transaksi}
                                                    </h3>
                                                    {getTypeBadge(
                                                        transaction.type
                                                    )}
                                                </div>

                                                <div className="grid gap-2 text-sm md:grid-cols-3">
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Ruangan:
                                                        </span>
                                                        <span className="ml-2 font-medium">
                                                            {transaction.ruangan
                                                                ?.nama || '-'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Tanggal:
                                                        </span>
                                                        <span className="ml-2 font-medium">
                                                            {formatDate(
                                                                transaction.tanggal
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Oleh:
                                                        </span>
                                                        <span className="ml-2 font-medium">
                                                            {transaction.user
                                                                ?.name || '-'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {transaction.keterangan && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {transaction.keterangan}
                                                    </p>
                                                )}

                                                {transaction.items && (
                                                    <div className="text-sm text-muted-foreground">
                                                        <Package className="mr-1 inline size-4" />
                                                        {transaction.items
                                                            .length}{' '}
                                                        item barang
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/transactions/${transaction.id}`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Eye className="mr-2 size-4" />
                                                        Detail
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Pagination */}
                            {transactions.last_page > 1 && (
                                <div className="flex items-center justify-center gap-2">
                                    {transactions.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={
                                                link.active
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => {
                                                if (link.url) {
                                                    router.get(link.url);
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
