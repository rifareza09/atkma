<?php

namespace App\Exports;

use App\Models\StockMovement;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StockMovementExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    protected array $filters;

    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $query = StockMovement::with(['barang', 'user', 'transaction']);

        // Apply filters
        if (isset($this->filters['barang_id']) && $this->filters['barang_id']) {
            $query->where('barang_id', $this->filters['barang_id']);
        }

        if (isset($this->filters['date_from']) && $this->filters['date_from']) {
            $query->whereDate('created_at', '>=', $this->filters['date_from']);
        }

        if (isset($this->filters['date_to']) && $this->filters['date_to']) {
            $query->whereDate('created_at', '<=', $this->filters['date_to']);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Define column headings
     */
    public function headings(): array
    {
        return [
            'Tanggal',
            'Kode Barang',
            'Nama Barang',
            'Jenis Pergerakan',
            'Jumlah',
            'Stok Sebelum',
            'Stok Sesudah',
            'Kode Transaksi',
            'Keterangan',
            'User',
        ];
    }

    /**
     * Map data for each row
     */
    public function map($movement): array
    {
        return [
            $movement->created_at->format('d/m/Y H:i'),
            $movement->barang->kode ?? '-',
            $movement->barang->nama ?? '-',
            strtoupper($movement->type->value),
            $movement->jumlah,
            $movement->stok_sebelum,
            $movement->stok_sesudah,
            $movement->transaction->kode_transaksi ?? '-',
            $movement->keterangan ?? '-',
            $movement->user->name ?? '-',
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
        return 'Riwayat Stock Movement';
    }
}
