<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kartu Stok - {{ $barang->nama }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            font-size: 10px;
            line-height: 1.3;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid #1E3A5F;
        }
        .header h1 {
            color: #1E3A5F;
            font-size: 16px;
            margin-bottom: 5px;
        }
        .header h2 {
            color: #666;
            font-size: 13px;
            font-weight: normal;
        }
        .barang-info {
            background-color: #f5f5f5;
            padding: 15px;
            margin-bottom: 20px;
            border-left: 4px solid #1E3A5F;
        }
        .barang-info table {
            width: 100%;
        }
        .barang-info td {
            padding: 4px 8px;
            font-size: 10px;
        }
        .barang-info td:first-child {
            width: 150px;
            font-weight: bold;
            color: #555;
        }
        .period-info {
            text-align: center;
            margin-bottom: 15px;
            font-size: 10px;
            color: #666;
        }
        table.kartu-stok {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table.kartu-stok th {
            background-color: #1E3A5F;
            color: white;
            padding: 8px 5px;
            text-align: center;
            font-size: 9px;
            font-weight: bold;
            border: 1px solid #fff;
        }
        table.kartu-stok td {
            padding: 5px;
            border: 1px solid #ddd;
            font-size: 9px;
        }
        table.kartu-stok tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .text-center {
            text-align: center;
        }
        .text-right {
            text-align: right;
        }
        .badge {
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 8px;
            font-weight: bold;
            display: inline-block;
        }
        .badge-in {
            background-color: #EFE;
            color: #060;
        }
        .badge-out {
            background-color: #FEE;
            color: #C00;
        }
        .badge-adjust {
            background-color: #FFE;
            color: #660;
        }
        .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            font-size: 9px;
            color: #666;
        }
        .signature-container {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }
        .signature-box {
            width: 30%;
            text-align: center;
        }
        .signature-line {
            margin-top: 50px;
            border-top: 1px solid #000;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>MAHKAMAH AGUNG REPUBLIK INDONESIA</h1>
        <h2>KARTU STOK BARANG</h2>
    </div>

    <div class="barang-info">
        <table>
            <tr>
                <td>Kode Barang</td>
                <td>: <strong>{{ $barang->kode }}</strong></td>
                <td>Stok Minimum</td>
                <td>: <strong>{{ number_format($barang->stok_minimum) }} {{ $barang->satuan }}</strong></td>
            </tr>
            <tr>
                <td>Nama Barang</td>
                <td>: <strong>{{ $barang->nama }}</strong></td>
                <td>Stok Saat Ini</td>
                <td>: <strong style="font-size: 12px; color: #1E3A5F;">{{ number_format($barang->stok) }} {{ $barang->satuan }}</strong></td>
            </tr>
            <tr>
                <td>Satuan</td>
                <td>: {{ $barang->satuan }}</td>
                <td>Dicetak</td>
                <td>: {{ $printed_at }}</td>
            </tr>
        </table>
    </div>

    @if($date_from || $date_to)
    <div class="period-info">
        <strong>Periode:</strong>
        @if($date_from && $date_to)
            {{ \Carbon\Carbon::parse($date_from)->format('d/m/Y') }} s/d {{ \Carbon\Carbon::parse($date_to)->format('d/m/Y') }}
        @elseif($date_from)
            Dari {{ \Carbon\Carbon::parse($date_from)->format('d/m/Y') }}
        @else
            Sampai {{ \Carbon\Carbon::parse($date_to)->format('d/m/Y') }}
        @endif
    </div>
    @endif

    <table class="kartu-stok">
        <thead>
            <tr>
                <th rowspan="2" width="3%">No</th>
                <th rowspan="2" width="12%">Tanggal</th>
                <th rowspan="2" width="15%">Kode Transaksi</th>
                <th rowspan="2" width="15%">Keterangan</th>
                <th colspan="3" width="24%">Mutasi</th>
                <th rowspan="2" width="10%">Saldo</th>
                <th rowspan="2" width="13%">User</th>
            </tr>
            <tr>
                <th width="8%">Masuk</th>
                <th width="8%">Keluar</th>
                <th width="8%">Penyesuaian</th>
            </tr>
        </thead>
        <tbody>
            @php
                $saldoAwal = $movements->first() ? $movements->first()->stok_sebelum : $barang->stok;
            @endphp
            <tr style="background-color: #FFF9E6; font-weight: bold;">
                <td colspan="4" class="text-center">SALDO AWAL</td>
                <td class="text-center">-</td>
                <td class="text-center">-</td>
                <td class="text-center">-</td>
                <td class="text-right">{{ number_format($saldoAwal) }}</td>
                <td class="text-center">-</td>
            </tr>

            @forelse($movements as $index => $movement)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td class="text-center">{{ $movement->created_at->format('d/m/Y H:i') }}</td>
                <td class="text-center">
                    @if($movement->transaction)
                        {{ $movement->transaction->kode_transaksi }}
                    @else
                        -
                    @endif
                </td>
                <td style="font-size: 8px;">
                    @if($movement->type->value === 'penambahan')
                        <span class="badge badge-in">MASUK</span>
                    @elseif($movement->type->value === 'pengurangan')
                        <span class="badge badge-out">KELUAR</span>
                    @else
                        <span class="badge badge-adjust">ADJUST</span>
                    @endif
                    {{ Str::limit($movement->keterangan, 40) }}
                </td>
                <td class="text-right">
                    @if($movement->type->value === 'penambahan')
                        {{ number_format($movement->jumlah) }}
                    @else
                        -
                    @endif
                </td>
                <td class="text-right">
                    @if($movement->type->value === 'pengurangan')
                        {{ number_format($movement->jumlah) }}
                    @else
                        -
                    @endif
                </td>
                <td class="text-right">
                    @if($movement->type->value === 'penyesuaian')
                        {{ number_format($movement->jumlah) }}
                    @else
                        -
                    @endif
                </td>
                <td class="text-right"><strong>{{ number_format($movement->stok_sesudah) }}</strong></td>
                <td style="font-size: 8px;">{{ $movement->user->name ?? '-' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="9" class="text-center" style="padding: 20px; color: #999;">
                    Tidak ada riwayat pergerakan stok
                </td>
            </tr>
            @endforelse

            <tr style="background-color: #E6F2FF; font-weight: bold;">
                <td colspan="4" class="text-center">SALDO AKHIR</td>
                <td class="text-center">-</td>
                <td class="text-center">-</td>
                <td class="text-center">-</td>
                <td class="text-right">{{ number_format($barang->stok) }}</td>
                <td class="text-center">-</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p><em>Dokumen ini dicetak secara otomatis oleh sistem pada {{ $printed_at }}</em></p>
    </div>

    <div class="signature-container">
        <div class="signature-box">
            <p>Dibuat Oleh,</p>
            <div class="signature-line">
                <strong>(.............................)</strong><br>
                <small>Staff ATK</small>
            </div>
        </div>
        <div class="signature-box">
            <p>Diperiksa Oleh,</p>
            <div class="signature-line">
                <strong>(.............................)</strong><br>
                <small>Pengawas</small>
            </div>
        </div>
        <div class="signature-box">
            <p>Mengetahui,</p>
            <div class="signature-line">
                <strong>(.............................)</strong><br>
                <small>Kepala Bagian</small>
            </div>
        </div>
    </div>
</body>
</html>
