<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class TestNotification extends Notification
{
    use Queueable;

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => 'info',
            'title' => 'Test Notifikasi',
            'message' => 'Ini adalah notifikasi test. Sistem notifikasi berfungsi dengan baik! 🎉',
            'link' => '/dashboard',
        ];
    }
}
