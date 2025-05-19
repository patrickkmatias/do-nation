<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Receptor extends Model
{
    use HasFactory;

    protected $table = 'receptores'; // Opcional se o nome da tabela seguir a convenção do Laravel (plural minúsculo do nome do model)

    protected $fillable = [
        'nome_instituicao',
        'logradouro',
        'cep',
        'bairro',
        'cidade',
        'estado',
        'cnpj_cpf',
        'ie_rg',
        'observacoes',
        'doacao_preferencia',
        'document_path',
        'description',  
    ];

    /**
     * Get the user that owns the receptor profile.
     */
    public function user(): BelongsTo // Definir o tipo de retorno
    {
        return $this->belongsTo(User::class);
    }
}