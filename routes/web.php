<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RuanganController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Protected routes with authentication
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Barang routes - Admin can create/update/delete, Pengawas can only view
    Route::resource('barang', BarangController::class);

    // Ruangan routes - Admin can create/update/delete, Pengawas can only view
    Route::resource('ruangan', RuanganController::class);

    // Transaction routes - Admin can create/delete, Pengawas can only view
    Route::resource('transactions', TransactionController::class);
});

require __DIR__.'/settings.php';
