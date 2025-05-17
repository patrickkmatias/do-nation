<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                if (!Auth::check()) {
                    return ['user' => null];
                }

                /** @var User $user */
                $user = Auth::user();

                return [
                    'user' => collect($user->toArray())->only([
                        'id',
                        'email',
                        'razaoSocial',
                        'nomeFantasia',
                        'cnpj',
                        'inscricaoEstadual',
                        'dataAbertura',
                    ]),
                ];
            }
        ]);
    }
}
