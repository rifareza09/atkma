// ============================================================
// TYPE DEFINITIONS - CONTRACT ANTARA FRONTEND DAN BACKEND
// ============================================================
// File ini adalah "kontrak" antara tim FE dan BE
// Pastikan BE mengirim data sesuai dengan type ini
// ============================================================

// ==================== ENUMS ====================

export type Role = 'admin' | 'pengawas';

export type TransactionType = 'masuk' | 'keluar';

export type StockMovementType = 'penambahan' | 'pengurangan' | 'penyesuaian';

// ==================== BASE MODELS ====================

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    email_verified_at: string | null;
    two_factor_confirmed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Barang {
    id: number;
    kode: string;
    nama: string;
    satuan: string;
    stok: number;
    stok_minimum: number;
    deskripsi: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    // Computed/Accessor
    is_low_stock?: boolean;
}

export interface Ruangan {
    id: number;
    kode: string;
    nama: string;
    penanggung_jawab: string | null;
    deskripsi: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: number;
    kode_transaksi: string;
    ruangan_id: number;
    user_id: number;
    type: TransactionType;
    tanggal: string; // Format: YYYY-MM-DD
    keterangan: string | null;
    created_at: string;
    updated_at: string;
    // Relationships (optional, tergantung eager loading)
    ruangan?: Ruangan;
    user?: User;
    items?: TransactionItem[];
}

export interface TransactionItem {
    id: number;
    transaction_id: number;
    barang_id: number;
    jumlah: number;
    created_at: string;
    updated_at: string;
    // Relationships
    barang?: Barang;
}

export interface StockMovement {
    id: number;
    barang_id: number;
    user_id: number;
    transaction_id: number | null;
    type: StockMovementType;
    jumlah: number;
    stok_sebelum: number;
    stok_sesudah: number;
    keterangan: string | null;
    created_at: string;
    updated_at: string;
    // Relationships
    barang?: Barang;
    user?: User;
    transaction?: Transaction;
}

// ==================== PAGINATION ====================

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

// ==================== PAGE PROPS ====================
// Props yang dikirim dari Controller ke React Page

// Dashboard
export interface DashboardProps {
    stats: {
        total_barang: number;
        total_barang_low_stock: number;
        total_ruangan: number;
        total_transaksi_hari_ini: number;
        total_transaksi_bulan_ini: number;
    };
    chart_data: {
        date: string;
        masuk: number;
        keluar: number;
    }[];
    barang_low_stock: Barang[];
    transaksi_terbaru: Transaction[];
    top_barang: {
        barang: Barang;
        total_keluar: number;
    }[];
    top_ruangan: {
        ruangan: Ruangan;
        total_permintaan: number;
    }[];
}

// Barang Index
export interface BarangIndexProps {
    barangs: PaginatedData<Barang>;
    filters: {
        search?: string;
        is_active?: boolean;
    };
}

// Barang Create/Edit
export interface BarangFormProps {
    barang?: Barang; // undefined untuk create, ada untuk edit
}

// Barang Show
export interface BarangShowProps {
    barang: Barang;
    stock_movements: PaginatedData<StockMovement>;
}

// Ruangan Index
export interface RuanganIndexProps {
    ruangans: PaginatedData<Ruangan>;
    filters: {
        search?: string;
        is_active?: boolean;
    };
}

// Ruangan Create/Edit
export interface RuanganFormProps {
    ruangan?: Ruangan;
}

// Transaction Index
export interface TransactionIndexProps {
    transactions: PaginatedData<Transaction>;
    filters: {
        search?: string;
        ruangan_id?: number;
        type?: TransactionType;
        date_from?: string;
        date_to?: string;
    };
    ruangans: Ruangan[]; // Untuk dropdown filter
}

// Transaction Create
export interface TransactionCreateProps {
    barangs: Barang[]; // Barang aktif dengan stok
    ruangans: Ruangan[]; // Ruangan aktif
    type: TransactionType; // 'masuk' atau 'keluar'
}

// Transaction Show
export interface TransactionShowProps {
    transaction: Transaction; // Dengan relationships: ruangan, user, items.barang
}

// Stock Movement / Kartu Stok
export interface KartuStokProps {
    barang: Barang;
    movements: PaginatedData<StockMovement>;
    filters: {
        date_from?: string;
        date_to?: string;
    };
}

// ==================== FORM DATA ====================
// Data yang dikirim dari Form ke Controller

export interface BarangFormData {
    kode: string;
    nama: string;
    satuan: string;
    stok: number;
    stok_minimum: number;
    deskripsi: string;
}

export interface RuanganFormData {
    kode: string;
    nama: string;
    penanggung_jawab: string;
    deskripsi: string;
}

export interface TransactionFormData {
    ruangan_id: number | '';
    tanggal: string;
    keterangan: string;
    items: TransactionItemFormData[];
}

export interface TransactionItemFormData {
    barang_id: number | '';
    jumlah: number | '';
}

// ==================== FLASH MESSAGES ====================

export interface FlashMessages {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}

// ==================== SHARED PAGE PROPS ====================
// Props yang selalu ada di setiap page (dari HandleInertiaRequests middleware)

export interface SharedProps {
    auth: {
        user: User;
    };
    flash: FlashMessages;
    ziggy?: {
        url: string;
        port: number | null;
        defaults: Record<string, unknown>;
        routes: Record<string, unknown>;
    };
}

// Helper type untuk page props
export type PageProps<T = Record<string, unknown>> = T & SharedProps;
