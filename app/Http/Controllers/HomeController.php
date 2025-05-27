<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Inertia\Inertia;

use App\Models\Expense;
use App\Models\Income;
use App\Models\Saving;


class HomeController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // Fechas
        $startCurrentMonth = Carbon::now()->startOfMonth();
        $startPreviousMonth = Carbon::now()->subMonth()->startOfMonth();
        $endPreviousMonth = Carbon::now()->subMonth()->endOfMonth();

        // ==== INGRESOS ====
        $totalIncomes = Income::where('user_id', $userId)->sum('amount');

        $incomesCurrent = Income::where('user_id', $userId)
            ->where('created_at', '>=', $startCurrentMonth)
            ->sum('amount');

        $incomesPrevious = Income::where('user_id', $userId)
            ->whereBetween('created_at', [$startPreviousMonth, $endPreviousMonth])
            ->sum('amount');

        $incomesChange = $incomesPrevious > 0
            ? (($incomesCurrent - $incomesPrevious) / $incomesPrevious) * 100
            : 0;

        // ==== EGRESOS ====
        $totalExpenses = Expense::where('user_id', $userId)->sum('amount');

        $expensesCurrent = Expense::where('user_id', $userId)
            ->where('created_at', '>=', $startCurrentMonth)
            ->sum('amount');

        $expensesPrevious = Expense::where('user_id', $userId)
            ->whereBetween('created_at', [$startPreviousMonth, $endPreviousMonth])
            ->sum('amount');

        $expensesChange = $expensesPrevious > 0
            ? (($expensesCurrent - $expensesPrevious) / $expensesPrevious) * 100
            : 0;

        // ==== AHORROS ====
        $totalSavings = Saving::where('user_id', $userId)->sum('current_amount');

        $savingsCurrent = Saving::where('user_id', $userId)
            ->where('updated_at', '>=', $startCurrentMonth)
            ->sum('current_amount');

        $savingsPrevious = Saving::where('user_id', $userId)
            ->whereBetween('updated_at', [$startPreviousMonth, $endPreviousMonth])
            ->sum('current_amount');

        $savingsChange = $savingsPrevious > 0
            ? (($savingsCurrent - $savingsPrevious) / $savingsPrevious) * 100
            : 0;

        // ==== BALANCE ====
        $balance = $totalIncomes - $totalExpenses;
        $balanceChange = $incomesChange - $expensesChange;

        // ==== RESPUESTA ====
        return Inertia::render('dashboard', [
            'totalIncomes' => $totalIncomes,
            'totalExpenses' => $totalExpenses,
            'totalSavings' => $totalSavings,
            'balance' => $balance,
            'incomesChange' => round($incomesChange, 1),
            'expensesChange' => round($expensesChange, 1),
            'savingsChange' => round($savingsChange, 1),
            'balanceChange' => round($balanceChange, 1),
        ]);
    }
}
