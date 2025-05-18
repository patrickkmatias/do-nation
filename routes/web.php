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
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
