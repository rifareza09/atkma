# Next Steps - Task Distribution

**Date:** February 8, 2026  
**Status:** Frontend 1 Completed ✅

---

## 📋 Overview

Setelah menyelesaikan **Frontend 1** (UI/UX improvements, form pages, laporan pages), berikut adalah pembagian tugas untuk tahap selanjutnya:

- **Backend 1 (BE1):** Report exports, Transaction workflow
- **Backend 2 (BE2):** User management, Stock management, Settings
- **Frontend 2 (FE2):** Admin pages, Testing, Bug fixes

---

## 🔧 Backend 1 (BE1) - Priority High

### 1. Report Export Implementation

**File:** `app/Http/Controllers/ReportController.php`

#### Task 1.1: PDF Generation

- [ ] Implement `exportInventoryPdf()` dengan filter logic
    - Filter by: date range, status, low stock
    - Generate PDF dengan view `reports.inventory`
    - Include: logo, header, timestamp, total items
- [ ] Implement `exportTransactionPdf()` dengan filter logic
    - Filter by: type (masuk/keluar), ruangan, date range
    - Landscape orientation
    - Include transaction items table
- [ ] Implement `kartuStokPdf()` untuk stock card
    - Show all stock movements per barang
    - Include: date, type, quantity, balance
    - A4 landscape format

**Resources needed:**

- `Barryvdh\DomPDF\Facade\Pdf` (already installed)
- Create views: `resources/views/reports/`
    - `inventory.blade.php`
    - `transaction.blade.php`
    - `kartu-stok.blade.php`

#### Task 1.2: Excel Generation

- [ ] Update `InventoryExport.php` class
    - Implement filtering logic
    - Add headers & styling
    - Format: Item Code, Name, Stock, Min Stock, Status

- [ ] Update `TransactionExport.php` class
    - Include transaction items
    - Group by transaction
    - Add summary row

- [ ] Update `StockMovementExport.php` class
    - Movement history per barang
    - Running balance calculation

**Files:**

- `app/Exports/InventoryExport.php`
- `app/Exports/TransactionExport.php`
- `app/Exports/StockMovementExport.php`

### 2. Transaction Approval Workflow

**File:** `app/Http/Controllers/TransactionController.php`

- [ ] Implement `approve()` method
    - Update status to 'approved'
    - Create stock movements
    - Send notification
    - Log activity

- [ ] Implement `reject()` method
    - Update status to 'rejected'
    - Add rejection reason
    - Send notification

- [ ] Implement `revise()` method
    - Allow requester to edit
    - Status: 'revised' → 'pending'

- [ ] Add validation rules
    - Only Pengawas/Admin can approve
    - Cannot approve own request
    - Stock availability check

**Additional:**

- Create `TransactionApprovalRequest.php`
- Update `Transaction` model with methods:
    - `approve($user, $keterangan = null)`
    - `reject($user, $alasan)`
    - `canBeApproved($user)`

### 3. Stock Movement Tracking

**File:** `app/Services/StockService.php`

- [ ] Implement detailed stock movement logging
    - Record: user, type, quantity, reference
    - Calculate running balance
    - Validate minimum stock levels

- [ ] Create stock alerts
    - Low stock notification
    - Out of stock warning
    - Email/system notification

- [ ] Stock reconciliation
    - Adjustment feature
    - Stock opname report

**Database:**

- Verify `stock_movements` table structure
- Add indexes for performance

---

## 🔧 Backend 2 (BE2) - Priority Medium

### 1. User Management

**File:** `app/Http/Controllers/UserController.php` (Create new)

- [ ] CRUD Operations
    - `index()`: List users with filters (role, status)
    - `create()`: Form with validation
    - `store()`: Create user with password hashing
    - `edit()`: Update user details
    - `destroy()`: Soft delete user

- [ ] Role Management
    - Assign/change roles
    - Permission matrix
    - Role-based access control

- [ ] User Profile
    - Update profile info
    - Change password
    - Upload avatar (optional)

**Files to create:**

- `app/Http/Controllers/Admin/UserController.php`
- `app/Http/Requests/UserRequest.php`
- `resources/js/pages/admin/users/` (3 files: index, create, edit)

### 2. Settings Management

**File:** `app/Http/Controllers/SettingController.php`

- [ ] App Settings
    - Company info
    - Logo upload
    - Email settings
    - Notification preferences

- [ ] System Configuration
    - Low stock threshold (global)
    - Auto-approval rules
    - Report formats
    - Date formats

- [ ] Backup & Restore (Optional)
    - Database backup
    - Export data
    - Audit logs

**Database:**

- Use existing `settings` table
- Key-value storage with JSON support

### 3. Dashboard Analytics

**File:** `app/Http/Controllers/DashboardController.php`

- [ ] Enhance dashboard with:
    - Total inventory value
    - Monthly transaction trends
    - Top requested items
    - Low stock alerts count
    - Pending approvals count (by role)
    - Stock movement chart (last 7 days)

- [ ] Widget system
    - Configurable dashboard
    - Role-based widgets

**Frontend integration needed with FE2**

### 4. Notification System

**File:** `app/Notifications/` (Create multiple)

- [ ] Email notifications
    - Transaction submitted
    - Transaction approved/rejected
    - Low stock alert
    - User created

- [ ] In-app notifications
    - Notification bell icon (header)
    - Mark as read/unread
    - Notification history

**Files to create:**

- `app/Notifications/TransactionSubmittedNotification.php`
- `app/Notifications/TransactionApprovedNotification.php`
- `app/Notifications/LowStockNotification.php`

---

## 🎨 Frontend 2 (FE2) - Priority High

### 1. Admin Management Pages

#### Task 1.1: User Management

**Directory:** `resources/js/pages/admin/users/`

- [ ] User List Page (`index.tsx`)
    - Table dengan columns: Name, Email, Role, Status, Actions
    - Filters: Role, Status, Search
    - Actions: View, Edit, Delete, Reset Password
    - Pagination

- [ ] Create User Form (`create.tsx`)
    - Fields: Name, Email, Password, Role, Ruangan
    - Validation: Email unique, password strength
    - Success redirect ke list

- [ ] Edit User Form (`edit.tsx`)
    - Pre-filled form
    - Cannot change email
    - Optional password change

**Components to reuse:**

- DataTable
- SearchInput
- FilterSelect
- Form components from Barang pages

#### Task 1.2: Settings Page

**File:** `resources/js/pages/settings/index.tsx`

- [ ] Tabbed interface:
    - **General:** Company info, logo, contact
    - **System:** Stock threshold, notification settings
    - **Email:** SMTP config (admin only)
    - **Appearance:** Theme, language (future)

- [ ] Form handling:
    - Auto-save indicator
    - Validation feedback
    - Success toast messages

### 2. Approval Management Enhancement

**File:** `resources/js/pages/transaksi/permintaan/index.tsx`

- [ ] Add approval actions in table
    - Button: "Approve" (green)
    - Button: "Reject" (red)
    - Modal: Rejection reason input
    - Real-time status update

- [ ] Filter by approval status
    - Pending (for Pengawas)
    - Approved
    - Rejected
    - Badge color-coding

- [ ] Bulk actions (optional)
    - Select multiple requests
    - Bulk approve/reject

### 3. Enhanced Dashboard Widgets

**File:** `resources/js/pages/dashboard/index.tsx`

- [ ] Add new widgets:
    - **Quick Stats Cards:**
        - Total Inventory Value (Rp)
        - Pending Approvals
        - Low Stock Items
        - Monthly Transactions
    - **Charts:**
        - Stock Movement Trend (Line chart - last 30 days)
        - Top Requested Items (Bar chart - top 10)
        - Transaction by Type (Donut chart - Masuk vs Keluar)

- [ ] Real-time updates (optional)
    - WebSocket or polling
    - Live notification count

**Libraries:**

- Install chart library: `recharts` or `chart.js`
    ```bash
    npm install recharts
    ```

### 4. Profile Management

**File:** `resources/js/pages/profile/index.tsx`

- [ ] User Profile Page
    - Display: Name, Email, Role, Ruangan
    - Edit personal info
    - Change password form
    - Activity log (last 10 actions)

### 5. Testing & Bug Fixes

#### Task 5.1: Form Validation Testing

- [ ] Test all forms with invalid data
- [ ] Test error message display
- [ ] Test success message & redirect

#### Task 5.2: Permission Testing

- [ ] Test role-based access
    - Admin: Full access
    - Pengawas: Cannot delete, can approve
    - User: Read-only

#### Task 5.3: UI/UX Polish

- [ ] Loading states for all async actions
- [ ] Empty states (no data messages)
- [ ] Error boundary (catch React errors)
- [ ] Mobile responsiveness check
- [ ] Dark mode support (optional)

#### Task 5.4: Cross-browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)

### 6. Documentation

**Files to create/update:**

- [ ] Update `README.md`
    - Installation steps
    - Environment setup
    - Database migrations
    - Seeding data

- [ ] Create `USER_MANUAL.md`
    - How to use each feature
    - Screenshots
    - Common workflows

- [ ] Create `API_DOCUMENTATION.md`
    - List all endpoints
    - Request/response examples
    - Authentication

---

## 📊 Priority Matrix

| Task                    | Priority   | Dependency    | Estimated Time |
| ----------------------- | ---------- | ------------- | -------------- |
| BE1: Report PDF/Excel   | **HIGH**   | None          | 2-3 days       |
| BE1: Approval Workflow  | **HIGH**   | None          | 1-2 days       |
| BE2: User Management    | **MEDIUM** | None          | 2 days         |
| BE2: Settings           | **MEDIUM** | None          | 1 day          |
| FE2: User Management UI | **HIGH**   | BE2 User CRUD | 2 days         |
| FE2: Approval UI        | **HIGH**   | BE1 Approval  | 1 day          |
| FE2: Dashboard Widgets  | **MEDIUM** | BE2 Analytics | 2 days         |
| FE2: Testing            | **HIGH**   | All above     | 2-3 days       |

---

## 🚀 Suggested Timeline

### Week 1 (Feb 8 - Feb 14)

- **BE1:** Complete report exports + approval workflow
- **BE2:** Start user management CRUD
- **FE2:** Wait for BE1 approval, prepare components

### Week 2 (Feb 15 - Feb 21)

- **BE1:** Testing & bug fixes
- **BE2:** Complete user management + settings
- **FE2:** User management UI + approval UI

### Week 3 (Feb 22 - Feb 28)

- **BE2:** Dashboard analytics + notifications
- **FE2:** Dashboard widgets + profile page
- **FE2:** Testing & bug fixes

### Week 4 (Mar 1 - Mar 7)

- **All:** Integration testing
- **All:** Documentation
- **All:** Deployment preparation

---

## 📝 Notes

### For Backend Team:

- Follow PSR-12 coding standards
- Write tests for critical functions
- Document API endpoints
- Use transactions for data consistency
- Log important actions

### For Frontend Team:

- Follow React best practices
- Reuse existing components
- Maintain TypeScript types
- Test on multiple browsers
- Optimize performance (lazy loading)

### Communication:

- Daily standup at 9 AM
- Use GitHub Issues for task tracking
- PR review required before merge
- Update progress in NEXT_STEPS.md

---

## ✅ Definition of Done

A task is considered done when:

- [ ] Code is written and tested locally
- [ ] No console errors/warnings
- [ ] Passes code review
- [ ] Merged to `develop` branch
- [ ] Documentation updated
- [ ] Tested by another team member

---

**Last Updated:** February 8, 2026  
**Created By:** Frontend 1 Developer  
**Status:** Ready for distribution 🚀
