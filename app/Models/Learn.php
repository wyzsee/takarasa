<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Learn extends Model
{
    protected $fillable = [
        'icon',
        'name',
        'total_material',
    ];

    public function learnMaterials()
    {
        return $this->hasMany(LearnMaterial::class, 'learn_id');
    }
}
