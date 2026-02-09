# Frontend Contract Requirements for Backend Team

## Overview
Dokumen ini menjelaskan semua endpoint API, contract types, dan data structures yang dibutuhkan oleh Frontend untuk fitur-fitur yang sudah dibuat oleh **FE2 (Frontend Developer 2)**.

---

## 1. User Management

### Routes & Controllers Required
```php
// routes/web.php
Route::middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class);
    Route::post('users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');
});
```

### Controller Methods

#### `UserController::index()`
**Purpose**: Get paginated list of users with filters

**Expected Response**:
```php
return Inertia::render('Users/Index', [
    'users' => User::with('role')
        ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
        ->when($request->role, fn($q) => $q->where('role', $request->role))
        ->when($request->status !== null, fn($q) => $q->where('is_active', $request->status))
        ->paginate(10),
    'filters' => $request->only(['search', 'role', 'status']),
    'roles' => Role::all(),
]);
```

#### `UserController::create()`
**Purpose**: Show create user form

**Expected Response**:
```php
return Inertia::render('Users/Create', [
    'roles' => Role::all()->map(fn($role) => [
        'value' => $role,
        'label' => ucfirst($role),
    ]),
]);
```

#### `UserController::store()`
**Purpose**: Create new user

**Expected Request Data**:
```typescript
{
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'admin' | 'user' | 'viewer';
    is_active: boolean;
}
```

#### `UserController::show($id)`
**Purpose**: Show user detail with activity log

**Expected Response**:
```php
return Inertia::render('Users/Show', [
    'user' => User::with(['transactions' => fn($q) => $q->latest()->limit(10)])->findOrFail($id),
]);
```

#### `UserController::edit($id)`
**Purpose**: Show edit user form

**Expected Response**:
```php
return Inertia::render('Users/Edit', [
    'user' => User::findOrFail($id),
    'roles' => Role::all()->map(fn($role) => [
        'value' => $role,
        'label' => ucfirst($role),
    ]),
]);
```

#### `UserController::update($id)`
**Purpose**: Update existing user

**Expected Request Data**:
```typescript
{
    name: string;
    username: string;
    email: string;
    password?: string; // Optional, only if changing password
    password_confirmation?: string;
    role: 'admin' | 'user' | 'viewer';
    is_active: boolean;
}
```

#### `UserController::destroy($id)`
**Purpose**: Delete user (soft delete)

**Response**:
```php
$user->delete();
return redirect()->route('users.index')->with('success', 'User deleted successfully');
```

#### `UserController::toggleStatus($id)`
**Purpose**: Toggle user active/inactive status

**Response**:
```php
$user->update(['is_active' => !$user->is_active]);
return back()->with('success', 'User status updated');
```

### Database Schema Required
```sql
ALTER TABLE users ADD COLUMN username VARCHAR(255) UNIQUE NOT NULL AFTER name;
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1 AFTER email_verified_at;
ALTER TABLE users ADD COLUMN role ENUM('admin', 'user', 'viewer') DEFAULT 'user' AFTER is_active;
```

### Policy Required
```php
// app/Policies/UserPolicy.php
public function viewAny(User $user): bool {
    return $user->role === 'admin';
}

public function create(User $user): bool {
    return $user->role === 'admin';
}

public function update(User $authenticatedUser, User $user): bool {
    return $authenticatedUser->role === 'admin' || $authenticatedUser->id === $user->id;
}

public function delete(User $authenticatedUser, User $user): bool {
    return $authenticatedUser->role === 'admin' && $authenticatedUser->id !== $user->id;
}
```

---

## 2. Settings Management

### Routes Required
```php
Route::middleware(['auth'])->group(function () {
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingController::class, 'update'])->name('settings.update');
    Route::post('settings/test-email', [SettingController::class, 'testEmail'])->name('settings.test-email');
});
```

### Controller Methods

#### `SettingController::index()`
**Expected Response**:
```php
return Inertia::render('Settings/Index', [
    'general' => [
        'app_name' => setting('app_name'),
        'timezone' => setting('timezone'),
        'date_format' => setting('date_format'),
        'language' => setting('language'),
    ],
    'email' => [
        'smtp_host' => setting('smtp_host'),
        'smtp_port' => setting('smtp_port'),
        'smtp_username' => setting('smtp_username'),
        'smtp_password' => setting('smtp_password'),
        'smtp_encryption' => setting('smtp_encryption'),
        'mail_from_address' => setting('mail_from_address'),
        'mail_from_name' => setting('mail_from_name'),
    ],
    'backup' => [
        'backup_schedule' => setting('backup_schedule'),
        'backup_retention_days' => setting('backup_retention_days'),
        'backup_path' => setting('backup_path'),
    ],
    'audit' => [
        'enable_audit_log' => setting('enable_audit_log', true),
        'audit_retention_days' => setting('audit_retention_days', 90),
    ],
]);
```

#### `SettingController::update()`
**Expected Request Data**:
```typescript
{
    type: 'general' | 'email' | 'backup' | 'audit';
    [key: string]: any; // Dynamic based on type
}
```

**Example**:
```php
foreach ($request->except('type') as $key => $value) {
    setting([$key => $value]);
}
return back()->with('success', ucfirst($request->type) . ' settings updated successfully');
```

#### `SettingController::testEmail()`
**Purpose**: Send test email to verify email configuration

**Expected Request Data**:
```typescript
{
    email: string;
}
```

### Database Schema Required
```sql
CREATE TABLE settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NULL,
    type VARCHAR(50) DEFAULT 'string',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

---

## 3. Dashboard Statistics

### Routes Required
```php
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
```

### Controller Method

#### `DashboardController::index()`
**Expected Response**:
```php
return Inertia::render('Dashboard', [
    'stats' => [
        'total_barang' => Barang::count(),
        'total_stock' => Barang::sum('jumlah'),
        'low_stock_count' => Barang::where('jumlah', '<', 10)->count(),
        'total_ruangan' => Ruangan::count(),
        'total_transactions' => Transaction::count(),
    ],
    'chart_data' => [
        'labels' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        'datasets' => [
            [
                'label' => 'Stock In',
                'data' => [12, 19, 3, 5, 2, 3, 7],
            ],
            [
                'label' => 'Stock Out',
                'data' => [2, 3, 20, 5, 1, 4, 2],
            ],
        ],
    ],
    'top_barang' => Barang::orderBy('jumlah', 'desc')->limit(5)->get(['nama_barang', 'jumlah']),
    'top_ruangan' => Ruangan::withCount('barangs')->orderBy('barangs_count', 'desc')->limit(5)->get(['nama_ruangan', 'barangs_count']),
    'low_stock_items' => Barang::where('jumlah', '<', 10)->with('ruangan')->get(),
]);
```

---

## 4. Notifications

### Routes Required
```php
Route::middleware(['auth'])->group(function () {
    Route::post('notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');
    Route::delete('notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
});
```

### Controller Methods

#### `NotificationController::markAsRead($id)`
```php
$notification = auth()->user()->notifications()->findOrFail($id);
$notification->markAsRead();
return back();
```

#### `NotificationController::markAllAsRead()`
```php
auth()->user()->unreadNotifications->markAsRead();
return back();
```

#### `NotificationController::destroy($id)`
```php
auth()->user()->notifications()->findOrFail($id)->delete();
return back();
```

### Middleware Required
**In `HandleInertiaRequests::share()`**:
```php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user(),
        ],
        'notifications' => $request->user() ? $request->user()->notifications()->latest()->limit(10)->get() : [],
        'unread_notifications_count' => $request->user() ? $request->user()->unreadNotifications->count() : 0,
    ]);
}
```

### Database Schema Required (Laravel Notifications)
```bash
php artisan notifications:table
php artisan migrate
```

### Notification Types Expected
```typescript
interface Notification {
    id: string;
    type: 'low_stock' | 'transaction_created' | 'stock_replenished';
    data: {
        id?: number;
        barang_id?: number;
        nama_barang?: string;
        jumlah?: number;
        transaction_id?: number;
        message: string;
    };
    read_at: string | null;
    created_at: string;
}
```

**Example Notification Creation**:
```php
// When stock is low
auth()->user()->notify(new LowStockNotification($barang));

// When transaction is created
auth()->user()->notify(new TransactionCreatedNotification($transaction));
```

---

## 5. Audit Logs

### Routes Required
```php
Route::middleware(['auth', 'can:viewAny,App\Models\AuditLog'])->group(function () {
    Route::get('audit-logs', [AuditLogController::class, 'index'])->name('audit-logs.index');
    Route::get('audit-logs/export', [AuditLogController::class, 'export'])->name('audit-logs.export');
});
```

### Controller Methods

#### `AuditLogController::index()`
**Expected Response**:
```php
return Inertia::render('AuditLogs/Index', [
    'auditLogs' => AuditLog::with('user')
        ->when($request->search, fn($q) => $q->where('description', 'like', "%{$request->search}%"))
        ->when($request->user_id, fn($q) => $q->where('user_id', $request->user_id))
        ->when($request->action, fn($q) => $q->where('action', $request->action))
        ->when($request->model, fn($q) => $q->where('model', $request->model))
        ->when($request->date_from, fn($q) => $q->whereDate('created_at', '>=', $request->date_from))
        ->when($request->date_to, fn($q) => $q->whereDate('created_at', '<=', $request->date_to))
        ->latest()
        ->paginate(20),
    'filters' => $request->only(['search', 'user_id', 'action', 'model', 'date_from', 'date_to']),
    'users' => User::select('id', 'name', 'username')->get(),
]);
```

#### `AuditLogController::export()`
**Purpose**: Export audit logs to CSV/Excel

**Expected Query Params**: Same as index filters + `export=csv|excel`

**Response**: Return downloadable file

### Database Schema Required
```sql
CREATE TABLE audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    action ENUM('created', 'updated', 'deleted') NOT NULL,
    model VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    old_value TEXT NULL, -- JSON string
    new_value TEXT NULL, -- JSON string
    description TEXT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_model ON audit_logs(model, model_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

### Audit Logging Trait
**Create a trait to automatically log model changes**:
```php
// app/Concerns/HasAuditLog.php
trait HasAuditLog
{
    protected static function bootHasAuditLog()
    {
        static::created(function ($model) {
            AuditLog::create([
                'user_id' => auth()->id(),
                'action' => 'created',
                'model' => get_class($model),
                'model_id' => $model->id,
                'new_value' => json_encode($model->getAttributes()),
                'description' => "Created " . class_basename($model) . " #" . $model->id,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        });

        static::updated(function ($model) {
            AuditLog::create([
                'user_id' => auth()->id(),
                'action' => 'updated',
                'model' => get_class($model),
                'model_id' => $model->id,
                'old_value' => json_encode($model->getOriginal()),
                'new_value' => json_encode($model->getAttributes()),
                'description' => "Updated " . class_basename($model) . " #" . $model->id,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        });

        static::deleted(function ($model) {
            AuditLog::create([
                'user_id' => auth()->id(),
                'action' => 'deleted',
                'model' => get_class($model),
                'model_id' => $model->id,
                'old_value' => json_encode($model->getAttributes()),
                'description' => "Deleted " . class_basename($model) . " #" . $model->id,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        });
    }
}
```

**Usage in Models**:
```php
class Barang extends Model
{
    use HasAuditLog;
}
```

---

## 6. TypeScript Contract Types Reference

All TypeScript interfaces defined in `resources/js/types/models.d.ts`:

- **UserIndexProps**: Props for Users/Index page
- **UserCreateProps**: Props for Users/Create page
- **UserEditProps**: Props for Users/Edit page
- **UserShowProps**: Props for Users/Show page
- **SettingsIndexProps**: Props for Settings/Index page
- **DashboardProps**: Props for Dashboard page
- **NotificationIndexProps**: Shared via HandleInertiaRequests
- **AuditLogIndexProps**: Props for AuditLogs/Index page

---

## Summary Checklist for Backend Team

### User Management
- [ ] Create UserController with all CRUD methods
- [ ] Add `username` and `is_active` columns to users table
- [ ] Create UserPolicy for authorization
- [ ] Implement toggleStatus method

### Settings
- [ ] Create settings table
- [ ] Create SettingController with index, update, testEmail methods
- [ ] Implement setting() helper function (or use package like `spatie/laravel-settings`)

### Dashboard
- [ ] Create DashboardController::index()
- [ ] Implement statistics queries for last 7 days
- [ ] Add top barang and ruangan aggregations

### Notifications
- [ ] Run `php artisan notifications:table`
- [ ] Create notification classes (LowStockNotification, TransactionCreatedNotification)
- [ ] Share notifications array in HandleInertiaRequests middleware
- [ ] Create NotificationController with markAsRead, markAllAsRead, destroy methods

### Audit Logs
- [ ] Create audit_logs table  
- [ ] Create AuditLog model
- [ ] Implement HasAuditLog trait
- [ ] Add trait to Barang, Ruangan, Transaction, User models
- [ ] Create AuditLogController with index and export methods
- [ ] Install package for Excel export (e.g., `maatwebsite/excel`)

---

## Notes
- All backend responses use Inertia.js rendering: `Inertia::render('Page', $data)`
- Authentication is required for all routes
- Pagination should use Laravel's `paginate()`
- All timestamps should be in ISO 8601 format
- JSON responses for old_value/new_value should be properly escaped strings
