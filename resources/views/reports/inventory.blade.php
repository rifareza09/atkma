<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 20mm 20mm 20mm 20mm;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            font-size: 10px;
            line-height: 1.5;
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 3px solid #1E3A5F;
        }
        .header h1 {
            color: #1E3A5F;
            font-size: 16px;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }
        .header h2 {
            color: #1E3A5F;
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .header p {
            color: #888;
            font-size: 9px;
        }
        .meta-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            font-size: 10px;
            color: #555;
            padding: 0 10px;
        }
        .meta-info div {
            flex: 1;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th {
            background-color: #1E3A5F;
            color: white;
            padding: 10px 12px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
            border: 1px solid #1E3A5F;
            white-space: nowrap;
        }
        td {
            padding: 8px 12px;
            border: 1px solid #ddd;
            font-size: 9.5px;
            line-height: 1.4;
            word-wrap: break-word;
            word-break: break-word;
        }
        tr:nth-child(even) {
            background-color: #f5f5f5;
        }
        tr:hover {
            background-color: #f0f0f0;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 8px;
            font-weight: bold;
            text-align: center;
        }
        .badge-warning {
            background-color: #FFE5E5;
            color: #C00;
            border: 1px solid #FFB3B3;
        }
        .badge-success {
            background-color: #E5F5E5;
            color: #060;
            border: 1px solid #B3D9B3;
        }
        .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 9px;
            color: #888;
        }
        .signature {
            margin-top: 40px;
            text-align: center;
        }
        .signature-line {
            display: inline-block;
            margin-top: 50px;
            border-top: 2px solid #000;
            padding-top: 8px;
            min-width: 200px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>MAHKAMAH AGUNG REPUBLIK INDONESIA</h1>
        <h2>{{ $title }}</h2>
        <p>Filter: <strong>{{ $filter }}</strong></p>
    </div>

    <div class="meta-info">
        <div>
            <strong>Tanggal Cetak:</strong> {{ $date }}
        </div>
        <div style="text-align: center;">
            <strong>Total Barang:</strong> {{ $barangs->count() }} item
        </div>
        <div>&nbsp;</div>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 4%;">No</th>
                <th style="width: 10%;">Kode</th>
                <th style="width: 25%;">Nama Barang</th>
                <th style="width: 8%;">Satuan</th>
                <th style="width: 9%;" class="text-right">Stok</th>
                <th style="width: 9%;" class="text-right">Min. Stok</th>
                <th style="width: 8%;" class="text-center">Status</th>
                <th style="width: 27%;">Deskripsi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($barangs as $index => $barang)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td><strong>{{ $barang->kode }}</strong></td>
                <td>{{ $barang->nama }}</td>
                <td class="text-center">{{ $barang->satuan }}</td>
                <td class="text-right"><strong>{{ number_format($barang->stok) }}</strong></td>
                <td class="text-right">{{ number_format($barang->stok_minimum) }}</td>
                <td class="text-center">
                    @if($barang->stok <= $barang->stok_minimum)
                        <span class="badge badge-warning">RENDAH</span>
                    @else
                        <span class="badge badge-success">AMAN</span>
                    @endif
                </td>
                <td>{{ Str::limit($barang->deskripsi, 60) }}</td>
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
        <p><em>Dokumen ini dicetak secara otomatis oleh sistem pada {{ now()->format('d-m-Y H:i') }}</em></p>
    </div>

    <div class="signature">
        @if(!empty($nama_ppk ?? '') || !empty($nama_mengetahui ?? '') || !empty($nama_pjawab ?? ''))
        <table style="width: 100%; border-collapse: collapse; margin-top: 40px;">
            <tr>
                @if(!empty($nama_ppk ?? ''))
                <td style="text-align: center; border: none; padding: 0 15px;">
                    <div style="font-size: 9px;">PPK Biaya Proses</div>
                    <div class="signature-line" style="display: inline-block;">
                        <strong style="font-size: 9px;">{{ $nama_ppk }}</strong>
                    </div>
                </td>
                @endif
                @if(!empty($nama_mengetahui ?? ''))
                <td style="text-align: center; border: none; padding: 0 15px;">
                    <div style="font-size: 9px;">Mengetahui,<br>Kuasa Pengelola Biaya Proses</div>
                    <div class="signature-line" style="display: inline-block;">
                        <strong style="font-size: 9px;">{{ $nama_mengetahui }}</strong>
                    </div>
                </td>
                @endif
                @if(!empty($nama_pjawab ?? ''))
                <td style="text-align: center; border: none; padding: 0 15px;">
                    <div style="font-size: 9px;">Penanggung Jawab ATK</div>
                    <div class="signature-line" style="display: inline-block;">
                        <strong style="font-size: 9px;">{{ $nama_pjawab }}</strong>
                    </div>
                </td>
                @endif
            </tr>
        </table>
        @endif
    </div>
</body>
</html>
