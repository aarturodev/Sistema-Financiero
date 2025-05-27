<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IncomeController extends Controller
{


    public function index()
    {

        $incomes = Income::where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('incomes/index', [
            'incomes' => $incomes,
        ]);
    }

    public function create()
    {
        return Inertia::render('incomes/create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required|string',
            'date' => 'required|date',
            'category' => 'required|string',
        ]);


        // Create a new income record
        Income::create([
            'user_id' => Auth::user()->id,
            'type' => $request->category,
            'amount' => $request->amount,
            'description' => $request->description,
            'date' => new \DateTime($request->date)

        ])->save();
        return redirect(route('income.index'))
            ->with('success', 'Income record created successfully.');
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
        $income = Income::find($id);
        if ($income) {
            // Update the income record
            $income->update([
                'type' => $request->type,
                'amount' => $request->amount,
                'description' => $request->description,
                'date' => new \DateTime($request->date)
            ]);
            return redirect(route('income.index'))
                ->with('success', 'Income record updated successfully.');
        } else {
            return redirect(route('income.index'))
                ->with('error', 'Income record not found.');
        }
    }

    public function destroy($id)
    {
        $income = Income::find($id);
        if ($income) {
            $income->delete();
            return redirect(route('income.index'))
                ->with('success', 'Income record deleted successfully.');
        } else {
            return redirect(route('income.index'))
                ->with('error', 'Income record not found.');
        }
    }
}
