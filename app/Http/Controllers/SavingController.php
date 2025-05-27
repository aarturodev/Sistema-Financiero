<?php

namespace App\Http\Controllers;

use App\Models\Saving;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SavingController extends Controller
{
    //calcular progreso
    public function calculateProgress($savings)
    {
        foreach ($savings as $saving) {
            $saving->progress = ($saving->current_amount / $saving->target_amount) * 100;
        }
        return $savings;
    }


    public function index()
    {

        $savings = Saving::where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $savings = $this->calculateProgress($savings);

        return Inertia::render('savings/index', [
            'savings' => $savings,
        ]);
    }

    public function create()
    {
        return Inertia::render('savings/create');
    }


    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'start_date' => 'required|date',
            'target_date' => 'required|date',
            'target_amount' => 'required|numeric',
            'current_amount' => 'numeric|nullable',
        ]);


        // Create a new saving record
        Saving::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'type' => $request->type,
            'start_date' => new \DateTime($request->start_date),
            'target_date' => new \DateTime($request->target_date),
            'target_amount' => $request->target_amount,
            'current_amount' => $request->current_amount ?? null,
        ])->save();
        return redirect(route('saving.index'))
            ->with('success', 'Saving record created successfully.');
    }
    public function show($id) {}

    public function update(Request $request)
    {

        $request->validate([
            'name' => 'string',
            'type' => 'string',
            'start_date' => 'date',
            'target_date' => 'date',
            'target_amount' => 'numeric',
            'current_amount' => 'nullable',
        ]);

        $saving = Saving::find($request->id);
        if ($saving) {
            // Update the income record
            $saving->update([
                'name' => $request->name,
                'type' => $request->type,
                'start_date' => new \DateTime($request->start_date),
                'target_date' => new \DateTime($request->target_date),
                'target_amount' => $request->target_amount,
                'current_amount' => $request->current_amount ?? null,
            ]);

            return redirect(route('saving.index'))
                ->with('success', 'Saving record updated successfully.');
        } else {
            return redirect(route('saving.index'))
                ->with('error', 'Saving record not found.');
        }
    }

    public function deposit(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
        ]);

        $saving = Saving::find($id);
        if ($saving) {
            $saving->current_amount += $request->amount;
            $saving->save();
            return redirect(route('saving.index'))
                ->with('success', 'Deposit made successfully.');
        } else {
            return redirect(route('saving.index'))
                ->with('error', 'Saving record not found.');
        }
    }


    public function destroy($id)
    {
        $saving = Saving::find($id);
        if ($saving) {
            $saving->delete();
            return redirect(route('saving.index'))
                ->with('success', 'Saving record deleted successfully.');
        } else {
            return redirect(route('saving.index'))
                ->with('error', 'Saving record not found.');
        }
    }
}
