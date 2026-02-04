# 🤝 Panduan Kerja Paralel Tim FE & BE

## Overview

Dengan Inertia.js, tim FE dan BE bisa kerja **PARALEL** tanpa perlu setup API terpisah. 
Caranya dengan menggunakan **"Contract Types"** sebagai kesepakatan format data.

---

## 📋 Pembagian Tugas

### Tim Backend (Laravel)
1. Database migrations
2. Models & relationships
3. Controllers (return Inertia::render)
4. Form Requests (validasi)
5. Services (business logic)
6. Policies (authorization)

### Tim Frontend (React)
1. Pages (di `resources/js/pages/`)
2. Components (di `resources/js/components/`)
3. Styling dengan Tailwind CSS
4. Form handling dengan useForm
5. State management

---

## 🔗 Contract Types

File kontrak ada di: `resources/js/types/models.d.ts`

**PENTING:** Kedua tim HARUS sepakat dengan types ini SEBELUM mulai coding!

### Contoh Contract

```typescript
// BE harus return data dengan format ini
export interface BarangIndexProps {
    barangs: PaginatedData<Barang>;
    filters: {
        search?: string;
        is_active?: boolean;
    };
}
```

```php
// Controller harus return sesuai contract
public function index(Request $request)
{
    return Inertia::render('Barang/Index', [
        'barangs' => Barang::query()
            ->when($request->search, fn($q) => $q->where('nama', 'like', "%{$request->search}%"))
            ->paginate(),
        'filters' => $request->only(['search', 'is_active']),
    ]);
}
```

---

## 🎯 Strategi Kerja Paralel

### Step 1: BE Setup Foundation (Hari 1)
- [ ] Migrations
- [ ] Models
- [ ] Seeders (data dummy)

### Step 2: Paralel Development (Hari 2+)

| BE Task | FE Task | Dependency |
|---------|---------|------------|
| BarangController@index | Barang/Index.tsx | Contract: BarangIndexProps |
| BarangController@create/store | Barang/Create.tsx | Contract: BarangFormProps, BarangFormData |
| BarangController@edit/update | Barang/Edit.tsx | Contract: BarangFormProps, BarangFormData |
| RuanganController | Ruangan/*.tsx | Contract: RuanganIndexProps, etc |
| TransactionController | Transaction/*.tsx | Contract: TransactionProps, etc |
| DashboardController | Dashboard.tsx | Contract: DashboardProps |

---

## 🧪 FE Development dengan Mock Data

Sementara BE belum selesai, FE bisa pakai **mock data**:

### File: `resources/js/lib/mock-data.ts`

```typescript
import type { Barang, Ruangan, PaginatedData } from '@/types/models';

export const mockBarangs: PaginatedData<Barang> = {
    data: [
        {
            id: 1,
            kode: 'ATK-001',
            nama: 'Kertas HVS A4 70gsm',
            satuan: 'rim',
            stok: 150,
            stok_minimum: 50,
            deskripsi: 'Kertas HVS ukuran A4',
            is_active: true,
            created_at: '2026-02-01T00:00:00Z',
            updated_at: '2026-02-01T00:00:00Z',
        },
        // ... more mock data
    ],
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 1,
    // ... pagination fields
};
```

### Cara Pakai Mock di Component

```tsx
// Development mode dengan mock
const { barangs } = usePage<BarangIndexProps>().props;

// Fallback ke mock jika data kosong (untuk development)
const data = barangs?.data ?? mockBarangs.data;
```

---

## 📁 Folder Structure

```
resources/js/
├── types/
│   └── models.d.ts          # 📋 CONTRACT - Kesepakatan FE & BE
├── lib/
│   └── mock-data.ts         # 🎭 Mock data untuk FE development
├── pages/
│   ├── Barang/
│   │   ├── Index.tsx        # 👨‍💻 FE mengerjakan ini
│   │   ├── Create.tsx
│   │   └── Edit.tsx
│   └── ...
```

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── BarangController.php   # 👨‍💻 BE mengerjakan ini
│   │   └── ...
│   └── Requests/
│       ├── BarangRequest.php
│       └── ...
├── Models/
│   ├── Barang.php
│   └── ...
└── Services/
    ├── StockService.php
    └── ...
```

---

## 🔄 Workflow Kolaborasi

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTRACT TYPES                            │
│              (resources/js/types/models.d.ts)               │
└─────────────────────────┬───────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
┌───────────────────────┐   ┌───────────────────────┐
│      TIM BACKEND      │   │     TIM FRONTEND      │
│                       │   │                       │
│ 1. Buat Controller    │   │ 1. Buat Page.tsx      │
│ 2. Return data sesuai │   │ 2. Import types       │
│    contract           │   │ 3. Pakai mock data    │
│ 3. Test dengan Tinker │   │ 4. Styling & UX       │
│                       │   │                       │
└───────────┬───────────┘   └───────────┬───────────┘
            │                           │
            └─────────────┬─────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │      INTEGRATION      │
              │   FE + BE Testing     │
              └───────────────────────┘
```

---

## ✅ Checklist Sebelum Integration

### Backend Checklist
- [ ] Controller method sudah return Inertia::render
- [ ] Data format sesuai dengan Contract Types
- [ ] Validasi sudah dibuat di FormRequest
- [ ] Test dengan browser atau Postman

### Frontend Checklist
- [ ] Component sudah pakai types dari models.d.ts
- [ ] Form handling sudah pakai useForm
- [ ] Error handling untuk validation errors
- [ ] Loading states sudah ada

---

## 💡 Tips

1. **Komunikasi Rutin**: Sync setiap hari untuk update progress
2. **Update Contract**: Jika perlu ubah format data, update models.d.ts dan beritahu tim lain
3. **Git Branching**: 
   - `feature/be-barang` untuk BE
   - `feature/fe-barang` untuk FE
   - Merge ke `develop` setelah selesai
4. **Testing Integration**: Setelah merge, test bersama untuk pastikan data mengalir dengan benar

---

## 📝 Contoh Prompt untuk Tim

### Prompt untuk Tim BE
```
Saya bagian dari tim BE untuk aplikasi ATK Mahkamah Agung.

Contract types sudah disepakati di: resources/js/types/models.d.ts

Tolong buatkan BarangController dengan methods:
- index() → return BarangIndexProps
- create() → return BarangFormProps
- store() → validasi dengan BarangRequest, redirect ke index
- edit() → return BarangFormProps dengan barang
- update() → validasi, redirect ke index
- destroy() → soft delete, redirect ke index

Pastikan return data sesuai dengan contract types yang sudah disepakati.
```

### Prompt untuk Tim FE
```
Saya bagian dari tim FE untuk aplikasi ATK Mahkamah Agung.

Contract types sudah ada di: resources/js/types/models.d.ts

Tolong buatkan halaman Barang/Index.tsx dengan:
- Tabel list barang dengan pagination
- Search box untuk filter nama/kode
- Tombol tambah barang baru
- Actions: edit, delete dengan konfirmasi

Gunakan shadcn/ui components dan import types dari @/types/models.
BE sedang dikerjakan paralel, jadi buat juga mock data untuk testing.
```

---

**Dengan pendekatan ini, tim FE dan BE bisa kerja PARALEL tanpa harus tunggu satu sama lain!** 🚀
