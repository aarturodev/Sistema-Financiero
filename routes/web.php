<?php

use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\SavingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [HomeController::class, 'index'])->name('dashboard');
});


Route::resource('Income', IncomeController::class)
    ->middleware(['auth', 'verified'])
    ->names('income');

Route::resource('Expense', ExpenseController::class)
    ->middleware(['auth', 'verified'])
    ->names('expense');

Route::resource('Saving', SavingController::class)
    ->middleware(['auth', 'verified'])
    ->names('saving');

Route::post('saving/deposit/{saving}', [SavingController::class, 'deposit'])
    ->middleware(['auth', 'verified'])
    ->name('saving.deposit');




require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
