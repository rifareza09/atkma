# SILABUS JAM KERJA MAGANG
## Proyek Pengembangan Web - ATKMA

---

### INFORMASI UMUM

| Item | Keterangan |
|------|------------|
| **Total Jam Kerja** | 1065 Jam |
| **Konversi SKS** | 23.67 SKS (1 SKS = 45 Jam) |
| **Durasi Magang** | 6 Bulan (26 Minggu) |
| **Jam Kerja Senin-Jumat** | 7 Jam/hari (08.00 - 16.00, istirahat 1 jam) |
| **Jam Kerja Sabtu** | 5 Jam (21 Sabtu) & 4 Jam (5 Sabtu) |
| **Hari Kerja/Minggu** | 6 Hari (Senin - Sabtu) |
| **Lokasi** | MA (Magang) |

---

### PERHITUNGAN JAM KERJA

```
SENIN - JUMAT (Jam Reguler):
6 Bulan = 26 Minggu
26 Minggu x 5 Hari x 7 Jam = 910 Jam

SABTU (Jam Tambahan):
21 Sabtu x 5 Jam = 105 Jam
5 Sabtu x 4 Jam  = 20 Jam
Total Sabtu      = 125 Jam

TOTAL KESELURUHAN:
910 Jam + 125 Jam = 1035 Jam
(Silabus: 1065 Jam - buffer 30 jam untuk revisi/polish)
```

### JADWAL KERJA MINGGUAN

| Hari | Jam Kerja | Waktu |
|------|-----------|-------|
| Senin | 7 Jam | 08.00 - 16.00 (istirahat 1 jam) |
| Selasa | 7 Jam | 08.00 - 16.00 (istirahat 1 jam) |
| Rabu | 7 Jam | 08.00 - 16.00 (istirahat 1 jam) |
| Kamis | 7 Jam | 08.00 - 16.00 (istirahat 1 jam) |
| Jumat | 7 Jam | 08.00 - 16.00 (istirahat 1 jam) |
| Sabtu | 5 Jam / 4 Jam | 08.00 - 13.00 / 08.00 - 12.00 |
| **Total/Minggu** | **40 Jam** | |

### DISTRIBUSI JAM SABTU (26 Minggu)

| Minggu ke- | Jam Sabtu | Keterangan |
|------------|-----------|------------|
| 1 - 21 | 5 Jam | 08.00 - 13.00 |
| 22 - 26 | 4 Jam | 08.00 - 12.00 |

---

## RINCIAN SILABUS JAM KERJA

### FASE 1: INISIASI & PERENCANAAN PROYEK (150 Jam)
**Durasi: Minggu 1-4**

| No | Aktivitas | Jam | Keterangan |
|----|-----------|-----|------------|
| 1.1 | Orientasi & Pengenalan Perusahaan | 14 | Pengenalan tim, tools, workflow |
| 1.2 | Pembuatan Log Harian | 21 | Dokumentasi aktivitas harian (ongoing) |
| 1.3 | Wawancara Client | 28 | Pertemuan dengan stakeholder |
| 1.4 | Pembuatan Transkrip Wawancara | 21 | Dokumentasi hasil wawancara |
| 1.5 | Pembuatan FAI (Functional Analysis & Investigation) | 28 | Analisis kebutuhan fungsional |
| 1.6 | Pembuatan User Story | 21 | Penulisan user stories |
| 1.7 | Scoping User Story | 14 | Prioritisasi & batasan scope |
| 1.8 | Pembuatan Kontrak/MoU | 3 | Dokumen kesepakatan proyek |
| **Subtotal** | | **150** | |

---

### FASE 2: ANALISIS & DESAIN SISTEM (120 Jam)
**Durasi: Minggu 5-9**

| No | Aktivitas | Jam | Keterangan |
|----|-----------|-----|------------|
| 2.1 | Analisis Kebutuhan Sistem ATK | 21 | Requirement gathering spesifik ATK |
| 2.2 | Pembuatan ERD (Entity Relationship Diagram) | 28 | Desain database (barang, ruangan, transaksi) |
| 2.3 | Pembuatan Use Case Diagram | 14 | Diagram interaksi user (Admin/Pengawas) |
| 2.4 | Pembuatan Sequence Diagram | 14 | Flow transaksi permintaan barang |
| 2.5 | Desain UI/UX (Wireframe) | 21 | Sketsa layout dashboard, form, tabel |
| 2.6 | Desain UI/UX (High-Fidelity Mockup) | 14 | Desain visual dengan branding MA |
| 2.7 | Review & Revisi Desain dengan Client | 8 | Feedback & approval desain |
| **Subtotal** | | **120** | |

---

### FASE 3: PENGEMBANGAN BACKEND (230 Jam)
**Durasi: Minggu 10-17**

| No | Aktivitas | Jam | Keterangan |
|----|-----------|-----|------------|
| 3.1 | Setup Environment & Project Structure | 14 | Laravel 12, Fortify, Inertia setup |
| 3.2 | Pembuatan Database & Migrasi | 21 | Tabel: barang, ruangan, transactions, dll |
| 3.3 | Pembuatan Model & Relasi | 28 | Model Barang, Ruangan, Transaction, dll |
| 3.4 | Setup Authentication & Authorization | 21 | Role Admin/Pengawas, Policies |
| 3.5 | CRUD Master Barang | 35 | Controller, Request, Service untuk Barang |
| 3.6 | CRUD Master Ruangan | 28 | Controller, Request, Service untuk Ruangan |
| 3.7 | Transaksi Permintaan Barang (Keluar) | 42 | Form permintaan + auto reduce stok |
| 3.8 | Sistem Manajemen Stok Otomatis | 21 | StockService, StockMovement tracking |
| 3.9 | Dashboard & Monitoring API | 7 | API statistik, grafik transaksi |
| 3.10 | Unit Testing Backend | 13 | Testing models, services, policies |
| **Subtotal** | | **230** | |

---

### FASE 4: PENGEMBANGAN FRONTEND (200 Jam)
**Durasi: Minggu 18-24**

| No | Aktivitas | Jam | Keterangan |
|----|-----------|-----|------------|
| 4.1 | Setup React + TypeScript + Inertia | 7 | Konfigurasi Vite, shadcn/ui |
| 4.2 | Pembuatan Layout & Components | 21 | Sidebar, Header, shadcn/ui setup |
| 4.3 | Implementasi Halaman Login & Auth | 14 | Login form dengan Fortify |
| 4.4 | Implementasi Dashboard & Monitoring | 28 | Stats cards, charts, tabel stok rendah |
| 4.5 | Halaman CRUD Master Barang | 35 | Index, Create, Edit, Show Barang |
| 4.6 | Halaman CRUD Master Ruangan | 28 | Index, Create, Edit, Show Ruangan |
| 4.7 | Form Transaksi Permintaan Barang | 35 | Dynamic items, searchable dropdown |
| 4.8 | Halaman Riwayat & Filter Transaksi | 14 | List transaksi dengan filter advanced |
| 4.9 | Responsive Design & Branding MA | 11 | Warna MA, responsive, polish |
| 4.10 | Component Testing Frontend | 7 | Testing React components |
| **Subtotal** | | **200** | |

---

### FASE 5: TESTING & QUALITY ASSURANCE (100 Jam)
**Durasi: Minggu 23-25 (Paralel dengan Fase 4)**

| No | Aktivitas | Jam | Keterangan |
|----|-----------|-----|------------|
| 5.1 | Integration Testing | 21 | Test flow: Login → Transaksi → Stok |
| 5.2 | User Acceptance Testing (UAT) | 28 | Testing dengan Admin & Pengawas MA |
| 5.3 | Bug Fixing & Debugging | 28 | Perbaikan error dari UAT |
| 5.4 | Performance Testing | 9 | Test speed, pagination, search |
| 5.5 | Security Testing | 7 | Test authorization, XSS, CSRF |
| 5.6 | Pembuatan Laporan Testing | 7 | Dokumentasi test case & hasil |
| **Subtotal** | | **100** | |

---

### FASE 6: DEPLOYMENT & MAINTENANCE (100 Jam)
**Durasi: Minggu 24-26**

| No | Aktivitas | Jam | Keterangan |
|----|-----------|-----|------------|
| 6.1 | Setup Server & Hosting | 14 | VPS/Shared hosting, PHP, MySQL setup |
| 6.2 | Deployment Aplikasi | 14 | Build production, upload, env config |
| 6.3 | Konfigurasi Domain & SSL | 7 | Domain MA, SSL certificate |
| 6.4 | Monitoring & Maintenance | 21 | Log monitoring, backup database |
| 6.5 | Bug Fixing Post-Deployment | 21 | Perbaikan bug production |
| 6.6 | Training User Admin & Pengawas | 14 | Pelatihan cara pakai sistem ATK |
| 6.7 | Serah Terima Proyek & Dokumentasi | 9 | Handover kode, database, manual |
| **Subtotal** | | **100** | |

---

### FASE 7: DOKUMENTASI & PELAPORAN (165 Jam)
**Durasi: Ongoing sepanjang proyek**

| No | Aktivitas | Jam | Keterangan |
|----|-----------|-----|------------|
| 7.1 | Pembuatan Technical Documentation | 21 | API docs, ERD, architecture |
| 7.2 | Pembuatan User Manual | 14 | Panduan Admin & Pengawas |
| 7.3 | Pembuatan Development Guide | 14 | Guide untuk maintenance developer |
| 7.4 | Pembuatan Log Harian | 35 | Dokumentasi aktivitas harian |
| 7.5 | Pembuatan Laporan Mingguan | 26 | Laporan progress (26 minggu) |
| 7.6 | Pembuatan Laporan Akhir Magang | 28 | Laporan komprehensif + lampiran |
| 7.7 | Presentasi Proyek | 14 | Persiapan + presentasi hasil |
| 7.8 | Revisi Dokumentasi | 13 | Perbaikan & finalisasi dokumen |
| **Subtotal** | | **165** | |

---

## REKAPITULASI TOTAL JAM KERJA

| Fase | Nama Fase | Total Jam |
|------|-----------|-----------|
| 1 | Inisiasi & Perencanaan Proyek | 150 |
| 2 | Analisis & Desain Sistem | 120 |
| 3 | Pengembangan Backend | 230 |
| 4 | Pengembangan Frontend | 200 |
| 5 | Testing & Quality Assurance | 100 |
| 6 | Deployment & Maintenance | 100 |
| 7 | Dokumentasi & Pelaporan | 165 |
| **TOTAL** | | **1065** |

---

## TIMELINE PELAKSANAAN (6 BULAN)

```
BULAN 1 (Minggu 1-4)
├── Fase 1: Inisiasi & Perencanaan Proyek (150 Jam)
│   ├── Orientasi & Log Harian
│   ├── Wawancara Client
│   ├── FAI, User Story, Kontrak
│   └── Dokumentasi requirement

BULAN 2 (Minggu 5-9)
├── Fase 2: Analisis & Desain Sistem (120 Jam)
│   ├── ERD, Use Case, Sequence Diagram
│   ├── Wireframe & High-Fidelity Mockup
│   └── Review dengan Client

BULAN 3 (Minggu 10-13)
├── Fase 3: Pengembangan Backend (110 Jam)
│   ├── Setup Laravel + Database
│   ├── Model & Authentication
│   └── CRUD Barang & Ruangan

BULAN 4 (Minggu 14-17)
├── Fase 3: Pengembangan Backend (120 Jam)
│   ├── Transaksi Permintaan Barang
│   ├── Sistem Stok Otomatis
│   └── Dashboard API & Testing

BULAN 5 (Minggu 18-22)
├── Fase 4: Pengembangan Frontend (200 Jam)
│   ├── Setup React + TypeScript
│   ├── Layout & Components
│   ├── Halaman CRUD (Barang, Ruangan)
│   └── Form Transaksi & Dashboard

BULAN 6 (Minggu 23-26)
├── Fase 5: Testing & QA (100 Jam)
├── Fase 6: Deployment & Maintenance (100 Jam)
├── Fase 7: Dokumentasi Final (165 Jam)
│   ├── Technical Docs & User Manual
│   ├── Laporan Akhir Magang
│   ├── Presentasi & Serah Terima
│   └── Log Harian & Laporan Mingguan (ongoing)
```

---

## CATATAN PENTING

1. **Log Harian**: Wajib diisi setiap hari sebagai bukti aktivitas
2. **Laporan Mingguan**: Disubmit setiap akhir minggu
3. **Jam Kerja Sabtu**:
   - Minggu 1-21: Kerja 5 jam (08.00 - 13.00)
   - Minggu 22-26: Kerja 4 jam (08.00 - 12.00)
4. **Fleksibilitas**: Timeline dapat disesuaikan dengan kebutuhan proyek
5. **Validasi**: Setiap fase harus divalidasi oleh pembimbing

---

## KONVERSI SKS

| Keterangan | Nilai |
|------------|-------|
| Total Jam Kerja Tersedia | 1035 Jam |
| Total Jam Kerja Silabus | 1065 Jam |
| 1 SKS | 45 Jam |
| **Total SKS** | **23.67 SKS** |

```
Perhitungan: 1065 ÷ 45 = 23.67 SKS
Catatan: Selisih 30 jam akan digunakan untuk revisi dan polish di setiap fase
```

---

**Dokumen ini dibuat sebagai panduan pelaksanaan magang dan konversi SKS.**

*Dibuat pada: Februari 2026*
*Lokasi: MA*
