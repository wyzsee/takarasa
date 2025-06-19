<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['media', 'question', 'option_1', 'option_2', 'option_3', 'option_4', 'answer', 'quiz_id'];
    public $timestamps = false;
    protected $appends = ['media_url'];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function getMediaUrlAttribute()
    {
        $quiz = $this->quiz;
        return asset("storage/quiz/{$this->quiz->slug}/{$this->media}");
    }
}
