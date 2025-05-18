<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('profile/edit', [
            'user' => $request->user(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'razaoSocial' => 'required|string|max:255',
            'nomeFantasia' => 'required|string|max:255',
            'cnpj' => 'required|string|max:18',
            'inscricaoEstadual' => 'nullable|string|max:50',
            'dataAbertura' => 'nullable|date',
        ]);

        $user = $request->user();
        $user->update($request->only([
            'razaoSocial',
            'nomeFantasia',
            'cnpj',
            'inscricaoEstadual',
            'dataAbertura',
        ]));

        return redirect()->route('dashboard')->with('success', 'Dados atualizados com sucesso.');
    }
}
