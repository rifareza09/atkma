<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General Settings
            [
                'key' => 'app_name',
                'value' => 'Mahkamah Agung RI - Sistem Inventaris ATK',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Nama aplikasi',
            ],
            [
                'key' => 'app_logo',
                'value' => '/images/logo.png',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Path logo aplikasi',
            ],
            [
                'key' => 'low_stock_threshold',
                'value' => '10',
                'type' => 'number',
                'group' => 'general',
                'description' => 'Batas minimum stok barang',
            ],
            [
                'key' => 'items_per_page',
                'value' => '10',
                'type' => 'number',
                'group' => 'general',
                'description' => 'Jumlah item per halaman',
            ],

            // Email Settings
            [
                'key' => 'email_notifications_enabled',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'email',
                'description' => 'Aktifkan notifikasi email',
            ],
            [
                'key' => 'email_from_address',
                'value' => 'noreply@mahkamahagung.go.id',
                'type' => 'string',
                'group' => 'email',
                'description' => 'Email pengirim',
            ],
            [
                'key' => 'email_from_name',
                'value' => 'Sistem Inventaris ATK',
                'type' => 'string',
                'group' => 'email',
                'description' => 'Nama pengirim email',
            ],
            [
                'key' => 'notify_on_low_stock',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'email',
                'description' => 'Kirim email saat stok rendah',
            ],

            // Backup Settings
            [
                'key' => 'auto_backup_enabled',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'backup',
                'description' => 'Aktifkan backup otomatis',
            ],
            [
                'key' => 'backup_frequency',
                'value' => 'daily',
                'type' => 'string',
                'group' => 'backup',
                'description' => 'Frekuensi backup (daily, weekly, monthly)',
            ],
            [
                'key' => 'backup_retention_days',
                'value' => '30',
                'type' => 'number',
                'group' => 'backup',
                'description' => 'Lama penyimpanan backup (hari)',
            ],

            // Audit Settings
            [
                'key' => 'audit_enabled',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'audit',
                'description' => 'Aktifkan audit trail',
            ],
            [
                'key' => 'audit_retention_days',
                'value' => '90',
                'type' => 'number',
                'group' => 'audit',
                'description' => 'Lama penyimpanan audit log (hari)',
            ],
            [
                'key' => 'audit_track_changes',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'audit',
                'description' => 'Track perubahan data (old/new values)',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
