<?php

namespace App\Exports;

use App\Models\Barang;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Illuminate\Support\Collection;

class BarangTransactionHistoryExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    protected Barang $barang;
    protected array $filters;
    protected Collection $transactions;
    protected int $saldoAwal;
    protected int $totalMasuk;
    protected int $totalKeluar;
    protected int $saldoAkhir;

    public function __construct(Barang $barang, array $filters = [])
    {
        $this->barang = $barang;
        $this->filters = $filters;
        $this->loadTransactions();
    }

    protected function loadTransactions()
    {
        // Get ALL transaction data (both masuk and keluar)
        $query = $this->barang->transactionItems()->with(['transaction']);

        // Apply filters
        if (!empty($this->filters['start_date'])) {
            $query->whereHas('transaction', function ($q) {
                $q->whereDate('tanggal', '>=', $this->filters['start_date']);
            });
        }

        if (!empty($this->filters['end_date'])) {
            $query->whereHas('transaction', function ($q) {
                $q->whereDate('tanggal', '<=', $this->filters['end_date']);
            });
        }

        if (!empty($this->filters['month']) && !empty($this->filters['year'])) {
            $query->whereHas('transaction', function ($q) {
                $q->whereMonth('tanggal', $this->filters['month'])
                  ->whereYear('tanggal', $this->filters['year']);
            });
        } elseif (!empty($this->filters['year'])) {
            $query->whereHas('transaction', function ($q) {
                $q->whereYear('tanggal', $this->filters['year']);
            });
        }

        // Get transactions and sort by date
        $rawTransactions = $query->get()
            ->sortBy(function ($item) {
                return $item->transaction->tanggal;
            })
            ->values();

        // Calculate initial stock (saldo awal)
        $initialStock = $this->barang->stok;
        
        // Calculate backwards: subtract all transactions after filter period
        if (!empty($this->filters['start_date'])) {
            $afterPeriodQuery = $this->barang->transactionItems()->with(['transaction']);
            $afterPeriodQuery->whereHas('transaction', function ($q) {
                $q->whereDate('tanggal', '>=', $this->filters['start_date']);
            });
            
            $afterPeriodTransactions = $afterPeriodQuery->get();
            foreach ($afterPeriodTransactions as $item) {
                $itemType = $item->transaction->type instanceof \App\TransactionType
                    ? $item->transaction->type->value
                    : $item->transaction->type;
                if ($itemType === 'masuk') {
                    $initialStock -= $item->jumlah;
                } else {
                    $initialStock += $item->jumlah;
                }
            }
        }

        $this->saldoAwal = $initialStock;
        
        // Build transaction list with running balance
        $transactionList = collect();
        $saldo = $initialStock;
        $totalMasuk = 0;
        $totalKeluar = 0;

        foreach ($rawTransactions as $item) {
            $type = $item->transaction->type instanceof \App\TransactionType
                ? $item->transaction->type->value
                : $item->transaction->type;
            $masuk = $type === 'masuk' ? $item->jumlah : 0;
            $keluar = $type === 'keluar' ? $item->jumlah : 0;
            
            $saldo = $saldo + $masuk - $keluar;
            $totalMasuk += $masuk;
            $totalKeluar += $keluar;

            $transactionList->push([
                'tanggal' => $item->transaction->tanggal,
                'uraian' => $item->transaction->ruangan_nama,
                'masuk' => $masuk,
                'keluar' => $keluar,
                'saldo' => $saldo,
            ]);
        }

        $this->transactions = $transactionList;
        $this->totalMasuk = $totalMasuk;
        $this->totalKeluar = $totalKeluar;
        $this->saldoAkhir = $saldo;
    }

    public function collection()
    {
        $data = collect();
        
        // Add saldo awal row
        $data->push([
            'type' => 'saldo_awal',
            'tanggal' => null,
            'uraian' => 'Saldo Awal' . (!empty($this->filters['month']) ? ' ' . date('F Y', mktime(0, 0, 0, $this->filters['month'], 1, $this->filters['year'] ?? date('Y'))) : ''),
            'masuk' => $this->saldoAwal,
            'keluar' => 0,
            'saldo' => $this->saldoAwal,
        ]);
        
        // Add all transactions
        foreach ($this->transactions as $trans) {
            $data->push([
                'type' => 'transaction',
                'tanggal' => $trans['tanggal'],
                'uraian' => $trans['uraian'],
                'masuk' => $trans['masuk'],
                'keluar' => $trans['keluar'],
                'saldo' => $trans['saldo'],
            ]);
        }
        
        // Add total row
        $data->push([
            'type' => 'total',
            'tanggal' => null,
            'uraian' => 'TOTAL',
            'masuk' => $this->saldoAwal + $this->totalMasuk,
            'keluar' => $this->totalKeluar,
            'saldo' => $this->saldoAkhir,
        ]);
        
        return $data;
    }

    public function headings(): array
    {
        return [
            'No',
            'Tanggal',
            'Uraian',
            'Masuk (' . $this->barang->satuan . ')',
            'Keluar (' . $this->barang->satuan . ')',
            'Saldo (' . $this->barang->satuan . ')',
        ];
    }

    public function map($row): array
    {
        static $no = 0;
        
        if ($row['type'] === 'saldo_awal') {
            return [
                '',
                '',
                $row['uraian'],
                $row['masuk'],
                '',
                $row['saldo'],
            ];
        } elseif ($row['type'] === 'total') {
            return [
                '',
                '',
                $row['uraian'],
                $row['masuk'],
                $row['keluar'],
                $row['saldo'],
            ];
        } else {
            $no++;
            return [
                $no,
                \Carbon\Carbon::parse($row['tanggal'])->format('d/m/Y'),
                strtoupper($row['uraian']),
                $row['masuk'] > 0 ? $row['masuk'] : '',
                $row['keluar'] > 0 ? $row['keluar'] : '',
                $row['saldo'],
            ];
        }
    }

    public function styles(Worksheet $sheet)
    {
        $lastRow = $this->transactions->count() + 3; // +1 for header, +1 for saldo awal, +1 for total
        
        return [
            // Header row
            1 => [
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'E5E7EB']
                ]
            ],
            // Total row
            $lastRow => [
                'font' => ['bold' => true],
            ],
        ];
    }

    public function title(): string
    {
        return 'Kartu Stok ' . substr($this->barang->nama, 0, 20);
    }
}
