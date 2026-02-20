// ============================================================
// TYPE DEFINITIONS - CONTRACT ANTARA FRONTEND DAN BACKEND
// ============================================================
// File ini adalah "kontrak" antara tim FE dan BE
// Pastikan BE mengirim data sesuai dengan type ini
// ============================================================

// ==================== ENUMS ====================

export type Role = 'admin' | 'superadmin' | 'pengawas';

export type TransactionType = 'masuk' | 'keluar';

export type StockMovementType = 'penambahan' | 'pengurangan' | 'penyesuaian';

// ==================== BASE MODELS ====================

export interface User {
    id: number;
    name: string;
    username?: string;
    email: string;
    avatar?: string;
    role: Role;
    is_active: boolean;
    email_verified_at: string | null;
    two_factor_confirmed_at: string | null;
    created_at: string;
    updated_at: string;
    // Relations (optional, loaded via eager loading)
    transactions?: Transaction[];
    transactions_count?: number;
}

export interface RoleOption {
    value: Role;
    label: string;
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
    ruangan_nama: string;
    user_id: number;
    type: TransactionType;
    tanggal: string; // Format: YYYY-MM-DD
    keterangan: string | null;
    status?: 'pending' | 'approved' | 'rejected' | 'revised';
    approved_by?: number | null;
    approved_at?: string | null;
    rejected_by?: number | null;
    rejected_at?: string | null;
    rejection_reason?: string | null;
    revised_by?: number | null;
    revised_at?: string | null;
    revision_notes?: string | null;
    created_at: string;
    updated_at: string;
    // Relationships (optional, tergantung eager loading)
    user?: User;
    items?: TransactionItem[];
    stockMovements?: StockMovement[];
    approver?: User;
    rejector?: User;
    revisor?: User;
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

export interface StockReconciliation {
    id: number;
    user_id: number;
    reconciliation_date: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    // Relationships
    user?: User;
    items?: StockReconciliationItem[];
    // Computed attributes
    total_items?: number;
    discrepancies?: StockReconciliationItem[];
    total_discrepancies?: number;
}

export interface StockReconciliationItem {
    id: number;
    stock_reconciliation_id: number;
    barang_id: number;
    system_stock: number;
    physical_stock: number;
    difference: number;
    created_at: string;
    updated_at: string;
    // Relationships
    barang?: Barang;
    stock_reconciliation?: StockReconciliation;
    // Computed attributes
    discrepancy_type?: 'surplus' | 'shortage' | 'match';
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
        ruangan_nama?: string;
        type?: TransactionType;
        date_from?: string;
        date_to?: string;
    };
    ruangans: Ruangan[]; // Untuk dropdown filter
    barangs: Barang[]; // Untuk dropdown filter
    transactionTypes: Array<{ value: string; label: string }>; // Jenis transaksi
}

// Transaction Create
export interface TransactionCreateProps {
    barangs: Barang[]; // Barang aktif dengan stok
    ruangans: Ruangan[]; // Ruangan aktif
    transactionTypes: Array<{ value: string; label: string }>; // Jenis transaksi
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

// Stock Reconciliation Index
export interface StockReconciliationIndexProps {
    reconciliations: PaginatedData<StockReconciliation>;
    filters: {
        date_from?: string;
        date_to?: string;
    };
}

// Stock Reconciliation Create
export interface StockReconciliationCreateProps {
    barangs: Barang[]; // All active barangs with current stock
}

// Stock Reconciliation Show
export interface StockReconciliationShowProps {
    reconciliation: StockReconciliation;
    matched_items: StockReconciliationItem[];
    discrepancies: StockReconciliationItem[];
    stats: {
        total: number;
        matched: number;
        surplus: number;
        shortage: number;
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
    type: TransactionType;
    ruangan_nama: string;
    tanggal: string;
    keterangan: string;
    items: TransactionItemFormData[];
}

export interface TransactionItemFormData {
    barang_id: number | '';
    jumlah: number | '';
}

export interface UserFormData {
    name: string;
    username: string;
    email: string;
    role: Role;
    password?: string;
    password_confirmation?: string;
}

export interface SettingsFormData {
    app_name: string;
    app_description?: string;
    items_per_page: number;
    low_stock_threshold: number;
    enable_email_notifications: boolean;
    enable_stock_alerts: boolean;
    enable_audit_log: boolean;
    backup_enabled: boolean;
    backup_schedule?: 'daily' | 'weekly' | 'monthly';
    backup_retention_days?: number;
}

// ==================== REPORT FILTERS ====================

export interface ReportFilter {
    date_from?: string;
    date_to?: string;
    ruangan_id?: number;
    type?: TransactionType;
    barang_id?: number;
    low_stock?: boolean;
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
    notifications?: Notification[];
    unread_notifications_count?: number;
    ziggy?: {
        url: string;
        port: number | null;
        defaults: Record<string, unknown>;
        routes: Record<string, unknown>;
    };
}

// Helper type untuk page props
export type PageProps<T = Record<string, unknown>> = T & SharedProps;

// ==================== USER MANAGEMENT PROPS ====================

export interface UserIndexProps {
    users: PaginatedData<User>;
    filters: {
        search?: string;
        role?: Role;
        status?: boolean;
    };
    roles: RoleOption[];
}

export interface UserCreateProps {
    roles: RoleOption[];
}

export interface UserEditProps {
    user: User;
    roles: RoleOption[];
}

export interface UserShowProps {
    user: User & {
        transactions?: Transaction[];
    };
}

export interface UserFormData {
    name: string;
    username: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    role: Role | '';
    is_active: boolean;
}

// ==================== SETTINGS PROPS ====================

export interface SettingItem {
    key: string;
    value: string;
    description?: string;
}

export interface SettingsIndexProps {
    general: {
        app_name: string;
        app_url: string;
        timezone: string;
        date_format: string;
    };
    email: {
        mail_from_address: string;
        mail_from_name: string;
    };
    backup: {
        backup_schedule: string;
        backup_retention_days: number;
    };
    audit: {
        enable_audit_log: boolean;
        audit_retention_days: number;
    };
}

export interface SettingsFormData {
    // General
    app_name?: string;
    app_url?: string;
    timezone?: string;
    date_format?: string;
    // Email
    mail_from_address?: string;
    mail_from_name?: string;
    // Backup
    backup_schedule?: string;
    backup_retention_days?: number;
    // Audit
    enable_audit_log?: boolean;
    audit_retention_days?: number;
}

// ==================== NOTIFICATION PROPS ====================

export interface Notification {
    id: number;
    user_id: number;
    type: string;
    title: string;
    message: string;
    data?: Record<string, any>;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface NotificationIndexProps {
    notifications: PaginatedData<Notification>;
    unread_count: number;
}

// ==================== AUDIT LOG PROPS ====================

export interface AuditLog {
    id: number;
    user_id: number;
    user: User;
    action: 'created' | 'updated' | 'deleted';
    model: string;
    model_id: number;
    old_value: string | null; // JSON string
    new_value: string | null; // JSON string
    description: string;
    ip_address: string;
    user_agent: string;
    created_at: string;
}

export interface AuditLogIndexProps extends PageProps {
    auditLogs: PaginatedData<AuditLog>;
    filters: {
        search?: string;
        user_id?: string | number;
        action?: string;
        model?: string;
        date_from?: string;
        date_to?: string;
    };
    users: Array<{ id: number; name: string; username: string }>;
}
