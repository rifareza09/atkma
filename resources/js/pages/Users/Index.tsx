import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserIndexProps } from '@/types/models';
import { Plus, Search, Edit, Trash2, Power, PowerOff } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Index({ users, filters, roles }: UserIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [status, setStatus] = useState(filters.status !== undefined ? String(filters.status) : '');

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        router.get('/users', {
            search: search || undefined,
            role: role || undefined,
            status: status || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClearFilters = () => {
        setSearch('');
        setRole('');
        setStatus('');
        router.get('/users', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleToggleActive = (userId: number) => {
        if (confirm('Apakah Anda yakin ingin mengubah status user ini?')) {
            router.post(`/users/${userId}/toggle-active`, {}, {
                preserveScroll: true,
            });
        }
    };

    const handleDelete = (userId: number, userName: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus user "${userName}"?`)) {
            router.delete(`/users/${userId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Manajemen Pengguna" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
                        <p className="text-muted-foreground">
                            Kelola pengguna sistem dan hak akses
                        </p>
                    </div>
                    <Link href="/users/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah User
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter & Pencarian</CardTitle>
                        <CardDescription>
                            Gunakan filter untuk mencari pengguna tertentu
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFilter} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-4">
                                {/* Search */}
                                <div className="space-y-2">
                                    <Label htmlFor="search">Cari User</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="search"
                                            placeholder="Nama, username, email..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                {/* Role Filter */}
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select value={role} onValueChange={setRole}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Semua Role</SelectItem>
                                            {roles.map((roleOption) => (
                                                <SelectItem key={roleOption.value} value={roleOption.value}>
                                                    {roleOption.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Status Filter */}
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Semua Status</SelectItem>
                                            <SelectItem value="1">Aktif</SelectItem>
                                            <SelectItem value="0">Nonaktif</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-end space-x-2">
                                    <Button type="submit" className="flex-1">
                                        Filter
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleClearFilters}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pengguna</CardTitle>
                        <CardDescription>
                            Total {users.total} pengguna terdaftar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Bergabung</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                                            Tidak ada data pengguna
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.data.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                                    {user.role === 'admin' ? 'Admin' : 'Pengawas'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={user.is_active ? 'default' : 'destructive'}>
                                                    {user.is_active ? 'Aktif' : 'Nonaktif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(user.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/users/${user.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            Detail
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/users/${user.id}/edit`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleToggleActive(user.id)}
                                                    >
                                                        {user.is_active ? (
                                                            <PowerOff className="h-4 w-4 text-orange-600" />
                                                        ) : (
                                                            <Power className="h-4 w-4 text-green-600" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(user.id, user.name)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {users.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Menampilkan {users.from} - {users.to} dari {users.total} data
                                </div>
                                <div className="flex gap-2">
                                    {users.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
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
