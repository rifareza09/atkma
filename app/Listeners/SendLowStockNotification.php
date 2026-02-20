<?php

namespace App\Listeners;

use App\Events\LowStockDetected;
use App\Models\User;
use App\Notifications\LowStockNotification;
use Illuminate\Support\Facades\Notification;

class SendLowStockNotification
{
    /**
     * Handle the event.
     */
    public function handle(LowStockDetected $event): void
    {
        // Get all admins
        $admins = User::where('role', 'admin')
            ->where('is_active', true)
            ->get();

        // Send notification to all admins
        Notification::send($admins, new LowStockNotification($event->barang));
    }
}
