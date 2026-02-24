# Railway Deployment Guide - ATK Management System

## Masalah yang Diselesaikan ✅

Error: `phpoffice/phpspreadsheet requires ext-gd * -> it is missing from your system`

**Solusi:** Menambahkan PHP extension `gd` melalui file `nixpacks.toml`

## File Konfigurasi

### nixpacks.toml

File ini sudah dibuat untuk menambahkan PHP extensions yang diperlukan:

- `gd` - Untuk image processing (required oleh phpspreadsheet)
- `zip` - Untuk file compression
- `exif` - Untuk image metadata
- `pcntl` - Untuk process control
- `bcmath` - Untuk arbitrary precision mathematics

## Langkah Deployment ke Railway

### 1. Commit file konfigurasi baru

```bash
git add nixpacks.toml
git commit -m "Add nixpacks config for Railway deployment with GD extension"
git push origin develop
```

### 2. Environment Variables di Railway Dashboard

Pastikan environment variables berikut sudah diset di Railway:

**Required:**

```
APP_NAME="ATK Mahkamah Agung RI"
APP_ENV=production
APP_KEY=<generate-with-php-artisan-key:generate>
APP_DEBUG=false
APP_URL=<your-railway-url>

DB_CONNECTION=mysql
DB_HOST=<railway-mysql-host>
DB_PORT=3306
DB_DATABASE=<database-name>
DB_USERNAME=<database-user>
DB_PASSWORD=<database-password>

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database
```

**Optional tapi Recommended:**

```
LOG_CHANNEL=stack
LOG_LEVEL=error
MAIL_MAILER=log
```

### 3. Database Setup

Setelah deploy berhasil, jalankan migrations di Railway:

1. Buka Railway Dashboard → Your Service → Settings
2. Di "Start Command", ubah ke:

    ```bash
    php artisan migrate --force && /start-container.sh
    ```

    Atau jalankan manual lewat Railway CLI:

    ```bash
    railway run php artisan migrate --force
    ```

### 4. Build Command (Optional)

Jika Railway tidak otomatis menjalankan build, set di Settings:

**Build Command:**

```bash
composer install --optimize-autoloader --no-dev && yarn install && yarn build
```

**Start Command:**

```bash
php artisan config:cache && php artisan route:cache && php artisan view:cache && /start-container.sh
```

## Troubleshooting

### Jika masih error setelah deploy:

1. **Check Build Logs:**
    - Pastikan "install-php-extensions" sudah include `gd`
    - Cari text: "Installing gd" di logs

2. **Jika GD masih missing:**
   Update `nixpacks.toml` dan ubah ke format alternatif:

    ```toml
    [phases.setup]
    aptPkgs = ['libpng-dev', 'libjpeg-dev', 'libfreetype6-dev']

    [phases.install]
    cmds = [
      'docker-php-ext-configure gd --with-freetype --with-jpeg',
      'docker-php-ext-install -j$(nproc) gd zip exif pcntl bcmath'
    ]
    ```

3. **Storage Permission Issues:**
   Tambahkan di start command:

    ```bash
    chmod -R 775 storage bootstrap/cache && php artisan config:cache && /start-container.sh
    ```

4. **Memory Limit:**
   Jika aplikasi crash, tambah environment variable:
    ```
    PHP_MEMORY_LIMIT=512M
    ```

## Checklist Deployment ✓

- [ ] File `nixpacks.toml` sudah di commit
- [ ] Environment variables sudah diset di Railway
- [ ] Database MySQL sudah connected
- [ ] APP_KEY sudah di-generate
- [ ] Build berhasil tanpa error
- [ ] Migrations sudah dijalankan
- [ ] Storage folder memiliki permission yang benar
- [ ] Aplikasi bisa diakses via URL Railway

## Railway CLI Commands

Install Railway CLI:

```bash
npm i -g @railway/cli
railway login
railway link
```

Useful commands:

```bash
# Lihat logs real-time
railway logs

# Jalankan command di Railway container
railway run php artisan migrate
railway run php artisan db:seed

# Connect ke database
railway connect

# Check environment variables
railway variables
```

## Database Connection dari Local

Jika ingin connect ke Railway database dari local:

```bash
railway connect
# Atau manual set di .env:
DB_HOST=<railway-mysql-host-from-env>
DB_PORT=<port>
DB_DATABASE=<database>
DB_USERNAME=<username>
DB_PASSWORD=<password>
```

## Support

Jika masih ada masalah, cek:

1. Railway Build Logs
2. Railway Application Logs
3. Railway Environment Variables
4. GitHub repository sudah sync

---

**Last Updated:** February 24, 2026
