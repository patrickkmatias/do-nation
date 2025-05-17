<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'razaoSocial' => 'required|string|max:255',
            'nomeFantasia' => 'required|string|max:255',
            'cnpj' => 'required|string|max:18|unique:users,cnpj',
            'inscricaoEstadual' => 'nullable|string|max:50',
            'dataAbertura' => 'nullable|date',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'razaoSocial' => $request->razaoSocial,
            'nomeFantasia' => $request->nomeFantasia,
            'cnpj' => $request->cnpj,
            'inscricaoEstadual' => $request->inscricaoEstadual,
            'dataAbertura' => $request->dataAbertura,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
