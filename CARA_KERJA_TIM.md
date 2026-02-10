# 🤝 Cara Kerja Tim Secara Bersamaan

> **Pertanyaan**: "Bagaimana cara saya bisa mengerjakan ini secara bebarengan dengan tim saya, tanpa harus menunggu pekerjaan teman saya selesai dan baru di pull?"

## ✅ Jawaban Singkat

**Gunakan Git dengan Branching Strategy!** 

Setiap orang bekerja di **branch sendiri-sendiri**, lalu digabungkan (merge) setelah selesai.

---

## 👥 Tim Anda

- **Rifa (BE 1)**: Backend Developer 1
- **Aldi (FE 1)**: Frontend Developer 1  
- **Rendra (BE 2)**: Backend Developer 2
- **Fara (FE 2)**: Frontend Developer 2

**SEMUA BISA KERJA PARALEL!** ✨

---

## 🚀 Setup Awal (Sekali Saja)

### 1️⃣ Push Project ke GitHub (Rifa sebagai Lead)

```bash
# Di folder project
cd /path/to/atkma

# Initialize git (jika belum)
git init

# Add semua file
git add .

# Commit pertama
git commit -m "Initial commit: Setup project ATK MA"

# Buat repository PRIVATE di GitHub
# https://github.com → New repository → nama: atkma

# Connect & push
git remote add origin https://github.com/rifareza09/atkma.git
git branch -M main
git push -u origin main

# Buat branch develop untuk development
git checkout -b develop
git push -u origin develop
```

### 2️⃣ Invite Anggota Tim

1. Buka repository di GitHub
2. Klik **Settings** → **Collaborators**
3. Klik **Add people**
4. Invite: Aldi, Rendra, Fara (pakai email/username GitHub mereka)
5. Mereka akan terima email → klik **Accept invitation**

### 3️⃣ Setiap Anggota Clone Repository

```bash
# Aldi, Rendra, Fara jalankan ini
git clone https://github.com/rifareza09/atkma.git
cd atkma

# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Setup database
touch database/database.sqlite
php artisan migrate:fresh --seed

# Test aplikasi
npm run dev
# Buka browser: http://atkma.test atau http://localhost:5173
```

---

## 💼 Cara Kerja Harian (PARALEL!)

### 🌅 **PAGI - Setiap Developer** (09:00)

```bash
# 1. Update dari develop
git checkout develop
git pull origin develop

# 2. Buat branch fitur SENDIRI
git checkout -b feature/nama-fitur-anda
```

**Contoh nama branch:**
- Rifa (BE 1): `feature/be-barang-controller`
- Aldi (FE 1): `feature/fe-barang-pages`
- Rendra (BE 2): `feature/be-ruangan-controller`
- Fara (FE 2): `feature/fe-dashboard`

### ☀️ **SIANG - Coding & Backup** (12:00)

```bash
# Setelah coding beberapa jam, commit progress
git add .
git commit -m "Progress: Add Barang form validation"

# Push ke GitHub (backup!)
git push origin feature/nama-fitur-anda
```

### 🌆 **SORE - Submit Work** (16:00)

```bash
# Final commit
git add .
git commit -m "Complete: Barang CRUD operations"
git push origin feature/nama-fitur-anda
```

**Lalu buat Pull Request:**
1. Buka GitHub repository
2. Klik **Pull requests** → **New pull request**
3. Base: `develop` ← Compare: `feature/nama-fitur-anda`
4. Tulis deskripsi apa yang dikerjakan
5. Klik **Create pull request**

### 🌙 **MALAM - Review & Merge** (18:00)

1. Teman satu tim **review** code di Pull Request
2. Jika OK → klik **Merge pull request**
3. **Semua tim** pull develop terbaru:

```bash
git checkout develop
git pull origin develop
```

---

## 🎯 Contoh Skenario: Semua Kerja Bareng!

### **Hari 1 - Pagi**

**Rifa (BE 1):**
```bash
git checkout -b feature/be-barang-controller
# Buat BarangController, routes
git add .
git commit -m "Add BarangController with CRUD"
git push origin feature/be-barang-controller
```

**Aldi (FE 1):** *(PARALEL - gak perlu tunggu Rifa!)*
```bash
git checkout -b feature/fe-barang-pages
# Buat Barang/Index.tsx dengan mock data dulu
git add .
git commit -m "Add Barang Index page"
git push origin feature/fe-barang-pages
```

**Rendra (BE 2):** *(PARALEL juga!)*
```bash
git checkout -b feature/be-ruangan-controller
# Buat RuanganController
git add .
git commit -m "Add RuanganController"
git push origin feature/be-ruangan-controller
```

**Fara (FE 2):** *(PARALEL juga!)*
```bash
git checkout -b feature/fe-dashboard
# Buat Dashboard page
git add .
git commit -m "Add Dashboard with stats"
git push origin feature/fe-dashboard
```

### **Hari 1 - Sore**

**SEMUA** buat Pull Request masing-masing ke `develop`.

**Lead/PM** review dan merge satu per satu.

### **Hari 2 - Pagi**

**Semua tim** pull develop terbaru:
```bash
git checkout develop
git pull origin develop

# Lanjut fitur berikutnya atau merge develop ke branch lama
git checkout feature/nama-fitur-anda
git merge develop  # Gabungkan perubahan dari tim lain
```

**Lanjut coding lagi!** 🚀

---

## ⚡ Keuntungan Cara Ini

✅ **Kerja PARALEL** - Gak perlu tunggu teman selesai!  
✅ **Backup otomatis** - Code aman di GitHub  
✅ **Review code** - Teman bisa review sebelum merge  
✅ **History jelas** - Bisa lihat siapa ubah apa  
✅ **Rollback mudah** - Bisa balik ke versi lama  

---

## 🆘 Kalau Ada Conflict?

Kadang 2 orang edit file yang sama. Git akan kasih tahu:

```bash
git merge develop
# CONFLICT di file XYZ
```

**Cara resolve:**

1. Buka file yang conflict di VS Code
2. File akan terlihat seperti ini:
```
<<<<<<< HEAD
// Code Anda
=======
// Code dari develop/teman
>>>>>>> develop
```
3. Pilih mana yang mau dipakai (atau gabung keduanya)
4. Hapus marker `<<<<<<<`, `=======`, `>>>>>>>`
5. Save file
6. Commit:
```bash
git add .
git commit -m "Resolve merge conflicts"
git push
```

---

## 📚 Panduan Lengkap

Untuk detail lengkap, lihat:

1. **[Git Cheatsheet](docs/GIT_CHEATSHEET.md)** - Quick reference, print & tempel! ⭐⭐
2. **[GIT_COLLABORATION_GUIDE.md](docs/GIT_COLLABORATION_GUIDE.md)** - Panduan lengkap Git
3. **[QUICK_START_GIT.md](docs/QUICK_START_GIT.md)** - Quick reference
4. **[VISUAL_GIT_GUIDE.md](docs/VISUAL_GIT_GUIDE.md)** - Panduan visual dengan diagram
5. **[PARALLEL_WORKFLOW.md](docs/PARALLEL_WORKFLOW.md)** - Cara kerja paralel FE & BE
6. **[Team Workflow Diagrams](docs/diagrams/team-workflow.md)** - Diagram visual alur kerja tim ⭐

---

## 💡 Tips Penting

1. **JANGAN** push langsung ke `main` - selalu pakai branch!
2. **SELALU** pull develop sebelum mulai kerja pagi
3. **COMMIT** sering dengan message yang jelas
4. **PUSH** minimal 1x sehari (backup!)
5. **KOMUNIKASI** di grup WA/Telegram jika ada perubahan penting

---

## ✨ Kesimpulan

**JAWABAN:** Pakai **Git Branching**!

1. Setup repository di GitHub (1x)
2. Semua anggota clone
3. Setiap orang buat branch sendiri
4. Kerja paralel di branch masing-masing
5. Push & Pull Request setelah selesai
6. Review & merge
7. Ulangi!

**TIDAK PERLU TUNGGU TEMAN SELESAI!** 🎉

---

## 📞 Butuh Bantuan?

- **Stuck dengan code?** → Pakai VS Code Live Share untuk debugging bareng
- **Error Git?** → Tanya di grup atau lihat panduan lengkap
- **Konflik merge?** → Ikuti langkah resolve conflict di atas

---

**Dibuat oleh**: Tim BE 1 (Rifa)  
**Untuk**: Tim ATK Mahkamah Agung (Rifa, Aldi, Rendra, Fara)  
**Terakhir update**: {{ date }}

**Selamat berkolaborasi!** 🚀✨
