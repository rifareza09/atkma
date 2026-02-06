<?php

namespace App\Exports;

use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TransactionExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
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
        $query = Transaction::with(['ruangan', 'user', 'items.barang']);

        // Apply filters
        if (isset($this->filters['type']) && $this->filters['type']) {
            $query->where('type', $this->filters['type']);
        }

        if (isset($this->filters['ruangan_id']) && $this->filters['ruangan_id']) {
            $query->where('ruangan_id', $this->filters['ruangan_id']);
        }

        if (isset($this->filters['date_from']) && $this->filters['date_from']) {
            $query->whereDate('tanggal', '>=', $this->filters['date_from']);
        }

        if (isset($this->filters['date_to']) && $this->filters['date_to']) {
            $query->whereDate('tanggal', '<=', $this->filters['date_to']);
        }

        return $query->orderBy('tanggal', 'desc')->get();
    }

    /**
     * Define column headings
     */
    public function headings(): array
    {
        return [
            'Kode Transaksi',
            'Tanggal',
            'Jenis',
            'Ruangan',
            'Penanggung Jawab',
            'Total Item',
            'Keterangan',
            'Dibuat Oleh',
        ];
    }

    /**
     * Map data for each row
     */
    public function map($transaction): array
    {
        return [
            $transaction->kode_transaksi,
            $transaction->tanggal->format('d/m/Y'),
            strtoupper($transaction->type->value),
            $transaction->ruangan->nama ?? '-',
            $transaction->ruangan->penanggung_jawab ?? '-',
            $transaction->items->count(),
            $transaction->keterangan ?? '-',
            $transaction->user->name ?? '-',
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
        return 'Laporan Transaksi';
    }
}
