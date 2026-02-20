<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class TestNotification extends Command
{
    protected $signature = 'test:notification {user_id?}';
    protected $description = 'Send test notification to user';

    public function handle()
    {
        $userId = $this->argument('user_id') ?? 1;
        $user = User::find($userId);

        if (!$user) {
            $this->error("User with ID {$userId} not found!");
            return 1;
        }

        // Create test notification directly in database
        $user->notify(new \App\Notifications\TestNotification());

        $this->info("Test notification sent to {$user->name}!");
        return 0;
    }
}
