<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable = ['correct', 'wrong', 'score', 'status', 'user_id', 'quiz_id'];
}
