# ✅ Railway Environment Variables Checklist

## 🚀 Status Push GitHub
- ✅ **Branch `develop`**: Pushed (commit 4097291)
- ✅ **Branch `main`**: Pushed (commit 4097291)
- ✅ **File `nixpacks.toml`**: Pushed ke kedua branch
- ✅ **Railway**: Akan otomatis redeploy dari branch yang dikonfigurasi

---

## 📋 Environment Variables Yang Harus Diset di Railway Dashboard

### 🔐 **1. Application Settings** (WAJIB)

```env
APP_NAME="ATK Mahkamah Agung RI"
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
APP_URL=https://your-app.railway.app
```

**Cara Generate `APP_KEY`:**
```bash
# Di local, jalankan:
php artisan key:generate --show

# Atau via Railway CLI:
railway run php artisan key:generate --show

# Copy hasilnya (format: base64:...) ke Railway Environment Variables
```

---

### 🗄️ **2. Database Configuration** (WAJIB)

```env
DB_CONNECTION=mysql
DB_HOST=mysql.railway.internal
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=xxxxxxxxxxxxxxxxxxxxx
```

**📌 Note:** 
- Jika menggunakan Railway MySQL Plugin, variables ini akan otomatis terisi
- Pastikan service sudah connected ke MySQL service di Railway

---

### 🔧 **3. Cache & Session** (RECOMMENDED)

```env
CACHE_STORE=database
CACHE_PREFIX=atkma

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_SECURE_COOKIE=true

QUEUE_CONNECTION=database
```

---

### 📧 **4. Mail Configuration** (OPTIONAL)

```env
MAIL_MAILER=log
MAIL_FROM_ADDRESS=noreply@mahkamahagung.go.id
MAIL_FROM_NAME="${APP_NAME}"
```

**Untuk Production Email (jika diperlukan):**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
```

---

### 📊 **5. Logging** (RECOMMENDED)

```env
LOG_CHANNEL=stack
LOG_LEVEL=error
LOG_DEPRECATIONS_CHANNEL=null
LOG_STACK=single
```

---

### 🔒 **6. Security** (RECOMMENDED)

```env
BCRYPT_ROUNDS=12
```

---

### 🌐 **7. Filesystem** (OPTIONAL)

```env
FILESYSTEM_DISK=local
```

---

## 🎯 Langkah Setup di Railway Dashboard

### Step 1: Buka Railway Dashboard
1. Login ke [railway.app](https://railway.app)
2. Pilih project "ATKMA"
3. Klik service aplikasi Anda

### Step 2: Tambah Environment Variables
1. Klik tab **"Variables"**
2. Klik **"+ New Variable"**
3. Atau klik **"RAW Editor"** untuk paste semua sekaligus

### Step 3: Format RAW Editor
```env
APP_NAME=ATK Mahkamah Agung RI
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:YOUR_GENERATED_KEY_HERE
APP_URL=https://your-app.railway.app
DB_CONNECTION=mysql
DB_HOST=${{MySQL.MYSQL_HOST}}
DB_PORT=${{MySQL.MYSQL_PORT}}
DB_DATABASE=${{MySQL.MYSQL_DATABASE}}
DB_USERNAME=${{MySQL.MYSQL_USER}}
DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
CACHE_STORE=database
SESSION_DRIVER=database
QUEUE_CONNECTION=database
LOG_CHANNEL=stack
LOG_LEVEL=error
MAIL_MAILER=log
```

**📌 Catatan:** 
- `${{MySQL.XXXX}}` adalah variable references dari Railway MySQL service
- Ganti dengan nilai actual jika tidak menggunakan Railway MySQL Plugin

---

## 🔄 Setelah Deploy Berhasil

### 1. Jalankan Migrations
```bash
# Via Railway Dashboard > Settings > Start Command (sementara):
php artisan migrate --force && /start-container.sh

# Atau via Railway CLI:
railway run php artisan migrate --force
```

### 2. (Optional) Seed Database
```bash
railway run php artisan db:seed --force
```

### 3. Clear Cache
```bash
railway run php artisan cache:clear
railway run php artisan config:clear
railway run php artisan view:clear
```

### 4. Optimize
```bash
railway run php artisan optimize
```

---

## 🐛 Troubleshooting

### Error: "No application encryption key has been specified"
**Solusi:** Generate dan set `APP_KEY`
```bash
php artisan key:generate --show
# Copy hasil ke Railway Environment Variables
```

### Error: "SQLSTATE[HY000] [2002] Connection refused"
**Solusi:** Check database credentials dan pastikan MySQL service connected

### Error: "The stream or file storage/logs/laravel.log could not be opened"
**Solusi:** Tambahkan di start command:
```bash
chmod -R 775 storage bootstrap/cache && php artisan config:cache && /start-container.sh
```

### Build Gagal: "ext-gd missing"
**Solusi:** Sudah resolved dengan `nixpacks.toml` ✅

---

## 📱 Railway CLI Setup (Optional)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Set environment variable via CLI
railway variables set APP_KEY=base64:xxxxx

# Lihat semua variables
railway variables

# Lihat logs
railway logs

# Run command
railway run php artisan migrate
```

---

## ✅ Deployment Checklist

- [ ] Environment variables sudah diset di Railway
- [ ] `APP_KEY` sudah di-generate dan diset
- [ ] Database MySQL sudah connected
- [ ] Build berhasil (check Railway logs)
- [ ] Migrations sudah dijalankan
- [ ] Aplikasi bisa diakses via Railway URL
- [ ] Test login dan fitur utama
- [ ] Storage folder writable
- [ ] Logs tidak ada error critical

---

## 🔗 Link Penting

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app
- **Laravel Deployment**: https://laravel.com/docs/deployment

---

**Last Updated:** February 24, 2026  
**Status:** ✅ Ready untuk Production Deployment
