<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $barangs = [
            ['kode' => 'ATK-001', 'nama' => 'Amplop 110',                         'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-002', 'nama' => 'Amplop 90',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-003', 'nama' => 'Amplop Dinas Besar',                 'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-004', 'nama' => 'Amplop Dinas Kecil',                 'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-005', 'nama' => 'Amplop Dinas Sedang',                'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-006', 'nama' => 'Bak Spon',                           'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-007', 'nama' => 'Benang Rami',                        'satuan' => 'gulung','stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-008', 'nama' => 'Binder Clip 107',                    'satuan' => 'dos',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-009', 'nama' => 'Binder Clip 111',                    'satuan' => 'dos',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-010', 'nama' => 'Binder Clip 155',                    'satuan' => 'dos',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-011', 'nama' => 'Binder Clip 260',                    'satuan' => 'dos',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-012', 'nama' => 'Box File Bantex',                    'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-013', 'nama' => 'Buku Agenda 100',                    'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-014', 'nama' => 'Buku Agenda 500',                    'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-015', 'nama' => 'Buku Ekspedisi',                     'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-016', 'nama' => 'Buku Kuitansi',                      'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-017', 'nama' => 'CDR',                                'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-018', 'nama' => 'Cutter Kenko L-300 Kecil',           'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-019', 'nama' => 'Cutter Kenko L-500 Besar',           'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-020', 'nama' => 'Gunting Joyko 838 Kecil',            'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-021', 'nama' => 'Isi Cutter L-100 Kecil',             'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-022', 'nama' => 'Isi Cutter L-150 Besar',             'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-023', 'nama' => 'Isi Pentel',                         'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-024', 'nama' => 'Isi Strapless 23/10 (1210 FA-H/ML)','satuan' => 'dos',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-025', 'nama' => 'Isi Strapless 23/17',                'satuan' => 'dos',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-026', 'nama' => 'Isi Strapless 24/6 NO.3-1M Besar',  'satuan' => 'dos',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-027', 'nama' => 'Isi Strapless NO.10-1M Kecil',       'satuan' => 'dos',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-028', 'nama' => 'Isolatif Panfix',                    'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-029', 'nama' => 'Kamper',                             'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-030', 'nama' => 'Kertas A3',                          'satuan' => 'rim',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-031', 'nama' => 'Kertas A4',                          'satuan' => 'rim',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-032', 'nama' => 'Kertas F4',                          'satuan' => 'rim',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-033', 'nama' => 'Kertas Post It',                     'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-034', 'nama' => 'Kertas Samson',                      'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-035', 'nama' => 'Lakban Bening',                      'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-036', 'nama' => 'Lakban Coklat',                      'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-037', 'nama' => 'Lakban Hitam',                       'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-038', 'nama' => 'Lem Fox',                            'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-039', 'nama' => 'Lem Povinal Kecil',                  'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-040', 'nama' => 'Map Mari',                           'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-041', 'nama' => 'Ordener 401',                        'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-042', 'nama' => 'Paper Clip',                         'satuan' => 'dos',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-043', 'nama' => 'Pembolong Besar',                    'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-044', 'nama' => 'Pembolong Kecil',                    'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-045', 'nama' => 'Penggaris Besi',                     'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-046', 'nama' => 'Penghapus Steadtler',                'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-047', 'nama' => 'Pensil',                             'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-048', 'nama' => 'Pulpen Balliner',                    'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-049', 'nama' => 'Pulpen Boxy',                        'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-050', 'nama' => 'Pulpen Faster',                      'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-051', 'nama' => 'Pulpen Pentel',                      'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-052', 'nama' => 'Pulpen Tinta',                       'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-053', 'nama' => 'Rautan',                             'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-054', 'nama' => 'Remover',                            'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-055', 'nama' => 'Spidol A500',                        'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-056', 'nama' => 'Spidol A70',                         'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-057', 'nama' => 'Spidol Kecil',                       'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-058', 'nama' => 'Spring File',                        'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 10],
            ['kode' => 'ATK-059', 'nama' => 'Stabilo',                            'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-060', 'nama' => 'Stapler HD 10 Kecil',                'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-061', 'nama' => 'Stapler HD 50 Besar',                'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-062', 'nama' => 'Tali Rafia',                         'satuan' => 'gulung','stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-063', 'nama' => 'Tinta Colop',                        'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-064', 'nama' => 'Tipe-Ex Pentel',                     'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-065', 'nama' => 'Toner 12A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-066', 'nama' => 'Toner 36A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-067', 'nama' => 'Toner 78A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-068', 'nama' => 'Toner 85A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-069', 'nama' => 'Toner 80A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-070', 'nama' => 'Toner 55A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-071', 'nama' => 'Isi Pilot',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-072', 'nama' => 'Lem Stik UHU',                       'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-073', 'nama' => 'Pensil Merah Biru',                  'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
            ['kode' => 'ATK-074', 'nama' => 'Pita Kaset',                         'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-075', 'nama' => 'Toner 26A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-076', 'nama' => 'Flashdisk 16GB',                     'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 3],
            ['kode' => 'ATK-077', 'nama' => 'Toner 83A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-078', 'nama' => 'Toner 30X',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-079', 'nama' => 'Toner 30A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-080', 'nama' => 'Toner 32A',                          'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-081', 'nama' => 'Toner CF 350',                       'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 2],
            ['kode' => 'ATK-082', 'nama' => 'Pulpen Uniball Signo',               'satuan' => 'pcs',   'stok' => 0, 'stok_minimum' => 5],
        ];

        foreach ($barangs as $barang) {
            Barang::create([
                'kode' => $barang['kode'],
                'nama' => $barang['nama'],
                'satuan' => $barang['satuan'],
                'stok' => $barang['stok'],
                'stok_minimum' => $barang['stok_minimum'],
                'deskripsi' => 'Barang ATK untuk kebutuhan kantor Mahkamah Agung',
                'is_active' => true,
            ]);
        }
    }
}
