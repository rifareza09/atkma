<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kartu Stok - {{ $barang->nama }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            margin: 20px;
        }
        .item-info {
            margin-bottom: 10px;
        }
        .item-info table {
            width: 100%;
            border: none;
        }
        .item-info td {
            padding: 2px 0;
            border: none;
            font-size: 10px;
        }
        .item-info td:first-child {
            font-weight: bold;
            width: 25%;
        }
        table.stock-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        table.stock-table th {
            background-color: #f0f0f0;
            color: #000;
            padding: 8px 6px;
            text-align: center;
            font-weight: bold;
            font-size: 9px;
            border: 1px solid #000;
        }
        table.stock-table td {
            padding: 6px;
            border: 1px solid #000;
            font-size: 9px;
        }
        table.stock-table td.center {
            text-align: center;
        }
        table.stock-table td.right {
            text-align: right;
        }
        .footer {
            margin-top: 20px;
            font-size: 8px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="item-info">
        <table>
            <tr>
                <td>NAMA BARANG</td>
                <td>: {{ strtoupper($barang->nama) }}</td>
            </tr>
            <tr>
                <td>PERIODE</td>
                <td>: {{ $period_label }}</td>
            </tr>
            <tr>
                <td>BULAN</td>
                <td>: {{ !empty($filters['month']) ? strtoupper(date('F', mktime(0, 0, 0, $filters['month'], 1))) : '-' }}</td>
            </tr>
        </table>
    </div>

    <table class="stock-table">
        <thead>
            <tr>
                <th rowspan="2" style="width: 5%;">NO</th>
                <th rowspan="2" style="width: 12%;">TANGGAL</th>
                <th rowspan="2" style="width: 33%;">URAIAN</th>
                <th rowspan="2" style="width: 12%;">MASUK</th>
                <th rowspan="2" style="width: 12%;">KELUAR</th>
                <th colspan="2" style="width: 26%;">PCS</th>
            </tr>
            <tr>
                <th style="width: 13%;">KET</th>
                <th style="width: 13%;">SALDO</th>
            </tr>
        </thead>
        <tbody>
            <!-- Saldo Awal -->
            <tr>
                <td class="center"></td>
                <td class="center"></td>
                <td>Saldo Awal {{ !empty($filters['month']) ? date('F Y', mktime(0, 0, 0, $filters['month'], 1, $filters['year'] ?? date('Y'))) : '' }}</td>
                <td class="center">{{ $saldo_awal }}</td>
                <td class="center"></td>
                <td class="center"></td>
                <td class="center">{{ $saldo_awal }}</td>
            </tr>

            <!-- Transactions -->
            @php $no = 1; @endphp
            @foreach($transactions as $trans)
            <tr>
                <td class="center">{{ $no++ }}</td>
                <td class="center">{{ date('d F Y', strtotime($trans['tanggal'])) }}</td>
                <td>{{ strtoupper($trans['uraian']) }}</td>
                <td class="center">{{ $trans['masuk'] > 0 ? $trans['masuk'] : '' }}</td>
                <td class="center">{{ $trans['keluar'] > 0 ? $trans['keluar'] : '' }}</td>
                <td class="center"></td>
                <td class="center">{{ $trans['saldo'] }}</td>
            </tr>
            @endforeach

            @if(count($transactions) === 0)
            <tr>
                <td colspan="7" style="text-align: center; padding: 20px; font-style: italic; color: #666;">
                    Tidak ada transaksi untuk periode yang dipilih
                </td>
            </tr>
            @endif

            <!-- Total -->
            <tr style="font-weight: bold;">
                <td colspan="3" class="center">TOTAL</td>
                <td class="center">{{ $saldo_awal + collect($transactions)->sum('masuk') }}</td>
                <td class="center">{{ collect($transactions)->sum('keluar') }}</td>
                <td class="center"></td>
                <td class="center">{{ count($transactions) > 0 ? end($transactions)['saldo'] : $saldo_awal }}</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>Dicetak pada: {{ $generated_at }}</p>
    </div>
</body>
</html>
