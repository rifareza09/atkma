# ERD - Sistem ATK Mahkamah Agung (Mermaid)

## Cara Penggunaan:
1. Buka https://mermaid.live
2. Copy-paste kode di bawah ini
3. Diagram akan ter-generate otomatis

---

```mermaid
erDiagram
    %% ==================== ENTITIES ====================
    
    users {
        bigint id PK
        varchar name
        varchar email UK
        timestamp email_verified_at
        varchar password
        enum role "admin, pengawas"
        text two_factor_secret
        text two_factor_recovery_codes
        timestamp two_factor_confirmed_at
        varchar remember_token
        timestamp created_at
        timestamp updated_at
    }
    
    barangs {
        bigint id PK
        varchar kode UK "Kode manual: ATK-001"
        varchar nama
        varchar satuan "pcs, rim, box, dll"
        int stok
        int stok_minimum
        text deskripsi
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    ruangans {
        bigint id PK
        varchar kode UK "Kode: R-001"
        varchar nama
        varchar penanggung_jawab
        text deskripsi
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    transactions {
        bigint id PK
        varchar kode_transaksi UK "TRX-YYYYMMDD-XXX"
        bigint ruangan_id FK
        bigint user_id FK
        enum type "masuk, keluar"
        date tanggal
        text keterangan
        timestamp created_at
        timestamp updated_at
    }
    
    transaction_items {
        bigint id PK
        bigint transaction_id FK
        bigint barang_id FK
        int jumlah
        timestamp created_at
        timestamp updated_at
    }
    
    stock_movements {
        bigint id PK
        bigint barang_id FK
        bigint user_id FK
        bigint transaction_id FK "nullable"
        enum type "penambahan, pengurangan, penyesuaian"
        int jumlah
        int stok_sebelum
        int stok_sesudah
        text keterangan
        timestamp created_at
        timestamp updated_at
    }
    
    settings {
        bigint id PK
        varchar key UK
        text value
        timestamp created_at
        timestamp updated_at
    }
    
    sessions {
        varchar id PK
        bigint user_id FK
        varchar ip_address
        text user_agent
        longtext payload
        int last_activity
    }
    
    %% ==================== RELATIONSHIPS ====================
    
    users ||--o{ transactions : "creates"
    users ||--o{ stock_movements : "records"
    users ||--o{ sessions : "has"
    
    ruangans ||--o{ transactions : "receives"
    
    transactions ||--o{ transaction_items : "contains"
    transactions ||--o{ stock_movements : "generates"
    
    barangs ||--o{ transaction_items : "included_in"
    barangs ||--o{ stock_movements : "tracked_by"
```

---

## Penjelasan Relasi:

| Tabel Asal | Relasi | Tabel Tujuan | Keterangan |
|------------|--------|--------------|------------|
| users | 1:N | transactions | 1 user mencatat banyak transaksi |
| users | 1:N | stock_movements | 1 user mencatat banyak pergerakan stok |
| users | 1:N | sessions | 1 user punya banyak session |
| ruangans | 1:N | transactions | 1 ruangan punya banyak transaksi |
| transactions | 1:N | transaction_items | 1 transaksi punya banyak item |
| transactions | 1:N | stock_movements | 1 transaksi generate banyak movement |
| barangs | 1:N | transaction_items | 1 barang ada di banyak item transaksi |
| barangs | 1:N | stock_movements | 1 barang punya banyak riwayat stok |
