<?php

namespace Database\Seeders;

use App\Models\User;
use App\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin User
        User::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@ma.go.id',
            'password' => Hash::make('password'),
            'role' => Role::ADMIN,
            'email_verified_at' => now(),
        ]);

        // Pengawas User
        User::create([
            'name' => 'Pengawas',
            'username' => 'pengawas',
            'email' => 'pengawas@ma.go.id',
            'password' => Hash::make('password'),
            'role' => Role::PENGAWAS,
            'email_verified_at' => now(),
        ]);
    }
}
