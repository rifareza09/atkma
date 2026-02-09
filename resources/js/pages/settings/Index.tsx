import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { SettingsIndexProps, SettingsFormData } from '@/types/models';
import { Save, Loader2, Settings2, Mail, Database, FileText } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Index({ general, email, backup, audit }: SettingsIndexProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    const { data, setData, put, processing, errors } = useForm<SettingsFormData>({
        // General
        app_name: general.app_name,
        app_url: general.app_url,
        timezone: general.timezone,
        date_format: general.date_format,
        // Email
        mail_from_address: email.mail_from_address,
        mail_from_name: email.mail_from_name,
        // Backup
        backup_schedule: backup.backup_schedule,
        backup_retention_days: backup.backup_retention_days,
        // Audit
        enable_audit_log: audit.enable_audit_log,
        audit_retention_days: audit.audit_retention_days,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const confirmSave = () => {
        setShowConfirm(false);
        put('/settings');
    };

    return (
        <AppLayout>
            <Head title="Pengaturan Sistem" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pengaturan Sistem</h1>
                    <p className="text-muted-foreground">
                        Kelola konfigurasi aplikasi ATK Mahkamah Agung
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="general">
                                <Settings2 className="mr-2 h-4 w-4" />
                                General
                            </TabsTrigger>
                            <TabsTrigger value="email">
                                <Mail className="mr-2 h-4 w-4" />
                                Email
                            </TabsTrigger>
                            <TabsTrigger value="backup">
                                <Database className="mr-2 h-4 w-4" />
                                Backup
                            </TabsTrigger>
                            <TabsTrigger value="audit">
                                <FileText className="mr-2 h-4 w-4" />
                                Audit
                            </TabsTrigger>
                        </TabsList>

                        {/* General Settings */}
                        <TabsContent value="general" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pengaturan Umum</CardTitle>
                                    <CardDescription>
                                        Konfigurasi dasar aplikasi
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* App Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="app_name">Nama Aplikasi</Label>
                                        <Input
                                            id="app_name"
                                            placeholder="ATK Mahkamah Agung"
                                            value={data.app_name}
                                            onChange={(e) => setData('app_name', e.target.value)}
                                            className={errors.app_name ? 'border-destructive' : ''}
                                        />
                                        {errors.app_name && (
                                            <p className="text-sm text-destructive">{errors.app_name}</p>
                                        )}
                                    </div>

                                    {/* App URL */}
                                    <div className="space-y-2">
                                        <Label htmlFor="app_url">URL Aplikasi</Label>
                                        <Input
                                            id="app_url"
                                            placeholder="http://atkma.test"
                                            value={data.app_url}
                                            onChange={(e) => setData('app_url', e.target.value)}
                                            className={errors.app_url ? 'border-destructive' : ''}
                                        />
                                        {errors.app_url && (
                                            <p className="text-sm text-destructive">{errors.app_url}</p>
                                        )}
                                    </div>

                                    {/* Timezone */}
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Timezone</Label>
                                        <Select
                                            value={data.timezone}
                                            onValueChange={(value) => setData('timezone', value)}
                                        >
                                            <SelectTrigger className={errors.timezone ? 'border-destructive' : ''}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                                                <SelectItem value="Asia/Makassar">Asia/Makassar (WITA)</SelectItem>
                                                <SelectItem value="Asia/Jayapura">Asia/Jayapura (WIT)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.timezone && (
                                            <p className="text-sm text-destructive">{errors.timezone}</p>
                                        )}
                                    </div>

                                    {/* Date Format */}
                                    <div className="space-y-2">
                                        <Label htmlFor="date_format">Format Tanggal</Label>
                                        <Select
                                            value={data.date_format}
                                            onValueChange={(value) => setData('date_format', value)}
                                        >
                                            <SelectTrigger className={errors.date_format ? 'border-destructive' : ''}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="d/m/Y">DD/MM/YYYY (06/02/2026)</SelectItem>
                                                <SelectItem value="Y-m-d">YYYY-MM-DD (2026-02-06)</SelectItem>
                                                <SelectItem value="d-M-Y">DD-MMM-YYYY (06-Feb-2026)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.date_format && (
                                            <p className="text-sm text-destructive">{errors.date_format}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Email Settings */}
                        <TabsContent value="email" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pengaturan Email</CardTitle>
                                    <CardDescription>
                                        Konfigurasi pengiriman email notifikasi
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Mail From Address */}
                                    <div className="space-y-2">
                                        <Label htmlFor="mail_from_address">Email Pengirim</Label>
                                        <Input
                                            id="mail_from_address"
                                            type="email"
                                            placeholder="noreply@mahkamahagung.go.id"
                                            value={data.mail_from_address}
                                            onChange={(e) => setData('mail_from_address', e.target.value)}
                                            className={errors.mail_from_address ? 'border-destructive' : ''}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Email yang digunakan sebagai pengirim notifikasi sistem
                                        </p>
                                        {errors.mail_from_address && (
                                            <p className="text-sm text-destructive">{errors.mail_from_address}</p>
                                        )}
                                    </div>

                                    {/* Mail From Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="mail_from_name">Nama Pengirim</Label>
                                        <Input
                                            id="mail_from_name"
                                            placeholder="Sistem ATK MA"
                                            value={data.mail_from_name}
                                            onChange={(e) => setData('mail_from_name', e.target.value)}
                                            className={errors.mail_from_name ? 'border-destructive' : ''}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Nama yang akan muncul sebagai pengirim email
                                        </p>
                                        {errors.mail_from_name && (
                                            <p className="text-sm text-destructive">{errors.mail_from_name}</p>
                                        )}
                                    </div>

                                    {/* Test Email Button */}
                                    <div className="rounded-lg bg-muted p-4">
                                        <p className="text-sm font-medium mb-2">Test Email Configuration</p>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Kirim test email untuk memastikan konfigurasi email berfungsi dengan baik
                                        </p>
                                        <Button type="button" variant="outline" size="sm">
                                            <Mail className="mr-2 h-4 w-4" />
                                            Kirim Test Email
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Backup Settings */}
                        <TabsContent value="backup" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pengaturan Backup</CardTitle>
                                    <CardDescription>
                                        Konfigurasi backup database otomatis
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Backup Schedule */}
                                    <div className="space-y-2">
                                        <Label htmlFor="backup_schedule">Jadwal Backup</Label>
                                        <Select
                                            value={data.backup_schedule}
                                            onValueChange={(value) => setData('backup_schedule', value)}
                                        >
                                            <SelectTrigger className={errors.backup_schedule ? 'border-destructive' : ''}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="daily">Harian (00:00 WIB)</SelectItem>
                                                <SelectItem value="weekly">Mingguan (Minggu, 00:00 WIB)</SelectItem>
                                                <SelectItem value="monthly">Bulanan (Tanggal 1, 00:00 WIB)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.backup_schedule && (
                                            <p className="text-sm text-destructive">{errors.backup_schedule}</p>
                                        )}
                                    </div>

                                    {/* Retention Days */}
                                    <div className="space-y-2">
                                        <Label htmlFor="backup_retention_days">Masa Simpan Backup (Hari)</Label>
                                        <Input
                                            id="backup_retention_days"
                                            type="number"
                                            min="1"
                                            max="365"
                                            value={data.backup_retention_days}
                                            onChange={(e) => setData('backup_retention_days', parseInt(e.target.value))}
                                            className={errors.backup_retention_days ? 'border-destructive' : ''}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Backup lama akan dihapus otomatis setelah periode ini
                                        </p>
                                        {errors.backup_retention_days && (
                                            <p className="text-sm text-destructive">{errors.backup_retention_days}</p>
                                        )}
                                    </div>

                                    {/* Manual Backup */}
                                    <div className="rounded-lg bg-muted p-4">
                                        <p className="text-sm font-medium mb-2">Manual Backup</p>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Buat backup database secara manual tanpa menunggu jadwal otomatis
                                        </p>
                                        <Button type="button" variant="outline" size="sm">
                                            <Database className="mr-2 h-4 w-4" />
                                            Backup Sekarang
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Audit Settings */}
                        <TabsContent value="audit" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pengaturan Audit Log</CardTitle>
                                    <CardDescription>
                                        Konfigurasi pencatatan aktivitas pengguna
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Enable Audit Log */}
                                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                                        <div className="flex-1">
                                            <Label htmlFor="enable_audit_log" className="cursor-pointer">
                                                Aktifkan Audit Log
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Mencatat semua aktivitas pengguna (create, update, delete)
                                            </p>
                                        </div>
                                        <Switch
                                            id="enable_audit_log"
                                            checked={data.enable_audit_log}
                                            onCheckedChange={(checked: boolean) => setData('enable_audit_log', checked)}
                                        />
                                    </div>

                                    {/* Audit Retention Days */}
                                    <div className="space-y-2">
                                        <Label htmlFor="audit_retention_days">Masa Simpan Log (Hari)</Label>
                                        <Input
                                            id="audit_retention_days"
                                            type="number"
                                            min="30"
                                            max="730"
                                            value={data.audit_retention_days}
                                            onChange={(e) => setData('audit_retention_days', parseInt(e.target.value))}
                                            className={errors.audit_retention_days ? 'border-destructive' : ''}
                                            disabled={!data.enable_audit_log}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Log lama akan dihapus otomatis setelah periode ini (minimal 30 hari)
                                        </p>
                                        {errors.audit_retention_days && (
                                            <p className="text-sm text-destructive">{errors.audit_retention_days}</p>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                                        <p className="font-medium mb-1">ℹ️ Informasi Audit Log</p>
                                        <ul className="list-disc list-inside space-y-1 text-xs">
                                            <li>Mencatat: User, Action, Model, Old Value, New Value, IP Address, Timestamp</li>
                                            <li>Berguna untuk tracking perubahan data dan investigasi masalah</li>
                                            <li>Dapat di-export ke CSV/Excel untuk analisis</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Save Button */}
                    <Card className="mt-6">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Perubahan akan mempengaruhi seluruh sistem
                                </p>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Simpan Pengaturan
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Perubahan</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menyimpan perubahan pengaturan sistem?
                            Perubahan akan mempengaruhi seluruh pengguna dan fitur aplikasi.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmSave}>
                            Ya, Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
