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
        Schema::create('incoming_stocks', function (Blueprint $table) {
            $table->id();
            $table->string('kode_barang_masuk', 50)->unique()->comment('Auto-generated: BM-YYYYMMDD-XXX');
            $table->foreignId('barang_id')->constrained('barangs')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->comment('User yang mencatat');
            $table->integer('jumlah')->unsigned()->comment('Jumlah barang yang masuk');
            $table->date('tanggal_masuk')->comment('Tanggal barang masuk');
            $table->string('sumber', 100)->nullable()->comment('Sumber pengadaan: Pembelian, Hibah, dll');
            $table->string('nomor_dokumen', 100)->nullable()->comment('Nomor PO, Invoice, atau dokumen terkait');
            $table->text('keterangan')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('approved')->comment('Status approval jika diperlukan');
            $table->timestamps();

            $table->index('kode_barang_masuk');
            $table->index('barang_id');
            $table->index('tanggal_masuk');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incoming_stocks');
    }
};
