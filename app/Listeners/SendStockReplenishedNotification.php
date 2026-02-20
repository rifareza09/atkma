<?php

namespace App\Listeners;

use App\Events\StockReplenished;
use App\Models\User;
use App\Notifications\StockReplenishedNotification;
use Illuminate\Support\Facades\Notification;

class SendStockReplenishedNotification
{
    /**
     * Handle the event.
     */
    public function handle(StockReplenished $event): void
    {
        // Get all admins
        $admins = User::where('role', 'admin')
            ->where('is_active', true)
            ->get();

        // Send notification to all admins
        Notification::send($admins, new StockReplenishedNotification($event->stockMovement, $event->barang));
        
        // Also notify the user who performed the stock movement
        if ($event->stockMovement->user) {
            $event->stockMovement->user->notify(new StockReplenishedNotification($event->stockMovement, $event->barang));
        }
    }
}
