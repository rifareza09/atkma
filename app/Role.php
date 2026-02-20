<?php

namespace App;

enum Role: string
{
    case ADMIN = 'admin';
    case SUPERADMIN = 'superadmin';
    case PENGAWAS = 'pengawas';
}
