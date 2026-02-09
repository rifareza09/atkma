import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { UserCreateProps, UserFormData } from '@/types/models';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { FormEvent } from 'react';

export default function Create({ roles }: UserCreateProps) {
    const { data, setData, post, processing, errors } = useForm<UserFormData>({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        is_active: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppLayout>
            <Head title="Tambah Pengguna Baru" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tambah Pengguna Baru</h1>
                        <p className="text-muted-foreground">
                            Buat akun pengguna baru untuk sistem
                        </p>
                    </div>
                    <Link href="/users">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Pengguna</CardTitle>
                                    <CardDescription>
                                        Isi data pengguna dengan lengkap dan benar
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
                                        <p className="text-sm text-muted-foreground">
                                            Username hanya boleh huruf, angka, dan underscore
                                        </p>
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

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password">
                                            Password <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Minimal 8 karakter"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className={errors.password ? 'border-destructive' : ''}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Password harus minimal 8 karakter dengan kombinasi huruf besar, kecil, angka, dan simbol
                                        </p>
                                        {errors.password && (
                                            <p className="text-sm text-destructive">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Password Confirmation */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">
                                            Konfirmasi Password <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            placeholder="Ulangi password"
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
                                                <SelectValue placeholder="Pilih role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role.value} value={role.value}>
                                                        {role.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-sm text-muted-foreground">
                                            Admin: Full access. Pengawas: View only
                                        </p>
                                        {errors.role && (
                                            <p className="text-sm text-destructive">{errors.role}</p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="is_active" className="flex-1">
                                            Status Aktif
                                            <p className="text-sm font-normal text-muted-foreground">
                                                User dapat login ke sistem
                                            </p>
                                        </Label>
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
                                                    Simpan User
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
