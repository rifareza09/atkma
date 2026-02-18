<?php

use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RuanganController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StockReconciliationController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
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
    Route::get('api/dashboard/low-stock', [DashboardController::class, 'getLowStockData'])->name('api.dashboard.low-stock');
    Route::get('api/dashboard/stock-movements/today', [DashboardController::class, 'getTodayStockMovements'])->name('api.dashboard.stock-movements.today');

    // Notifications
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index'])->name('notifications.index');
        Route::get('/unread-count', [NotificationController::class, 'unreadCount'])->name('notifications.unread-count');
        Route::post('/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
        Route::post('/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');
        Route::delete('/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
        Route::delete('/read/all', [NotificationController::class, 'destroyRead'])->name('notifications.destroy-read');
    });

    // Inventory - Card based selection page
    Route::get('inventory', [InventoryController::class, 'index'])->name('inventory.index');

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

        // Transaction approval routes - Admin only
        Route::post('permintaan/{transaction}/approve', [TransactionController::class, 'approve'])
            ->name('permintaan.approve');
        Route::post('permintaan/{transaction}/reject', [TransactionController::class, 'reject'])
            ->name('permintaan.reject');
        Route::post('permintaan/{transaction}/revise', [TransactionController::class, 'revise'])
            ->name('permintaan.revise');
    });

    // Stock Reconciliation routes - Admin only
    Route::prefix('stok')->group(function () {
        Route::resource('rekonsiliasi', StockReconciliationController::class)->except(['edit', 'update']);
    });

    // Laporan Pages - View reports with filters
    Route::prefix('laporan')->group(function () {
        Route::get('/inventaris', [ReportController::class, 'inventaris'])->name('laporan.inventaris');
        Route::get('/transaksi', [ReportController::class, 'transaksi'])->name('laporan.transaksi');
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

    // User Management routes - Admin only
    Route::prefix('settings')->group(function () {
        // Application Settings
        Route::get('/', [SettingsController::class, 'index'])->name('settings.index');
        Route::put('/', [SettingsController::class, 'update'])->name('settings.update');
        Route::post('/clear-cache', [SettingsController::class, 'clearCache'])->name('settings.clear-cache');
        Route::post('/test-email', [SettingsController::class, 'testEmail'])->name('settings.test-email');

        // User Management
        Route::resource('users', UserController::class);

        // Additional user actions
        Route::post('users/{user}/toggle-status', [UserController::class, 'toggleStatus'])
            ->name('users.toggle-status');
        Route::post('users/{user}/reset-password', [UserController::class, 'resetPassword'])
            ->name('users.reset-password');
    });

    // Audit Logs - Admin only
    Route::prefix('audit-logs')->group(function () {
        Route::get('/', [AuditLogController::class, 'index'])->name('audit-logs.index');
        Route::get('/export', [AuditLogController::class, 'export'])->name('audit-logs.export');
        Route::get('/{auditLog}', [AuditLogController::class, 'show'])->name('audit-logs.show');
        Route::get('/model/{model}/{id}', [AuditLogController::class, 'forModel'])->name('audit-logs.for-model');
    });
});

require __DIR__ . '/settings.php';
