<?php

namespace App\Listeners;

use App\Events\TransactionCreated;
use App\Models\User;
use App\Notifications\TransactionCreatedNotification;
use Illuminate\Support\Facades\Notification;

class SendTransactionCreatedNotification
{
    /**
     * Handle the event.
     */
    public function handle(TransactionCreated $event): void
    {
        // Get all admins
        $admins = User::where('role', 'admin')
            ->where('is_active', true)
            ->get();

        // Send notification to admins
        Notification::send($admins, new TransactionCreatedNotification($event->transaction));

        // Also notify the requester
        if ($event->transaction->user) {
            $event->transaction->user->notify(new TransactionCreatedNotification($event->transaction));
        }
    }
}
