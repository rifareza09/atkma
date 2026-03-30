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
            $table->string('nomor_faktur')->nullable()->after('nomor_dokumen');
            $table->string('nomor_surat_jalan')->nullable()->after('nomor_faktur');
            $table->date('tanggal_faktur')->nullable()->after('nomor_surat_jalan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('incoming_stocks', function (Blueprint $table) {
            $table->dropColumn(['nomor_faktur', 'nomor_surat_jalan', 'tanggal_faktur']);
        });
    }
};
