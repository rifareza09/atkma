<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Transaksi ATK</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 5px 0;
            font-size: 16px;
        }
        .header p {
            margin: 3px 0;
            font-size: 9px;
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table th {
            background-color: #1E3A5F;
            color: white;
            padding: 8px;
            text-align: left;
            font-weight: bold;
            font-size: 9px;
        }
        table td {
            padding: 6px 8px;
            border-bottom: 1px solid #ddd;
            font-size: 9px;
        }
        table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 8px;
            font-weight: bold;
            color: white;
        }
        .badge-pending { background-color: #3B82F6; }
        .badge-approved { background-color: #10B981; }
        .badge-rejected { background-color: #EF4444; }
        .badge-revised { background-color: #F59E0B; }
        .footer {
            margin-top: 30px;
            font-size: 8px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN TRANSAKSI ATK</h1>
        <p>Mahkamah Agung RI - Sistem Inventaris ATK</p>
        <p>Dicetak pada: {{ $generated_at }}</p>
    </div>

    @if(!empty($filters))
        <div style="margin-bottom: 15px; padding: 10px; background-color: #f0f0f0; border-radius: 4px; font-size: 9px;">
            <strong>Filter yang diterapkan:</strong><br>
            @if(!empty($filters['search']))
                Pencarian: {{ $filters['search'] }}<br>
            @endif
            @if(!empty($filters['from_date']))
                Dari Tanggal: {{ date('d/m/Y', strtotime($filters['from_date'])) }}<br>
            @endif
            @if(!empty($filters['to_date']))
                Sampai Tanggal: {{ date('d/m/Y', strtotime($filters['to_date'])) }}<br>
            @endif
            @if(!empty($filters['status']) && is_array($filters['status']))
                Status: {{ implode(', ', array_map('ucfirst', $filters['status'])) }}
            @endif
        </div>
    @endif

    <table>
        <thead>
            <tr>
                <th style="width: 10%;">Kode</th>
                <th style="width: 12%;">Tanggal</th>
                <th style="width: 20%;">Unit Kerja</th>
                <th style="width: 8%; text-align: center;">Jumlah Item</th>
                <th style="width: 12%; text-align: center;">Status</th>
                <th style="width: 18%;">Pemohon</th>
                <th style="width: 20%;">Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @forelse($transactions as $transaction)
                <tr>
                    <td>{{ $transaction->kode_transaksi }}</td>
                    <td>{{ $transaction->tanggal->format('d/m/Y') }}</td>
                    <td>{{ $transaction->ruangan_nama ?? '-' }}</td>
                    <td style="text-align: center; font-weight: bold;">{{ $transaction->items->count() }}</td>
                    <td style="text-align: center;">
                        @php
                            $statusClass = match($transaction->status) {
                                'pending' => 'badge-pending',
                                'approved' => 'badge-approved',
                                'rejected' => 'badge-rejected',
                                'revised' => 'badge-revised',
                                default => 'badge-pending'
                            };
                            $statusLabel = match($transaction->status) {
                                'pending' => 'Diproses',
                                'approved' => 'Diterima',
                                'rejected' => 'Ditolak',
                                'revised' => 'Direvisi',
                                default => $transaction->status
                            };
                        @endphp
                        <span class="badge {{ $statusClass }}">{{ $statusLabel }}</span>
                    </td>
                    <td>{{ $transaction->user->name ?? '-' }}</td>
                    <td>{{ Str::limit($transaction->keterangan ?? '-', 50) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" style="text-align: center; padding: 20px; color: #999;">
                        Tidak ada data transaksi
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        <p>Halaman 1 dari 1 | Total: {{ $transactions->count() }} transaksi</p>
        <p>© {{ date('Y') }} Mahkamah Agung RI - Sistem Inventaris ATK</p>
    </div>
</body>
</html>
