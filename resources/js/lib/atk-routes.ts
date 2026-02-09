/**
 * ATK Routes Helper
 * 
 * Route helpers untuk modul ATK (Alat Tulis Kantor)
 * Routes ini akan mengikuti pattern Laravel Wayfinder
 */

// Inventory - Card based selection
export const inventoryIndex = () => '/inventory';

// Master Data Routes
export const barangIndex = () => '/master/barang';
export const barangCreate = () => '/master/barang/create';
export const barangEdit = (id: number) => `/master/barang/${id}/edit`;
export const barangShow = (id: number) => `/master/barang/${id}`;

export const ruanganIndex = () => '/master/ruangan';
export const ruanganCreate = () => '/master/ruangan/create';
export const ruanganEdit = (id: number) => `/master/ruangan/${id}/edit`;
export const ruanganShow = (id: number) => `/master/ruangan/${id}`;

// Transaction Routes
export const transaksiPermintaanIndex = () => '/transaksi/permintaan';
export const transaksiPermintaanCreate = () => '/transaksi/permintaan/create';
export const transaksiPermintaanEdit = (id: number) => `/transaksi/permintaan/${id}/edit`;
export const transaksiPermintaanShow = (id: number) => `/transaksi/permintaan/${id}`;

// Aliases for permintaan
export const permintaanIndex = transaksiPermintaanIndex;
export const permintaanCreate = transaksiPermintaanCreate;
export const permintaanShow = transaksiPermintaanShow;

export const transaksiMasukIndex = () => '/transaksi/masuk';
export const transaksiMasukCreate = () => '/transaksi/masuk/create';
export const transaksiMasukShow = (id: number) => `/transaksi/masuk/${id}`;

// Aliases for barang masuk
export const barangMasukIndex = () => '/transaksi/barang-masuk';
export const barangMasukCreate = () => '/transaksi/barang-masuk/create';
export const barangMasukShow = (id: number) => `/transaksi/barang-masuk/${id}`;

// Report Routes
export const laporanInventaris = () => '/laporan/inventaris';
export const laporanTransaksi = () => '/laporan/transaksi';
export const laporanKartuStok = () => '/laporan/kartu-stok';
export const laporanStokRendah = () => '/laporan/stok-rendah';
