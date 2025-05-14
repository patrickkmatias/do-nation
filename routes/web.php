<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
});

Route::get('/cadastro', function () {
    return Inertia::render('signup/signup', [
        'userType' => request()->query('user')
    ]);
})->name('cadastro');
/*
Route::get('/signup/institution-profile', function () {
    return Inertia::render('signup/institution-profile');
});

Route::get('/Teste', function(){
    return Inertia::render('paginaTeste');
})->name('teste');*/


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
