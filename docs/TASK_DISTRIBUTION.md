# Pembagian Tugas Tim - Aplikasi ATK MA

## 👥 Tim Development

- **BE 1**: Backend Developer 1 (YOU)
- **FE 1**: Frontend Developer 1 (existing work)
- **FE 2**: Frontend Developer 2 (optional)

---

## 📋 Status Pekerjaan

### ✅ SELESAI - BE 1

#### Phase 1: Foundation
- [x] Database migrations (barangs, ruangans, transactions, transaction_items, stock_movements, settings)
- [x] User migration dengan role enum (admin/pengawas)
- [x] Models & Relationships (User, Barang, Ruangan, Transaction, dll)
- [x] Enum Classes (Role, TransactionType, StockMovementType)
- [x] RoleMiddleware untuk authorization
- [x] Policies (BarangPolicy, RuanganPolicy, TransactionPolicy)
- [x] Seeders dengan data sample
- [x] Login dengan username (bukan email)

#### Phase 2: Core Backend
- [x] **BarangController** (CRUD lengkap dengan authorization)
- [x] **BarangRequest** (validation rules)
- [x] **DashboardController** (statistik & chart data API)
- [ ] RuanganController (struktur ada, belum diimplementasi penuh)
- [ ] TransactionController
- [ ] StockService

### ✅ SELESAI - FE 1

#### Setup & Infrastructure
- [x] React + TypeScript + Inertia.js setup
- [x] shadcn/ui components
- [x] Layout system (AppLayout, AuthLayout)
- [x] Routing system

#### Authentication Pages
- [x] Login
- [x] Register
- [x] Forgot Password
- [x] Reset Password
- [x] Two-Factor Authentication
- [x] Email Verification

#### Components
- [x] Sidebar, Header, Breadcrumbs
- [x] UI components library (shadcn/ui)

#### Dashboard
- [x] Dashboard layout (placeholder)

---

## 🎯 TUGAS SELANJUTNYA

### 🔥 **FE 1 - Priority HIGH** (Harus dikerjakan dulu!)

#### 1. Update Login Form ⚡ URGENT
**File**: `resources/js/pages/auth/login.tsx`

Ubah dari email ke username:
```tsx
// Sebelum
<Input name="email" type="email" placeholder="Email address" />

// Sesudah
<Input name="username" type="text" placeholder="Masukkan username" />
```

**Test Login:**
- Username: `admin` / Password: `password`
- Username: `pengawas` / Password: `password`

#### 2. Dashboard dengan Data Real
**File**: `resources/js/pages/dashboard.tsx`

**Backend API sudah siap!** Tinggal consume data dari `DashboardController`:
- Stats cards (total barang, stok rendah, ruangan, transaksi)
- Chart transaksi 7 hari terakhir
- Top 5 barang paling diminta
- Top 5 ruangan dengan permintaan terbanyak
- List barang stok rendah
- Transaksi terbaru

**Referensi Backend Response:**
```php
// GET /dashboard
{
  "stats": {
    "total_barang": 15,
    "total_barang_stok_rendah": 2,
    "total_ruangan": 10,
    "total_transaksi_hari_ini": 0,
    "total_transaksi_bulan_ini": 0
  },
  "chart_data": {...},
  "top_barang": [...],
  "top_ruangan": [...],
  "barang_stok_rendah": [...],
  "transaksi_terbaru": [...]
}
```

#### 3. CRUD Barang Pages
**Folder**: `resources/js/pages/Barang/`

**Backend sudah READY!** Routes & API sudah lengkap:
- `GET /barang` → Index (list dengan search, filter, pagination)
- `GET /barang/create` → Create form
- `POST /barang` → Store data
- `GET /barang/{id}` → Show detail
- `GET /barang/{id}/edit` → Edit form
- `PUT /barang/{id}` → Update data
- `DELETE /barang/{id}` → Soft delete

**Pages yang perlu dibuat:**
```
Barang/
├── Index.tsx    - Table dengan search, filter, pagination
├── Create.tsx   - Form tambah barang
├── Edit.tsx     - Form edit barang
└── Show.tsx     - Detail barang
```

**Fitur yang harus ada:**
- Search (kode, nama)
- Filter status (active/inactive)
- Filter stok rendah
- Pagination
- Authorization check (Admin bisa edit/delete, Pengawas view only)

#### 4. Components Helper
**File**: `resources/js/components/forms/`

Buat reusable components:
- `SearchInput.tsx` - Input search dengan debounce
- `FilterSelect.tsx` - Dropdown filter
- `DataTable.tsx` - Table dengan pagination
- `ConfirmDialog.tsx` - Konfirmasi delete

---

### 📦 **FE 2 - Priority MEDIUM** (Bisa dikerjakan parallel)

#### 1. CRUD Ruangan Pages
**Folder**: `resources/js/pages/Ruangan/`

**Note**: Backend controller perlu dilengkapi dulu oleh BE 1!

Pages yang perlu dibuat:
```
Ruangan/
├── Index.tsx
├── Create.tsx
├── Edit.tsx
└── Show.tsx
```

Pattern sama seperti Barang.

#### 2. Advanced Components
**File**: `resources/js/components/forms/`

- `SearchableSelect.tsx` - Dropdown searchable untuk pilih barang/ruangan
- `DateRangePicker.tsx` - Filter tanggal untuk transaksi
- `DynamicFormItems.tsx` - Form array untuk transaction items

---

### 🔧 **BE 1 - Next Phase** (Setelah FE 1 mulai)

#### 1. Lengkapi RuanganController
**File**: `app/Http/Controllers/RuanganController.php`

Implementasi penuh seperti BarangController:
- index() dengan search & filter
- create(), store(), show(), edit(), update(), destroy()

#### 2. TransactionController & Services
**Files**: 
- `app/Http/Controllers/TransactionController.php`
- `app/Services/TransactionService.php`
- `app/Services/StockService.php`

Fitur:
- Transaksi barang keluar (permintaan)
- Transaksi barang masuk (penambahan stok)
- Auto reduce/add stock
- Stock movement logging

#### 3. API untuk Frontend
Export data:
- PDF (DomPDF)
- Excel (Laravel Excel)

---

## 📝 Checklist Sebelum Push ke GitHub

### BE 1
- [x] Migrations tested
- [x] Models & relationships tested
- [x] Seeders berjalan
- [x] BarangController tested
- [x] DashboardController tested
- [x] Documentation (README.md)
- [x] Login username documentation

### FE 1 (Before Pull)
- [ ] Backup current work
- [ ] Commit semua perubahan local
- [ ] Ready untuk update login form

---

## 🔄 Workflow Git

### BE 1 (NOW)
```bash
git add .
git commit -m "feat(backend): Add foundation, Barang CRUD, Dashboard API, Username login"
git push origin main
```

### FE 1 (NEXT)
```bash
git pull origin main
git checkout -b feature/login-username
# Update login form
git commit -m "fix(auth): Update login form to use username instead of email"
git push origin feature/login-username

git checkout -b feature/dashboard
# Implement dashboard with real data
git commit -m "feat(dashboard): Implement dashboard with stats and charts"
git push origin feature/dashboard

git checkout -b feature/barang-crud
# Implement CRUD Barang pages
git commit -m "feat(barang): Implement CRUD pages for Barang"
git push origin feature/barang-crud
```

### FE 2 (PARALLEL)
```bash
git pull origin main
git checkout -b feature/ruangan-crud
# Implement CRUD Ruangan pages
git commit -m "feat(ruangan): Implement CRUD pages for Ruangan"
git push origin feature/ruangan-crud
```

---

## 💬 Komunikasi Tim

### FE 1 mulai dengan:
1. ✅ Update login form (URGENT - 30 menit)
2. ✅ Dashboard real data (2-3 jam)
3. ✅ CRUD Barang Index page (3-4 jam)

### FE 2 bisa paralel:
1. Components library (SearchableSelect, DataTable)
2. CRUD Ruangan (setelah BE 1 lengkapi controller)

### BE 1 lanjut dengan:
1. RuanganController implementation
2. TransactionController
3. Services untuk stock management

---

## 🎯 Target Minggu Ini

- [x] BE 1: Foundation & Core APIs
- [ ] FE 1: Login update + Dashboard + Barang Index
- [ ] BE 1: RuanganController
- [ ] FE 2: Components helper

---

**Last Updated**: 5 Februari 2026 by BE 1
