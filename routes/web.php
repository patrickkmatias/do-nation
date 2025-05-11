<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/signup', function () {
    return Inertia::render('signup/signup', [
        'userType' => request()->query('user')
    ]);
});

Route::get('/signup/institution-profile', function () {
    return Inertia::render('signup/institution-profile');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
