/**
 * ATK Domain Types
 * 
 * Type definitions untuk domain Alat Tulis Kantor (ATK)
 * Mahkamah Agung Republik Indonesia
 */

// ============================================================================
// ENUMS
// ============================================================================

export type BarangSatuan = 'pcs' | 'box' | 'rim' | 'set' | 'pack' | 'lusin' | 'unit';
export type TransactionType = 'masuk' | 'keluar';
export type TransactionStatus = 'pending' | 'approved' | 'rejected' | 'completed';

// ============================================================================
// MASTER DATA MODELS
// ============================================================================

/**
 * Barang Model - Matches database structure
 * Database fields: kode, nama, satuan, stok, stok_minimum, deskripsi, is_active
 */
export interface Barang extends Record<string, unknown> {
    id: number;
    kode: string;  // kode manual barang (e.g., "ATK-001")
    nama: string;  // nama barang
    satuan: BarangSatuan;  // pcs, rim, box, dll
    stok: number;
    stok_minimum: number;
    deskripsi?: string;
    is_active: boolean;  // true/false, not 'aktif'/'tidak_aktif'
    created_at: string;
    updated_at: string;
}

/**
 * Ruangan Model - Matches database structure
 * Database fields: kode, nama, penanggung_jawab, deskripsi, is_active
 */
export interface Ruangan extends Record<string, unknown> {
    id: number;
    kode: string;  // kode manual ruangan (e.g., "R-101")
    nama: string;  // nama ruangan
    penanggung_jawab?: string;  // nama penanggung jawab
    deskripsi?: string;  // deskripsi/keterangan ruangan
    is_active: boolean;  // true/false, not 'aktif'/'tidak_aktif'
    created_at: string;
    updated_at: string;
    transactions_count?: number;  // relationship count
}

// ============================================================================
// TRANSACTION MODELS
// ============================================================================

export interface Transaction extends Record<string, unknown> {
    id: number;
    kode_transaksi: string;
    nomor_transaksi: string;
    tanggal_transaksi: string;
    jenis_transaksi: TransactionType;
    ruangan_id?: number;
    ruangan?: Ruangan;
    pemohon: string;
    keterangan?: string;
    status: TransactionStatus | 'disetujui' | 'ditolak' | 'pending';
    total_items: number;
    approved_by?: number;
    approved_at?: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    items?: TransactionItem[];
    creator?: {
        id: number;
        name: string;
        email: string;
    };
}

export interface TransactionItem {
    id: number;
    transaction_id: number;
    barang_id: number;
    barang?: Barang;
    quantity: number;
    jumlah: number;
    harga_satuan: number;
    subtotal: number;
    keterangan?: string;
    created_at: string;
    updated_at: string;
}

export interface StockMovement extends Record<string, unknown> {
    id: number;
    barang_id: number;
    barang?: Barang;
    transaction_id?: number;
    transaction?: Transaction;
    jenis: 'in' | 'out';
    jenis_pergerakan: 'masuk' | 'keluar' | 'adjustment';
    jumlah: number;
    quantity: number;
    nomor_referensi: string;
    tanggal: string;
    sumber_tujuan: string;
    stok_sebelum: number;
    stok_sesudah: number;
    keterangan?: string;
    created_at: string;
    updated_at: string;
}

// ============================================================================
// FORM DATA TYPES
// ============================================================================

/**
 * Barang Form Data - Matches backend validation rules
 */
export interface BarangFormData {
    kode: string;
    nama: string;
    satuan: BarangSatuan;
    stok?: number;
    stok_minimum: number;
    deskripsi?: string;
    is_active: boolean;
}

/**
 * Ruangan Form Data - Matches backend validation rules
 */
export interface RuanganFormData {
    kode: string;
    nama: string;
    penanggung_jawab?: string;
    deskripsi?: string;
    is_active: boolean;
}

export interface TransactionFormData {
    tanggal_transaksi: string;
    jenis_transaksi: TransactionType;
    ruangan_id?: number;
    keterangan?: string;
    items: TransactionItemFormData[];
}

export interface TransactionItemFormData {
    barang_id: number;
    quantity: number;
    keterangan?: string;
}

// ============================================================================
// DASHBOARD & STATISTICS
// ============================================================================

export interface DashboardStats {
    total_barang: number;
    total_ruangan: number;
    total_transaksi_bulan_ini: number;
    barang_stok_rendah: number;
}

export interface BarangStokRendah extends Barang {
    persentase_stok: number;
}

export interface TransaksiTerbaru extends Transaction {
    ruangan_nama?: string;
    jumlah_item: number;
}

export interface GrafikTransaksi {
    tanggal: string;
    masuk: number;
    keluar: number;
}

export interface DashboardData {
    stats: DashboardStats;
    barang_stok_rendah: BarangStokRendah[];
    transaksi_terbaru: TransaksiTerbaru[];
    grafik_transaksi: GrafikTransaksi[];
}

// ============================================================================
// PAGINATION & FILTERS
// ============================================================================

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

// Alias for PaginatedData
export type PaginatedData<T> = PaginatedResponse<T>;

// DataTable column definition
export interface ColumnDef<T> {
    key: string;
    label: string;
    render?: (row: T) => React.ReactNode;
}

export interface BarangFilter {
    search?: string;
    status?: boolean | string;  // is_active filter (true/false or '1'/'0')
    low_stock?: boolean;  // filter barang stok rendah
}

export interface TransactionFilter {
    search?: string;
    jenis_transaksi?: TransactionType;
    status?: TransactionStatus;
    ruangan_id?: number;
    tanggal_dari?: string;
    tanggal_sampai?: string;
}

// ============================================================================
// EXPORT TYPES
// ============================================================================

export interface ExportOptions {
    format: 'pdf' | 'excel' | 'csv';
    filename?: string;
    filters?: Record<string, unknown>;
}

// ============================================================================
// SELECT OPTIONS
// ============================================================================

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface BarangSelectOption extends SelectOption {
    value: number;
    stok: number;
    satuan: string;
}
