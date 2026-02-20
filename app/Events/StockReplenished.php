<?php

namespace App\Events;

use App\Models\Barang;
use App\Models\StockMovement;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StockReplenished
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public StockMovement $stockMovement,
        public Barang $barang
    ) {}
}
