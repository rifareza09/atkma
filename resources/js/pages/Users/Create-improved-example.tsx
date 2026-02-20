import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UserCreateProps, UserFormData } from '@/types/models';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEvent } from 'react';

// ✨ NEW IMPORTS
import { ValidatedInput } from '@/components/validated-input';
import { LoadingButton } from '@/components/loading-button';
import { validators, isFormValid } from '@/lib/validators';
import { useToast } from '@/hooks/use-toast-helpers';

/**
 * IMPROVED USER CREATE FORM
 * 
 * Improvements Made:
 * ✅ Real-time form validation
 * ✅ Loading button with disabled state
 * ✅ Toast notifications
 * ✅ Better error messages
 * ✅ Accessibility (ARIA labels, keyboard navigation)
 * ✅ Visual feedback (validation icons)
 */
export default function CreateImproved({ roles }: UserCreateProps) {
    const { data, setData, post, processing, errors } = useForm<UserFormData>({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        is_active: true,
    });

    const { success, error } = useToast();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        post('/users', {
            onSuccess: () => {
                success(
                    'Pengguna berhasil ditambahkan!',
                    `${data.name} telah ditambahkan ke sistem`
                );
            },
            onError: () => {
                error(
                    'Gagal menambahkan pengguna',
                    'Periksa kembali data yang Anda masukkan'
                );
            }
        });
    };

    // Check if form is valid for submit button
    const hasRequiredFields = 
        data.name.trim() !== '' &&
        data.username.trim() !== '' &&
        data.email.trim() !== '' &&
        data.password.trim() !== '' &&
        data.password_confirmation.trim() !== '' &&
        data.role !== '';

    const isValid = hasRequiredFields && isFormValid(errors);

    return (
        <AppLayout>
            <Head title="Tambah Pengguna Baru" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Tambah Pengguna Baru
                        </h1>
                        <p className="text-muted-foreground">
                            Buat akun pengguna baru untuk sistem
                        </p>
                    </div>
                    <Link href="/users">
                        <Button variant="outline" aria-label="Kembali ke daftar pengguna">
                            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                            Kembali
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} aria-label="Form tambah pengguna">
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
                                    {/* ✨ IMPROVED: ValidatedInput with real-time validation */}
                                    <ValidatedInput
                                        id="name"
                                        label="Nama Lengkap"
                                        placeholder="Masukkan nama lengkap"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        error={errors.name}
                                        validate={validators.compose(
                                            validators.required('Nama'),
                                            validators.minLength(3, 'Nama')
                                        )}
                                        required
                                    />

                                    {/* ✨ IMPROVED: Username validation */}
                                    <ValidatedInput
                                        id="username"
                                        label="Username"
                                        placeholder="contoh: john_doe"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value.toLowerCase())}
                                        error={errors.username}
                                        validate={validators.compose(
                                            validators.required('Username'),
                                            validators.minLength(3, 'Username'),
                                            validators.username
                                        )}
                                        hint="Username hanya boleh huruf, angka, dan underscore"
                                        required
                                    />

                                    {/* ✨ IMPROVED: Email validation */}
                                    <ValidatedInput
                                        id="email"
                                        label="Email"
                                        type="email"
                                        placeholder="contoh@mahkamahagung.go.id"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        error={errors.email}
                                        validate={validators.compose(
                                            validators.required('Email'),
                                            validators.email
                                        )}
                                        required
                                    />

                                    {/* ✨ IMPROVED: Password validation */}
                                    <ValidatedInput
                                        id="password"
                                        label="Password"
                                        type="password"
                                        placeholder="Minimal 8 karakter"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        error={errors.password}
                                        validate={validators.password}
                                        hint="Password harus minimal 8 karakter dengan huruf besar, kecil, dan angka"
                                        required
                                    />

                                    {/* ✨ IMPROVED: Password confirmation validation */}
                                    <ValidatedInput
                                        id="password_confirmation"
                                        label="Konfirmasi Password"
                                        type="password"
                                        placeholder="Ulangi password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        error={errors.password_confirmation}
                                        validate={validators.match(data.password, 'Password')}
                                        hint="Masukkan password yang sama"
                                        required
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Role & Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pengaturan Akun</CardTitle>
                                    <CardDescription>
                                        Role dan status pengguna
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
                                            onValueChange={(value) => setData('role', value)}
                                        >
                                            <SelectTrigger
                                                id="role"
                                                className={errors.role ? 'border-destructive' : ''}
                                                aria-label="Pilih role pengguna"
                                            >
                                                <SelectValue placeholder="Pilih role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role} value={role}>
                                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.role && (
                                            <p className="text-sm text-destructive" role="alert">
                                                {errors.role}
                                            </p>
                                        )}
                                    </div>

                                    {/* Active Status */}
                                    <div className="flex items-center justify-between space-x-2">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_active">Status Aktif</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Aktifkan akun pengguna
                                            </p>
                                        </div>
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                            aria-label="Toggle status aktif pengguna"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* ✨ IMPROVED: LoadingButton with validation */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="space-y-3">
                                        <LoadingButton
                                            type="submit"
                                            className="w-full"
                                            loading={processing}
                                            loadingText="Menyimpan..."
                                            disabled={!isValid || processing}
                                            aria-label="Simpan pengguna baru"
                                        >
                                            <Save className="mr-2 h-4 w-4" aria-hidden="true" />
                                            Simpan Pengguna
                                        </LoadingButton>
                                        
                                        <Link href="/users" className="block">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                disabled={processing}
                                                aria-label="Batal dan kembali"
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
