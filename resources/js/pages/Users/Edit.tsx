import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { UserEditProps, UserFormData } from '@/types/models';
import { ArrowLeft, Save, Loader2, Power, PowerOff } from 'lucide-react';
import { FormEvent } from 'react';

export default function Edit({ user, roles }: UserEditProps) {
    const { data, setData, put, processing, errors } = useForm<UserFormData>({
        name: user.name,
        username: user.username,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.role,
        is_active: user.is_active,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <AppLayout>
            <Head title={`Edit User: ${user.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Pengguna</h1>
                        <p className="text-muted-foreground">
                            Ubah informasi pengguna: {user.name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant={user.is_active ? 'default' : 'destructive'}>
                            {user.is_active ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                        <Link href="/users">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Pengguna</CardTitle>
                                    <CardDescription>
                                        Ubah data pengguna dengan lengkap dan benar
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Nama Lengkap <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Masukkan nama lengkap"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={errors.name ? 'border-destructive' : ''}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Username */}
                                    <div className="space-y-2">
                                        <Label htmlFor="username">
                                            Username <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="username"
                                            placeholder="contoh: john_doe"
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value.toLowerCase())}
                                            className={errors.username ? 'border-destructive' : ''}
                                        />
                                        {errors.username && (
                                            <p className="text-sm text-destructive">{errors.username}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="contoh@mahkamahagung.go.id"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className={errors.email ? 'border-destructive' : ''}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-destructive">{errors.email}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Password Change (Optional) */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ubah Password (Opsional)</CardTitle>
                                    <CardDescription>
                                        Kosongkan jika tidak ingin mengubah password
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password Baru</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Minimal 8 karakter"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className={errors.password ? 'border-destructive' : ''}
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-destructive">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Password Confirmation */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            placeholder="Ulangi password baru"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className={errors.password_confirmation ? 'border-destructive' : ''}
                                        />
                                        {errors.password_confirmation && (
                                            <p className="text-sm text-destructive">{errors.password_confirmation}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* User Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">User ID:</span>
                                        <p className="font-medium">#{user.id}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Bergabung:</span>
                                        <p className="font-medium">
                                            {new Date(user.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Terakhir Update:</span>
                                        <p className="font-medium">
                                            {new Date(user.updated_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Role & Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Role & Status</CardTitle>
                                    <CardDescription>
                                        Pengaturan hak akses dan status
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Role */}
                                    <div className="space-y-2">
                                        <Label htmlFor="role">
                                            Role <span className="text-destructive">*</span>
                                        </Label>
                                        <Select
                                            value={data.role}
                                            onValueChange={(value) => setData('role', value as any)}
                                        >
                                            <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role.value} value={role.value}>
                                                        {role.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.role && (
                                            <p className="text-sm text-destructive">{errors.role}</p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                                        <div className="flex-1">
                                            <Label htmlFor="is_active" className="cursor-pointer">
                                                Status Aktif
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                {data.is_active ? (
                                                    <>
                                                        <Power className="inline h-3 w-3 text-green-600 mr-1" />
                                                        User dapat login
                                                    </>
                                                ) : (
                                                    <>
                                                        <PowerOff className="inline h-3 w-3 text-destructive mr-1" />
                                                        User tidak dapat login
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked: boolean) => setData('is_active', checked)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="space-y-2">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Menyimpan...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Simpan Perubahan
                                                </>
                                            )}
                                        </Button>
                                        <Link href="/users" className="block">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                disabled={processing}
                                            >
                                                Batal
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
