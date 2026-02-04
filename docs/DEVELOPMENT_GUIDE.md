# Panduan Pengembangan Aplikasi ATK Mahkamah Agung

## 📋 Daftar Isi
1. [Overview Proyek](#overview-proyek)
2. [Tech Stack](#tech-stack)
3. [Arsitektur Aplikasi](#arsitektur-aplikasi)
4. [Website untuk Membuat Diagram](#website-untuk-membuat-diagram)
5. [Langkah Pengerjaan Backend](#langkah-pengerjaan-backend)
6. [Langkah Pengerjaan Frontend](#langkah-pengerjaan-frontend)
7. [Prompt Template untuk Claude](#prompt-template-untuk-claude)

---

## 🎯 Overview Proyek

Sistem Alat Tulis Kantor (ATK) untuk Mahkamah Agung adalah aplikasi web untuk mengelola inventaris ATK, mencatat transaksi permintaan barang, dan monitoring stok.

### Prioritas Fitur

| Prioritas | Epic | User Stories |
|-----------|------|--------------|
| **MUST-HAVE** | Sistem & Hak Akses | Login, Role Admin/Pengawas |
| **MUST-HAVE** | Manajemen Data Master | CRUD Barang, CRUD Ruangan |
| **MUST-HAVE** | Transaksi Permintaan | Catat permintaan, Auto kurangi stok |
| **SHOULD-HAVE** | Monitoring | Dashboard, Pantau jatah ruangan |
| **SHOULD-HAVE** | Manajemen Stok | Catat barang masuk |
| **SHOULD-HAVE** | Pencarian & Filter | Filter transaksi |
| **COULD-HAVE** | Pelaporan | Export PDF/Excel, Kartu Stok |
| **COULD-HAVE** | Tampilan & UX | Branding, Dropdown search |

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 12
- **Authentication**: Laravel Fortify
- **Database**: SQLite (development) / MySQL (production)
- **PDF Export**: DomPDF / Snappy
- **Excel Export**: Laravel Excel (Maatwebsite)

### Frontend
- **Framework**: React 18+ dengan TypeScript
- **Bundler**: Vite
- **SSR Bridge**: Inertia.js
- **UI Components**: shadcn/ui + Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React hooks + Inertia forms

---

## 🏗️ Arsitektur Aplikasi

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 React + TypeScript                    │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐   │    │
│  │  │  Pages  │ │Components│ │  Hooks  │ │   Types  │   │    │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬─────┘   │    │
│  │       └───────────┴───────────┴───────────┘          │    │
│  │                        ▼                              │    │
│  │              Inertia.js Adapter                       │    │
│  └─────────────────────────┬───────────────────────────┘    │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │ HTTP (XHR)
┌────────────────────────────┼─────────────────────────────────┐
│                        BACKEND                               │
│                            ▼                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Laravel 12                          │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐              │    │
│  │  │  Routes  │ │Controllers│ │ Requests │              │    │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘              │    │
│  │       │            │            │                     │    │
│  │       ▼            ▼            ▼                     │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐              │    │
│  │  │ Services │ │  Models  │ │ Policies │              │    │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘              │    │
│  │       └────────────┴────────────┘                     │    │
│  │                    ▼                                  │    │
│  │              Eloquent ORM                             │    │
│  └────────────────────┬────────────────────────────────┘    │
│                       │                                      │
└───────────────────────┼──────────────────────────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │    Database     │
              │  SQLite/MySQL   │
              └─────────────────┘
```

---

## 🌐 Website untuk Membuat Diagram

### 1. PlantUML (Use Case, Class, Sequence, Activity Diagram)

| Website | URL | Cara Pakai |
|---------|-----|------------|
| **PlantUML Online** | https://www.plantuml.com/plantuml/uml | Copy-paste kode `.puml` |
| **PlantText** | https://www.planttext.com | Copy-paste kode `.puml` |
| **Kroki** | https://kroki.io | Multi-format diagram |

**File Script:**
- `docs/diagrams/use-case-diagram.puml`
- `docs/diagrams/class-diagram.puml`
- `docs/diagrams/sequence-diagram.puml`
- `docs/diagrams/activity-diagram.puml`

### 2. ERD (Entity Relationship Diagram)

| Website | URL | Cara Pakai |
|---------|-----|------------|
| **dbdiagram.io** ⭐ | https://dbdiagram.io | Copy-paste dari `erd-dbdiagram.txt` |
| **Mermaid Live** | https://mermaid.live | Copy-paste dari `erd-mermaid.md` |
| **DrawSQL** | https://drawsql.app | Visual drag-drop |

**File Script:**
- `docs/diagrams/erd-dbdiagram.txt` → untuk dbdiagram.io
- `docs/diagrams/erd-mermaid.md` → untuk Mermaid Live

---

## 🔧 Langkah Pengerjaan Backend

### Phase 1: Foundation (Hari 1-2)

#### Step 1.1: Setup Database & Migrations
```
Prompt untuk Claude:
---
Saya sedang mengembangkan aplikasi ATK Mahkamah Agung dengan Laravel 12 + React (Inertia.js).

Tolong buatkan migration files untuk tabel-tabel berikut:

1. **barangs** - Tabel master barang ATK
   - id (bigint, primary key)
   - kode (string, unique) - kode manual barang
   - nama (string)
   - satuan (string) - pcs, rim, box, dll
   - stok (integer, default 0)
   - stok_minimum (integer, default 10)
   - deskripsi (text, nullable)
   - is_active (boolean, default true)
   - timestamps

2. **ruangans** - Tabel master ruangan/unit kerja
   - id (bigint, primary key)
   - kode (string, unique)
   - nama (string)
   - penanggung_jawab (string, nullable)
   - deskripsi (text, nullable)
   - is_active (boolean, default true)
   - timestamps

3. **transactions** - Tabel transaksi (masuk/keluar)
   - id (bigint, primary key)
   - kode_transaksi (string, unique) - auto-generated
   - ruangan_id (foreign key ke ruangans)
   - user_id (foreign key ke users)
   - type (enum: masuk, keluar)
   - tanggal (date)
   - keterangan (text, nullable)
   - timestamps

4. **transaction_items** - Tabel detail item transaksi
   - id (bigint, primary key)
   - transaction_id (foreign key ke transactions)
   - barang_id (foreign key ke barangs)
   - jumlah (integer)
   - timestamps

5. **stock_movements** - Tabel riwayat pergerakan stok
   - id (bigint, primary key)
   - barang_id (foreign key ke barangs)
   - user_id (foreign key ke users)
   - transaction_id (foreign key ke transactions, nullable)
   - type (enum: penambahan, pengurangan, penyesuaian)
   - jumlah (integer)
   - stok_sebelum (integer)
   - stok_sesudah (integer)
   - keterangan (text, nullable)
   - timestamps

6. **settings** - Tabel pengaturan aplikasi
   - id (bigint, primary key)
   - key (string, unique)
   - value (text)
   - timestamps

Juga modifikasi migration users yang sudah ada untuk menambahkan kolom:
- role (enum: admin, pengawas, default admin)

Pastikan semua foreign key memiliki onDelete cascade atau set null yang appropriate.
---
```

#### Step 1.2: Setup Models & Relationships
```
Prompt untuk Claude:
---
Berdasarkan migration yang sudah dibuat, buatkan Model Eloquent untuk:

1. **User** - Update model yang ada
   - Tambahkan enum Role (admin, pengawas)
   - Method: isAdmin(), isPengawas()
   - Relationships: transactions(), stockMovements()

2. **Barang**
   - Fillable fields sesuai migration
   - Methods: isLowStock(), addStock($qty), reduceStock($qty)
   - Relationships: transactionItems(), stockMovements()
   - Scope: scopeActive()

3. **Ruangan**
   - Fillable fields sesuai migration
   - Methods: getTotalUsage()
   - Relationships: transactions()
   - Scope: scopeActive()

4. **Transaction**
   - Fillable fields sesuai migration
   - Enum TransactionType (masuk, keluar)
   - Methods: generateKode() - format TRX-YYYYMMDD-XXX
   - Relationships: items(), ruangan(), user()
   - Boot method untuk auto-generate kode

5. **TransactionItem**
   - Fillable fields
   - Relationships: transaction(), barang()

6. **StockMovement**
   - Fillable fields
   - Enum StockMovementType (penambahan, pengurangan, penyesuaian)
   - Relationships: barang(), user(), transaction()

7. **Setting**
   - Static methods: get($key), set($key, $value)

Gunakan PHP 8+ syntax dengan typed properties dan enum class.
---
```

#### Step 1.3: Setup Authentication & Authorization
```
Prompt untuk Claude:
---
Setup authentication dan authorization untuk aplikasi ATK:

1. **Update FortifyServiceProvider**
   - Konfigurasi views untuk Inertia
   - Setup two-factor authentication (sudah ada)

2. **Buat Middleware RoleMiddleware**
   - Check role user (admin/pengawas)
   - Redirect jika tidak punya akses

3. **Buat Policy untuk setiap Model**
   - BarangPolicy: Admin = full access, Pengawas = view only
   - RuanganPolicy: Admin = full access, Pengawas = view only
   - TransactionPolicy: Admin = create/view, Pengawas = view only
   - StockMovementPolicy: Admin = create/view, Pengawas = view only

4. **Register Policies di AuthServiceProvider**

5. **Update routes/web.php**
   - Group routes berdasarkan middleware role
   - Prefix routes yang appropriate
---
```

### Phase 2: Core Features - MUST HAVE (Hari 3-5)

#### Step 2.1: CRUD Barang (Data Master)
```
Prompt untuk Claude:
---
Implementasikan CRUD untuk Master Barang dengan Laravel + Inertia + React:

**Backend:**
1. Buat BarangController dengan methods:
   - index() - list dengan pagination, search, filter
   - create() - form tambah baru
   - store() - simpan data baru
   - show() - detail barang
   - edit() - form edit
   - update() - update data
   - destroy() - soft delete (set is_active = false)

2. Buat BarangRequest untuk validasi:
   - kode: required, unique, max:50
   - nama: required, max:255
   - satuan: required, max:50
   - stok: required, integer, min:0
   - stok_minimum: required, integer, min:0
   - deskripsi: nullable

3. Buat routes di routes/web.php dengan resource route

**Frontend:**
1. Buat halaman React di resources/js/pages/Barang/:
   - Index.tsx - tabel dengan search, filter, pagination
   - Create.tsx - form tambah
   - Edit.tsx - form edit
   - Show.tsx - detail view

2. Gunakan shadcn/ui components:
   - Table, Input, Button, Card
   - Dialog untuk konfirmasi delete
   - Toast untuk notifikasi

3. Gunakan Inertia useForm untuk form handling

Pastikan ada validasi client-side dan server-side.
---
```

#### Step 2.2: CRUD Ruangan (Data Master)
```
Prompt untuk Claude:
---
Implementasikan CRUD untuk Master Ruangan (mirip dengan Barang):

**Backend:**
1. RuanganController dengan standard CRUD
2. RuanganRequest untuk validasi
3. Resource routes

**Frontend:**
1. Halaman di resources/js/pages/Ruangan/:
   - Index.tsx, Create.tsx, Edit.tsx, Show.tsx

Struktur dan komponen sama seperti Barang. Pastikan konsisten.
---
```

#### Step 2.3: Transaksi Permintaan Barang (Keluar)
```
Prompt untuk Claude:
---
Implementasikan fitur Transaksi Permintaan Barang (barang keluar):

**Backend:**
1. Buat TransactionService dengan methods:
   - createTransaction(array $data, User $user): Transaction
   - processItems(Transaction $transaction, array $items): void

2. Buat StockService dengan methods:
   - addStock(Barang $barang, int $qty, User $user, string $keterangan)
   - reduceStock(Barang $barang, int $qty, User $user, Transaction $transaction)
   - adjustStock(Barang $barang, int $newQty, User $user, string $keterangan)

3. Buat TransactionController:
   - index() - list transaksi dengan filter (tanggal, ruangan, type)
   - create() - form permintaan baru
   - store() - simpan transaksi + kurangi stok otomatis
   - show() - detail transaksi

4. Buat TransactionRequest dengan validasi:
   - ruangan_id: required, exists
   - tanggal: required, date
   - items: required, array, min:1
   - items.*.barang_id: required, exists
   - items.*.jumlah: required, integer, min:1
   - Custom validation: check stok mencukupi

5. Gunakan Database Transaction untuk atomicity

**Frontend:**
1. Halaman di resources/js/pages/Transaction/:
   - Index.tsx - list dengan filter
   - Create.tsx - form dengan dynamic items
   - Show.tsx - detail transaksi

2. Create.tsx harus:
   - Dropdown searchable untuk ruangan
   - Dynamic form untuk tambah/hapus item
   - Dropdown searchable untuk barang dengan info stok
   - Validasi real-time stok vs jumlah permintaan
   - Summary total items sebelum submit
---
```

### Phase 3: SHOULD-HAVE Features (Hari 6-8)

#### Step 3.1: Dashboard & Monitoring
```
Prompt untuk Claude:
---
Implementasikan Dashboard untuk Admin dan Pengawas:

**Backend:**
1. Buat DashboardController dengan methods:
   - index() - main dashboard view
   - getStatistics() - API endpoint untuk data statistik

2. Data yang ditampilkan:
   - Total barang aktif
   - Total barang dengan stok rendah (< stok_minimum)
   - Total ruangan aktif
   - Total transaksi hari ini
   - Total transaksi bulan ini
   - Grafik transaksi 7 hari terakhir
   - Top 5 barang paling banyak diminta
   - Top 5 ruangan dengan permintaan terbanyak

**Frontend:**
1. Halaman Dashboard.tsx dengan:
   - Stats cards (total barang, stok rendah, dll)
   - Chart transaksi (gunakan recharts atau chart.js)
   - Tabel barang stok rendah
   - Tabel transaksi terbaru

2. Gunakan shadcn/ui Card components
3. Responsive grid layout
---
```

#### Step 3.2: Barang Masuk (Penambahan Stok)
```
Prompt untuk Claude:
---
Implementasikan fitur Barang Masuk (penambahan stok):

**Backend:**
1. Buat StockInController:
   - index() - list barang masuk
   - create() - form input barang masuk
   - store() - simpan dan tambah stok

2. Reuse TransactionService dengan type = 'masuk'

**Frontend:**
1. Halaman di resources/js/pages/StockIn/:
   - Index.tsx - list dengan filter tanggal
   - Create.tsx - form input barang masuk (mirip transaksi keluar)

2. Fitur sama seperti transaksi keluar, tapi untuk penambahan
---
```

#### Step 3.3: Filter & Search Advanced
```
Prompt untuk Claude:
---
Implementasikan fitur filter dan search advanced untuk transaksi:

**Backend:**
1. Update TransactionController@index:
   - Filter by tanggal (from - to)
   - Filter by ruangan
   - Filter by type (masuk/keluar)
   - Filter by barang (ada item dengan barang tertentu)
   - Search by kode_transaksi
   - Pagination

2. Buat TransactionFilter class (optional, untuk clean code)

**Frontend:**
1. Update Index.tsx dengan:
   - Date range picker
   - Dropdown filter ruangan
   - Dropdown filter type
   - Searchable dropdown filter barang
   - Clear all filters button
   - Export filtered results (preparation for Phase 4)
---
```

### Phase 4: COULD-HAVE Features (Hari 9-10)

#### Step 4.1: Export PDF
```
Prompt untuk Claude:
---
Implementasikan fitur Export PDF:

**Backend:**
1. Install package: composer require barryvdh/laravel-dompdf

2. Buat ReportController:
   - exportPdf(Request $request) - export laporan inventaris
   - kartuStok(Barang $barang) - cetak kartu stok per barang

3. Buat Blade views untuk PDF:
   - resources/views/reports/inventory.blade.php
   - resources/views/reports/kartu-stok.blade.php

4. Format Kartu Stok harus sesuai format arsip manual:
   - Header: Logo MA, Nama Barang, Kode, Satuan
   - Tabel: Tanggal, Keterangan, Masuk, Keluar, Saldo
   - Footer: Tanda tangan

**Frontend:**
1. Tombol Export PDF di halaman yang relevant
2. Preview modal sebelum download (optional)
---
```

#### Step 4.2: Export Excel
```
Prompt untuk Claude:
---
Implementasikan fitur Export Excel:

**Backend:**
1. Install package: composer require maatwebsite/excel

2. Buat Export classes di app/Exports/:
   - InventoryExport - list barang dengan stok
   - TransactionExport - list transaksi dengan filter
   - StockMovementExport - riwayat pergerakan stok

3. Update ReportController:
   - exportExcel(Request $request)

**Frontend:**
1. Tombol Export Excel di halaman yang relevant
2. Bisa pilih format (XLSX, CSV)
---
```

#### Step 4.3: Branding & Polish
```
Prompt untuk Claude:
---
Implementasikan branding Mahkamah Agung:

1. **Warna resmi:**
   - Primary: #1E3A5F (Biru tua MA)
   - Secondary: #D4AF37 (Gold)
   - Accent: #8B0000 (Merah maroon)

2. **Update Tailwind config** untuk custom colors

3. **Update komponen:**
   - Sidebar dengan logo MA
   - Header dengan nama aplikasi
   - Footer dengan copyright

4. **Searchable Dropdown:**
   - Buat komponen SearchableSelect untuk:
     - Pilih Barang (dengan info stok)
     - Pilih Ruangan
   - Gunakan Combobox dari shadcn/ui
---
```

---

## 🎨 Langkah Pengerjaan Frontend

### Struktur Folder Frontend
```
resources/js/
├── app.tsx                 # Entry point
├── ssr.tsx                 # SSR entry
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── forms/              # Form components
│   │   ├── searchable-select.tsx
│   │   ├── date-range-picker.tsx
│   │   └── dynamic-form-items.tsx
│   ├── tables/             # Table components
│   │   ├── data-table.tsx
│   │   ├── data-table-pagination.tsx
│   │   └── data-table-toolbar.tsx
│   ├── charts/             # Chart components
│   │   └── transaction-chart.tsx
│   └── layout/             # Layout components
│       ├── app-sidebar.tsx
│       ├── app-header.tsx
│       └── page-header.tsx
├── hooks/
│   ├── use-debounce.ts
│   └── use-confirm-dialog.ts
├── layouts/
│   ├── app-layout.tsx
│   └── auth-layout.tsx
├── lib/
│   ├── utils.ts
│   └── format.ts           # Format currency, date, etc
├── pages/
│   ├── Dashboard.tsx
│   ├── Auth/
│   │   ├── Login.tsx
│   │   └── ...
│   ├── Barang/
│   │   ├── Index.tsx
│   │   ├── Create.tsx
│   │   ├── Edit.tsx
│   │   └── Show.tsx
│   ├── Ruangan/
│   │   ├── Index.tsx
│   │   ├── Create.tsx
│   │   ├── Edit.tsx
│   │   └── Show.tsx
│   ├── Transaction/
│   │   ├── Index.tsx
│   │   ├── Create.tsx
│   │   └── Show.tsx
│   ├── StockIn/
│   │   ├── Index.tsx
│   │   └── Create.tsx
│   ├── Report/
│   │   └── Index.tsx
│   └── Settings/
│       └── ...
└── types/
    ├── index.d.ts
    └── models.d.ts          # Type definitions untuk models
```

### Component Guidelines
```
Prompt untuk Claude:
---
Buat komponen React dengan guidelines berikut:

1. **Naming Convention:**
   - PascalCase untuk components
   - camelCase untuk functions dan variables
   - kebab-case untuk file names

2. **TypeScript:**
   - Selalu definisikan interface untuk props
   - Gunakan generic types ketika appropriate
   - Export types yang akan digunakan di tempat lain

3. **Component Structure:**
   ```tsx
   interface ComponentProps {
     // props definition
   }
   
   export function Component({ prop1, prop2 }: ComponentProps) {
     // hooks first
     // derived state
     // handlers
     // render
   }
   ```

4. **Form Handling:**
   - Gunakan Inertia useForm hook
   - Validasi client-side dengan Zod (optional)
   - Show loading state saat submit

5. **Error Handling:**
   - Display validation errors from server
   - Toast notifications untuk success/error
   - Graceful error boundaries
---
```

---

## 📝 Prompt Template untuk Claude

### Template Umum
```
Saya sedang mengembangkan aplikasi ATK Mahkamah Agung dengan:
- Backend: Laravel 12
- Frontend: React + TypeScript + Inertia.js
- UI: shadcn/ui + Tailwind CSS
- Database: SQLite

Context:
[Jelaskan fitur yang sedang dikerjakan]

Yang sudah ada:
[List file/komponen yang sudah dibuat]

Tolong buatkan:
[Spesifik apa yang diminta]

Requirements:
- [Requirement 1]
- [Requirement 2]
- ...

Pastikan:
- Konsisten dengan struktur yang sudah ada
- Type-safe dengan TypeScript
- Responsive design
- Error handling yang proper
```

### Template untuk Bug Fixing
```
Saya mendapat error di aplikasi ATK:

Error message:
[Copy-paste error message]

File yang bermasalah:
[Nama file dan line number]

Code yang bermasalah:
[Copy-paste relevant code]

Yang sudah saya coba:
[Apa yang sudah dicoba]

Tolong bantu perbaiki error ini.
```

---

## ✅ Checklist Pengerjaan

### Phase 1: Foundation
- [ ] Database migrations created
- [ ] Models with relationships created
- [ ] Role enum added to User
- [ ] Middleware RoleMiddleware created
- [ ] Policies created and registered
- [ ] Basic routes setup

### Phase 2: MUST-HAVE
- [ ] CRUD Barang (Backend + Frontend)
- [ ] CRUD Ruangan (Backend + Frontend)
- [ ] Transaksi Permintaan Barang
- [ ] Auto-reduce stock on transaction
- [ ] List transaksi dengan riwayat

### Phase 3: SHOULD-HAVE
- [ ] Dashboard dengan statistik
- [ ] Monitoring stok rendah
- [ ] Barang masuk (penambahan stok)
- [ ] Filter & search advanced

### Phase 4: COULD-HAVE
- [ ] Export PDF
- [ ] Export Excel
- [ ] Kartu Stok format
- [ ] Branding MA
- [ ] Searchable dropdowns

---

## 🚀 Quick Start Commands

```bash
# Backend
php artisan migrate:fresh --seed
php artisan serve

# Frontend (development)
npm run dev

# Frontend (production build)
npm run build

# Run tests
php artisan test

# Generate IDE helpers (optional)
php artisan ide-helper:generate
php artisan ide-helper:models
```

---

**Dokumen ini dibuat untuk tim pengembangan ATK Mahkamah Agung**
**Terakhir diperbarui: 4 Februari 2026**
