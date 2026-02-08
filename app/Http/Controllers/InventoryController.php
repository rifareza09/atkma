<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryController extends Controller
{
    /**
     * Display inventory selection page
     */
    public function index(Request $request): Response
    {
        $barangs = Barang::query()
            ->where('is_active', true)
            ->orderBy('nama')
            ->get();

        $ruangans = Ruangan::query()
            ->where('is_active', true)
            ->orderBy('nama')
            ->get();

        return Inertia::render('inventory/index', [
            'barangs' => $barangs,
            'ruangans' => $ruangans,
        ]);
    }
}
