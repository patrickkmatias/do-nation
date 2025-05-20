<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit(Request $request)
    {
        // Carrega usuário com perfil de receptor
        $user = $request->user()->load('receptor');

        return Inertia::render('profile/edit', [
            'user' => [
                'nome_instituicao'    => $user->receptor->nome_instituicao ?? null,
                'cnpj_cpf'            => $user->receptor->cnpj_cpf ?? null,
                'ie_rg'               => $user->receptor->ie_rg ?? null,
                'observacoes'         => $user->receptor->observacoes ?? null,
                'doacao_preferencia'  => $user->receptor->doacao_preferencia ?? null,
            ],
        ]);
    }

    public function update(Request $request)
    {
        // Validação flexível: campos podem ser enviados isoladamente
        $data = $request->validate([
            'nome_instituicao'   => ['sometimes', 'required', 'string', 'max:255'],
            'cnpj_cpf'           => ['sometimes', 'required', 'string', 'max:20'],
            'ie_rg'              => ['nullable', 'string', 'max:20'],
            'observacoes'        => ['nullable', 'string'],
            'doacao_preferencia' => ['nullable', 'string', 'max:255'],
        ]);

        $user = $request->user();

        DB::transaction(function () use ($user, $data) {
            // Atualiza apenas o perfil de receptor
            $user->receptor()->update($data);
        });

        return redirect()
            ->route('dashboard')
            ->with('success', 'Dados atualizados com sucesso.');
    }
}
