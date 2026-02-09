<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Display settings page
     */
    public function index(): Response
    {
        $this->authorize('viewAny', Setting::class);

        $settings = $this->getAppSettings();

        return Inertia::render('settings/index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update application settings
     */
    public function update(Request $request): RedirectResponse
    {
        $this->authorize('update', Setting::class);

        $validator = Validator::make($request->all(), [
            'app_name' => 'required|string|max:255',
            'app_description' => 'nullable|string|max:500',
            'items_per_page' => 'required|integer|min:5|max:100',
            'low_stock_threshold' => 'required|integer|min:1|max:100',
            'enable_email_notifications' => 'boolean',
            'enable_stock_alerts' => 'boolean',
            'enable_audit_log' => 'boolean',
            'backup_enabled' => 'boolean',
            'backup_schedule' => 'nullable|string|in:daily,weekly,monthly',
            'backup_retention_days' => 'nullable|integer|min:1|max:365',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();

        // Update each setting
        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        // Clear settings cache
        Cache::forget('app_settings');

        return back()->with('success', 'Pengaturan berhasil diperbarui');
    }

    /**
     * Get application settings with caching
     */
    private function getAppSettings(): array
    {
        return Cache::remember('app_settings', 3600, function () {
            return [
                // General Settings
                'app_name' => Setting::get('app_name', 'ATK Mahkamah Agung'),
                'app_description' => Setting::get('app_description', 'Sistem Manajemen Alat Tulis Kantor'),
                
                // Display Settings
                'items_per_page' => (int) Setting::get('items_per_page', 10),
                'low_stock_threshold' => (int) Setting::get('low_stock_threshold', 10),
                
                // Notification Settings
                'enable_email_notifications' => (bool) Setting::get('enable_email_notifications', true),
                'enable_stock_alerts' => (bool) Setting::get('enable_stock_alerts', true),
                
                // System Settings
                'enable_audit_log' => (bool) Setting::get('enable_audit_log', true),
                
                // Backup Settings
                'backup_enabled' => (bool) Setting::get('backup_enabled', false),
                'backup_schedule' => Setting::get('backup_schedule', 'weekly'),
                'backup_retention_days' => (int) Setting::get('backup_retention_days', 30),
            ];
        });
    }

    /**
     * Clear settings cache (admin only)
     */
    public function clearCache(): RedirectResponse
    {
        $this->authorize('update', Setting::class);

        Cache::forget('app_settings');
        Cache::flush(); // Optional: clear all cache

        return back()->with('success', 'Cache berhasil dibersihkan');
    }

    /**
     * Get public settings (for guest/unauthenticated users)
     */
    public function publicSettings(): array
    {
        return [
            'app_name' => Setting::get('app_name', 'ATK Mahkamah Agung'),
            'app_description' => Setting::get('app_description', 'Sistem Manajemen Alat Tulis Kantor'),
        ];
    }

    /**
     * Test email configuration
     */
    public function testEmail(Request $request): RedirectResponse
    {
        $this->authorize('update', Setting::class);

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            Mail::raw('Ini adalah email test dari Sistem Inventaris ATK Mahkamah Agung RI.', function ($message) use ($request) {
                $message->to($request->email)
                    ->subject('Test Email - Sistem Inventaris ATK');
            });

            return back()->with('success', 'Email test berhasil dikirim ke ' . $request->email);
        } catch (\Exception $e) {
            return back()->withErrors([
                'email' => 'Gagal mengirim email: ' . $e->getMessage()
            ]);
        }
    }
}
