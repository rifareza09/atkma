# Task Breakdown by Team - Sprint Plan

> **Last Updated:** 9 Februari 2026  
> **Sprint Duration:** 5 hari per tim  
> **Total Team:** 4 (BE1, BE2, FE1, FE2)

---

## 📊 Progress Overview

### ✅ Completed (BE2)
- User Management Backend (Migration, Controller, Policy)
- Settings Management (Migration, Seeder, Controller, Helper)
- Notification System (Setup - 50%)

### 🔄 In Progress
- Notification System (BE2)
- Dashboard Charts (FE)

### 📋 Pending
- Dashboard Analytics Enhancement
- Audit Trail System
- Transaction Approval Workflow
- Frontend Pages untuk User & Settings Management

---

## 🎯 MUST-HAVE (Priority 1)

### Epic: Sistem & Hak Akses

#### ✅ BE1 - Authentication & Authorization (DONE)
- [x] Setup Laravel Fortify
- [x] Login system dengan username/email
- [x] Role-based access (Admin, Pengawas)
- [x] Middleware untuk authorization
- [x] UserPolicy untuk resource protection

#### 🔄 FE1 - Auth UI (1 hari)
- [ ] Login page dengan form validation
- [ ] Password toggle visibility
- [ ] Remember me checkbox
- [ ] Error handling & toast notifications
- [ ] Redirect setelah login berdasarkan role
- **Dependencies:** None
- **Files:** `resources/js/pages/auth/login.tsx`

---

### Epic: Manajemen Data Master

#### ✅ BE1 - Master Data Backend (DONE)
- [x] Barang CRUD (Controller, Policy, Routes)
- [x] Ruangan CRUD (Controller, Policy, Routes)
- [x] Validation & error handling
- [x] Soft delete untuk Barang & Ruangan

#### 🔄 FE1 - Barang Management UI (1.5 hari)
- [ ] List Barang dengan pagination
- [ ] Create/Edit form dengan validation
- [ ] Delete confirmation modal
- [ ] Search & filter by kategori/status
- [ ] Bulk actions (export, status update)
- **Dependencies:** BE1 done
- **Files:** `resources/js/pages/master/barang/`
  - `index.tsx` - List & table
  - `create.tsx` - Form create
  - `edit.tsx` - Form edit
  - `show.tsx` - Detail view

#### 🔄 FE1 - Ruangan Management UI (1 hari)
- [ ] List Ruangan dengan pagination
- [ ] Create/Edit form dengan validation
- [ ] Delete confirmation modal
- [ ] Search by nama/kode
- **Dependencies:** BE1 done
- **Files:** `resources/js/pages/master/ruangan/`
  - `index.tsx`
  - `create.tsx`
  - `edit.tsx`

---

### Epic: Transaksi Permintaan Barang

#### ✅ BE1 - Transaction Backend (DONE)
- [x] Transaction CRUD dengan items
- [x] Stok otomatis berkurang saat approved
- [x] TransactionPolicy untuk access control
- [x] Status tracking (pending → approved/rejected/revised)

#### 🔄 FE2 - Transaction UI (2 hari)
- [ ] List transaksi dengan status badges
- [ ] Form permintaan barang (multi-item)
- [ ] Autocomplete untuk pilih barang
- [ ] Real-time stok checking
- [ ] Transaction detail view
- [ ] Print/download transaction summary
- **Dependencies:** BE1 done
- **Files:** `resources/js/pages/transaksi/permintaan/`
  - `index.tsx` - List
  - `create.tsx` - Form with dynamic items
  - `show.tsx` - Detail with timeline

---

## 🎯 SHOULD-HAVE (Priority 2)

### Epic: Monitoring & Pengawasan

#### 🔄 BE2 - Dashboard Analytics API (0.5 hari)
- [ ] Enhance DashboardController::index()
  - [ ] stats: total_barang, total_stock, low_stock_count, total_ruangan, total_transactions
  - [ ] chart_data: Last 7 days (Stock In/Out)
  - [ ] top_barang: Top 5 by quantity
  - [ ] top_ruangan: Top 5 by transaction count
  - [ ] low_stock_items: Items < min_stock
- [ ] Eager loading untuk prevent N+1
- [ ] Cache chart data 5 menit
- **Dependencies:** Master data seeded
- **Files:** `app/Http/Controllers/DashboardController.php`

#### 🔄 FE1 - Dashboard Enhancement (1.5 hari)
- [x] Stats cards (Total Barang, Ruangan, etc)
- [x] Line chart (7 days transaction trend)
- [x] Bar chart (Top 5 Barang)
- [x] Pie chart (Top 5 Ruangan)
- [x] Low stock table
- [x] Recent transactions table
- [ ] Fix undefined data errors
- [ ] Loading states untuk charts
- [ ] Empty state handling
- **Dependencies:** BE2 Dashboard API
- **Status:** 90% complete (needs data fixes)

#### 🔄 FE2 - Monitoring Pages (1 hari)
- [ ] Stok per ruangan view (table + chart)
- [ ] Jatah barang monitoring
- [ ] Usage percentage per item/ruangan
- **Dependencies:** BE2 Dashboard API
- **Files:** `resources/js/pages/monitoring/`

---

### Epic: Manajemen Stok

#### ✅ BE1 - Stock Management (DONE)
- [x] Stock Movement tracking
- [x] Stock Reconciliation (opname)
- [x] Audit log untuk stock changes

#### 🔄 FE2 - Stock Management UI (1.5 hari)
- [ ] Stock reconciliation form
- [ ] Stock history per barang
- [ ] Adjustment form (koreksi stok)
- [ ] Stock movement list & filters
- **Dependencies:** BE1 done
- **Files:** `resources/js/pages/stok/`

---

### Epic: Pencarian & Filter

#### ✅ BE1 - Search & Filter API (DONE)
- [x] Query builder untuk semua resource
- [x] Filter by date range, status, etc

#### 🔄 FE1 & FE2 - Search UI Components (0.5 hari each)
- [ ] SearchBar component dengan debounce
- [ ] DateRangePicker component
- [ ] FilterDropdown component (reusable)
- [ ] Apply filters via query params
- **Dependencies:** Design system
- **Files:** `resources/js/components/filters/`

---

## 🎯 COULD-HAVE (Priority 3)

### Epic: Pelaporan

#### ✅ BE1 - Report Export (DONE)
- [x] PDF export (DomPDF)
- [x] Excel export (Maatwebsite)
- [x] Kartu stok per barang
- [x] Report filters

#### 🔄 FE2 - Report Pages (1 hari)
- [ ] Laporan inventaris page
  - [ ] Filter form (date, kategori, ruangan)
  - [ ] Preview table
  - [ ] Export buttons (PDF/Excel)
- [ ] Laporan transaksi page
  - [ ] Filter form
  - [ ] Preview table
  - [ ] Export buttons
- [ ] Kartu stok page
  - [ ] Pilih barang
  - [ ] Date range
  - [ ] View PDF
- **Dependencies:** BE1 done
- **Files:** `resources/js/pages/laporan/`

---

### Epic: Tampilan & UX

#### 🔄 FE1 - UI Components & Styling (2 hari)
- [x] Shadcn UI setup
- [x] Logo & branding (Mahkamah Agung)
- [ ] Custom theme dengan warna instansi
- [ ] Loading skeletons
- [ ] Empty states
- [ ] Error boundaries
- [ ] Toast notifications system
- [ ] Combobox/Autocomplete component
- **Dependencies:** Design assets
- **Files:** 
  - `resources/css/app.css`
  - `resources/js/components/ui/`

#### 🔄 FE2 - Form UX Improvements (1 hari)
- [ ] Autocomplete untuk select barang/ruangan
- [ ] Real-time validation feedback
- [ ] Form autosave (draft)
- [ ] Keyboard shortcuts (Ctrl+S save, etc)
- **Dependencies:** UI components done
- **Files:** Form components in each feature

---

## 🔄 BE2 - Advanced Features (3 hari remaining)

### Task 3: Notification System (1 hari)
- [x] notifications:table & migrate
- [x] Create 3 Notification classes
- [ ] Implement LowStockNotification
  - [ ] Trigger when stok < minimum
  - [ ] Send to all admins
  - [ ] Email + database
- [ ] Implement TransactionCreatedNotification
  - [ ] Trigger saat create transaction
  - [ ] Send to admins & requester
- [ ] Implement StockReplenishedNotification
  - [ ] Trigger saat stok masuk
  - [ ] Send to relevant users
- [ ] NotificationController
  - [ ] markAsRead($id)
  - [ ] markAllAsRead()
  - [ ] destroy($id)
- [ ] Update HandleInertiaRequests
  - [ ] Share notifications (latest 10)
  - [ ] Share unread_count
- [ ] Create Events & Listeners
  - [ ] LowStockDetected event
  - [ ] TransactionCreated event
  - [ ] StockReplenished event
- [ ] Routes
  - [ ] POST /notifications/{id}/read
  - [ ] POST /notifications/read-all
  - [ ] DELETE /notifications/{id}

### Task 4: Audit Trail System (1 hari)
- [ ] Migration: audit_logs table
  - [ ] user_id, action, model, model_id
  - [ ] old_value (json), new_value (json)
  - [ ] ip_address, user_agent
- [ ] AuditLog model dengan relations
- [ ] HasAuditLog trait
  - [ ] Auto capture created/updated/deleted
- [ ] Apply trait ke models: Barang, Ruangan, Transaction, User
- [ ] AuditLogController
  - [ ] index() dengan filters
  - [ ] export() to CSV/Excel
- [ ] AuditLogPolicy (Admin only)
- [ ] Routes
  - [ ] GET /audit-logs
  - [ ] GET /audit-logs/export

### Task 5: Transaction Enhancement (0.5 hari)
- [ ] Trigger notification saat approve/reject/revise
- [ ] Email notification ke requester (optional)
- [ ] Log approval actions ke audit_logs
- [ ] Validate reconciliation data
- [ ] Prevent edit/delete after completed

### Task 6: User Management API Completeness (0.5 hari)
- [ ] User activity log
- [ ] Last login tracking
- [ ] Password reset flow
- [ ] Bulk user import (Excel)

---

## 👥 FE1 & FE2 - Additional Pages (2 hari remaining)

### FE1 - Settings & User Management (1.5 hari)
- [ ] Settings page (`/settings`)
  - [ ] General settings tab
  - [ ] Email settings tab (with test email)
  - [ ] Backup settings tab
  - [ ] Audit settings tab
  - [ ] Form dengan validation
  - [ ] Clear cache button
- [ ] User Management pages (`/settings/users`)
  - [ ] List users dengan role badges
  - [ ] Create/Edit user form
  - [ ] Toggle active status
  - [ ] Reset password modal
  - [ ] Delete confirmation
- **Dependencies:** BE2 done
- **Files:**
  - `resources/js/pages/settings/index.tsx`
  - `resources/js/pages/settings/users/`

### FE2 - Notifications & Audit (1.5 hari)
- [ ] Notification dropdown di navbar
  - [ ] List notifications (10 latest)
  - [ ] Unread badge count
  - [ ] Mark as read action
  - [ ] Mark all as read
  - [ ] Delete notification
  - [ ] Link to notification detail
- [ ] Audit Log page (`/audit-logs`)
  - [ ] List audit logs dengan filters
  - [ ] Show old/new values comparison
  - [ ] User & timestamp info
  - [ ] Export to CSV
  - [ ] Admin only access
- **Dependencies:** BE2 done
- **Files:**
  - `resources/js/components/notifications/`
  - `resources/js/pages/audit/index.tsx`

---

## 📅 Recommended Workflow

### Day 1-2: Foundation
- **BE2:** Complete Notification System
- **BE1:** Support FE dengan bug fixes
- **FE1:** Login page + Start Barang UI
- **FE2:** Transaction List UI

### Day 3: Core Features
- **BE2:** Audit Trail System
- **BE1:** Support FE dengan bug fixes
- **FE1:** Complete Barang & Ruangan UI
- **FE2:** Transaction Create/Edit Form

### Day 4: Integration
- **BE2:** Transaction Enhancement + Dashboard API
- **BE1:** Testing & bug fixes
- **FE1:** Dashboard fixes + Settings UI
- **FE2:** Stock Management UI

### Day 5: Polish & Testing
- **BE2:** Final touches + Documentation
- **BE1:** E2E testing
- **FE1:** User Management UI + Polish
- **FE2:** Notifications + Audit UI + Polish

---

## 🔗 Dependencies Map

```
BE1 (Foundation) → FE1 & FE2 (UI Implementation)
                ↓
BE2 (Advanced) → FE1 & FE2 (Advanced UI)
                ↓
         Integration Testing
```

### Critical Path
1. ✅ Auth & Master Data Backend (BE1) - **DONE**
2. 🔄 Master Data UI (FE1) - **50% DONE**
3. 🔄 Transaction UI (FE2) - **30% DONE**
4. 🔄 Dashboard API (BE2) - **READY**
5. 🔄 Dashboard UI (FE1) - **90% DONE**
6. ⏳ Notification System (BE2 + FE2)
7. ⏳ Audit Trail (BE2 + FE2)
8. ⏳ Settings & User Management UI (FE1)

---

## 📝 Notes

### BE1 - Focus On
- Support FE dengan API fixes
- Testing & validation
- Documentation
- Performance optimization

### BE2 - Focus On
✅ User Management (DONE)
✅ Settings Management (DONE)
🔄 Notification System (50%)
⏳ Audit Trail System
⏳ Transaction Enhancement

### FE1 - Focus On
✅ Dashboard Charts (90%)
⏳ Login Page
⏳ Master Data UI (Barang, Ruangan)
⏳ Settings UI
⏳ User Management UI

### FE2 - Focus On
⏳ Transaction UI (List, Create, Edit, Detail)
⏳ Stock Management UI
⏳ Monitoring Pages
⏳ Notification Component
⏳ Audit Log Page
⏳ Report Pages

---

## ✅ Definition of Done

### Backend
- [ ] Code follows PSR-12 standards (Pint passed)
- [ ] All methods have proper authorization
- [ ] Input validated dengan FormRequest
- [ ] Error handling implemented
- [ ] API tested dengan Postman/PHPUnit
- [ ] Database queries optimized (N+1 prevented)

### Frontend
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Error handling dengan toast notifications
- [ ] Loading states implemented
- [ ] Empty states designed
- [ ] TypeScript types defined
- [ ] Components reusable
- [ ] Accessibility (keyboard navigation, ARIA labels)

---

## 🚀 Getting Started

### For BE Team
```bash
# Pull latest changes
git pull origin main

# Install dependencies (jika ada yang baru)
composer install

# Run migrations
php artisan migrate

# Seed data (jika perlu)
php artisan db:seed

# Start working on your tasks
git checkout -b feature/your-task-name
```

### For FE Team
```bash
# Pull latest changes
git pull origin main

# Install dependencies (jika ada yang baru)
npm install

# Generate routes (setelah BE update routes)
php artisan wayfinder:generate

# Start dev server
npm run dev

# Start working on your tasks
git checkout -b feature/your-task-name
```

---

**Next Actions:**
1. BE2: Lanjutkan Notification System (Task 3)
2. FE1: Fix dashboard data issues, mulai Login page
3. FE2: Mulai Transaction UI
4. BE1: Review & support FE teams
