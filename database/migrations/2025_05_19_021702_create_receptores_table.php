<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('receptores', function (Blueprint $table) {
            $table->id(); // Cria a coluna 'id' como BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
            $table->string('nome_instituicao'); // Equivalente a TEXT NOT NULL no contexto da imagem (VARCHAR no MySQL)
            $table->string('logradouro')->nullable(); // Equivalente a TEXT NULLABLE
            $table->string('cep', 9)->nullable(); // CEP comumente tem 8 dígitos + hífen
            $table->string('bairro')->nullable();
            $table->string('cidade')->nullable();
            $table->string('document_path')->nullable()->after('doacao_preferencia');
            $table->text('description')->nullable()->after('document_path');
            $table->string('estado', 2)->nullable(); // Estados geralmente são representados por 2 caracteres
            $table->string('cnpj_cpf')->nullable(); // Pode armazenar tanto CNPJ quanto CPF
            $table->string('ie_rg')->nullable(); // Pode armazenar tanto Inscrição Estadual quanto RG
            $table->text('observacoes')->nullable(); // Para textos mais longos
            $table->string('doacao_preferencia')->nullable();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->timestamps(); // Adiciona as colunas 'created_at' e 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('receptores');
    }
};