# 🏛️ Aplikasi ATK Mahkamah Agung RI

Sistem manajemen Alat Tulis Kantor (ATK) untuk Mahkamah Agung Republik Indonesia.

## 📚 Dokumentasi

- **[Development Guide](docs/DEVELOPMENT_GUIDE.md)** - Panduan lengkap pengembangan
- **[Frontend Progress](docs/FRONTEND_PROGRESS.md)** - Status pengembangan frontend
- **[Git Collaboration](docs/GIT_COLLABORATION_GUIDE.md)** - Panduan kolaborasi Git

## 🚀 Quick Start

### Prerequisites

- PHP 8.2+
- Node.js 18+
- Composer
- npm/yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd atkma

# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Start development servers
# Terminal 1: Laravel
php artisan serve

# Terminal 2: Vite
npm run dev
```

## 🛠️ Tech Stack

### Backend

- **Framework:** Laravel 12
- **Authentication:** Laravel Fortify
- **Database:** SQLite (dev) / MySQL (prod)

### Frontend

- **Framework:** React 18 + TypeScript
- **SSR:** Inertia.js
- **UI:** shadcn/ui + Tailwind CSS
- **Icons:** Lucide React
- **Build:** Vite

## 📁 Project Structure

```
atkma/
├── app/                  # Laravel backend
├── resources/
│   ├── js/              # React frontend
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── types/       # TypeScript types
│   │   └── lib/         # Utilities
│   └── css/             # Styles
├── routes/              # Laravel routes
├── database/            # Migrations & seeders
└── docs/                # Documentation
```

## 🎯 Features

### ✅ Implemented (Phase 1-2)

- 🏠 Dashboard dengan statistik
- 📦 Master Data Barang (CRUD)
- 🏢 Master Data Ruangan (partial CRUD)
- 🎨 Reusable UI Components
- 📊 Data tables dengan pagination
- 🔔 Toast notifications

### 🚧 In Progress (Phase 3)

- 📝 Transaksi Permintaan Barang
- 📥 Transaksi Barang Masuk
- 🔍 Advanced filters
- 📈 Dashboard charts

### 📋 Planned (Phase 4)

- 📄 Export PDF/Excel
- 📊 Laporan & Kartu Stok
- 🎨 Branding MA
- 🔎 Searchable dropdown

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server
php artisan serve        # Start Laravel server

# Build
npm run build           # Build for production
npm run build:ssr       # Build with SSR support

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format with Prettier
npm run types           # TypeScript type checking
```

## 🤝 Team Roles

### Frontend Developer 1 ✅

- Type definitions
- Core components
- Dashboard
- Master Barang CRUD
- Master Ruangan (partial)

### Frontend Developer 2 📌

- Complete Master Ruangan
- Transaksi pages
- Filters & search
- Export features
- Charts

### Backend Developer 🔗

- API implementation
- Database design
- Business logic
- Authentication
- Validation

## 📞 Support

Untuk pertanyaan atau bantuan, hubungi:

- **Project Lead:** [Name]
- **Tech Lead:** [Name]
- **Documentation:** `docs/` folder

## 📄 License

[Add License Information]

---

**Mahkamah Agung Republik Indonesia**  
_Sistem Manajemen ATK v1.0_
