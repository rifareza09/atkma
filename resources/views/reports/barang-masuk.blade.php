<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 20mm 15mm 20mm 15mm;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            color: #000;
        }

        /* Wrapper */
        .outer-wrap {
            width: 100%;
        }
        .outer-wrap > tbody > tr > td.pad { width: 4%; }
        .outer-wrap > tbody > tr > td.content { width: 92%; }

        /* Header / Judul */
        .header-title {
            text-align: center;
            margin-bottom: 20px;
        }
        .header-title h1 {
            font-size: 14px;
            text-transform: uppercase;
            margin-bottom: 5px;
        }

        /* Tabel utama */
        table.main-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
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

        ul {
            margin: 0;
            padding-left: 15px;
        }
        ul li {
            margin: 2px 0;
        }
    </style>
</head>
<body>

<table class="outer-wrap">
  <tbody>
    <tr>
      <td class="pad"></td>
      <td class="content">

        <div class="header-title">
            <h1>{{ strtoupper($title) }}</h1>
            @if($filters['year'] || $filters['month'])
            <div style="font-size: 11px; margin-top: 5px;">
                @if($filters['month'])Bulan {{ \Carbon\Carbon::create(2000, $filters['month'], 1)->translatedFormat('F') }} @endif
                @if($filters['year'])Tahun {{ $filters['year'] }}@endif
            </div>
            @endif
        </div>

        <table class="main-table">
            <thead>
                <tr>
                    <th style="width:3%;">NO</th>
                    <th style="width:12%;">TANGGAL</th>
                    <th style="width:15%;">SUMBER / SUPPLIER</th>
                    <th style="width:17%;">REFERENSI</th>
                    <th style="width:13%;">KODE TRANSAKSI</th>
                    <th>DAFTAR BARANG</th>
                </tr>
            </thead>
            <tbody>
                @php $total_all_items = 0; @endphp
                @forelse($transactions as $index => $transaction)
                @php 
                    $txTotal = $transaction->sum('jumlah'); 
                    $total_all_items += $txTotal;
                @endphp
                <tr>
                    <td class="center">{{ $index + 1 }}</td>
                    <td class="center">{{ \Carbon\Carbon::parse($transaction->first()->tanggal_masuk)->format('d F Y') }}</td>
                    <td>{{ $transaction->first()->sumber ?? '-' }}</td>
                    <td>
                        @if($transaction->first()->nomor_dokumen)
                            PO/Ref: {{ $transaction->first()->nomor_dokumen }}<br>
                        @endif
                        @if($transaction->first()->nomor_faktur)
                            Faktur: {{ $transaction->first()->nomor_faktur }}<br>
                        @endif
                        @if($transaction->first()->nomor_surat_jalan)
                            SJ: {{ $transaction->first()->nomor_surat_jalan }}
                        @endif
                        @if(!$transaction->first()->nomor_dokumen && !$transaction->first()->nomor_faktur && !$transaction->first()->nomor_surat_jalan)
                            -
                        @endif
                    </td>
                    <td class="center bold">{{ $transaction->first()->kode_barang_masuk }}</td>
                    <td>
                        <ul>
                            @foreach($transaction as $item)
                            <li>
                                {{ $item->barang->nama }} ({{ number_format($item->jumlah) }} {{ $item->barang->satuan }})
                            </li>
                            @endforeach
                        </ul>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" class="center" style="padding: 20px; font-style: italic;">
                        Tidak ada transaksi barang masuk pada periode ini.
                    </td>
                </tr>
                @endforelse

                <tr class="total-row">
                    <td colspan="5" class="right" style="padding-right: 15px;">TOTAL ITEM MASUK KESELURUHAN</td>
                    <td class="bold center">
                        {{ number_format($total_all_items) }} unit dari {{ $transactions->count() }} transaksi
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Tanda Tangan Section -->
        <div class="signature-section">
            <table>
                <tr>
                    <td>
                        <div class="sig-city-date"></div>
                        <div class="sig-title">Mengetahui<br>Kuasa Pengelola Biaya Proses</div>
                        <div class="sig-line"></div>
                        <div class="sig-name">{{ $nama_mengetahui ?: '..........................................' }}</div>
                    </td>
                    <td>
                        <div class="sig-city-date"></div>
                        <div class="sig-title">PPK Biaya Proses</div>
                        <div class="sig-line"></div>
                        <div class="sig-name">{{ $nama_ppk ?: '..........................................' }}</div>
                    </td>
                    <td>
                        <div class="sig-city-date">{{ $signature_place_date ?: '..........................................' }}</div>
                        <div class="sig-title">Penanggung Jawab ATK</div>
                        <div class="sig-line"></div>
                        <div class="sig-name">{{ $nama_pjawab ?: '..........................................' }}</div>
                    </td>
                </tr>
            </table>
        </div>

      </td>
      <td class="pad"></td>
    </tr>
  </tbody>
</table>

</body>
</html>
