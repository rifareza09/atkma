import type {
    Barang,
    Ruangan,
    Transaction,
    TransactionItem,
    User,
    PaginatedData,
    DashboardProps,
} from '@/types/models';

// ==================== MOCK USERS ====================
export const mockUsers: User[] = [
    {
        id: 1,
        name: 'Admin ATK',
        email: 'admin@mahkamahagung.go.id',
        role: 'admin',
        email_verified_at: '2026-01-01T00:00:00Z',
        two_factor_confirmed_at: null,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
    },
    {
        id: 2,
        name: 'Pengawas ATK',
        email: 'pengawas@mahkamahagung.go.id',
        role: 'pengawas',
        email_verified_at: '2026-01-01T00:00:00Z',
        two_factor_confirmed_at: null,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
    },
];

// ==================== MOCK BARANG ====================
export const mockBarangs: Barang[] = [
    {
        id: 1,
        kode: 'ATK-001',
        nama: 'Kertas HVS A4 70gsm',
        satuan: 'rim',
        stok: 150,
        stok_minimum: 50,
        deskripsi: 'Kertas HVS ukuran A4 dengan ketebalan 70 gram per meter persegi',
        is_active: true,
        is_low_stock: false,
        created_at: '2026-01-15T08:00:00Z',
        updated_at: '2026-02-01T10:30:00Z',
    },
    {
        id: 2,
        kode: 'ATK-002',
        nama: 'Pulpen Pilot G2',
        satuan: 'pcs',
        stok: 45,
        stok_minimum: 100,
        deskripsi: 'Pulpen gel warna hitam',
        is_active: true,
        is_low_stock: true,
        created_at: '2026-01-15T08:00:00Z',
        updated_at: '2026-02-01T10:30:00Z',
    },
    {
        id: 3,
        kode: 'ATK-003',
        nama: 'Spidol Snowman Hitam',
        satuan: 'pcs',
        stok: 30,
        stok_minimum: 20,
        deskripsi: 'Spidol permanen warna hitam',
        is_active: true,
        is_low_stock: false,
        created_at: '2026-01-15T08:00:00Z',
        updated_at: '2026-02-01T10:30:00Z',
    },
    {
        id: 4,
        kode: 'ATK-004',
        nama: 'Stapler Kenko HD-10',
        satuan: 'pcs',
        stok: 8,
        stok_minimum: 10,
        deskripsi: 'Stapler untuk kertas maksimal 20 lembar',
        is_active: true,
        is_low_stock: true,
        created_at: '2026-01-15T08:00:00Z',
        updated_at: '2026-02-01T10:30:00Z',
    },
    {
        id: 5,
        kode: 'ATK-005',
        nama: 'Isi Staples No.10',
        satuan: 'box',
        stok: 200,
        stok_minimum: 50,
        deskripsi: 'Isi staples ukuran No.10',
        is_active: true,
        is_low_stock: false,
        created_at: '2026-01-15T08:00:00Z',
        updated_at: '2026-02-01T10:30:00Z',
    },
    {
        id: 6,
        kode: 'ATK-006',
        nama: 'Map Plastik F4',
        satuan: 'pcs',
        stok: 75,
        stok_minimum: 30,
        deskripsi: 'Map plastik ukuran folio',
        is_active: true,
        is_low_stock: false,
        created_at: '2026-01-15T08:00:00Z',
        updated_at: '2026-02-01T10:30:00Z',
    },
    {
        id: 7,
        kode: 'ATK-007',
        nama: 'Amplop Coklat F4',
        satuan: 'pcs',
        stok: 5,
        stok_minimum: 50,
        deskripsi: 'Amplop coklat ukuran folio',
        is_active: true,
        is_low_stock: true,
        created_at: '2026-01-15T08:00:00Z',
        updated_at: '2026-02-01T10:30:00Z',
    },
    {
        id: 8,
        kode: 'ATK-008',
        nama: 'Buku Tulis 100 Lembar',
        satuan: 'pcs',
        stok: 60,
        stok_minimum: 25,
        deskripsi: 'Buku tulis 100 lembar ukuran A5',
        is_active: true,
        is_low_stock: false,
        created_at: '2026-01-15T08:00:00Z',
        updated_at: '2026-02-01T10:30:00Z',
    },
];

// ==================== MOCK RUANGAN ====================
export const mockRuangans: Ruangan[] = [
    {
        id: 1,
        kode: 'R-001',
        nama: 'Ruang Ketua MA',
        penanggung_jawab: 'Budi Santoso',
        deskripsi: 'Ruangan Ketua Mahkamah Agung',
        is_active: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
    },
    {
        id: 2,
        kode: 'R-002',
        nama: 'Ruang Sekretaris',
        penanggung_jawab: 'Dewi Lestari',
        deskripsi: 'Ruangan Sekretaris MA',
        is_active: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
    },
    {
        id: 3,
        kode: 'R-003',
        nama: 'Ruang Kepaniteraan Perdata',
        penanggung_jawab: 'Ahmad Fauzi',
        deskripsi: 'Ruangan unit Kepaniteraan Perdata',
        is_active: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
    },
    {
        id: 4,
        kode: 'R-004',
        nama: 'Ruang Kepaniteraan Pidana',
        penanggung_jawab: 'Siti Aminah',
        deskripsi: 'Ruangan unit Kepaniteraan Pidana',
        is_active: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
    },
    {
        id: 5,
        kode: 'R-005',
        nama: 'Ruang Humas',
        penanggung_jawab: 'Rina Wati',
        deskripsi: 'Ruangan Hubungan Masyarakat',
        is_active: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
    },
    {
        id: 6,
        kode: 'R-006',
        nama: 'Ruang IT',
        penanggung_jawab: 'Joko Widodo',
        deskripsi: 'Ruangan unit Teknologi Informasi',
        is_active: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
    },
];

// ==================== MOCK TRANSACTIONS ====================
export const mockTransactions: Transaction[] = [
    {
        id: 1,
        kode_transaksi: 'TRX-20260201-001',
        ruangan_id: 1,
        user_id: 1,
        type: 'keluar',
        tanggal: '2026-02-01',
        keterangan: 'Permintaan rutin bulanan',
        created_at: '2026-02-01T09:00:00Z',
        updated_at: '2026-02-01T09:00:00Z',
        ruangan: mockRuangans[0],
        user: mockUsers[0],
        items: [
            {
                id: 1,
                transaction_id: 1,
                barang_id: 1,
                jumlah: 5,
                created_at: '2026-02-01T09:00:00Z',
                updated_at: '2026-02-01T09:00:00Z',
                barang: mockBarangs[0],
            },
            {
                id: 2,
                transaction_id: 1,
                barang_id: 2,
                jumlah: 10,
                created_at: '2026-02-01T09:00:00Z',
                updated_at: '2026-02-01T09:00:00Z',
                barang: mockBarangs[1],
            },
        ],
    },
    {
        id: 2,
        kode_transaksi: 'TRX-20260201-002',
        ruangan_id: 3,
        user_id: 1,
        type: 'keluar',
        tanggal: '2026-02-01',
        keterangan: 'Kebutuhan sidang',
        created_at: '2026-02-01T10:30:00Z',
        updated_at: '2026-02-01T10:30:00Z',
        ruangan: mockRuangans[2],
        user: mockUsers[0],
    },
    {
        id: 3,
        kode_transaksi: 'TRX-20260202-001',
        ruangan_id: 2,
        user_id: 1,
        type: 'masuk',
        tanggal: '2026-02-02',
        keterangan: 'Pengadaan Q1 2026',
        created_at: '2026-02-02T08:00:00Z',
        updated_at: '2026-02-02T08:00:00Z',
        ruangan: mockRuangans[1],
        user: mockUsers[0],
    },
];

// ==================== PAGINATED HELPERS ====================
export function createPaginatedData<T>(
    data: T[],
    page: number = 1,
    perPage: number = 15
): PaginatedData<T> {
    const total = data.length;
    const lastPage = Math.ceil(total / perPage);
    const from = (page - 1) * perPage;
    const to = Math.min(from + perPage, total);
    const paginatedItems = data.slice(from, to);

    return {
        data: paginatedItems,
        current_page: page,
        first_page_url: '?page=1',
        from: total > 0 ? from + 1 : null,
        last_page: lastPage,
        last_page_url: `?page=${lastPage}`,
        links: [
            { url: page > 1 ? `?page=${page - 1}` : null, label: '&laquo; Previous', active: false },
            ...Array.from({ length: lastPage }, (_, i) => ({
                url: `?page=${i + 1}`,
                label: String(i + 1),
                active: i + 1 === page,
            })),
            { url: page < lastPage ? `?page=${page + 1}` : null, label: 'Next &raquo;', active: false },
        ],
        next_page_url: page < lastPage ? `?page=${page + 1}` : null,
        path: '/barangs',
        per_page: perPage,
        prev_page_url: page > 1 ? `?page=${page - 1}` : null,
        to: total > 0 ? to : null,
        total,
    };
}

// ==================== MOCK PAGINATED DATA ====================
export const mockPaginatedBarangs = createPaginatedData(mockBarangs);
export const mockPaginatedRuangans = createPaginatedData(mockRuangans);
export const mockPaginatedTransactions = createPaginatedData(mockTransactions);

// ==================== MOCK DASHBOARD ====================
export const mockDashboardData: DashboardProps = {
    stats: {
        total_barang: 8,
        total_barang_low_stock: 3,
        total_ruangan: 6,
        total_transaksi_hari_ini: 2,
        total_transaksi_bulan_ini: 15,
    },
    chart_data: [
        { date: '2026-01-29', masuk: 0, keluar: 5 },
        { date: '2026-01-30', masuk: 2, keluar: 3 },
        { date: '2026-01-31', masuk: 0, keluar: 7 },
        { date: '2026-02-01', masuk: 1, keluar: 4 },
        { date: '2026-02-02', masuk: 3, keluar: 2 },
        { date: '2026-02-03', masuk: 0, keluar: 6 },
        { date: '2026-02-04', masuk: 0, keluar: 3 },
    ],
    barang_low_stock: mockBarangs.filter((b) => b.is_low_stock),
    transaksi_terbaru: mockTransactions.slice(0, 5),
    top_barang: [
        { barang: mockBarangs[0], total_keluar: 45 },
        { barang: mockBarangs[1], total_keluar: 38 },
        { barang: mockBarangs[5], total_keluar: 25 },
        { barang: mockBarangs[2], total_keluar: 20 },
        { barang: mockBarangs[7], total_keluar: 15 },
    ],
    top_ruangan: [
        { ruangan: mockRuangans[2], total_permintaan: 12 },
        { ruangan: mockRuangans[0], total_permintaan: 10 },
        { ruangan: mockRuangans[3], total_permintaan: 8 },
        { ruangan: mockRuangans[1], total_permintaan: 6 },
        { ruangan: mockRuangans[4], total_permintaan: 4 },
    ],
};
