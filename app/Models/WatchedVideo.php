<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WatchedVideo extends Model
{
    protected $fillable = [
        'user_id',
        'learn_id',
        'learn_material_id',
        'watched_at',
    ];

    public function learnMaterial()
    {
        return $this->belongsTo(LearnMaterial::class);
    }
}
