<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Expense extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'amount',
        'description',
        'date',
        'type',
    ];






    //relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
