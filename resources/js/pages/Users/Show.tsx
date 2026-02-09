import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { UserShowProps } from '@/types/models';
import { ArrowLeft, Edit, Mail, User as UserIcon, Shield, Calendar, Activity } from 'lucide-react';

export default function Show({ user }: UserShowProps) {
    return (
        <AppLayout>
            <Head title={`User: ${user.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Detail Pengguna</h1>
                        <p className="text-muted-foreground">
                            Informasi lengkap tentang pengguna
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/users/${user.id}/edit`}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Link href="/users">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Profile Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>{user.name}</CardTitle>
                                        <CardDescription>@{user.username}</CardDescription>
                                    </div>
                                    <Badge variant={user.is_active ? 'default' : 'destructive'}>
                                        {user.is_active ? 'Aktif' : 'Nonaktif'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Email */}
                                <div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Email</p>
                                        <p className="text-sm text-muted-foreground break-all">{user.email}</p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Username */}
                                <div className="flex items-start gap-3">
                                    <UserIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Username</p>
                                        <p className="text-sm text-muted-foreground">{user.username}</p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Role */}
                                <div className="flex items-start gap-3">
                                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Role</p>
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="mt-1">
                                            {user.role === 'admin' ? 'Administrator' : 'Pengawas'}
                                        </Badge>
                                    </div>
                                </div>

                                <Separator />

                                {/* Created At */}
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Bergabung</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Updated At */}
                                <div className="flex items-start gap-3">
                                    <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Terakhir Diupdate</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(user.updated_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Email Verified */}
                                {user.email_verified_at && (
                                    <>
                                        <Separator />
                                        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                            ✓ Email terverifikasi sejak {new Date(user.email_verified_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </>
                                )}

                                {/* 2FA Status */}
                                {user.two_factor_confirmed_at && (
                                    <>
                                        <Separator />
                                        <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                                            🔒 Two-Factor Authentication aktif
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Statistics Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Total Transaksi</span>
                                    <span className="text-2xl font-bold">{user.transactions_count || 0}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Activity Log */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Aktivitas Terbaru</CardTitle>
                                <CardDescription>
                                    10 transaksi terakhir yang dilakukan user ini
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!user.transactions || user.transactions.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Activity className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                        <p className="mt-4 text-sm text-muted-foreground">
                                            Belum ada aktivitas transaksi
                                        </p>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Kode Transaksi</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Ruangan</TableHead>
                                                <TableHead>Tanggal</TableHead>
                                                <TableHead className="text-right">Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {user.transactions.map((transaction) => (
                                                <TableRow key={transaction.id}>
                                                    <TableCell className="font-medium">
                                                        {transaction.kode_transaksi}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={transaction.type === 'masuk' ? 'default' : 'secondary'}>
                                                            {transaction.type === 'masuk' ? 'Masuk' : 'Keluar'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {transaction.ruangan?.nama || '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(transaction.tanggal).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Link href={`/transaksi/permintaan/${transaction.id}`}>
                                                            <Button variant="ghost" size="sm">
                                                                Lihat Detail
                                                            </Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
