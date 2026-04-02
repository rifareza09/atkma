<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('incoming_stocks', function (Blueprint $table) {
            $table->dropUnique(['kode_barang_masuk']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('incoming_stocks', function (Blueprint $table) {
            $table->unique('kode_barang_masuk');
        });
    }
};
