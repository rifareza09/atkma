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
            ['kode' => 'ATK-001', 'nama' => 'Kertas HVS A4', 'satuan' => 'rim', 'stok' => 50, 'stok_minimum' => 10],
            ['kode' => 'ATK-002', 'nama' => 'Pulpen Hitam', 'satuan' => 'pcs', 'stok' => 200, 'stok_minimum' => 50],
            ['kode' => 'ATK-003', 'nama' => 'Pulpen Biru', 'satuan' => 'pcs', 'stok' => 180, 'stok_minimum' => 50],
            ['kode' => 'ATK-004', 'nama' => 'Pensil 2B', 'satuan' => 'pcs', 'stok' => 100, 'stok_minimum' => 30],
            ['kode' => 'ATK-005', 'nama' => 'Penghapus', 'satuan' => 'pcs', 'stok' => 80, 'stok_minimum' => 20],
            ['kode' => 'ATK-006', 'nama' => 'Penggaris 30cm', 'satuan' => 'pcs', 'stok' => 60, 'stok_minimum' => 15],
            ['kode' => 'ATK-007', 'nama' => 'Stapler', 'satuan' => 'pcs', 'stok' => 25, 'stok_minimum' => 10],
            ['kode' => 'ATK-008', 'nama' => 'Isi Stapler No.10', 'satuan' => 'box', 'stok' => 40, 'stok_minimum' => 15],
            ['kode' => 'ATK-009', 'nama' => 'Paper Clip', 'satuan' => 'box', 'stok' => 30, 'stok_minimum' => 10],
            ['kode' => 'ATK-010', 'nama' => 'Amplop Coklat', 'satuan' => 'pcs', 'stok' => 150, 'stok_minimum' => 40],
            ['kode' => 'ATK-011', 'nama' => 'Map Plastik', 'satuan' => 'pcs', 'stok' => 100, 'stok_minimum' => 25],
            ['kode' => 'ATK-012', 'nama' => 'Spidol Whiteboard', 'satuan' => 'pcs', 'stok' => 45, 'stok_minimum' => 15],
            ['kode' => 'ATK-013', 'nama' => 'Correction Pen', 'satuan' => 'pcs', 'stok' => 35, 'stok_minimum' => 10],
            ['kode' => 'ATK-014', 'nama' => 'Double Tape', 'satuan' => 'pcs', 'stok' => 20, 'stok_minimum' => 8],
            ['kode' => 'ATK-015', 'nama' => 'Lakban Bening', 'satuan' => 'pcs', 'stok' => 15, 'stok_minimum' => 5],
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
