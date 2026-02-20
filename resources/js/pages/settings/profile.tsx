import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { Camera, Edit2, Mail, Shield, User, Users } from 'lucide-react';
import { useState } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { BreadcrumbItem, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;
    const [isEditMode, setIsEditMode] = useState(false);

    // Get initials from name for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    // Get role display name
    const getRoleBadge = (role: string) => {
        const roleColors: Record<string, string> = {
            admin: 'bg-red-100 text-red-800',
            supervisor: 'bg-blue-100 text-blue-800',
            staff: 'bg-green-100 text-green-800',
            user: 'bg-gray-100 text-gray-800',
        };

        const roleLabels: Record<string, string> = {
            admin: 'Administrator',
            supervisor: 'Supervisor',
            staff: 'Staff',
            user: 'User',
        };

        return (
            <Badge className={roleColors[role] || roleColors.user}>
                {roleLabels[role] || role}
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile Settings</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    {/* Profile Display Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profil Pengguna</CardTitle>
                            <CardDescription>
                                Informasi profil dan detail akun Anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                                {/* Profile Photo */}
                                <div className="relative">
                                    <Avatar className="h-32 w-32 border-4 border-blue-100">
                                        <AvatarImage
                                            src={auth.user.avatar_url}
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback className="bg-blue-600 text-white text-3xl">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <button
                                        type="button"
                                        className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-lg hover:bg-blue-700 transition-colors"
                                        title="Ubah foto profil"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Profile Information */}
                                <div className="flex-1 space-y-4 text-center md:text-left">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {auth.user.name}
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {auth.user.email}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        {auth.user.role && getRoleBadge(auth.user.role)}
                                        {auth.user.email_verified_at && (
                                            <Badge className="bg-green-100 text-green-800">
                                                ✓ Email Terverifikasi
                                            </Badge>
                                        )}
                                    </div>

                                    <Separator />

                                    {/* Profile Details Grid */}
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg bg-blue-50 p-2">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Nama Lengkap
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {auth.user.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg bg-blue-50 p-2">
                                                <Mail className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Email
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {auth.user.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg bg-blue-50 p-2">
                                                <Shield className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Role / Jabatan
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 capitalize">
                                                    {auth.user.role || 'User'}
                                                </p>
                                            </div>
                                        </div>

                                        {auth.user.username && (
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-lg bg-blue-50 p-2">
                                                    <Users className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">
                                                        Username / NIP
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {auth.user.username}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            onClick={() => setIsEditMode(!isEditMode)}
                                            className="w-full md:w-auto"
                                        >
                                            <Edit2 className="mr-2 h-4 w-4" />
                                            Edit Profil
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Profile Form - Only shown when edit mode is active */}
                    {isEditMode && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Edit Informasi Profil</CardTitle>
                                <CardDescription>
                                    Perbarui nama dan alamat email Anda
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form
                                    {...ProfileController.update.form()}
                                    options={{
                                        preserveScroll: true,
                                        onSuccess: () => setIsEditMode(false),
                                    }}
                                    className="space-y-6"
                                >
                                    {({ processing, recentlySuccessful, errors }) => (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Nama Lengkap</Label>

                                                <Input
                                                    id="name"
                                                    className="mt-1 block w-full"
                                                    defaultValue={auth.user.name}
                                                    name="name"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Nama lengkap"
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.name}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Alamat Email</Label>

                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="mt-1 block w-full"
                                                    defaultValue={auth.user.email}
                                                    name="email"
                                                    required
                                                    autoComplete="username"
                                                    placeholder="Alamat email"
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.email}
                                                />
                                            </div>

                                            {mustVerifyEmail &&
                                                auth.user.email_verified_at === null && (
                                                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                                                        <p className="text-sm text-amber-800">
                                                            Email Anda belum diverifikasi.{' '}
                                                            <Link
                                                                href={send()}
                                                                as="button"
                                                                className="font-medium underline hover:no-underline"
                                                            >
                                                                Klik di sini untuk mengirim ulang email verifikasi.
                                                            </Link>
                                                        </p>

                                                        {status ===
                                                            'verification-link-sent' && (
                                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                                Link verifikasi baru telah dikirim ke alamat email Anda.
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                            <div className="flex items-center gap-4">
                                                <Button
                                                    disabled={processing}
                                                    data-test="update-profile-button"
                                                >
                                                    Simpan Perubahan
                                                </Button>

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setIsEditMode(false)}
                                                >
                                                    Batal
                                                </Button>

                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transition ease-in-out"
                                                    enterFrom="opacity-0"
                                                    leave="transition ease-in-out"
                                                    leaveTo="opacity-0"
                                                >
                                                    <p className="text-sm text-green-600 font-medium">
                                                        ✓ Tersimpan
                                                    </p>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Delete Account Section */}
                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
