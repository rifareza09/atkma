<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Command untuk reset password admin
Artisan::command('user:reset-admin', function () {
    $user = User::where('username', 'admin')->first();
    
    if ($user) {
        $user->password = Hash::make('password');
        $user->save();
        $this->info('✅ Password admin berhasil direset ke: password');
        $this->info('Login dengan: username=admin, password=password');
    } else {
        $this->error('❌ User admin tidak ditemukan');
    }
})->purpose('Reset password admin ke "password"');
