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
        Schema::create('stock_reconciliation_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stock_reconciliation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('barang_id')->constrained()->cascadeOnDelete();
            $table->integer('system_stock'); // Stock in system
            $table->integer('physical_stock'); // Stock counted physically
            $table->integer('difference'); // physical_stock - system_stock
            $table->timestamps();

            $table->index('stock_reconciliation_id');
            $table->index('barang_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_reconciliation_items');
    }
};
