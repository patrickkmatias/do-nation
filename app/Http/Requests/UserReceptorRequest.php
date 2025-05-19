<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UserReceptorRequest extends FormRequest
{
    public function authorize()
    {
        // Ajuste conforme sua lógica de autorização; 
        // normalmente para registro público basta deixar true.
        return true;
    }

    public function rules()
    {
        // Regras básicas de usuário
        $rules = [
            'email'        => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'     => ['required', 'string', Password::defaults(), 'confirmed'],
            'is_receptor'  => ['required', 'boolean'],
            'file_profile'         => ['nullable','file','mimes:jpg,jpeg,png','max:2048'],
            'file_documents'       => ['nullable','file','mimes:pdf,jpg,jpeg,png','max:5120'],
            'description'          => ['nullable','string'],
        ];

        // Se for receptor, adiciona campos obrigatórios/opcionais
        if ($this->boolean('is_receptor')) {
            $rules = array_merge($rules, [
                'nome_instituicao'    => ['required', 'string', 'max:255'],
                'logradouro'          => ['nullable', 'string', 'max:255'],
                'cep'                 => ['nullable', 'string', 'max:9'],
                'bairro'              => ['nullable', 'string', 'max:255'],
                'cidade'              => ['nullable', 'string', 'max:255'],
                'estado'              => ['nullable', 'string', 'max:2'],
                'cnpj_cpf'            => ['nullable', 'string', 'max:20'],
                'ie_rg'               => ['nullable', 'string', 'max:20'],
                'observacoes'         => ['nullable', 'string'],
                'doacao_preferencia'  => ['nullable', 'string', 'max:255'],
            ]);
        }

        return $rules;
    }

    /**
     * Se quiser personalizar mensagens:
     */
    public function messages()
    {
        return [
            'nome_instituicao.required' => 'O nome da instituição é obrigatório para receptores.',
            // ... outras mensagens customizadas ...
        ];
    }
}
