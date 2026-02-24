<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Distribusi - {{ $barang->nama }} - {{ $month_name }} {{ $year }}</title>
    <style>
        @page {
            size: A4;
            margin: 22mm 20mm 22mm 20mm;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #111;
        }
        .page {
            padding: 0 10mm;
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
            margin-bottom: 4px;
        }
        .header h2 {
            color: #444;
            font-size: 13px;
            font-weight: normal;
            margin-bottom: 2px;
        }
        .header p {
            font-size: 10px;
            color: #777;
            margin-top: 4px;
        }
        .meta-info {
            width: 100%;
            margin-bottom: 16px;
        }
        .meta-info table {
            width: 100%;
            border-collapse: collapse;
        }
        .meta-info td {
            padding: 2px 4px;
            border: none;
            background: transparent;
            font-size: 10px;
            color: #555;
        }
        .meta-info td.label {
            width: 20%;
            font-weight: bold;
            color: #333;
        }
        .section-heading {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #1E3A5F;
            border-left: 3px solid #1E3A5F;
            padding: 4px 8px;
            background: #f5f7fa;
            margin-top: 18px;
            margin-bottom: 0;
        }
        .section-meta {
            font-size: 9px;
            color: #666;
            font-style: italic;
            padding: 3px 0 6px 11px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th {
            background-color: #1E3A5F;
            color: #fff;
            padding: 7px 8px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
        }
        th.center { text-align: center; }
        td {
            padding: 5px 8px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 10px;
            vertical-align: top;
        }
        td.center { text-align: center; }
        tr:nth-child(even) td {
            background-color: #f9f9f9;
        }
        .subtotal-row td {
            background-color: #eef2f7 !important;
            font-weight: bold;
            border-top: 1px solid #b0bed0;
            border-bottom: 2px solid #b0bed0;
        }
        .grand-total-row td {
            background-color: #1E3A5F !important;
            color: #fff;
            font-weight: bold;
            font-size: 11px;
            border: none;
        }
        .no-data {
            text-align: center;
            padding: 16px;
            color: #999;
            font-style: italic;
        }
        .signature-section {
            margin-top: 40px;
            width: 100%;
        }
        .signature-section table td {
            border: none;
            background: transparent !important;
            text-align: center;
            padding: 0 10px;
            vertical-align: top;
        }
        .sig-title {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 3px;
        }
        .sig-city {
            font-size: 9px;
            color: #555;
            margin-bottom: 50px;
        }
        .sig-line {
            border-top: 1px solid #333;
            margin: 0 20px;
        }
        .sig-name {
            font-size: 10px;
            font-weight: bold;
            margin-top: 4px;
        }
        .sig-role {
            font-size: 9px;
            color: #555;
        }
        .footer {
            margin-top: 24px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            font-size: 9px;
            color: #888;
            width: 100%;
        }
        .footer table td {
            border: none;
            background: transparent !important;
            padding: 0;
        }
    </style>
</head>
<body>
<div class="page">

    {{-- HEADER --}}
    <div class="header">
        <h1>MAHKAMAH AGUNG REPUBLIK INDONESIA</h1>
        <h2>Laporan Distribusi Barang ATK Per Ruangan</h2>
        <p>Periode: {{ strtoupper($month_name) }} {{ $year }}</p>
    </div>

    {{-- META INFO --}}
    <div class="meta-info">
        <table>
            <tr>
                <td class="label">Nama Barang</td>
                <td>: {{ strtoupper($barang->nama) }}</td>
                <td class="label">Kode Barang</td>
                <td>: {{ $barang->kode }}</td>
            </tr>
            <tr>
                <td class="label">Satuan</td>
                <td>: {{ strtoupper($barang->satuan) }}</td>
                <td class="label">Periode</td>
                <td>: 1 {{ $month_name }} {{ $year }} &ndash; {{ \Carbon\Carbon::create($year, $month, 1)->endOfMonth()->day }} {{ $month_name }} {{ $year }}</td>
            </tr>
            <tr>
                <td class="label">Total Ruangan</td>
                <td>: {{ $ruangans->count() }} ruangan</td>
                <td class="label">Dicetak Pada</td>
                <td>: {{ $generated_at }}</td>
            </tr>
        </table>
    </div>

    {{-- RUANGAN SECTIONS --}}
    @if($ruangans->isEmpty())
        <p class="no-data" style="margin-top: 20px; border: 1px dashed #ccc; padding: 20px;">
            Tidak ditemukan pengambilan barang <strong>{{ $barang->nama }}</strong>
            pada bulan {{ $month_name }} {{ $year }}.
        </p>
    @else
        @foreach($ruangans as $ruanganData)

            <div class="section-heading">{{ strtoupper($ruanganData['ruangan']) }}</div>
            <div class="section-meta">Total diambil: {{ $ruanganData['subtotal'] }} {{ strtoupper($barang->satuan) }}</div>

            <table>
                <thead>
                    <tr>
                        <th width="4%" class="center">No</th>
                        <th width="30%">Tanggal Pengambilan</th>
                        <th>Keterangan</th>
                        <th width="12%" class="center">Jumlah</th>
                        <th width="10%" class="center">Satuan</th>
                    </tr>
                </thead>
                <tbody>
                    @if($ruanganData['rows']->isEmpty())
                        <tr>
                            <td colspan="5" class="no-data">Tidak ada data transaksi</td>
                        </tr>
                    @else
                        @foreach($ruanganData['rows'] as $i => $row)
                        <tr>
                            <td class="center">{{ $i + 1 }}</td>
                            <td>{{ \Carbon\Carbon::parse($row['tanggal'])->locale('id')->isoFormat('dddd, D MMMM Y') }}</td>
                            <td>{{ $row['keterangan'] }}</td>
                            <td class="center"><strong>{{ $row['jumlah'] }}</strong></td>
                            <td class="center">{{ strtoupper($barang->satuan) }}</td>
                        </tr>
                        @endforeach
                        <tr class="subtotal-row">
                            <td colspan="3" style="text-align: right;">Subtotal {{ strtoupper($ruanganData['ruangan']) }}</td>
                            <td class="center">{{ $ruanganData['subtotal'] }}</td>
                            <td class="center">{{ strtoupper($barang->satuan) }}</td>
                        </tr>
                    @endif
                </tbody>
            </table>

        @endforeach

        {{-- GRAND TOTAL --}}
        <table style="margin-top: 16px;">
            <tr class="grand-total-row">
                <td width="4%"></td>
                <td>TOTAL KESELURUHAN DISTRIBUSI &mdash; {{ strtoupper($month_name) }} {{ $year }}</td>
                <td width="18%"></td>
                <td width="12%" class="center">{{ $grand_total }}</td>
                <td width="10%" class="center">{{ strtoupper($barang->satuan) }}</td>
            </tr>
        </table>
    @endif

    {{-- SIGNATURE --}}
    <div class="signature-section">
        <table>
            <tr>
                <td>
                    <div class="sig-title">Mengetahui</div>
                    <div class="sig-city">Jakarta, {{ \Carbon\Carbon::now()->isoFormat('D MMMM Y') }}</div>
                    <div class="sig-line"></div>
                    <div class="sig-name">(..................................)</div>
                    <div class="sig-role">Kepala Sub Bagian Umum</div>
                </td>
                <td>
                    <div class="sig-title">Memeriksa</div>
                    <div class="sig-city">&nbsp;</div>
                    <div class="sig-line"></div>
                    <div class="sig-name">(..................................)</div>
                    <div class="sig-role">Pejabat Pengelola BMN</div>
                </td>
                <td>
                    <div class="sig-title">Petugas Pengurus ATK</div>
                    <div class="sig-city">&nbsp;</div>
                    <div class="sig-line"></div>
                    <div class="sig-name">(..................................)</div>
                    <div class="sig-role">Operator Sistem Inventaris</div>
                </td>
            </tr>
        </table>
    </div>

    {{-- FOOTER --}}
    <div class="footer">
        <table>
            <tr>
                <td>&copy; {{ $year }} Mahkamah Agung Republik Indonesia &nbsp;&mdash;&nbsp; Sistem Inventaris ATK &nbsp;&mdash;&nbsp; Dokumen ini digenerate secara otomatis</td>
                <td style="text-align: right;">Dicetak: {{ $generated_at }}</td>
            </tr>
        </table>
    </div>

</div>
</body>
</html>
