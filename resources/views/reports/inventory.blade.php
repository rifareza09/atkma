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
            font-size: 11px;
            line-height: 1.4;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid #1E3A5F;
        }
        .header h1 {
            color: #1E3A5F;
            font-size: 18px;
            margin-bottom: 5px;
        }
        .header h2 {
            color: #666;
            font-size: 14px;
            font-weight: normal;
            margin-bottom: 3px;
        }
        .meta-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            font-size: 10px;
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th {
            background-color: #1E3A5F;
            color: white;
            padding: 8px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
        }
        td {
            padding: 6px 8px;
            border-bottom: 1px solid #ddd;
            font-size: 10px;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .badge {
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }
        .badge-warning {
            background-color: #FEE;
            color: #C00;
        }
        .badge-success {
            background-color: #EFE;
            color: #060;
        }
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            text-align: right;
            font-size: 10px;
            color: #666;
        }
        .signature {
            margin-top: 50px;
            text-align: right;
        }
        .signature-line {
            display: inline-block;
            margin-top: 60px;
            border-top: 1px solid #000;
            padding-top: 5px;
            min-width: 200px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>MAHKAMAH AGUNG REPUBLIK INDONESIA</h1>
        <h2>{{ $title }}</h2>
        <p style="font-size: 10px; color: #888; margin-top: 5px;">Filter: {{ $filter }}</p>
    </div>

    <div class="meta-info">
        <div>
            <strong>Tanggal Cetak:</strong> {{ $date }}
        </div>
        <div>
            <strong>Total Barang:</strong> {{ $barangs->count() }} item
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="15%">Kode</th>
                <th width="30%">Nama Barang</th>
                <th width="10%">Satuan</th>
                <th width="10%" class="text-right">Stok</th>
                <th width="10%" class="text-right">Min. Stok</th>
                <th width="10%" class="text-center">Status</th>
                <th width="10%">Deskripsi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($barangs as $index => $barang)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td><strong>{{ $barang->kode }}</strong></td>
                <td>{{ $barang->nama }}</td>
                <td>{{ $barang->satuan }}</td>
                <td class="text-right"><strong>{{ number_format($barang->stok) }}</strong></td>
                <td class="text-right">{{ number_format($barang->stok_minimum) }}</td>
                <td class="text-center">
                    @if($barang->stok <= $barang->stok_minimum)
                        <span class="badge badge-warning">RENDAH</span>
                    @else
                        <span class="badge badge-success">AMAN</span>
                    @endif
                </td>
                <td style="font-size: 9px;">{{ Str::limit($barang->deskripsi, 30) }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="8" class="text-center" style="padding: 20px; color: #999;">
                    Tidak ada data barang
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>

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
