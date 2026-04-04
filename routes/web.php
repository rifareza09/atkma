<?php

use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\IncomingStockController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProsesPermintaanController;
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

// Test route untuk debug notifications
Route::get('/test-notifications', function () {
    $authUser = auth()->user();
    $user1 = \App\Models\User::find(1);

    return response()->json([
        'auth_user' => $authUser ? [
            'id' => $authUser->id,
            'name' => $authUser->name,
            'notifications_count' => $authUser->notifications()->count(),
            'unread_count' => $authUser->unreadNotifications()->count(),
        ] : null,
        'user_1' => $user1 ? [
            'id' => $user1->id,
            'name' => $user1->name,
            'notifications_count' => $user1->notifications()->count(),
            'unread_count' => $user1->unreadNotifications()->count(),
        ] : null,
    ]);
});

// Protected routes with authentication
Route::middleware(['auth', 'verified'])->group(function () {
    // Test notifikasi (authenticated)
    Route::get('test-notifications-auth', function () {
        $user = auth()->user();

        return response()->json([
            'user_id' => $user->id,
            'user_name' => $user->name,
            'notifications_count' => $user->notifications()->count(),
            'unread_count' => $user->unreadNotifications()->count(),
            'notifications' => $user->notifications()->orderBy('created_at', 'desc')->limit(5)->get(),
        ]);
    });

    // Test transaction data
    Route::get('test-transaction/{id}', function ($id) {
        $transaction = \App\Models\Transaction::with(['user', 'items.barang'])->find($id);
        return response()->json($transaction);
    });

    // History Transaksi
    Route::get('history', [HistoryController::class, 'index'])->name('history.index');
    Route::get('history/export-pdf', [HistoryController::class, 'exportPdf'])->name('history.export-pdf');
    Route::get('history/export-excel', [HistoryController::class, 'exportExcel'])->name('history.export-excel');

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
        Route::get('barang/{barang}/transaction-history', [BarangController::class, 'transactionHistory'])->name('barang.transactionHistory');
        Route::get('barang/{barang}/transaction-history/export', [BarangController::class, 'exportTransactionHistory'])->name('barang.transactionHistory.export');

        // Ruangan routes - Admin can create/update/delete, Pengawas can only view
        Route::get('ruangan/{ruangan}/export-pdf', [RuanganController::class, 'exportPdf'])->name('ruangan.export-pdf');
        Route::get('ruangan/export-multiple-pdf', [RuanganController::class, 'exportMultiplePdf'])->name('ruangan.export-multiple-pdf');
        Route::resource('ruangan', RuanganController::class);
    });

    // Transaction routes - Admin can create/delete, Pengawas can only view
    Route::prefix('transaksi')->group(function () {
        Route::resource('permintaan', TransactionController::class);

        // Export routes
        Route::get('permintaan-export/excel', [TransactionController::class, 'exportExcel'])
            ->name('permintaan.export.excel');
        Route::get('permintaan-export/pdf', [TransactionController::class, 'exportPdf'])
            ->name('permintaan.export.pdf');
    });

    // Stock Management routes
    Route::prefix('stok')->group(function () {
        // Stock Reconciliation - Admin only
        Route::resource('rekonsiliasi', StockReconciliationController::class)->except(['edit', 'update']);

        // Incoming Stock (Barang Masuk) - Admin can CRUD, Super Admin read-only
        Route::get('barang-masuk/export', [IncomingStockController::class, 'export'])
            ->name('barang-masuk.export');
        Route::put('barang-masuk/item/{incomingStock}', [IncomingStockController::class, 'updateItem'])
            ->name('barang-masuk.update-item');
        Route::resource('barang-masuk', IncomingStockController::class)->parameters([
            'barang-masuk' => 'barangMasuk'
        ]);
    });

    // Laporan Pages - View reports with filters
    Route::prefix('laporan')->group(function () {
        Route::get('/inventaris', [ReportController::class, 'inventaris'])->name('laporan.inventaris');
        Route::get('/cetak-faktur', function () {
            return Inertia::render('cetak-faktur/Index');
        })->name('cetak-faktur');
        Route::get('/cetak-faktur/create', function () {
            return Inertia::render('cetak-faktur/Create');
        })->name('cetak-faktur.create');
        Route::get('/cetak-faktur/{id}/edit', function ($id) {
            return Inertia::render('cetak-faktur/Edit', ['id' => $id]);
        })->name('cetak-faktur.edit');
        Route::get('/transaksi', [ReportController::class, 'transaksi'])->name('laporan.transaksi');
        Route::get('/barang/{barang}/bulan', [ReportController::class, 'barangBulan'])->name('laporan.barang.bulan');
        Route::get('/barang/{barang}/bulan/{month}/{year}', [ReportController::class, 'barangBulanDetail'])->name('laporan.barang.bulan.detail');
        Route::get('/barang/{barang}/export-pdf', [ReportController::class, 'exportBarangBulanPdf'])->name('laporan.barang.export-pdf');
        Route::get('/barang/{barang}/export-pdf-all', [ReportController::class, 'exportBarangAllMonthsPdf'])->name('laporan.barang.export-pdf-all');
        Route::get('/barang/export-pdf-bulk', [ReportController::class, 'exportMultipleBarangBulanPdf'])->name('laporan.barang.export-pdf-bulk');
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
