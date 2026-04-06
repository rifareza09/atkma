<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>History Transaksi</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            margin: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 14px;
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
        .header p { margin: 0; font-size: 9px; color: #555; }
        .meta-table {
            width: 100%;
            border: none;
            margin-bottom: 10px;
        }
        .meta-table td {
            padding: 2px 0;
            border: none;
            font-size: 10px;
        }
        .meta-table td:first-child {
            font-weight: bold;
            width: 18%;
        }
        table.data {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            page-break-inside: auto;
        }
        table.data tbody tr {
            page-break-inside: auto;
            page-break-after: auto;
        }
        table.data tbody tr.header-row {
            page-break-inside: avoid;
            page-break-after: avoid;
        }
        table.data th {
            background-color: #dce8ff;
            padding: 6px 5px;
            text-align: left;
            font-weight: bold;
            font-size: 9px;
            border: 1px solid #555;
        }
        table.data td {
            padding: 5px 5px;
            border: 1px solid #bbb;
            font-size: 9px;
            vertical-align: top;
            background-color: #ffffff;
        }
        table.data td.center { text-align: center; }
        table.data td.right  { text-align: right; }
        table.data tr:nth-child(even) td { background-color: #ffffff; }
        .total-row td {
            font-weight: bold;
            background-color: #eef2ff !important;
            border-top: 2px solid #555;
        }
        .footer {
            margin-top: 16px;
            font-size: 8px;
            color: #777;
            text-align: right;
        }
        .badge-approved { color: #166534; font-weight: bold; }
        .badge-pending  { color: #92400e; font-weight: bold; }
        .badge-rejected { color: #991b1b; font-weight: bold; }
    </style>
</head>
<body>

    <div class="header">
        <h2>Mahkamah Agung RI — Sistem Inventaris ATK</h2>
        <h3>History Transaksi Barang Keluar</h3>
    </div>

    <table class="meta-table">
        <tr>
            <td>Periode</td>
            <td>: {{ $period_label }}</td>
        </tr>
        @if($ruangan_nama)
        <tr>
            <td>Ruangan</td>
            <td>: {{ $ruangan_nama }}</td>
        </tr>
        @endif
        <tr>
            <td>Total Transaksi</td>
            <td>: {{ $transactions->count() }} transaksi</td>
        </tr>
        <tr>
            <td>Dicetak</td>
            <td>: {{ $generated_at }}</td>
        </tr>
    </table>

    @if($transactions->isEmpty())
        <p style="text-align:center; color:#999; margin-top:30px;">Tidak ada data transaksi pada periode ini.</p>
    @else
        <table class="data">
                @php 
                    $grandTotal = 0;
                    $ruanganCounter = 0;
                    $itemCounterByTransaction = [];
                    $isFirstTransaction = true;
                @endphp
                @foreach($transactions as $trxIdx => $trx)
                    <tbody>
                    @if($isFirstTransaction)
                        <tr class="header-row">
                            <th style="width:5%; background-color: #dce8ff; padding: 6px 5px; text-align: left; font-weight: bold; font-size: 9px; border: 1px solid #555;">No</th>
                            <th style="width:15%; background-color: #dce8ff; padding: 6px 5px; text-align: left; font-weight: bold; font-size: 9px; border: 1px solid #555;">Ruangan / Unit Kerja</th>
                            <th style="width:11%; background-color: #dce8ff; padding: 6px 5px; text-align: left; font-weight: bold; font-size: 9px; border: 1px solid #555;">No. Transaksi</th>
                            <th style="width:9%; background-color: #dce8ff; padding: 6px 5px; text-align: left; font-weight: bold; font-size: 9px; border: 1px solid #555;">Tanggal</th>
                            <th style="width:14%; background-color: #dce8ff; padding: 6px 5px; text-align: left; font-weight: bold; font-size: 9px; border: 1px solid #555;">Nama Peminta</th>
                            <th style="width:9%; background-color: #dce8ff; padding: 6px 5px; text-align: left; font-weight: bold; font-size: 9px; border: 1px solid #555;">Kode Barang</th>
                            <th style="background-color: #dce8ff; padding: 6px 5px; text-align: left; font-weight: bold; font-size: 9px; border: 1px solid #555;">Nama Barang</th>
                            <th style="width:7%; background-color: #dce8ff; padding: 6px 5px; text-align: right; font-weight: bold; font-size: 9px; border: 1px solid #555;">Jumlah</th>
                            <th style="width:7%; background-color: #dce8ff; padding: 6px 5px; text-align: left; font-weight: bold; font-size: 9px; border: 1px solid #555;">Satuan</th>
                        </tr>
                        @php $isFirstTransaction = false; @endphp
                    @endif
                    @php 
                        $ruanganCounter++;
                        $itemCount = $trx->items->count() ?: 1;
                        $itemCounterByTransaction[$trxIdx] = 0;
                    @endphp
                    @foreach($trx->items as $idx => $item)
                        @php 
                            $grandTotal += $item->jumlah;
                            $itemCounterByTransaction[$trxIdx]++;
                            $itemNumber = $itemCounterByTransaction[$trxIdx];
                        @endphp
                        <tr>
                            @if($idx === 0)
                                <td rowspan="{{ $itemCount }}" class="center"><strong>{{ $ruanganCounter }}</strong></td>
                                <td rowspan="{{ $itemCount }}">{{ $trx->ruangan_nama ?? '-' }}</td>
                                <td rowspan="{{ $itemCount }}" class="center">{{ $trx->kode_transaksi }}</td>
                                <td rowspan="{{ $itemCount }}" class="center">{{ $trx->tanggal?->format('d/m/Y') }}</td>
                                <td rowspan="{{ $itemCount }}">{{ $trx->nama_peminta ?? '-' }}</td>
                            @endif
                            <td class="center">{{ $item->barang?->kode ?? '-' }}</td>
                            <td><strong>{{ $itemNumber }}.</strong> {{ $item->barang?->nama ?? '-' }}</td>
                            <td class="right">{{ $item->jumlah }}</td>
                            <td class="center">{{ $item->barang?->satuan ?? '-' }}</td>
                        </tr>
                    @endforeach
                    @if($trx->items->isEmpty())
                        <tr>
                            <td class="center"><strong>{{ $ruanganCounter }}</strong></td>
                            <td>{{ $trx->ruangan_nama ?? '-' }}</td>
                            <td class="center">{{ $trx->kode_transaksi }}</td>
                            <td class="center">{{ $trx->tanggal?->format('d/m/Y') }}</td>
                            <td>{{ $trx->nama_peminta ?? '-' }}</td>
                            <td colspan="4" style="color:#999; font-style:italic;">Tidak ada item</td>
                        </tr>
                    @endif
                    </tbody>
                @endforeach
                <tbody>
                <tr class="total-row">
                    <td colspan="7" class="right">Total Jumlah</td>
                    <td class="right">{{ $grandTotal }}</td>
                    <td></td>
                </tr>
                </tbody>
        </table>
    @endif

    <div class="footer">
        Dicetak pada {{ $generated_at }} &bull; Sistem Inventaris ATK Mahkamah Agung RI
    </div>

</body>
</html>
