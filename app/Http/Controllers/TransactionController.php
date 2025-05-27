<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // Fetch transactions from the database
        $incomes = Income::all();
        $expenses = Expense::all();
        $transactions = $incomes->merge($expenses);


        // Return the view with the transactions data
        return inertia('transaction/index', [
            'transactions' => $transactions,
        ]);
    }

    public function create(Request $request)
    {
        // Return the view for creating a new transaction
        return inertia('transaction/create');
    }
}
// In this example, we are using the Inertia.js library to render the view.
