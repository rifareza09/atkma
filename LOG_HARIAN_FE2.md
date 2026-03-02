# LOG HARIAN MAGANG — FRONTEND 2 (FE2)
## Proyek Pengembangan Sistem ATK — MA

---

### INFORMASI PESERTA

| Item | Keterangan |
|------|------------|
| **Divisi** | Frontend 2 (FE2) |
| **Periode Log** | 9 Februari 2026 — 20 Maret 2026 |
| **Sistem** | Sistem Manajemen ATK (Alat Tulis Kantor) — MA |
| **Stack** | React + TypeScript + Inertia.js + Laravel + shadcn/ui |
| **Catatan** | Mulai 28 Feb — Jam kerja menyesuaikan Ramadhan |

---

## MINGGU 1 — 9–14 Februari 2026

| Tgl | Hari | Jam | Aktivitas | Ket |
|-----|------|-----|-----------|-----|
| 09/02 | Senin | 7 Jam | **Pembuatan Modul: Stock Reconciliation — Controllers, Routes & APIs** | Buat `StockReconciliationController`, definisi routes resource `/reconciliations`, setup API endpoint index/store/show, integrasi `StockService` untuk validasi selisih stok |
| 10/02 | Selasa | 7 Jam | **Pembuatan Modul: Dashboard APIs + TypeScript Types + Tabs Component** | Buat endpoint `/dashboard/stats`, `/dashboard/charts`, definisi TypeScript interface `DashboardStats`, `ChartData`, `LowStockItem`; implementasi komponen `<Tabs>` & `<TabsContent>` dengan shadcn/ui |
| 11/02 | Rabu | 7 Jam | **Pembuatan Modul: Transaction Approval UI + Recon Index/Create + Build & Deploy** | Implementasi halaman `Recon/Index.tsx` (tabel rekonsiliasi + filter), `Recon/Create.tsx` (form input selisih), tombol Approve/Reject di `TransactionApproval`, build production & deploy ke server staging |
| 12/02 | Kamis | 7 Jam | **Pembuatan Modul: Recon Show + Dashboard Widget + GIT Push** | Buat halaman `Recon/Show.tsx` (detail rekonsiliasi + history), widget `<StockAlertWidget>` di dashboard (low stock badges), `<PendingApprovalWidget>` (count antrian), commit & push ke branch `feature/fe2-recon` |
| 13/02 | Jumat | 7 Jam | **Pembuatan Modul: Permintaan Barang — Halaman Index & Create (UI + Form)** | Buat `transaksi/permintaan/Index.tsx` (tabel list permintaan + filter status/tanggal/ruangan), `transaksi/permintaan/Create.tsx` (form multi-item dengan `DynamicFormItems`, searchable dropdown barang & ruangan) |
| 14/02 | Sabtu | 5 Jam | **Pembuatan Modul: Permintaan Barang — Validasi Form & Integration Test** | Tambahkan validasi Zod pada form permintaan, integrasi dengan backend endpoint `POST /permintaan`, test submission flow end-to-end, perbaikan error response handling |

---

## MINGGU 2 — 16–21 Februari 2026

| Tgl | Hari | Jam | Aktivitas | Ket |
|-----|------|-----|-----------|-----|
| 16/02 | Senin | 7 Jam | **Pembuatan Modul: Permintaan Barang — Show + Status Approval Logic** | Buat `transaksi/permintaan/Show.tsx` (detail permintaan + item list + timeline status), implementasi tombol Setujui/Tolak/Proses dengan role guard (`Admin` only), update badge status (Pending/Disetujui/Ditolak/Diproses) |
| 17/02 | Selasa | 7 Jam | **Pembuatan Modul: Master Barang — CRUD + Role-based Access Control** | Implementasi `master/barang/Index.tsx` (tabel + search + pagination), `Create.tsx` & `Edit.tsx` (form nama, kode, satuan, stok awal, minimum stok), `Show.tsx` (detail + riwayat stok), sembunyikan tombol CUD untuk role `Pengawas` |
| 18/02 | Rabu | 7 Jam | **Pembuatan Modul: Rooms/Ruangan — CRUD + Kuota Ruangan Logic** | Buat `master/ruangan/Index.tsx`, `Create.tsx`, `Edit.tsx`, `Show.tsx`; tambah field kuota per barang, tampilkan usage percentage (terpakai/kuota) di halaman detail ruangan, integrasi API `/ruangan/{id}/stok` |
| 19/02 | Kamis | 7 Jam | **Pembuatan Modul: User Management — CRUD + Role System** | Buat `admin/users/Index.tsx` (tabel users + filter role + search), `Create.tsx` (form nama, username, email, password, role), `Edit.tsx` (edit profil + tombol Activate/Deactivate), `Show.tsx` (profil detail + activity log) |
| **20/02** | **Jumat** | **7 Jam** | **🗓️ SPRINT REVIEW — Presentasi ke Client** | Presentasi progress FE2 kepada klien (pihak MA): demo modul Permintaan Barang, Master Barang, Ruangan, User Management; catat feedback & revisi; update backlog sesuai arahan klien |
| 21/02 | Sabtu | 5 Jam | **Tindak Lanjut Sprint Review — Revisi & Perbaikan Feedback Client** | Implementasi perbaikan berdasarkan feedback sprint review: penyesuaian label kolom tabel, revisi tampilan badge status, perbaikan validasi form sesuai permintaan klien |

---

## MINGGU 3 — 23–28 Februari 2026

| Tgl | Hari | Jam | Aktivitas | Ket |
|-----|------|-----|-----------|-----|
| 23/02 | Senin | 7 Jam | **Pembuatan Modul: Reports — Laporan Inventaris + Laporan Transaksi** | Buat `laporan/inventaris/Index.tsx` (filter kategori/ruangan/tanggal, preview tabel, tombol Export PDF & Excel), `laporan/transaksi/Index.tsx` (filter jenis transaksi/tanggal/ruangan, preview, Export); integrasi endpoint `GET /laporan/inventaris` & `/laporan/transaksi` |
| **24/02** | **Selasa** | **7 Jam** | **📦 Pengisian Data Stok Barang** | Input data stok awal seluruh barang ATK ke dalam sistem: entry data nama barang, kode barang, satuan, jumlah stok, minimum stok, dan kategori; verifikasi akurasi data dengan dokumen inventaris fisik; total ±150 item barang diinput |
| 25/02 | Rabu | 7 Jam | **Pembuatan Modul: Laporan Barang Bulan Detail + Laporan Barang Masuk** | Buat `laporan/barang-bulan/Show.tsx` (detail laporan per bulan: tabel masuk/keluar/saldo per item), `laporan/barang-masuk/Index.tsx` (list barang masuk + filter tanggal/supplier, Preview + Export PDF); integrasi PDF viewer inline |
| **26/02** | **Kamis** | **7 Jam** | **🗓️ SPRINT REVIEW — Koordinasi dengan Backend 1 (BE1)** | Sprint review internal bersama tim Backend 1: sinkronisasi contract API (request/response shape), review TypeScript types di `models.d.ts`, sinkronisasi endpoint `/transaksi`, `/stok`, `/laporan`; identifikasi kebutuhan API tambahan untuk FE2; update `TransactionIndexProps`, `TransactionCreateProps`, `TransactionShowProps` |
| **27/02** | **Jumat** | **7 Jam** | **📋 Penginputan Data — Pencatatan Pengambilan Barang (Sesi 1)** | Input data historis pengambilan barang ke dalam sistem: pencatatan transaksi keluar (permintaan barang) dari setiap ruangan; entry ±80 record pengambilan barang dari dokumen fisik; verifikasi kesesuaian stok setelah input |
| 28/02 | Sabtu | 5 Jam | **Pembuatan Modul: Audit Logs Feature + Draft Template PDF Laporan** | Buat `audit-logs/Index.tsx` (tabel audit log + filter user/aksi/tanggal, show old/new value comparison, Export CSV); draft layout template PDF Laporan Barang Bulan (header instansi, tabel stok, footer tanda tangan); *Mulai menyesuaikan jam kerja Ramadhan* |

---

## MINGGU 4 — 2–7 Maret 2026

| Tgl | Hari | Jam | Aktivitas | Ket |
|-----|------|-----|-----------|-----|
| **02/03** | **Senin** | **7 Jam** | **📋 Penginputan Data — Pencatatan Pengambilan Barang (Sesi 2)** | Lanjutan input data historis pengambilan barang: entry ±100 record transaksi keluar dari dokumen manual bulan-bulan sebelumnya; validasi stok running saldo setelah semua data masuk; rekonsiliasi data antara catatan fisik dan sistem |
| 03/03 | Selasa | 7 Jam | **Pembuatan Modul: Rewrite PDF Barang Bulan — Layouting & Margin Fix** | Rewrite template PDF menggunakan dompdf: perbaikan margin halaman (A4 landscape), layout tabel multi-kolom (Kode, Nama, Satuan, Stok Awal, Masuk, Keluar, Saldo), sinkronisasi header/footer setiap halaman, test export dengan data real |
| 04/03 | Rabu | 7 Jam | **Pembuatan Modul: Refactor PDF ke Format Kartu Stok & Running Saldo** | Refactor struktur PDF ke format Kartu Stok (per barang): tampilkan running saldo setelah setiap transaksi masuk/keluar, format tanggal + keterangan + qty + saldo, test dengan barang yang memiliki banyak mutasi; buat halaman `laporan/kartu-stok/Show.tsx` (pilih barang + date range → view PDF) |
| 05/03 | Kamis | 7 Jam | **Analisis Masalah + Pembuatan Modul: Fix Navbar/Sidebar + Resolve Merge Conflict** | Analisis bug Navbar collapse di mobile (hidden menu item), fix sidebar active state tidak update saat navigasi, selesaikan merge conflict antara branch `feature/fe2-reports` dan `main` (konflik di `AppLayout.tsx`, `Sidebar.tsx`); testing post-merge |
| 06/03 | Jumat | 7 Jam | **Pembuatan Modul: UI Polish Sidebar & Navbar — Redesign Icons** | Redesign icon set sidebar menggunakan Lucide React (konsisten): ganti ikon per menu (Dashboard, Barang, Ruangan, Transaksi, Laporan, Pengaturan, Audit); perbaiki spacing & tipografi navbar; tambah tooltip pada icon-only mode sidebar; review responsif mobile/tablet |
| 07/03 | Sabtu | 5 Jam | **Pembuatan Modul: Notification Bell — Backend Endpoint + TypeScript Types** | Integrasi endpoint `GET /notifications` (10 latest), `PATCH /notifications/{id}/read`, `PATCH /notifications/read-all`; definisi TypeScript type `Notification`, `NotificationPayload`; setup polling interval untuk unread count |

---

## MINGGU 5 — 9–14 Maret 2026

| Tgl | Hari | Jam | Aktivitas | Ket |
|-----|------|-----|-----------|-----|
| 09/03 | Senin | 7 Jam | **Pembuatan Modul: Notification Dropdown — Bell Icon + Panel UI** | Implementasi `<NotificationBell>` di Navbar (badge unread count merah), `<NotificationDropdown>` (panel 10 notif terbaru: icon type, pesan, waktu relatif, link), tombol "Tandai Semua Dibaca", "Hapus", animasi masuk dropdown; test dengan notif low stock & approval |
| 10/03 | Selasa | 7 Jam | **Analisis Masalah + Testing: End-to-End Testing & Bug Fixes** | E2E testing seluruh workflow: Login → Buat Permintaan → Approval → Stok Berkurang → Laporan; temukan & fix 5 bug (validasi item kosong, stok tidak update realtime, PDF tidak generate untuk tanggal kosong, filter tanggal off-by-one, role guard `Pengawas` bypass di edit barang) |
| 11/03 | Rabu | 7 Jam | **Pembuatan Modul: Form UX Improvements — SearchableSelect & Autocomplete** | Buat komponen `<SearchableSelect>` (dropdown combobox dengan search, debounce 300ms, async load barang/ruangan dari API); implementasi pada semua form permintaan & transaksi masuk; replace `<select>` HTML biasa di Create/Edit Barang, Ruangan |
| 12/03 | Kamis | 7 Jam | **Pembuatan Modul: DateRangePicker + Real-time Validation Feedback** | Buat komponen `<DateRangePicker>` (pilih range tanggal dengan kalender dual-panel, preset: Hari ini, 7 Hari, 30 Hari, Bulan Ini); implementasi pada semua halaman filter laporan & transaksi; tambah real-time inline validation dengan Zod + `react-hook-form` |
| 13/03 | Jumat | 7 Jam | **Pembuatan Modul: Stock Monitoring per Ruangan + Jatah Barang** | Buat `monitoring/stok-ruangan/Index.tsx` (tabel stok per ruangan + filter, progress bar usage %, warning merah jika >80%); `monitoring/jatah-barang/Index.tsx` (monitoring kuota per item per ruangan); integrasi endpoint `GET /monitoring/stok-ruangan` & `/monitoring/jatah` |
| 14/03 | Sabtu | 5 Jam | **Pembuatan Modul: DynamicFormItems + Transaction Pages (Index/Create/Show)** | Finalisasi komponen `<DynamicFormItems>` (form array untuk item transaksi: add/remove row, auto-hitung total); buat `transaksi/masuk/Index.tsx` (list barang masuk + filter), `Create.tsx` (form barang masuk multi-item), `Show.tsx` (detail + print); `transaksi/Index.tsx` (semua transaksi + filter advanced) |

---

## MINGGU 6 — 16–20 Maret 2026

| Tgl | Hari | Jam | Aktivitas | Ket |
|-----|------|-----|-----------|-----|
| 16/03 | Senin | 7 Jam | **Pembuatan Modul: Settings Page — Tabs (General, Email, Backup, Audit)** | Buat `settings/Index.tsx` dengan layout tabs: tab General (nama instansi, logo, timezone), tab Email (SMTP config), tab Backup (jadwal backup, download), tab Audit (retention log); implementasi `<SaveConfirmationModal>` sebelum submit perubahan; integrasi `PATCH /settings` |
| 17/03 | Selasa | 7 Jam | **Pembuatan Modul: Dashboard Charts — Recharts Integration** | Integrasi library Recharts: `<LineChart>` transaksi per bulan (12 bulan terakhir), `<BarChart>` pergerakan stok (masuk vs keluar per bulan), `<PieChart>` / `<DonutChart>` workflow stats (Pending/Disetujui/Ditolak); upgrade dari CSS-only chart ke Recharts; responsive container |
| 18/03 | Rabu | 7 Jam | **Pembuatan Modul: Stock Movement List — Filter & Adjustment Form** | Buat `stok/pergerakan/Index.tsx` (list semua stock movement + filter jenis/tanggal/barang), `stok/riwayat/Show.tsx` (riwayat per barang: timeline masuk/keluar/koreksi), `stok/koreksi/Create.tsx` (form adjustment stok dengan keterangan alasan); integrasi `POST /stok/koreksi` |
| 19/03 | Kamis | 7 Jam | **Pembuatan Modul: Finishing UI + Perbaikan Sistem (Jam Kerja Ramadhan)** | Polish UI menyeluruh: konsistensi warna & spacing seluruh halaman, perbaikan layout responsive tabel di mobile, fix truncate text di sidebar panjang, tambah empty state illustration di halaman kosong, perbaikan loading skeleton; update dokumentasi komponen |
| 20/03 | Jumat | 7 Jam | **Pembuatan Modul: Finishing UI + Perbaikan Sistem (Jam Kerja Ramadhan)** | Final review & bug fix: cross-browser testing (Chrome & Firefox), test permission setiap role (Admin/Pengawas), perbaikan 3 bug sisa dari testing kemarin (export Excel encoding UTF-8, pagination reset saat filter, notification mark-read tidak refresh count); commit final & push ke `main` |

---

## REKAPITULASI JAM KERJA

### Per Minggu

| Minggu | Periode | Hari Kerja | Jam Senin–Jumat | Jam Sabtu | Total |
|--------|---------|------------|-----------------|-----------|-------|
| 1 | 9–14 Feb | 6 hari | 35 Jam | 5 Jam | **40 Jam** |
| 2 | 16–21 Feb | 6 hari | 35 Jam | 5 Jam | **40 Jam** |
| 3 | 23–28 Feb | 6 hari | 35 Jam | 5 Jam | **40 Jam** |
| 4 | 2–7 Mar | 6 hari | 35 Jam | 5 Jam | **40 Jam** |
| 5 | 9–14 Mar | 6 hari | 35 Jam | 5 Jam | **40 Jam** |
| 6 | 16–20 Mar | 5 hari | 35 Jam | — | **35 Jam** |
| **TOTAL** | | **35 hari** | **210 Jam** | **25 Jam** | **235 Jam** |

---

### Distribusi Aktivitas

| Kategori | Jumlah Hari | Total Jam | Persentase |
|----------|-------------|-----------|------------|
| Pembuatan Modul Frontend | 26 hari | 182 Jam | 77.4% |
| Penginputan Data Sistem | 3 hari | 21 Jam | 8.9% |
| Sprint Review / Koordinasi | 2 hari | 14 Jam | 6.0% |
| Tindak Lanjut Review | 1 hari | 5 Jam | 2.1% |
| Testing & Bug Fixes | 1 hari | 7 Jam | 3.0% |
| **TOTAL** | **33 hari** | **229 Jam** | **100%** |

---

### Modul yang Diselesaikan

| No | Modul / Komponen | Status |
|----|-----------------|--------|
| 1 | Stock Reconciliation (Controllers, Routes, APIs) | ✅ Selesai |
| 2 | Dashboard APIs + TypeScript Types + Tabs | ✅ Selesai |
| 3 | Transaction Approval UI + Recon Index/Create | ✅ Selesai |
| 4 | Recon Show + Dashboard Widget | ✅ Selesai |
| 5 | Permintaan Barang — Index & Create | ✅ Selesai |
| 6 | Permintaan Barang — Show + Approval Logic | ✅ Selesai |
| 7 | Master Barang — CRUD + Role Access | ✅ Selesai |
| 8 | Rooms/Ruangan — CRUD + Kuota Logic | ✅ Selesai |
| 9 | User Management — CRUD + Role System | ✅ Selesai |
| 10 | Pengisian Data Stok Barang (±150 item) | ✅ Selesai |
| 11 | Sprint Review Client (20 Feb) | ✅ Selesai |
| 12 | Reports — Laporan Inventaris + Transaksi | ✅ Selesai |
| 13 | Penginputan Pencatatan Pengambilan Barang | ✅ Selesai |
| 14 | Sprint Review Backend/BE1 (26 Feb) | ✅ Selesai |
| 15 | Laporan Barang Bulan Detail + Barang Masuk | ✅ Selesai |
| 16 | Audit Logs Feature + Draft Template PDF | ✅ Selesai |
| 17 | Rewrite PDF — Layouting & Margin Fix | ✅ Selesai |
| 18 | Refactor PDF — Kartu Stok & Running Saldo | ✅ Selesai |
| 19 | Fix Navbar/Sidebar + Resolve Merge Conflict | ✅ Selesai |
| 20 | UI Polish Sidebar & Navbar — Redesign Icons | ✅ Selesai |
| 21 | Notification Bell + Dropdown Panel | ✅ Selesai |
| 22 | End-to-End Testing & Bug Fixes | ✅ Selesai |
| 23 | SearchableSelect + Autocomplete Component | ✅ Selesai |
| 24 | DateRangePicker + Real-time Validation | ✅ Selesai |
| 25 | Stock Monitoring per Ruangan + Jatah Barang | ✅ Selesai |
| 26 | DynamicFormItems + Transaction Pages | ✅ Selesai |
| 27 | Settings Page (Tabs + Save Modal) | ✅ Selesai |
| 28 | Dashboard Charts (Recharts Integration) | ✅ Selesai |
| 29 | Stock Movement List + Adjustment Form | ✅ Selesai |
| 30 | Finishing UI + Bug Fix (Jam Kerja Ramadhan) | ✅ Selesai |

---

### Catatan Khusus

| Tanggal | Event | Keterangan |
|---------|-------|------------|
| 20 Feb 2026 | Sprint Review — Client | Presentasi kepada pihak MA; feedback diterima & diimplementasi |
| 24 Feb 2026 | Pengisian Data Stok | Input ±150 item barang ATK ke sistem |
| 26 Feb 2026 | Sprint Review — Backend (BE1) | Sinkronisasi API contract & TypeScript types |
| 27 Feb 2026 | Input Pencatatan Pengambilan (Sesi 1) | ±80 record historis diinput |
| 28 Feb 2026 | Mulai Ramadhan | Jam kerja menyesuaikan (tetap 7 jam/hari, penyesuaian waktu istirahat) |
| 02 Mar 2026 | Input Pencatatan Pengambilan (Sesi 2) | ±100 record historis diinput; rekonsiliasi stok selesai |

---

*Log ini dibuat sebagai dokumentasi aktivitas harian FE2 selama periode pengembangan.*
*Proyek: Sistem Manajemen ATK — MA | Periode: 9 Februari — 20 Maret 2026*
