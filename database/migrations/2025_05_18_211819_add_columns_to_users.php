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
        Schema::table('users', function (Blueprint $table) {
            $table->string('razaoSocial')->nullable(true);
            $table->string('nomeFantasia')->nullable(true);
            $table->string('cnpj')->nullable(true);
            $table->string('inscricaoEstadual')->nullable(true);
            $table->date('dataAbertura')->nullable(true);
            $table->string('description')->nullable(true);         
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('razaoSocial');
            $table->dropColumn('nomeFantasia');
            $table->dropColumn('cnpj');
            $table->dropColumn('inscricaoEstadual');
            $table->dropColumn('dataAbertura');
            $table->dropColumn('description'); 
        });
    }
};
