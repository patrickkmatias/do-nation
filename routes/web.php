<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
});

Route::get('/cadastro', function () {
    return Inertia::render('signup/signup', [
        'userType' => request()->query('user')
    ]);
})->name('cadastro');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.updatereceptor');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user()->load('receptor');
        return Inertia::render('dashboard', [
            // Você pode colocar em 'auth.user' ou num prop própria
            'user' => [
                'id'                => $user->id,
                'email'             => $user->email,
                'is_receptor'       => $user->is_receptor,
                // campos diretos do receptor:
                'nome_instituicao'  => $user->receptor->nome_instituicao ?? null,
                'logradouro'        => $user->receptor->logradouro ?? null,
                'cep'               => $user->receptor->cep ?? null,
                'bairro'            => $user->receptor->bairro ?? null,
                'cidade'            => $user->receptor->cidade ?? null,
                'estado'            => $user->receptor->estado ?? null,
                'cnpj_cpf'          => $user->receptor->cnpj_cpf ?? null,
                'ie_rg'             => $user->receptor->ie_rg ?? null,
                'observacoes'       => $user->receptor->observacoes ?? null,
                'doacao_preferencia'=> $user->receptor->doacao_preferencia ?? null,
                'data_abertura'     => $user->receptor->data_abertura ?? null,
                'profile_photo_path'=> $user->profile_photo_path,
            ],
        ]);
    })->name('dashboard');
});

Route::get('/sobre-nos', function () {
    return Inertia::render('aboutUs/aboutUs');
})->name('sobre-nos');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
