<?php

namespace App\Listeners;

use App\Events\TransactionStatusChanged;
use App\Notifications\TransactionStatusChangedNotification;

class SendTransactionStatusNotification
{
    /**
     * Handle the event.
     */
    public function handle(TransactionStatusChanged $event): void
    {
        // Notify the transaction requester about status change
        if ($event->transaction->user) {
            $event->transaction->user->notify(
                new TransactionStatusChangedNotification(
                    $event->transaction,
                    $event->oldStatus,
                    $event->newStatus
                )
            );
        }
    }
}
