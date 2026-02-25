<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Distribusi Barang - {{ $barang->nama }} - {{ $month_name }} {{ $year }}</title>
    <style>
        @page {
            size: A4;
            margin: 18mm 18mm 18mm 18mm;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            color: #000;
        }

        /* Info atas */
        .info-block {
            margin-bottom: 14px;
            padding-left: 10mm;
        }
        .info-block table {
            border: none;
            width: auto;
        }
        .info-block td {
            border: none;
            padding: 2px 4px 2px 0;
            font-size: 10px;
            font-weight: bold;
        }
        .info-block td.colon {
            padding: 2px 6px;
        }
        .info-block td.val {
            font-weight: normal;
        }

        /* Tabel utama */
        table.main-table {
            width: 92%;
            border-collapse: collapse;
            margin: 4px auto;
        }
        table.main-table th {
            background-color: #f0f0f0;
            color: #000;
            padding: 6px 5px;
            text-align: center;
            font-weight: bold;
            font-size: 9px;
            border: 1px solid #000;
        }
        table.main-table td {
            padding: 5px 5px;
            border: 1px solid #000;
            font-size: 9px;
            vertical-align: middle;
        }
        table.main-table td.center { text-align: center; }
        table.main-table td.right  { text-align: right; }

        /* Baris ruangan (sub-header) */
        tr.ruangan-header td {
            background-color: #e8e8e8;
            font-weight: bold;
            font-size: 9px;
            border: 1px solid #000;
            padding: 5px;
        }

        /* Baris subtotal */
        tr.subtotal-row td {
            font-weight: bold;
            font-size: 9px;
            border: 1px solid #000;
            padding: 5px;
        }

        /* Baris grand total */
        tr.grand-total-row td {
            font-weight: bold;
            font-size: 9.5px;
            border: 2px solid #000;
            padding: 6px 5px;
        }

        /* Footer */
        .footer {
            margin-top: 16px;
            font-size: 8px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>

    {{-- INFO HEADER --}}
    <div class="info-block">
        <table>
            <tr>
                <td>NAMA BARANG</td>
                <td class="colon">:</td>
                <td class="val">{{ strtoupper($barang->nama) }}</td>
            </tr>
            <tr>
                <td>KODE BARANG</td>
                <td class="colon">:</td>
                <td class="val">{{ $barang->kode }}</td>
            </tr>
            <tr>
                <td>SATUAN</td>
                <td class="colon">:</td>
                <td class="val">{{ strtoupper($barang->satuan) }}</td>
            </tr>
            <tr>
                <td>PERIODE</td>
                <td class="colon">:</td>
                <td class="val">{{ strtoupper($month_name) }} {{ $year }}</td>
            </tr>

        </table>
    </div>

    {{-- TABEL DISTRIBUSI --}}
    @if($ruangans->isEmpty())
        <p style="text-align:center; padding: 20px; border: 1px dashed #999; color: #666; font-style: italic;">
            Tidak ditemukan pengambilan barang {{ strtoupper($barang->nama) }} pada bulan {{ $month_name }} {{ $year }}.
        </p>
    @else
    <table class="main-table">
        <thead>
            <tr>
                <th style="width: 5%;">NO</th>
                <th style="width: 20%;">TANGGAL</th>
                <th style="width: 35%;">UNIT / RUANGAN</th>
                <th style="width: 25%;">KETERANGAN</th>
                <th style="width: 8%;">JUMLAH</th>
                <th style="width: 7%;">SATUAN</th>
            </tr>
        </thead>
        <tbody>
            @php $no = 1; @endphp
            @foreach($ruangans as $ruanganData)

                {{-- Sub-header ruangan --}}
                <tr class="ruangan-header">
                    <td colspan="6">{{ strtoupper($ruanganData['ruangan']) }}</td>
                </tr>

                @foreach($ruanganData['rows'] as $row)
                <tr>
                    <td class="center">{{ $no++ }}</td>
                    <td class="center">
                        {{ \Carbon\Carbon::parse($row['tanggal'])->locale('id')->isoFormat('D MMMM Y') }}
                    </td>
                    <td>{{ strtoupper($ruanganData['ruangan']) }}</td>
                    <td>{{ $row['keterangan'] !== '-' ? $row['keterangan'] : '' }}</td>
                    <td class="center">{{ $row['jumlah'] }}</td>
                    <td class="center">{{ strtoupper($barang->satuan) }}</td>
                </tr>
                @endforeach



            @endforeach

            {{-- Grand Total --}}
            <tr class="grand-total-row">
                <td colspan="4" class="center">TOTAL {{ strtoupper($month_name) }} {{ $year }}</td>
                <td class="center">{{ $grand_total }}</td>
                <td class="center">{{ strtoupper($barang->satuan) }}</td>
            </tr>
        </tbody>
    </table>
    @endif

    {{-- FOOTER --}}
    <div class="footer">
        <p>Dicetak pada: {{ $generated_at }}</p>
    </div>

</body>
</html>
