import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Filter, RotateCcw, Search } from 'lucide-react';
import type { AuditLog, AuditLogIndexProps } from '@/types/models';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export default function Index({ auth, auditLogs, filters, users }: AuditLogIndexProps) {
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [selectedLog, setSelectedLog] = useState<typeof auditLogs.data[0] | null>(null);

    const [searchParams, setSearchParams] = useState({
        user_id: filters.user_id || '',
        action: filters.action || '',
        model: filters.model || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
        search: filters.search || '',
    });

    const handleSearch = () => {
        router.get(
            '/audit-logs',
            {
                user_id: searchParams.user_id || undefined,
                action: searchParams.action || undefined,
                model: searchParams.model || undefined,
                date_from: searchParams.date_from || undefined,
                date_to: searchParams.date_to || undefined,
                search: searchParams.search || undefined,
            },
            { preserveState: true }
        );
    };

    const handleReset = () => {
        setSearchParams({
            user_id: '',
            action: '',
            model: '',
            date_from: '',
            date_to: '',
            search: '',
        });
        router.get('/audit-logs', {}, { preserveState: true });
    };

    const handleExport = (format: 'csv' | 'excel') => {
        const queryParams = new URLSearchParams({
            export: format,
            user_id: String(searchParams.user_id || ''),
            action: searchParams.action || '',
            model: searchParams.model || '',
            date_from: searchParams.date_from || '',
            date_to: searchParams.date_to || '',
            search: searchParams.search || '',
        });

        window.location.href = `/audit-logs/export?${queryParams.toString()}`;
    };

    const getActionBadgeVariant = (action: string) => {
        switch (action) {
            case 'created':
                return 'default';
            case 'updated':
                return 'secondary';
            case 'deleted':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const viewDetails = (log: typeof auditLogs.data[0]) => {
        setSelectedLog(log);
        setShowDetailDialog(true);
    };

    const renderValueComparison = () => {
        if (!selectedLog) return null;

        const oldValues = selectedLog.old_value ? JSON.parse(selectedLog.old_value) : {};
        const newValues = selectedLog.new_value ? JSON.parse(selectedLog.new_value) : {};

        const allKeys = new Set([...Object.keys(oldValues), ...Object.keys(newValues)]);

        return (
            <div className="space-y-2">
                {Array.from(allKeys).map((key) => {
                    const oldVal = oldValues[key];
                    const newVal = newValues[key];
                    const hasChanged = oldVal !== newVal;

                    return (
                        <div
                            key={key}
                            className={`rounded-md border p-3 ${hasChanged ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950' : ''}`}
                        >
                            <div className="mb-1 font-semibold text-sm">{key.replace(/_/g, ' ').toUpperCase()}</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Sebelum:</span>
                                    <div className="mt-1 rounded bg-red-50 p-2 dark:bg-red-950">
                                        {oldVal !== undefined ? String(oldVal) : '-'}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Sesudah:</span>
                                    <div className="mt-1 rounded bg-green-50 p-2 dark:bg-green-950">
                                        {newVal !== undefined ? String(newVal) : '-'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <AppLayout>
            <Head title="Audit Logs" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
                        <p className="text-muted-foreground">
                            Riwayat aktivitas dan perubahan data sistem
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleExport('csv')}>
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button variant="outline" onClick={() => handleExport('excel')}>
                            <Download className="mr-2 h-4 w-4" />
                            Export Excel
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter Pencarian</CardTitle>
                        <CardDescription>Gunakan filter untuk mempersempit pencarian logs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="search">Cari Keterangan</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="search"
                                        placeholder="Cari di description..."
                                        className="pl-9"
                                        value={searchParams.search}
                                        onChange={(e) =>
                                            setSearchParams({ ...searchParams, search: e.target.value })
                                        }
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="user_id">User</Label>
                                <Select
                                    value={String(searchParams.user_id)}
                                    onValueChange={(value) =>
                                        setSearchParams({ ...searchParams, user_id: value })
                                    }
                                >
                                    <SelectTrigger id="user_id">
                                        <SelectValue placeholder="Semua User" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua User</SelectItem>
                                        {users.map((user) => (
                                            <SelectItem key={user.id} value={String(user.id)}>
                                                {user.name} ({user.username})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="action">Aksi</Label>
                                <Select
                                    value={searchParams.action}
                                    onValueChange={(value) =>
                                        setSearchParams({ ...searchParams, action: value })
                                    }
                                >
                                    <SelectTrigger id="action">
                                        <SelectValue placeholder="Semua Aksi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Aksi</SelectItem>
                                        <SelectItem value="created">Created</SelectItem>
                                        <SelectItem value="updated">Updated</SelectItem>
                                        <SelectItem value="deleted">Deleted</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="model">Model</Label>
                                <Select
                                    value={searchParams.model}
                                    onValueChange={(value) =>
                                        setSearchParams({ ...searchParams, model: value })
                                    }
                                >
                                    <SelectTrigger id="model">
                                        <SelectValue placeholder="Semua Model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Model</SelectItem>
                                        <SelectItem value="Barang">Barang</SelectItem>
                                        <SelectItem value="Ruangan">Ruangan</SelectItem>
                                        <SelectItem value="Transaction">Transaction</SelectItem>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="Setting">Setting</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date_from">Tanggal Dari</Label>
                                <Input
                                    id="date_from"
                                    type="date"
                                    value={searchParams.date_from}
                                    onChange={(e) =>
                                        setSearchParams({ ...searchParams, date_from: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date_to">Tanggal Sampai</Label>
                                <Input
                                    id="date_to"
                                    type="date"
                                    value={searchParams.date_to}
                                    onChange={(e) =>
                                        setSearchParams({ ...searchParams, date_to: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Button onClick={handleSearch}>
                                <Filter className="mr-2 h-4 w-4" />
                                Terapkan Filter
                            </Button>
                            <Button variant="outline" onClick={handleReset}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Logs Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Audit Logs</CardTitle>
                        <CardDescription>
                            Total {auditLogs.total} logs ditemukan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Aksi</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Keterangan</TableHead>
                                    <TableHead>IP Address</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {auditLogs.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Tidak ada audit logs ditemukan
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    auditLogs.data.map((log: AuditLog) => (
                                        <TableRow key={log.id}>
                                            <TableCell className="whitespace-nowrap">
                                                {format(new Date(log.created_at), 'dd MMM yyyy HH:mm', {
                                                    locale: id,
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{log.user.name}</div>
                                                    <div className="text-muted-foreground text-xs">
                                                        @{log.user.username}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getActionBadgeVariant(log.action)}>
                                                    {log.action}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <code className="rounded bg-muted px-2 py-1 text-xs">
                                                    {log.model}
                                                </code>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {log.description}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-xs">
                                                {log.ip_address}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => viewDetails(log)}
                                                >
                                                    Detail
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {auditLogs.last_page > 1 && (
                            <div className="mt-4 flex justify-center">
                                <Pagination>
                                    <PaginationContent>
                                        {auditLogs.current_page > 1 && (
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href={auditLogs.prev_page_url || '#'}
                                                />
                                            </PaginationItem>
                                        )}

                                        {Array.from({ length: auditLogs.last_page }, (_, i) => i + 1)
                                            .filter(
                                                (page) =>
                                                    page === 1 ||
                                                    page === auditLogs.last_page ||
                                                    Math.abs(page - auditLogs.current_page) <= 1
                                            )
                                            .map((page, index, array) => (
                                                <>
                                                    {index > 0 && array[index - 1] !== page - 1 && (
                                                        <PaginationItem key={`ellipsis-${page}`}>
                                                            <span className="px-4">...</span>
                                                        </PaginationItem>
                                                    )}
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            href={`/audit-logs?page=${page}`}
                                                            isActive={page === auditLogs.current_page}
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                </>
                                            ))}

                                        {auditLogs.current_page < auditLogs.last_page && (
                                            <PaginationItem>
                                                <PaginationNext
                                                    href={auditLogs.next_page_url || '#'}
                                                />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Detail Dialog */}
            <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
                <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Detail Audit Log</DialogTitle>
                        <DialogDescription>
                            Perbandingan nilai sebelum dan sesudah perubahan
                        </DialogDescription>
                    </DialogHeader>
                    {selectedLog && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>User</Label>
                                    <div className="mt-1 text-sm">
                                        {selectedLog.user.name} (@{selectedLog.user.username})
                                    </div>
                                </div>
                                <div>
                                    <Label>Waktu</Label>
                                    <div className="mt-1 text-sm">
                                        {format(new Date(selectedLog.created_at), 'dd MMMM yyyy HH:mm:ss', {
                                            locale: id,
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <Label>Aksi</Label>
                                    <div className="mt-1">
                                        <Badge variant={getActionBadgeVariant(selectedLog.action)}>
                                            {selectedLog.action}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <Label>Model</Label>
                                    <div className="mt-1">
                                        <code className="rounded bg-muted px-2 py-1 text-xs">
                                            {selectedLog.model}
                                        </code>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <Label>Keterangan</Label>
                                    <div className="mt-1 text-sm">{selectedLog.description}</div>
                                </div>
                                <div>
                                    <Label>IP Address</Label>
                                    <div className="mt-1 text-muted-foreground text-sm">
                                        {selectedLog.ip_address}
                                    </div>
                                </div>
                                <div>
                                    <Label>User Agent</Label>
                                    <div className="mt-1 text-muted-foreground text-xs">
                                        {selectedLog.user_agent}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label className="mb-3 block">Perubahan Data</Label>
                                {renderValueComparison()}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
