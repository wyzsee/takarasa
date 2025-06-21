<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable = ['correct', 'wrong', 'score', 'status', 'user_id', 'quiz_id', 'award_status'];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
