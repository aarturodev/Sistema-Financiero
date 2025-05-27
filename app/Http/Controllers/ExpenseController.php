<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseController extends Controller
{


    public function index()
    {

        $expenses = Expense::where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('expenses/index', [
            'expenses' => $expenses,
        ]);
    }

    public function create()
    {
        return Inertia::render('expenses/create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required|string',
            'date' => 'required|date',
            'category' => 'required|string',
        ]);


        // Create a new expense record
        Expense::create([
            'user_id' => Auth::user()->id,
            'type' => $request->category,
            'amount' => $request->amount,
            'description' => $request->description,
            'date' => new \DateTime($request->date)

        ])->save();
        return redirect(route('expense.index'))
            ->with('success', 'Expense record created successfully.');
    }
    public function show($id) {}
    public function update(Request $request, $id)
    {
        $request->validate([
            'amount' => 'numeric',
            'description' => 'string',
            'date' => 'date',
            'category' => 'string',
        ]);
        // Update the expense record
        $expense = Expense::find($id);
        if ($expense) {
            $expense->update([
                'type' => $request->type,
                'amount' => $request->amount,
                'description' => $request->description,
                'date' => new \DateTime($request->date)
            ]);
            return redirect(route('expense.index'))
                ->with('success', 'Expense record updated successfully.');
        } else {
            return redirect(route('expense.index'))
                ->with('error', 'Expense record not found.');
        }
    }
    public function destroy($id)
    {
        // Find the expense record
        $expense = Expense::find($id);
        if ($expense) {
            // Delete the expense record
            $expense->delete();
            return redirect(route('expense.index'))
                ->with('success', 'Expense record deleted successfully.');
        } else {
            return redirect(route('expense.index'))
                ->with('error', 'Expense record not found.');
        }
    }
}
