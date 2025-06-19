<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['media', 'question', 'option_1', 'option_2', 'option_3', 'option_4', 'answer', 'quiz_id'];
}
