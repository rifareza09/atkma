<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Riwayat Permintaan Barang - Laporan Ruangan</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            margin: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 12px;
            page-break-after: avoid;
        }
        .header h2 {
            margin: 0 0 2px;
            font-size: 13px;
            text-transform: uppercase;
        }
        .header h3 {
            margin: 0 0 2px;
            font-size: 11px;
        }
        .header p {
            margin: 0;
            font-size: 9px;
            color: #555;
        }
        .ruangan-header {
            text-align: center;
            margin-top: 15px;
            margin-bottom: 8px;
            page-break-after: avoid;
        }
        .ruangan-header h3 {
            margin: 0 0 2px;
            font-size: 11px;
            color: #333;
        }
        .ruangan-header p {
            margin: 0;
            font-size: 9px;
            color: #666;
        }
        .info-table {
            width: 100%;
            border: none;
            margin-bottom: 10px;
        }
        .info-table td {
            padding: 2px 0;
            border: none;
            font-size: 10px;
        }
        .info-table td:first-child {
            font-weight: bold;
            width: 20%;
        }
        table.data {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }
        table.data th {
            background-color: #e8e8e8;
            padding: 6px 5px;
            text-align: left;
            font-weight: bold;
            font-size: 9px;
            border: 1px solid #555;
        }
        table.data td {
            padding: 5px 5px;
            border: 1px solid #aaa;
            font-size: 9px;
            vertical-align: top;
        }
        table.data td.center { text-align: center; }
        table.data td.right  { text-align: right; }
        table.data tr:nth-child(even) td { background-color: #f9f9f9; }
        .no-data {
            text-align: center;
            padding: 15px;
            color: #999;
            font-style: italic;
        }
        .footer {
            margin-top: 16px;
            font-size: 8px;
            color: #777;
            text-align: right;
        }
        .total-row td {
            font-weight: bold;
            background-color: #f0f0f0 !important;
            border-top: 2px solid #555;
        }
        .page-break {
            page-break-after: always;
        }
        .ruangan-section {
            page-break-inside: avoid;
        }
    </style>
</head>
<body>

    <div class="header">
        <h2>Mahkamah Agung RI — Sistem Inventaris ATK</h2>
        <h3>Riwayat Peminjaman Barang - Laporan Komprehensif</h3>
        <p>Dicetak: <strong>{{ $generated_at }}</strong></p>
    </div>

    @foreach ($ruanganData as $index => $data)
        <div class="ruangan-section">
            <div class="ruangan-header">
                <h3>{{ $data['ruangan']->nama }}</h3>
                <p>(Kode: {{ $data['ruangan']->kode }})</p>
            </div>

            <table class="info-table">
                <tr>
                    <td>Ruangan</td>
                    <td>: {{ $data['ruangan']->nama }} ({{ $data['ruangan']->kode }})</td>
                </tr>
                <tr>
                    <td>Total Transaksi</td>
                    <td>: {{ $data['transactions']->count() }} transaksi</td>
                </tr>
                <tr>
                    <td>Total Item</td>
                    <td>: {{ $data['transactions']->sum(fn($t) => $t->items->count()) }} item</td>
                </tr>
            </table>

            @if ($data['transactions']->isEmpty())
                <div class="no-data">
                    — Tidak ada data transaksi untuk ruangan ini —
                </div>
            @else
                <table class="data">
                    <thead>
                        <tr>
                            <th style="width:10%">No. Transaksi</th>
                            <th style="width:10%">Tanggal</th>
                            <th style="width:15%">Nama Peminta</th>
                            <th style="width:10%">Kode Barang</th>
                            <th>Nama Barang</th>
                            <th style="width:8%; text-align:right">Jumlah</th>
                            <th style="width:8%">Satuan</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php $totalItems = 0; @endphp
                        @foreach ($data['transactions'] as $trx)
                            @foreach ($trx->items as $itemIndex => $item)
                                @php $totalItems += $item->jumlah; @endphp
                                <tr>
                                    @if ($itemIndex === 0)
                                        <td rowspan="{{ $trx->items->count() ?: 1 }}" class="center">{{ $trx->kode_transaksi }}</td>
                                        <td rowspan="{{ $trx->items->count() ?: 1 }}" class="center">
                                            {{ $trx->tanggal?->format('d/m/Y') ?? '-' }}
                                        </td>
                                        <td rowspan="{{ $trx->items->count() ?: 1 }}">{{ $trx->nama_peminta ?? '-' }}</td>
                                    @endif
                                    <td class="center">{{ $item->barang?->kode ?? '-' }}</td>
                                    <td>{{ $item->barang?->nama ?? '-' }}</td>
                                    <td class="right">{{ $item->jumlah }}</td>
                                    <td class="center">{{ $item->barang?->satuan ?? '-' }}</td>
                                </tr>
                            @endforeach
                            @if ($trx->items->isEmpty())
                                <tr>
                                    <td class="center">{{ $trx->kode_transaksi }}</td>
                                    <td class="center">{{ $trx->tanggal?->format('d/m/Y') ?? '-' }}</td>
                                    <td>{{ $trx->nama_peminta ?? '-' }}</td>
                                    <td colspan="4" style="color:#999; font-style:italic;">Tidak ada item</td>
                                </tr>
                            @endif
                        @endforeach
                        <tr class="total-row">
                            <td colspan="5" class="right">Total Jumlah</td>
                            <td class="right">{{ $totalItems }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            @endif
        </div>

        @if ($index < count($ruanganData) - 1)
            <div class="page-break"></div>
        @endif
    @endforeach

    <div class="footer">
        Laporan Komprehensif Riwayat Peminjaman Barang — Sistem Inventaris ATK Mahkamah Agung RI
    </div>

</body>
</html>
