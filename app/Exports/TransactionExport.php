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
        $query = Transaction::with(['user', 'items.barang']);

        // Apply filters
        if (!empty($this->filters['search'])) {
            $query->where('kode_transaksi', 'like', '%' . $this->filters['search'] . '%');
        }

        if (isset($this->filters['type']) && $this->filters['type']) {
            $query->where('type', $this->filters['type']);
        }

        if (!empty($this->filters['ruangan_id']) && $this->filters['ruangan_id'] !== 'all') {
            $ruangan = \App\Models\Ruangan::find($this->filters['ruangan_id']);
            if ($ruangan) {
                $query->where('ruangan_nama', $ruangan->nama);
            }
        }

        if (!empty($this->filters['status']) && is_array($this->filters['status'])) {
            $query->whereIn('status', $this->filters['status']);
        }

        if (isset($this->filters['from_date']) && $this->filters['from_date']) {
            $query->whereDate('tanggal', '>=', $this->filters['from_date']);
        }

        if (isset($this->filters['to_date']) && $this->filters['to_date']) {
            $query->whereDate('tanggal', '<=', $this->filters['to_date']);
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
            'Status',
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
        $statusLabel = match($transaction->status) {
            'pending' => 'Diproses',
            'approved' => 'Diterima',
            'rejected' => 'Ditolak',
            'revised' => 'Direvisi',
            default => $transaction->status
        };

        return [
            $transaction->kode_transaksi,
            $transaction->tanggal->format('d/m/Y'),
            strtoupper($transaction->type->value),
            $transaction->ruangan_nama ?? '-',
            $statusLabel,
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
