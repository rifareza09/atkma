<?php

namespace App\Exports;

use App\Models\Ruangan;
use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class HistoryExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    protected array $filters;

    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        $query = Transaction::with(['items.barang'])
            ->where('type', 'keluar');

        if (!empty($this->filters['tanggal'])) {
            $query->whereDate('tanggal', $this->filters['tanggal']);
        } else {
            if (!empty($this->filters['tahun'])) {
                $query->whereYear('tanggal', $this->filters['tahun']);
            }
            if (!empty($this->filters['bulan'])) {
                $query->whereMonth('tanggal', $this->filters['bulan']);
            }
        }

        if (!empty($this->filters['ruangan_id']) && $this->filters['ruangan_id'] !== 'all') {
            $ruangan = Ruangan::find($this->filters['ruangan_id']);
            if ($ruangan) {
                $query->where('ruangan_nama', $ruangan->nama);
            }
        }

        // Flatten: one row per item
        $rows = collect();
        foreach ($query->orderBy('tanggal', 'desc')->get() as $trx) {
            if ($trx->items->isEmpty()) {
                $rows->push((object)[
                    'kode_transaksi' => $trx->kode_transaksi,
                    'tanggal'        => $trx->tanggal,
                    'ruangan_nama'   => $trx->ruangan_nama ?? '-',
                    'nama_peminta'   => $trx->nama_peminta ?? '-',
                    'kode_barang'    => '-',
                    'nama_barang'    => '-',
                    'jumlah'         => 0,
                    'satuan'         => '-',
                ]);
            } else {
                foreach ($trx->items as $item) {
                    $rows->push((object)[
                        'kode_transaksi' => $trx->kode_transaksi,
                        'tanggal'        => $trx->tanggal,
                        'ruangan_nama'   => $trx->ruangan_nama ?? '-',
                        'nama_peminta'   => $trx->nama_peminta ?? '-',
                        'kode_barang'    => $item->barang?->kode ?? '-',
                        'nama_barang'    => $item->barang?->nama ?? '-',
                        'jumlah'         => $item->jumlah,
                        'satuan'         => $item->barang?->satuan ?? '-',
                    ]);
                }
            }
        }

        return $rows;
    }

    public function headings(): array
    {
        return [
            'No. Transaksi',
            'Tanggal',
            'Ruangan / Unit Kerja',
            'Nama Peminta',
            'Kode Barang',
            'Nama Barang',
            'Jumlah',
            'Satuan',
        ];
    }

    public function map($row): array
    {
        return [
            $row->kode_transaksi,
            $row->tanggal ? \Carbon\Carbon::parse($row->tanggal)->format('d/m/Y') : '-',
            $row->ruangan_nama,
            $row->nama_peminta,
            $row->kode_barang,
            $row->nama_barang,
            $row->jumlah,
            $row->satuan,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
                'fill' => [
                    'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '1D4ED8'],
                ],
            ],
        ];
    }

    public function title(): string
    {
        return 'History Transaksi';
    }
}
