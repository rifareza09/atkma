<?php

namespace App\Exports;

use App\Models\Barang;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class InventoryExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    protected bool $lowStock;

    public function __construct(bool $lowStock = false)
    {
        $this->lowStock = $lowStock;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $query = Barang::where('is_active', true);

        if ($this->lowStock) {
            $query->whereRaw('stok <= stok_minimum');
        }

        return $query->orderBy('nama')->get();
    }

    /**
     * Define column headings
     */
    public function headings(): array
    {
        return [
            'Kode Barang',
            'Nama Barang',
            'Satuan',
            'Stok',
            'Stok Minimum',
            'Status Stok',
            'Deskripsi',
        ];
    }

    /**
     * Map data for each row
     */
    public function map($barang): array
    {
        $statusStok = $barang->stok <= $barang->stok_minimum ? 'RENDAH' : 'AMAN';

        return [
            $barang->kode,
            $barang->nama,
            $barang->satuan,
            $barang->stok,
            $barang->stok_minimum,
            $statusStok,
            $barang->deskripsi,
        ];
    }

    /**
     * Apply styles to worksheet
     */
    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold header
            1 => [
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '1E3A5F']
                ],
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => 'FFFFFF']
                ],
            ],
        ];
    }

    /**
     * Sheet title
     */
    public function title(): string
    {
        return $this->lowStock ? 'Stok Rendah' : 'Inventaris Barang';
    }
}
