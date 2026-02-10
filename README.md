# Aplikasi ATK Mahkamah Agung

Sistem Alat Tulis Kantor (ATK) untuk Mahkamah Agung - Laravel 12 + React + TypeScript + Inertia.js

## 🤝 Untuk Tim: Cara Kerja Bareng

**PERTANYAAN:** "Bagaimana cara kerja secara bersamaan tanpa harus menunggu pekerjaan teman selesai?"

**JAWABAN:** Gunakan **Git Branching**! Setiap orang bekerja di branch sendiri, lalu di-merge setelah selesai.

📖 **Panduan Lengkap**: [CARA_KERJA_TIM.md](CARA_KERJA_TIM.md) ⭐ **Baca ini dulu!**

**Panduan Tambahan:**
- [Git Cheatsheet](docs/GIT_CHEATSHEET.md) - Quick reference (print & tempel!)
- [Quick Start Git](docs/QUICK_START_GIT.md) - Perintah Git yang sering dipakai
- [Git Collaboration Guide](docs/GIT_COLLABORATION_GUIDE.md) - Panduan lengkap kolaborasi
- [Visual Git Guide](docs/VISUAL_GIT_GUIDE.md) - Panduan dengan diagram visual
- [Parallel Workflow](docs/PARALLEL_WORKFLOW.md) - Cara FE & BE kerja paralel
- [Team Workflow Diagrams](docs/diagrams/team-workflow.md) - Diagram visual alur kerja

---

## 🚀 Tech Stack

**Backend:**
- Laravel 12
- SQLite (development) / MySQL (production)
- Laravel Fortify (Authentication)

**Frontend:**
- React 18+ dengan TypeScript
- Vite
- Inertia.js (SSR Bridge)
- shadcn/ui + Tailwind CSS

## 📦 Installation

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- NPM/Yarn

### Setup

1. Clone repository
```bash
git clone <repository-url>
cd atkma
```

2. Install dependencies
```bash
composer install
npm install
```

3. Setup environment
```bash
cp .env.example .env
php artisan key:generate
```

4. Setup database
```bash
# SQLite (default)
touch database/database.sqlite
php artisan migrate:fresh --seed
```

5. Run development server
```bash
# Terminal 1 - Laravel
php artisan serve
# atau gunakan Herd: http://atkma.test

# Terminal 2 - Vite
npm run dev
```

## 🔑 Login Credentials

**Admin:**
- Username: `admin`
- Password: `password`

**Pengawas:**
- Username: `pengawas`
- Password: `password`

## 📁 Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── BarangController.php      ✅ DONE
│   │   ├── RuanganController.php     ⏳ TODO (BE)
│   │   └── DashboardController.php   ✅ DONE
│   ├── Middleware/
│   │   └── RoleMiddleware.php        ✅ DONE
│   └── Requests/
│       ├── BarangRequest.php         ✅ DONE
│       └── RuanganRequest.php        ⏳ TODO (BE)
├── Models/
│   ├── User.php                      ✅ DONE
│   ├── Barang.php                    ✅ DONE
│   ├── Ruangan.php                   ✅ DONE
│   ├── Transaction.php               ✅ DONE
│   └── ...
├── Policies/
│   ├── BarangPolicy.php              ✅ DONE
│   ├── RuanganPolicy.php             ✅ DONE
│   └── TransactionPolicy.php         ✅ DONE
└── ...

resources/js/
├── pages/
│   ├── auth/                         ✅ DONE (FE 1)
│   ├── dashboard.tsx                 ✅ DONE (FE 1 - placeholder)
│   ├── Barang/                       ⏳ TODO (FE 1/FE 2)
│   │   ├── Index.tsx
│   │   ├── Create.tsx
│   │   ├── Edit.tsx
│   │   └── Show.tsx
│   └── Ruangan/                      ⏳ TODO (FE 1/FE 2)
│       ├── Index.tsx
│       ├── Create.tsx
│       ├── Edit.tsx
│       └── Show.tsx
├── components/                       ✅ DONE (FE 1)
└── layouts/                          ✅ DONE (FE 1)
```

## 👥 Development Status

### ✅ Completed (BE 1)
- Database migrations (barangs, ruangans, transactions, etc)
- Models & Relationships
- Authentication dengan username
- Authorization (Policies & Middleware)
- CRUD Backend APIs (Barang, Ruangan)
- Dashboard API dengan statistik
- Seeders dengan data sample

### ✅ Completed (FE 1)
- Auth pages (Login, Register, dll)
- Layout system
- Components library
- Dashboard placeholder

### ⏳ Next Tasks

**FE 1 - Priority HIGH:**
1. Update Login form (email → username)
2. Implementasi Dashboard dengan data real
3. CRUD Barang pages (Index, Create, Edit, Show)

**FE 2 - Priority MEDIUM:**
1. CRUD Ruangan pages (Index, Create, Edit, Show)
2. Searchable Select components
3. Data Tables with pagination

**BE 1 - Priority HIGH (next):**
1. RuanganController implementation
2. TransactionController & Services
3. Stock Service (auto reduce/add)

## 📚 Documentation

- [Development Guide](docs/DEVELOPMENT_GUIDE.md)
- [Login Username Guide](docs/LOGIN_USERNAME_GUIDE.md)
- [Silabus Magang](SILABUS_JAM_KERJA_MAGANG.md)

## 🔐 Authorization

**Admin:**
- Full access (create, read, update, delete)

**Pengawas:**
- Read-only access

## 🌐 Routes

```bash
php artisan route:list
```

## 📝 Notes

- Login menggunakan **username** (bukan email)
- Soft delete menggunakan `is_active` flag
- Database: SQLite untuk development, MySQL untuk production

## 🤝 Contributing

Lihat [Git Collaboration Guide](docs/GIT_COLLABORATION_GUIDE.md)

## 📄 License

Private - Mahkamah Agung Indonesia
