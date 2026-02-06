<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
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

    // Master Data Routes
    Route::prefix('master')->group(function () {
        // Barang routes - Admin can create/update/delete, Pengawas can only view
        Route::resource('barang', controller: BarangController::class);

        // Ruangan routes - Admin can create/update/delete, Pengawas can only view
        Route::resource('ruangan', RuanganController::class);
    });

    // Transaction routes - Admin can create/delete, Pengawas can only view
    Route::prefix('transaksi')->group(function () {
        Route::resource('permintaan', TransactionController::class);
    });

    // Report routes - Export PDF and Excel
    Route::prefix('reports')->group(function () {
        // Inventory reports
        Route::get('/inventory/pdf', [ReportController::class, 'exportInventoryPdf'])->name('reports.inventory.pdf');
        Route::get('/inventory/excel', [ReportController::class, 'exportInventoryExcel'])->name('reports.inventory.excel');
        
        // Kartu stok per barang
        Route::get('/kartu-stok/{barang}', [ReportController::class, 'kartuStokPdf'])->name('reports.kartu-stok');
        
        // Transaction reports
        Route::get('/transactions/pdf', [ReportController::class, 'exportTransactionPdf'])->name('reports.transactions.pdf');
        Route::get('/transactions/excel', [ReportController::class, 'exportTransactionExcel'])->name('reports.transactions.excel');
        
        // Stock movement reports
        Route::get('/stock-movements/excel', [ReportController::class, 'exportStockMovementExcel'])->name('reports.stock-movements.excel');
    });
});

require __DIR__ . '/settings.php';
