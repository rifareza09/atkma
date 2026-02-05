<?php

namespace App;

enum StockMovementType: string
{
    case PENAMBAHAN = 'penambahan';
    case PENGURANGAN = 'pengurangan';
    case PENYESUAIAN = 'penyesuaian';
}
