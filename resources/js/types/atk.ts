/**
 * ATK Domain Types
 * 
 * Type definitions untuk domain Alat Tulis Kantor (ATK)
 * Mahkamah Agung Republik Indonesia
 */

// ============================================================================
// ENUMS
// ============================================================================

export type BarangStatus = 'aktif' | 'tidak_aktif';
export type BarangSatuan = 'pcs' | 'box' | 'rim' | 'set' | 'pack' | 'lusin' | 'unit';
export type TransactionType = 'masuk' | 'keluar';
export type TransactionStatus = 'pending' | 'approved' | 'rejected' | 'completed';

// ============================================================================
// MASTER DATA MODELS
// ============================================================================

export interface Barang extends Record<string, unknown> {
    id: number;
    kode_barang: string;
    nama_barang: string;
    kategori: string;
    satuan: BarangSatuan;
    stok: number;
    stok_minimum: number;
    harga_satuan: number;
    status: BarangStatus;
    deskripsi?: string;
    created_at: string;
    updated_at: string;
}

export interface Ruangan extends Record<string, unknown> {
    id: number;
    kode_ruangan: string;
    nama_ruangan: string;
    gedung: string;
    lantai: number;
    kapasitas: number;
    lokasi: string;
    penanggung_jawab?: string;
    kontak_penanggung_jawab?: string;
    jatah_bulanan?: number;
    status: 'aktif' | 'tidak_aktif';
    keterangan?: string;
    created_at: string;
    updated_at: string;
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

export interface BarangFormData {
    kode_barang: string;
    nama_barang: string;
    kategori: string;
    satuan: BarangSatuan;
    stok?: number;
    stok_minimum: number;
    harga_satuan: number;
    status: BarangStatus;
    deskripsi?: string;
}

export interface RuanganFormData {
    kode_ruangan: string;
    nama_ruangan: string;
    gedung: string;
    lantai: number;
    kapasitas: number;
    lokasi: string;
    penanggung_jawab?: string;
    kontak_penanggung_jawab?: string;
    jatah_bulanan?: number;
    status: 'aktif' | 'tidak_aktif';
    keterangan?: string;
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
    kategori?: string;
    status?: BarangStatus;
    stok_rendah?: boolean;
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
    harga_satuan: number;
}
