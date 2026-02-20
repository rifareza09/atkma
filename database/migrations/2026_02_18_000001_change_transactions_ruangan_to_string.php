<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     */
    public function up(): void
    {
        if (!Schema::hasColumn('transactions', 'ruangan_id')) {
            return; // Migration already done or column doesn't exist
        }

        try {
            Schema::table('transactions', function (Blueprint $table) {
                $table->dropForeign(['ruangan_id']);
            });
        } catch (\Exception $e) {
        }

        Schema::table('transactions', function (Blueprint $table) {
            $table->string('ruangan_nama', 100)->nullable()->after('kode_transaksi');
        });

        DB::statement('UPDATE transactions t
                      INNER JOIN ruangans r ON t.ruangan_id = r.id
                      SET t.ruangan_nama = r.nama');

        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('ruangan_id');
        });

        Schema::table('transactions', function (Blueprint $table) {
            $table->string('ruangan_nama', 100)->nullable(false)->change();
            $table->index('ruangan_nama');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            // Add back ruangan_id column
            $table->foreignId('ruangan_id')->nullable()->after('kode_transaksi');

            // Drop ruangan_nama
            $table->dropIndex(['ruangan_nama']);
            $table->dropColumn('ruangan_nama');

            // Restore foreign key
            $table->foreign('ruangan_id')->references('id')->on('ruangans')->onDelete('cascade');
        });
    }
};
