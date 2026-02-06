<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            font-size: 9px;
            line-height: 1.3;
        }
        .header {
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 3px solid #1E3A5F;
        }
        .header h1 {
            color: #1E3A5F;
            font-size: 16px;
            margin-bottom: 5px;
        }
        .header h2 {
            color: #666;
            font-size: 12px;
            font-weight: normal;
        }
        .filter-info {
            background-color: #f5f5f5;
            padding: 10px;
            margin-bottom: 15px;
            font-size: 9px;
        }
        .filter-info table {
            width: 100%;
        }
        .filter-info td {
            padding: 3px 5px;
        }
        .filter-info td:first-child {
            width: 120px;
            font-weight: bold;
            color: #555;
        }
        table.transactions {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        table.transactions th {
            background-color: #1E3A5F;
            color: white;
            padding: 6px 4px;
            text-align: left;
            font-size: 8px;
            font-weight: bold;
            border: 1px solid #fff;
        }
        table.transactions td {
            padding: 4px;
            border: 1px solid #ddd;
            font-size: 8px;
            vertical-align: top;
        }
        table.transactions tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .text-center {
            text-align: center;
        }
        .text-right {
            text-align: right;
        }
        .badge {
            padding: 2px 5px;
            border-radius: 2px;
            font-size: 7px;
            font-weight: bold;
            display: inline-block;
        }
        .badge-in {
            background-color: #D4EDDA;
            color: #155724;
        }
        .badge-out {
            background-color: #F8D7DA;
            color: #721C24;
        }
        .items-list {
            font-size: 7px;
            margin: 0;
            padding-left: 12px;
        }
        .items-list li {
            margin: 2px 0;
        }
        .summary {
            margin-top: 20px;
            padding: 10px;
            background-color: #E6F2FF;
            border-left: 4px solid #1E3A5F;
        }
        .summary table {
            width: 100%;
            font-size: 9px;
        }
        .summary td {
            padding: 3px 8px;
        }
        .summary td:first-child {
            font-weight: bold;
            width: 200px;
        }
        .footer {
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            text-align: right;
            font-size: 8px;
            color: #666;
        }
        .signature {
            margin-top: 30px;
            text-align: right;
        }
        .signature-line {
            display: inline-block;
            margin-top: 40px;
            border-top: 1px solid #000;
            padding-top: 5px;
            min-width: 180px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>MAHKAMAH AGUNG REPUBLIK INDONESIA</h1>
        <h2>{{ $title }}</h2>
    </div>

    <div class="filter-info">
        <table>
            <tr>
                <td>Jenis Transaksi</td>
                <td>: 
                    @if($filters['type'])
                        <strong>{{ strtoupper($filters['type']) }}</strong>
                    @else
                        Semua
                    @endif
                </td>
                <td>Periode</td>
                <td>: 
                    @if($filters['date_from'] && $filters['date_to'])
                        {{ \Carbon\Carbon::parse($filters['date_from'])->format('d/m/Y') }} - {{ \Carbon\Carbon::parse($filters['date_to'])->format('d/m/Y') }}
                    @elseif($filters['date_from'])
                        Dari {{ \Carbon\Carbon::parse($filters['date_from'])->format('d/m/Y') }}
                    @elseif($filters['date_to'])
                        Sampai {{ \Carbon\Carbon::parse($filters['date_to'])->format('d/m/Y') }}
                    @else
                        Semua
                    @endif
                </td>
            </tr>
            <tr>
                <td>Ruangan</td>
                <td>: {{ $filters['ruangan'] ?? 'Semua Ruangan' }}</td>
                <td>Dicetak</td>
                <td>: {{ $printed_at }}</td>
            </tr>
        </table>
    </div>

    <table class="transactions">
        <thead>
            <tr>
                <th width="3%">No</th>
                <th width="12%">Kode Transaksi</th>
                <th width="8%">Tanggal</th>
                <th width="7%">Jenis</th>
                <th width="15%">Ruangan</th>
                <th width="13%">Penanggung Jawab</th>
                <th width="25%">Detail Item</th>
                <th width="10%">User</th>
                <th width="7%">Total Item</th>
            </tr>
        </thead>
        <tbody>
            @forelse($transactions as $index => $transaction)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td><strong>{{ $transaction->kode_transaksi }}</strong></td>
                <td class="text-center">{{ $transaction->tanggal->format('d/m/Y') }}</td>
                <td class="text-center">
                    @if($transaction->type->value === 'masuk')
                        <span class="badge badge-in">MASUK</span>
                    @else
                        <span class="badge badge-out">KELUAR</span>
                    @endif
                </td>
                <td>{{ $transaction->ruangan->nama ?? '-' }}</td>
                <td>{{ $transaction->ruangan->penanggung_jawab ?? '-' }}</td>
                <td>
                    <ul class="items-list">
                        @foreach($transaction->items as $item)
                        <li>
                            <strong>{{ $item->barang->nama }}</strong>: 
                            {{ number_format($item->jumlah) }} {{ $item->barang->satuan }}
                        </li>
                        @endforeach
                    </ul>
                    @if($transaction->keterangan)
                    <div style="margin-top: 3px; font-style: italic; color: #666;">
                        Ket: {{ Str::limit($transaction->keterangan, 50) }}
                    </div>
                    @endif
                </td>
                <td>{{ $transaction->user->name ?? '-' }}</td>
                <td class="text-center"><strong>{{ $transaction->items->count() }}</strong></td>
            </tr>
            @empty
            <tr>
                <td colspan="9" class="text-center" style="padding: 20px; color: #999;">
                    Tidak ada data transaksi
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="summary">
        <table>
            <tr>
                <td>Total Transaksi</td>
                <td>: <strong>{{ $transactions->count() }}</strong> transaksi</td>
            </tr>
            @php
                $totalMasuk = $transactions->where('type.value', 'masuk')->count();
                $totalKeluar = $transactions->where('type.value', 'keluar')->count();
            @endphp
            <tr>
                <td>Total Barang Masuk</td>
                <td>: <strong>{{ $totalMasuk }}</strong> transaksi</td>
            </tr>
            <tr>
                <td>Total Barang Keluar</td>
                <td>: <strong>{{ $totalKeluar }}</strong> transaksi</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        <p><em>Dokumen ini dicetak secara otomatis oleh sistem</em></p>
    </div>

    <div class="signature">
        <p>Mengetahui,</p>
        <p>Penanggung Jawab ATK</p>
        <div class="signature-line">
            <strong>(.............................)</strong>
        </div>
    </div>
</body>
</html>
