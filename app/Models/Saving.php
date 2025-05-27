<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Saving extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'start_date',
        'target_date',
        'target_amount',
        'current_amount',
    ];




    //relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
