<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$transaction = App\Models\Transaction::with(['user', 'items.barang'])->find(4);

echo "Transaction Data:\n";
echo "ID: " . $transaction->id . "\n";
echo "Kode: " . $transaction->kode_transaksi . "\n";
echo "Tanggal: " . $transaction->tanggal . "\n";
echo "Ruangan: " . $transaction->ruangan_nama . "\n";
echo "User: " . ($transaction->user ? $transaction->user->name : 'NULL') . "\n";
echo "Items Count: " . $transaction->items->count() . "\n";

echo "\nItems:\n";
foreach ($transaction->items as $item) {
    echo "  - Item ID: " . $item->id . "\n";
    echo "    Barang ID: " . $item->barang_id . "\n";
    echo "    Jumlah: " . $item->jumlah . "\n";
    echo "    Barang: " . ($item->barang ? $item->barang->nama : 'NULL') . "\n";
}

echo "\nJSON:\n";
echo json_encode($transaction->toArray(), JSON_PRETTY_PRINT);
