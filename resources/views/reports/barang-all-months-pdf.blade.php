<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kartu Stok - {{ $barang->nama }} - Semua Bulan {{ $year }}</title>
    <style>
        @page {
            size: A4;
            margin: 20mm 15mm 20mm 15mm;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            color: #000;
        }

        /* Wrapper untuk centering konten */
        .outer-wrap {
            width: 100%;
        }
        .outer-wrap > tbody > tr > td.pad { width: 8%; }
        .outer-wrap > tbody > tr > td.content { width: 84%; }

        /* Info header */
        .info-block {
            margin-bottom: 14px;
        }
        .info-block table { border: none; width: auto; }
        .info-block td {
            border: none;
            padding: 1px 4px 1px 0;
            font-size: 10px;
            font-weight: bold;
        }
        .info-block td.colon { padding: 1px 8px; }
        .info-block td.val   { font-weight: normal; }

        /* Tabel utama */
        table.main-table {
            width: 100%;
            border-collapse: collapse;
        }
        table.main-table th {
            background-color: #d9d9d9;
            color: #000;
            padding: 5px 4px;
            text-align: center;
            font-weight: bold;
            font-size: 9px;
            border: 1px solid #000;
        }
        table.main-table td {
            padding: 4px 5px;
            border: 1px solid #000;
            font-size: 9px;
            vertical-align: middle;
        }
        .center { text-align: center; }
        .right  { text-align: right;  }
        .bold   { font-weight: bold;  }

        tr.saldo-awal-row td { font-style: italic; }
        tr.total-row td {
            font-weight: bold;
            background-color: #f0f0f0;
        }
        tr.empty-row td { height: 18px; }

        /* Tanda tangan */
        .signature-section { margin-top: 28px; width: 100%; }
        .signature-section table { width: 100%; border-collapse: collapse; }
        .signature-section td {
            border: none;
            text-align: center;
            vertical-align: top;
            padding: 0 6px;
            width: 33.33%;
        }
        .sig-city-date { font-size: 9.5px; margin-bottom: 2px; text-align: center; min-height: 14px; }
        .sig-title     { font-size: 9.5px; font-weight: bold; margin-bottom: 50px; }
        .sig-line      { border-top: 1px solid #000; margin: 0 15px; }
        .sig-name      { font-size: 9.5px; font-weight: bold; margin-top: 3px; }

        .footer {
            margin-top: 14px;
            font-size: 8px;
            color: #666;
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 5px;
        }

        /* Page break setelah setiap bulan */
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>

@foreach($months_data as $index => $month_data)
<div class="{{ $index < count($months_data) - 1 ? 'page-break' : '' }}">
<table class="outer-wrap">
  <tbody>
    <tr>
      <td class="pad"></td>
      <td class="content">

        {{-- INFO HEADER --}}
        <div class="info-block">
            <table>
                <tr>
                    <td>NAMA BARANG</td>
                    <td class="colon">:</td>
                    <td class="val">{{ strtoupper($barang->nama) }}</td>
                </tr>
                <tr>
                    <td>PERIODE</td>
                    <td class="colon">:</td>
                    <td class="val">TAHUN {{ $year }}</td>
                </tr>
                <tr>
                    <td>BULAN</td>
                    <td class="colon">:</td>
                    <td class="val">{{ strtoupper($month_data['month_name']) }}</td>
                </tr>
            </table>
        </div>

        {{-- TABEL UTAMA --}}
        <table class="main-table">
            <thead>
                <tr>
                    <th style="width:5%;">NO</th>
                    <th style="width:22%;">TANGGAL</th>
                    <th>URAIAN</th>
                    <th style="width:10%;">MASUK</th>
                    <th style="width:10%;">KELUAR</th>
                    <th style="width:10%;">SALDO</th>
                    <th style="width:7%;">{{ strtoupper($barang->satuan) }}</th>
                </tr>
            </thead>
            <tbody>
                {{-- Baris Saldo Awal --}}
                <tr class="saldo-awal-row">
                    <td class="center"></td>
                    <td class="center"></td>
                    <td>Saldo Awal {{ $month_data['month_name'] }} {{ $year }}</td>
                    <td class="center bold">{{ $month_data['saldo_awal'] }}</td>
                    <td class="center"></td>
                    <td class="center bold">{{ $month_data['saldo_awal'] }}</td>
                    <td class="center"></td>
                </tr>

                @if($month_data['rows']->isEmpty())
                <tr>
                    <td colspan="7" class="center" style="padding:12px; font-style:italic; color:#666;">
                        Tidak ada transaksi pada {{ $month_data['month_name'] }} {{ $year }}
                    </td>
                </tr>
                @else
                    @foreach($month_data['rows'] as $i => $row)
                    <tr>
                        <td class="center">{{ $i + 1 }}</td>
                        <td class="center">{{ \Carbon\Carbon::parse($row['tanggal'])->locale('id')->isoFormat('D MMMM Y') }}</td>
                        <td>{{ strtoupper($row['uraian']) }}</td>
                        <td class="center">{{ $row['masuk'] > 0 ? $row['masuk'] : '' }}</td>
                        <td class="center">{{ $row['keluar'] > 0 ? $row['keluar'] : '' }}</td>
                        <td class="center bold">{{ $row['saldo'] }}</td>
                        <td class="center"></td>
                    </tr>
                    @endforeach

                    @for($e = 0; $e < max(3, 10 - $month_data['rows']->count()); $e++)
                    <tr class="empty-row">
                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    </tr>
                    @endfor
                @endif

                {{-- Total --}}
                <tr class="total-row">
                    <td colspan="3" class="center bold">TOTAL</td>
                    <td class="center">{{ $month_data['saldo_awal'] + $month_data['total_masuk'] }}</td>
                    <td class="center">{{ $month_data['total_keluar'] }}</td>
                    <td class="center">{{ $month_data['saldo_akhir'] }}</td>
                    <td class="center"></td>
                </tr>
            </tbody>
        </table>

        {{-- TANDA TANGAN (hanya di halaman terakhir) --}}
        @if($index == count($months_data) - 1)
        <div class="signature-section">
            <table>
                <tr>
                    <td>
                        <div class="sig-city-date">&nbsp;</div>
                        <div class="sig-title">PPK Biaya Proses</div>
                        <div class="sig-line"></div>
                        <div class="sig-name">{{ $nama_ppk }}</div>
                    </td>
                    <td>
                        <div class="sig-city-date">&nbsp;</div>
                        <div class="sig-title">Mengetahui,<br>Kuasa Pengelola Biaya Proses</div>
                        <div class="sig-line"></div>
                        <div class="sig-name">{{ $nama_mengetahui }}</div>
                    </td>
                    <td>
                        <div class="sig-city-date">{{ $signature_place_date }}</div>
                        <div class="sig-title">Penanggung Jawab ATK</div>
                        <div class="sig-line"></div>
                        <div class="sig-name">{{ $nama_pjawab }}</div>
                    </td>
                </tr>
            </table>
        </div>
        @endif

        {{-- FOOTER --}}
        <div class="footer">
            Dicetak pada: {{ $generated_at }} &nbsp;&mdash;&nbsp; Sistem Inventaris ATK &nbsp;&mdash;&nbsp; Mahkamah Agung Republik Indonesia
        </div>

      </td>
      <td class="pad"></td>
    </tr>
  </tbody>
</table>
</div>
@endforeach

</body>
</html>
