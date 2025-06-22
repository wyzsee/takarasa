<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LearnMaterial extends Model
{
    protected $fillable = [
        'learn_id',
        'media',
        'sign',
    ];

    public function learn()
    {
        return $this->belongsTo(Learn::class);
    }

    public function watchedBy()
    {
        return $this->belongsToMany(User::class, 'watched_materials')->withTimestamps();
    }

}
