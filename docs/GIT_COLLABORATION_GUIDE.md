# 🤝 Panduan Kolaborasi Tim - Git & GitHub Workflow

## 📌 Overview

Untuk proyek tim dengan 4 orang (2 BE + 2 FE), cara terbaik adalah menggunakan **Git + GitHub** untuk version control dan kolaborasi.

---

## 🚀 Setup Awal (Dilakukan 1x oleh Lead/PM)

### Step 1: Push Project ke GitHub

```bash
# Di folder project (C:\Users\user\Herd\atkma)

# 1. Initialize git (jika belum)
git init

# 2. Add semua file
git add .

# 3. Commit pertama
git commit -m "Initial commit: Laravel + React setup with contracts"

# 4. Buat repository di GitHub
# - Buka https://github.com
# - Klik tombol "New repository"
# - Nama: atkma (atau atk-mahkamah-agung)
# - Visibility: Private (untuk keamanan)
# - JANGAN centang "Initialize with README" (karena sudah ada)
# - Klik "Create repository"

# 5. Connect & push ke GitHub
git remote add origin https://github.com/username-anda/atkma.git
git branch -M main
git push -u origin main
```

### Step 2: Invite Anggota Tim

1. Di GitHub repository → **Settings** → **Collaborators**
2. Klik **Add people**
3. Masukkan email/username GitHub teman tim
4. Mereka akan dapat email invitation → Accept

---

## 👥 Setup untuk Anggota Tim

Setiap anggota tim melakukan ini:

```bash
# 1. Clone repository
git clone https://github.com/username/atkma.git
cd atkma

# 2. Install dependencies
composer install
npm install

# 3. Setup .env
cp .env.example .env
php artisan key:generate

# 4. Setup database
php artisan migrate --seed

# 5. Test aplikasi
npm run dev
# Buka browser: http://atkma.test
```

---

## 🌿 Git Branching Strategy

```
main (production-ready)
  │
  ├── develop (development branch)
  │     │
  │     ├── feature/be-migrations
  │     ├── feature/be-barang-crud
  │     ├── feature/be-ruangan-crud
  │     ├── feature/fe-barang-pages
  │     ├── feature/fe-ruangan-pages
  │     └── feature/fe-dashboard
  │
  └── hotfix/* (jika ada bug urgent)
```

### Penjelasan Branch

| Branch | Fungsi | Siapa yang Push |
|--------|--------|-----------------|
| `main` | Production-ready code | Lead/PM saja |
| `develop` | Development, integration | Semua tim (via Pull Request) |
| `feature/*` | Fitur individual | Masing-masing developer |

---

## 📋 Workflow Harian

### Hari 1: Setup Branch (Semua Tim)

```bash
# 1. Pastikan di branch main/develop
git checkout main
git pull origin main

# 2. Buat branch develop (jika belum ada)
git checkout -b develop

# 3. Push develop ke GitHub
git push -u origin develop

# 4. Setiap developer buat branch fitur masing-masing
```

### Developer Backend #1 (Migrations & Models)

```bash
# Buat branch baru dari develop
git checkout develop
git pull origin develop
git checkout -b feature/be-migrations

# Kerjakan migrations & models
# ... coding ...

# Commit & push
git add .
git commit -m "Add migrations for barang, ruangan, transactions"
git push -u origin feature/be-migrations

# Buat Pull Request di GitHub
# develop ← feature/be-migrations
```

### Developer Backend #2 (Controllers)

```bash
# Buat branch baru
git checkout develop
git pull origin develop
git checkout -b feature/be-barang-crud

# Kerjakan BarangController
# ... coding ...

# Commit & push
git add .
git commit -m "Add BarangController with CRUD operations"
git push -u origin feature/be-barang-crud

# Buat Pull Request di GitHub
```

### Developer Frontend #1 (Barang Pages)

```bash
# Buat branch baru
git checkout develop
git pull origin develop
git checkout -b feature/fe-barang-pages

# Kerjakan pages Barang (pakai mock data dulu)
# ... coding ...

# Commit & push
git add .
git commit -m "Add Barang Index, Create, Edit pages"
git push -u origin feature/fe-barang-pages

# Buat Pull Request di GitHub
```

### Developer Frontend #2 (Dashboard)

```bash
# Buat branch baru
git checkout develop
git pull origin develop
git checkout -b feature/fe-dashboard

# Kerjakan Dashboard
# ... coding ...

# Commit & push
git add .
git commit -m "Add Dashboard with stats and charts"
git push -u origin feature/fe-dashboard

# Buat Pull Request di GitHub
```

---

## 🔄 Daily Workflow (Setiap Developer)

### Pagi Hari (Sinkronisasi)

```bash
# 1. Checkout ke develop
git checkout develop

# 2. Pull perubahan terbaru dari tim
git pull origin develop

# 3. Kembali ke branch fitur Anda
git checkout feature/nama-fitur-anda

# 4. Merge perubahan develop ke branch Anda (agar sync)
git merge develop

# 5. Resolve conflicts jika ada, lalu:
git add .
git commit -m "Merge develop into feature branch"
```

### Siang/Sore (Commit Progress)

```bash
# Setiap selesai task kecil, commit
git add .
git commit -m "Complete: Barang Create form validation"

# Push ke GitHub (backup & sharing)
git push origin feature/nama-fitur-anda
```

### Sore Hari (Pull Request)

Jika fitur sudah selesai:

1. Push final changes
2. Buka GitHub repository
3. Klik **Pull requests** → **New pull request**
4. Base: `develop` ← Compare: `feature/nama-fitur-anda`
5. Tulis deskripsi: apa yang sudah dikerjakan
6. Assign reviewer (teman satu tim)
7. Klik **Create pull request**

### Review & Merge

1. Teman tim review code
2. Jika OK → **Merge pull request**
3. Delete branch yang sudah di-merge
4. Semua tim pull develop terbaru

---

## 🔥 Handle Merge Conflicts

Jika ada conflict saat merge:

```bash
# Git akan show conflict files
# Buka file yang conflict di VS Code

# File akan terlihat seperti ini:
<<<<<<< HEAD
// Code Anda
=======
// Code dari develop/branch lain
>>>>>>> develop

# Pilih mana yang mau dipakai, atau gabungkan
# Hapus marker <<<<<<, =======, >>>>>>>

# Setelah resolve:
git add .
git commit -m "Resolve merge conflicts"
git push
```

---

## 🎯 Contoh Skenario Kerja Bareng

### Skenario: Tim BE & FE Kerja Paralel pada Fitur Barang

#### Hari 1 (Pagi)

**BE Developer:**
```bash
git checkout -b feature/be-barang-crud
# Buat BarangController, BarangRequest, routes
git add .
git commit -m "Add BarangController with index, create, store"
git push origin feature/be-barang-crud
```

**FE Developer:**
```bash
git checkout -b feature/fe-barang-pages
# Buat Barang/Index.tsx dengan mock data
git add .
git commit -m "Add Barang Index page with mock data"
git push origin feature/fe-barang-pages
```

#### Hari 1 (Siang)

**BE Developer:**
```bash
# Lanjut edit, update, delete
git add .
git commit -m "Complete CRUD operations for Barang"
git push origin feature/be-barang-crud

# Buat Pull Request
# Setelah di-merge ke develop
```

**FE Developer:**
```bash
# Lanjut Create, Edit pages
git add .
git commit -m "Add Barang Create and Edit pages"
git push origin feature/fe-barang-pages
```

#### Hari 2 (Integration)

**FE Developer:**
```bash
# Pull develop yang sudah ada BE code
git checkout develop
git pull origin develop

# Merge ke branch FE
git checkout feature/fe-barang-pages
git merge develop

# Ganti mock data dengan props asli dari Inertia
# Test integration
git add .
git commit -m "Integrate with backend API, remove mock data"
git push origin feature/fe-barang-pages

# Buat Pull Request
```

---

## 🛠️ VS Code Live Share (Untuk Pair Programming)

**Live Share** cocok untuk:
- ✅ Debugging bareng
- ✅ Code review real-time
- ✅ Ngajarin teman yang stuck
- ✅ Pair programming

**TIDAK untuk:**
- ❌ Development harian (lebih lambat)
- ❌ Kerja solo

### Cara Pakai Live Share

```bash
# 1. Install Extension
# - Buka VS Code
# - Extensions (Ctrl+Shift+X)
# - Search: "Live Share"
# - Install "Live Share" by Microsoft

# 2. Start Sharing (Host)
# - Klik "Live Share" di status bar bawah
# - Klik "Start collaboration session"
# - Copy link yang muncul
# - Kirim link ke teman

# 3. Join Session (Guest)
# - Klik "Live Share" di status bar
# - Klik "Join collaboration session"
# - Paste link dari teman
# - Sekarang bisa coding bareng real-time!
```

---

## 📊 Kapan Pakai Apa?

| Situasi | Gunakan |
|---------|---------|
| Development harian | **Git/GitHub** |
| Kerja paralel | **Git/GitHub** dengan branching |
| Butuh bantuan/stuck | **Live Share** untuk debugging |
| Code review | **GitHub Pull Request** |
| Diskusi code | **Live Share** atau **Zoom + Screen share** |
| Integrasi fitur | **Git merge** via Pull Request |

---

## ✅ Best Practices

### DO ✅

- ✅ **Commit sering** dengan message jelas
- ✅ **Pull sebelum push** untuk avoid conflict
- ✅ **Buat branch baru** untuk setiap fitur
- ✅ **Code review** sebelum merge ke develop
- ✅ **Komunikasi** di grup jika ubah contract types
- ✅ **Push backup** setiap akhir hari

### DON'T ❌

- ❌ **JANGAN push langsung ke main**
- ❌ **JANGAN commit** file `.env`, `node_modules`, `vendor`
- ❌ **JANGAN force push** (`git push -f`) tanpa konfirmasi tim
- ❌ **JANGAN merge** branch sendiri tanpa review
- ❌ **JANGAN commit** code yang error/broken

---

## 🆘 Git Commands Cheat Sheet

```bash
# Cek status
git status

# Lihat branch
git branch

# Pindah branch
git checkout nama-branch

# Buat branch baru
git checkout -b nama-branch-baru

# Pull perubahan terbaru
git pull origin develop

# Add & commit
git add .
git commit -m "Pesan commit"

# Push ke GitHub
git push origin nama-branch

# Merge branch lain ke branch sekarang
git merge nama-branch-lain

# Lihat log commits
git log --oneline

# Batalkan perubahan file (before commit)
git checkout -- nama-file

# Batalkan commit terakhir (keep changes)
git reset --soft HEAD~1

# Update dari remote
git fetch origin
```

---

## 🎓 Rekomendasi Workflow untuk Tim Anda

### Setup (1x di awal)

```bash
# Lead/PM
1. Push project ke GitHub (private repo)
2. Invite 3 anggota tim
3. Buat branch develop

# Semua anggota tim
1. Clone repository
2. Install dependencies
3. Test aplikasi jalan
```

### Daily Workflow

**Pagi (09:00)**
- Meeting singkat: Hari ini mau ngapain?
- Masing-masing buat branch fitur

**Siang (12:00)**
- Push progress (backup)

**Sore (16:00)**
- Commit final
- Buat Pull Request
- Code review bareng

**Malam**
- Merge PR yang sudah di-review
- Semua tim pull develop terbaru

---

## 💡 Tips Kolaborasi

1. **Komunikasi**: Buat grup WhatsApp/Telegram untuk koordinasi
2. **Daily Standup**: Meeting 15 menit setiap pagi
3. **Conflict Prevention**: Jangan edit file yang sama bersamaan
4. **Documentation**: Update README jika ada perubahan setup
5. **Backup**: Push ke GitHub setiap hari (minimal 1x)

---

**Dengan workflow ini, tim bisa kerja paralel tanpa bentrok!** 🚀

---

## 📝 Template Commit Message

```
[TYPE] Subject line (max 50 chars)

- Detail perubahan 1
- Detail perubahan 2

[TYPE] bisa:
- feat: Fitur baru
- fix: Bug fix
- docs: Documentation
- style: Formatting, typo
- refactor: Code restructure
- test: Test code
- chore: Config, dependencies

Contoh:
feat: Add Barang CRUD with validation

- Create BarangController with index, create, store, edit, update, destroy
- Add BarangRequest for validation
- Add resource routes for barang
- Add Barang model relationships
```
