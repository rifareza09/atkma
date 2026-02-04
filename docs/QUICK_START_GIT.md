# Quick Start: Git Workflow untuk Tim ATK MA

## 🚀 Untuk Lead/PM (Setup Pertama Kali)

```bash
# 1. Push ke GitHub
git init
git add .
git commit -m "Initial commit: Laravel + React ATK MA"

# 2. Buat repo di GitHub (private)
# https://github.com → New repository → atkma

# 3. Push
git remote add origin https://github.com/username-anda/atkma.git
git branch -M main
git push -u origin main

# 4. Buat branch develop
git checkout -b develop
git push -u origin develop

# 5. Invite tim di GitHub Settings → Collaborators
```

---

## 👥 Untuk Anggota Tim (Join Project)

```bash
# 1. Clone
git clone https://github.com/username/atkma.git
cd atkma

# 2. Setup
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

# 3. Test
npm run dev
# Buka: http://atkma.test

# 4. Siap coding!
```

---

## 💼 Daily Workflow (Setiap Developer)

### Pagi (Mulai Kerja)

```bash
# Sync dengan tim
git checkout develop
git pull origin develop

# Buat/lanjut branch fitur
git checkout -b feature/nama-fitur
# atau
git checkout feature/nama-fitur
git merge develop
```

### Siang (Progress)

```bash
# Commit progress
git add .
git commit -m "feat: Add Barang form validation"
git push origin feature/nama-fitur
```

### Sore (Selesai)

```bash
# Final commit
git add .
git commit -m "feat: Complete Barang CRUD operations"
git push origin feature/nama-fitur

# Buat Pull Request di GitHub
# develop ← feature/nama-fitur
```

---

## 🌿 Naming Convention Branch

```
feature/be-migrations       → BE Developer 1
feature/be-barang-crud      → BE Developer 2
feature/fe-barang-pages     → FE Developer 1
feature/fe-dashboard        → FE Developer 2
```

---

## 🆘 Common Commands

```bash
# Lihat status
git status

# Lihat branch
git branch

# Pindah branch
git checkout nama-branch

# Pull update dari tim
git pull origin develop

# Push ke GitHub
git push origin nama-branch

# Merge develop ke branch Anda
git merge develop
```

---

## ⚠️ Jangan Lakukan Ini!

- ❌ JANGAN `git push -f` (force push)
- ❌ JANGAN push file `.env`
- ❌ JANGAN commit langsung ke `main`
- ❌ JANGAN merge tanpa Pull Request

---

## 📞 Butuh Bantuan?

1. **Stuck dengan code?** → Pakai Live Share VS Code
2. **Conflict merge?** → Tanya di grup atau pair programming
3. **Error Git?** → `git status` dulu, baca error message

---

**Happy Coding!** 🎉
