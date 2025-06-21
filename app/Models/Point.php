<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Point extends Model
{
    protected $fillable = ['value', 'category', 'date', 'description', 'user_id'];
    public $timestamps = false;

    protected $casts = [
        'date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
