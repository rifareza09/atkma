<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;

class UpdateLastLogin
{
    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        if ($event->user) {
            $event->user->updateLastLogin();
        }
    }
}
