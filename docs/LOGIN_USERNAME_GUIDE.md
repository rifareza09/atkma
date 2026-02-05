# Login Menggunakan Username

## Perubahan yang Dilakukan

### 1. Database Migration
- Ditambahkan kolom `username` (unique) ke tabel `users`
- Email diubah menjadi nullable (opsional)

### 2. Model User
- Menambahkan `username` ke dalam `$fillable`

### 3. Fortify Configuration
- Mengubah `config/fortify.php`: `'username' => 'username'`
- Menambahkan custom authentication di `FortifyServiceProvider`

### 4. User Seeder
- Admin: username `admin`
- Pengawas: username `pengawas`

## Cara Login

### Kredensial Login

**Admin:**
- Username: `admin`
- Password: `password`

**Pengawas:**
- Username: `pengawas`
- Password: `password`

### Input Field di Form Login
Form login sekarang menggunakan:
- Field: `username` (bukan email)
- Placeholder: "Masukkan username"
- Validation: required

## Catatan untuk Frontend

FE 1 perlu update form login di `resources/js/pages/auth/login.tsx`:

1. Ubah input field dari `email` menjadi `username`
2. Ubah label dari "Email" menjadi "Username"
3. Ubah placeholder sesuai kebutuhan
4. Update validation messages

Contoh perubahan:
```tsx
// Sebelum
<Input
  name="email"
  type="email"
  placeholder="Email address"
/>

// Sesudah
<Input
  name="username"
  type="text"
  placeholder="Masukkan username"
/>
```

## File yang Dimodifikasi
1. `database/migrations/2026_02_05_043618_add_username_to_users_table.php` (new)
2. `app/Models/User.php`
3. `config/fortify.php`
4. `app/Providers/FortifyServiceProvider.php`
5. `app/Actions/Fortify/CreateNewUser.php`
6. `database/seeders/UserSeeder.php`
