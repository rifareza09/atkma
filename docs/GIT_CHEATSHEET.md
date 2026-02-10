# 📋 Git Quick Reference - Tim ATK MA

## Setup Pertama Kali (Sekali Saja)

### Rifa (Lead) - Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/rifareza09/atkma.git
git push -u origin main
git checkout -b develop
git push -u origin develop
```

### Aldi, Rendra, Fara - Clone
```bash
git clone https://github.com/rifareza09/atkma.git
cd atkma
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
```

---

## Workflow Harian (Copy-Paste Friendly!)

### 🌅 Pagi (09:00) - Mulai Kerja
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nama-fitur-anda
```

**Nama branch yang disarankan:**
- Rifa: `feature/be-barang-controller`
- Aldi: `feature/fe-barang-pages`
- Rendra: `feature/be-ruangan-controller`
- Fara: `feature/fe-dashboard`

### ☀️ Siang (12:00) - Backup Progress
```bash
git add .
git commit -m "Progress: [deskripsi singkat apa yang dikerjakan]"
git push origin feature/nama-fitur-anda
```

### 🌆 Sore (16:00) - Submit Work
```bash
git add .
git commit -m "Complete: [deskripsi fitur yang selesai]"
git push origin feature/nama-fitur-anda
```

**Lalu:**
1. Buka https://github.com/rifareza09/atkma
2. Klik "Pull requests" → "New pull request"
3. Base: `develop` ← Compare: `feature/nama-fitur-anda`
4. Klik "Create pull request"

### 🌙 Malam (18:00) - Update dari Tim
```bash
git checkout develop
git pull origin develop
```

---

## Perintah Git yang Sering Dipakai

| Perintah | Fungsi |
|----------|--------|
| `git status` | Cek status file yang berubah |
| `git branch` | Lihat daftar branch |
| `git checkout nama-branch` | Pindah ke branch lain |
| `git checkout -b nama-branch-baru` | Buat branch baru |
| `git add .` | Stage semua perubahan |
| `git commit -m "pesan"` | Commit dengan pesan |
| `git push origin nama-branch` | Push ke GitHub |
| `git pull origin develop` | Pull update dari develop |
| `git merge develop` | Merge develop ke branch sekarang |
| `git log --oneline` | Lihat history commit |

---

## Troubleshooting

### Problem: Lupa di branch apa
```bash
git branch
# Branch dengan tanda * adalah branch aktif sekarang
```

### Problem: Ada perubahan yang belum di-commit
```bash
git status
# File merah = belum di-stage
# File hijau = sudah di-stage, siap commit

git add .
git commit -m "Save current work"
```

### Problem: Conflict saat merge
```bash
# 1. Lihat file yang conflict
git status

# 2. Buka file tersebut di VS Code
# 3. Cari marker:
#    <<<<<<< HEAD
#    // code Anda
#    =======
#    // code dari develop
#    >>>>>>> develop

# 4. Edit file, pilih code yang mau dipakai
# 5. Hapus marker <<< === >>>
# 6. Save file

# 7. Commit
git add .
git commit -m "Resolve merge conflicts"
git push
```

### Problem: Salah commit, mau undo
```bash
# Undo commit terakhir, keep changes
git reset --soft HEAD~1

# Edit file yang salah
git add .
git commit -m "Fixed commit message"
```

### Problem: Mau buang semua perubahan yang belum di-commit
```bash
# HATI-HATI! Ini akan hilangkan semua perubahan!
git checkout .
```

---

## Commit Message Best Practices

Format: `[type]: [deskripsi singkat]`

**Types:**
- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Format code (tidak ubah logic)
- `refactor`: Refactor code
- `test`: Test code

**Contoh:**
```bash
git commit -m "feat: Add Barang CRUD operations"
git commit -m "fix: Fix validation error on Barang form"
git commit -m "docs: Update README with setup instructions"
git commit -m "style: Format code with Prettier"
```

---

## Do's and Don'ts

### ✅ DO
- Commit sering dengan message jelas
- Pull develop sebelum mulai kerja
- Push minimal 1x sehari (backup!)
- Buat Pull Request untuk review
- Komunikasi di grup jika ubah contract/types

### ❌ DON'T
- JANGAN push langsung ke `main`
- JANGAN commit file `.env`
- JANGAN force push (`git push -f`)
- JANGAN merge branch sendiri tanpa review
- JANGAN commit code yang error/broken

---

## Shortcut Commands (Optional)

Tambahkan ke `~/.gitconfig` atau `~/.bashrc`:

```bash
# Git aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'

# Sekarang bisa pakai:
# git co develop (instead of git checkout develop)
# git br (instead of git branch)
# git st (instead of git status)
```

---

## Contacts

**Butuh bantuan?**
- Stuck dengan Git: Tanya di grup atau lihat [GIT_COLLABORATION_GUIDE.md](docs/GIT_COLLABORATION_GUIDE.md)
- Stuck dengan code: Pakai VS Code Live Share
- Error aplikasi: Cek [README.md](README.md)

---

**Print this page dan tempel di meja! 📌**

---

**Last updated**: {{ date }}  
**Tim**: Rifa (BE 1), Aldi (FE 1), Rendra (BE 2), Fara (FE 2)
