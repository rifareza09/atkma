<?php

namespace Database\Seeders;

use App\Models\Ruangan;
use Illuminate\Database\Seeder;

class RuanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ruangans = [
            ['kode' => 'RG-001', 'nama' => 'Ruang Hakim Agung', 'penanggung_jawab' => 'Dr. Ahmad, S.H., M.H.'],
            ['kode' => 'RG-002', 'nama' => 'Ruang Panitera', 'penanggung_jawab' => 'Budi Santoso, S.H.'],
            ['kode' => 'RG-003', 'nama' => 'Ruang Kepaniteraan Perdata', 'penanggung_jawab' => 'Siti Aminah, S.H.'],
            ['kode' => 'RG-004', 'nama' => 'Ruang Kepaniteraan Pidana', 'penanggung_jawab' => 'Andi Wijaya, S.H.'],
            ['kode' => 'RG-005', 'nama' => 'Ruang Administrasi', 'penanggung_jawab' => 'Dewi Lestari'],
            ['kode' => 'RG-006', 'nama' => 'Ruang IT', 'penanggung_jawab' => 'Rudi Hermawan, S.Kom.'],
            ['kode' => 'RG-007', 'nama' => 'Ruang Keuangan', 'penanggung_jawab' => 'Sri Wahyuni, S.E.'],
            ['kode' => 'RG-008', 'nama' => 'Ruang Kepegawaian', 'penanggung_jawab' => 'Muhammad Iqbal, S.Sos.'],
            ['kode' => 'RG-009', 'nama' => 'Ruang Arsip', 'penanggung_jawab' => 'Yanti Puspitasari'],
            ['kode' => 'RG-010', 'nama' => 'Ruang Humas', 'penanggung_jawab' => 'Doni Prasetyo, S.I.Kom.'],
        ];

        foreach ($ruangans as $ruangan) {
            Ruangan::create([
                'kode' => $ruangan['kode'],
                'nama' => $ruangan['nama'],
                'penanggung_jawab' => $ruangan['penanggung_jawab'],
                'deskripsi' => 'Unit kerja di lingkungan Mahkamah Agung',
                'is_active' => true,
            ]);
        }
    }
}
