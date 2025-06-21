<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable =['icon', 'title', 'total_quest', 'poin'];
    public $timestamps = false;

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
    public function scores()
    {
        return $this->hasMany(Score::class);
    }
}
