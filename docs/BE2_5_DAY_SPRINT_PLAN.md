# 📅 BE2 Sprint Plan - 5 Hari (10-14 Feb 2026)

## 🎯 Sprint Goal
Menyelesaikan 3 priority tasks terakhir: Audit Trail System, Dashboard Analytics, dan Notification System untuk ATK Mahkamah Agung.

---

## 📊 Sprint Overview

| **Task** | **Day** | **Status** | **Priority** |
|----------|---------|------------|--------------|
| Audit Trail System | Day 1-2 | 🔴 Todo | High |
| Dashboard Analytics | Day 3-4 | 🔴 Todo | High |
| Notification System | Day 5 | 🔴 Todo | Medium |

---

## 🗓️ Day 1 - Senin, 10 Februari 2026
**Focus:** Audit Trail System - Database & Model

### Morning Session (09:00 - 12:00)
- [ ] **Create Migration** - `create_audit_logs_table.php` (30 min)
  - Columns: id, user_id, action, auditable_type, auditable_id, old_values (json), new_values (json), ip_address, user_agent, timestamps
  - Indexes: user_id, auditable_type, auditable_id, created_at
  
- [ ] **Create AuditLog Model** (30 min)
  - Relationships: belongsTo User, morphTo auditable
  - Casts: old_values, new_values → array
  - Accessors: formatted_changes, action_label
  
- [ ] **Create AuditLogObserver** (1 hour)
  - Method: created(), updated(), deleted()
  - Capture old/new values dengan json_encode
  - Store IP address dan user agent dari request

### Afternoon Session (13:00 - 17:00)
- [ ] **Register Observer di AppServiceProvider** (15 min)
  - Boot method: Observe Barang, Ruangan, Transaction, User models
  
- [ ] **Create AuditLogController** (1.5 hours)
  - index() dengan filters: user, action, model, date range
  - show($id) untuk detail audit log
  - exportExcel() untuk export audit trail
  
- [ ] **Create AuditLogPolicy** (30 min)
  - viewAny() - Admin only
  - view() - Admin only
  - export() - Admin only

- [ ] **Testing** (1 hour)
  - Test create/update/delete Barang → check audit_logs table
  - Test filters di index()
  - Verify old_values dan new_values tersimpan dengan benar

### Deliverables Day 1
✅ Migration, Model, Observer, Controller, Policy
✅ Audit logging berjalan otomatis untuk semua CRUD operations

---

## 🗓️ Day 2 - Selasa, 11 Februari 2026
**Focus:** Audit Trail System - UI & Export + Git Push

### Morning Session (09:00 - 12:00)
- [ ] **Add Routes** (15 min)
  - GET /audit-trail → index
  - GET /audit-trail/{id} → show
  - GET /audit-trail/export → exportExcel
  
- [ ] **Create AuditLogExport Class** (45 min)
  - Implements: FromCollection, WithHeadings, WithMapping, WithStyles
  - Columns: Tanggal, User, Action, Model, Detail Perubahan, IP Address
  
- [ ] **Create TypeScript Types** (30 min)
  - AuditLog interface di models.d.ts
  - AuditLogFilter interface
  - PageProps untuk audit-trail pages

- [ ] **Testing & Debugging** (1.5 hours)
  - Test export Excel dengan data sample
  - Verify authorization policies
  - Check performance dengan 1000+ audit logs

### Afternoon Session (13:00 - 17:00)
- [ ] **Code Review & Cleanup** (1 hour)
  - Review all audit trail code
  - Add PHPDoc comments
  - Format dengan Laravel Pint
  
- [ ] **Documentation** (1 hour)
  - Update DEVELOPMENT_GUIDE.md
  - Add audit trail usage examples
  - Document filter parameters
  
- [ ] **Git Workflow** (30 min)
  - `git add .`
  - `git commit -m "feat: implement audit trail system with observer pattern"`
  - `git push origin develop`
  
- [ ] **Manual Testing** (1.5 hours)
  - Test semua CRUD operations dengan audit trail
  - Verify filters: by user, by action, by model, by date
  - Test export functionality
  - Check performance impact

### Deliverables Day 2
✅ Routes, Export class, TypeScript types
✅ Complete testing dan documentation
✅ Code pushed to develop branch

---

## 🗓️ Day 3 - Rabu, 12 Februari 2026
**Focus:** Dashboard Analytics - API Development

### Morning Session (09:00 - 12:00)
- [ ] **Update DashboardController** (2.5 hours)
  - **getChartData()** method (1 hour)
    - Transactions per month (last 6 months)
    - Stock movements per hari (last 30 days)
    - Top 10 barang most requested
    - Return JSON format untuk Chart.js/Recharts
  
  - **getRecentActivities()** method (45 min)
    - Query 10 latest audit logs
    - Include user, action, model info
    - Format timestamp (diffForHumans)
  
  - **getQuickStats()** method (45 min)
    - Total users (active/inactive)
    - Pending transactions count
    - Low stock items count
    - Total barang di inventory

### Afternoon Session (13:00 - 17:00)
- [ ] **Add Analytics Routes** (15 min)
  - GET /api/dashboard/chart-data → getChartData
  - GET /api/dashboard/recent-activities → getRecentActivities
  - GET /api/dashboard/quick-stats → getQuickStats
  
- [ ] **Create Resource Classes** (1 hour)
  - ChartDataResource untuk format chart data
  - ActivityResource untuk recent activities
  - QuickStatsResource untuk dashboard cards
  
- [ ] **Optimize Queries** (1.5 hours)
  - Add indexes untuk performance
  - Use DB::raw untuk aggregations
  - Cache chart data (5 minutes TTL)
  - Eager load relationships
  
- [ ] **Testing with Postman/Thunder Client** (1 hour)
  - Test all 3 new endpoints
  - Verify JSON structure
  - Check response time (<500ms)
  - Test dengan large dataset

### Deliverables Day 3
✅ 3 new analytics endpoints
✅ Resource classes untuk clean API responses
✅ Query optimization dengan caching

---

## 🗓️ Day 4 - Kamis, 13 Februari 2026
**Focus:** Dashboard Analytics - TypeScript & Testing + Git Push

### Morning Session (09:00 - 12:00)
- [ ] **Create TypeScript Types** (1 hour)
  - ChartData interface (labels, datasets, colors)
  - Activity interface (user, action, model, timestamp)
  - QuickStats interface (4 card data)
  - Update PageProps<'dashboard'>
  
- [ ] **Update models.d.ts** (30 min)
  - Export all new analytics types
  - Add JSDoc comments
  - Verify type consistency dengan API responses
  
- [ ] **Testing API Endpoints** (1.5 hours)
  - Test getChartData dengan different date ranges
  - Test getRecentActivities pagination
  - Test getQuickStats dengan empty database
  - Load testing dengan Apache Bench

### Afternoon Session (13:00 - 17:00)
- [ ] **Integration Testing** (2 hours)
  - Create test data (factories)
  - Test chart data aggregation
  - Test activity filtering
  - Test stats calculation accuracy
  
- [ ] **Performance Optimization** (1 hour)
  - Profile slow queries dengan Laravel Debugbar
  - Add missing indexes
  - Implement Redis cache if needed
  - Optimize eager loading
  
- [ ] **Documentation & Git Push** (1 hour)
  - Update API documentation
  - Add usage examples
  - `git add .`
  - `git commit -m "feat: implement dashboard analytics with chart data and stats API"`
  - `git push origin develop`

### Deliverables Day 4
✅ TypeScript types untuk analytics
✅ Complete testing & optimization
✅ Code pushed to develop branch

---

## 🗓️ Day 5 - Jumat, 14 Februari 2026
**Focus:** Notification System + Final Sprint Review

### Morning Session (09:00 - 12:00)
- [ ] **Create Migration** - `create_notifications_table.php` (30 min)
  - Columns: id, user_id, type, title, message, data (json), read_at, created_at
  - Indexes: user_id, read_at, created_at
  
- [ ] **Create Notification Model** (30 min)
  - Relationships: belongsTo User
  - Scopes: unread(), today(), byType()
  - Methods: markAsRead()
  
- [ ] **Create NotificationController** (1 hour)
  - index() - List notifications untuk current user
  - markAsRead($id) - Mark single notification
  - markAllAsRead() - Mark all notifications
  - destroy($id) - Delete notification
  
- [ ] **Create NotificationService** (1 hour)
  - send($user, $type, $title, $message, $data)
  - sendToMultiple($users, ...)
  - Types: transaction_approved, low_stock_alert, system_announcement

### Afternoon Session (13:00 - 17:00)
- [ ] **Create Event Listeners** (1.5 hours)
  - TransactionApprovedListener → send notification to requester
  - LowStockAlertListener → send notification to all admins
  - UserCreatedListener → send welcome notification
  
- [ ] **Add Routes & Types** (45 min)
  - GET /notifications → index
  - POST /notifications/{id}/read → markAsRead
  - POST /notifications/read-all → markAllAsRead
  - DELETE /notifications/{id} → destroy
  - Add Notification interface to models.d.ts
  
- [ ] **Testing & Documentation** (1 hour)
  - Test notification creation
  - Test mark as read functionality
  - Test event listeners trigger correctly
  - Update documentation
  
- [ ] **Sprint Review & Git Push** (45 min)
  - `git add .`
  - `git commit -m "feat: implement notification system with event listeners"`
  - `git push origin develop`
  - Create sprint summary document
  - List completed vs pending items

### Deliverables Day 5
✅ Complete notification system (database → API → events)
✅ Routes, controller, service, event listeners
✅ Testing & documentation
✅ **Final git push to develop**

---

## 📈 Sprint Metrics

### Estimated Time Breakdown
| **Task** | **Backend** | **Testing** | **Documentation** | **Total** |
|----------|-------------|-------------|-------------------|-----------|
| Audit Trail | 10h | 2.5h | 1.5h | 14h |
| Dashboard Analytics | 8h | 3h | 1h | 12h |
| Notification System | 5h | 1h | 1h | 7h |
| **TOTAL** | **23h** | **6.5h** | **3.5h** | **33h** |

### Working Hours: 8h/day × 5 days = 40 hours
**Buffer time:** 7 hours untuk unexpected issues, meetings, code review

---

## ✅ Definition of Done

Setiap task dianggap selesai jika:
- ✅ Migration & Model created with relationships
- ✅ Controller dengan minimal 4 methods (index, show, store, destroy)
- ✅ Policy untuk authorization (admin/pengawas)
- ✅ Routes registered di web.php
- ✅ TypeScript types added ke models.d.ts
- ✅ Manual testing passed (happy path + edge cases)
- ✅ PHPDoc comments added
- ✅ Code formatted dengan Laravel Pint
- ✅ Documentation updated
- ✅ **Git commit & push to develop branch**

---

## 🚨 Risk Management

### Potential Blockers
1. **Performance Issues** → Solution: Implement caching, optimize queries
2. **Observer Pattern Overhead** → Solution: Queue audit log creation
3. **Large Dataset Charts** → Solution: Limit to last 6 months, use aggregations
4. **Notification Spam** → Solution: Throttle notifications, batch similar alerts

### Mitigation Strategy
- Daily standup review at 09:00
- Test dengan realistic data volume
- Monitor query performance dengan Laravel Telescope
- Keep buffer time for debugging

---

## 📝 Notes
- Semua task mengikuti pattern yang sudah established (User Management, Settings)
- Focus on backend API first, frontend pages bisa dikerjakan parallel oleh FE team
- Prioritize testing & documentation untuk maintainability
- Use git commit conventions: `feat:`, `fix:`, `docs:`, `test:`

**Sprint Goal:** Complete all 3 backend systems dengan production-ready code quality! 🚀
