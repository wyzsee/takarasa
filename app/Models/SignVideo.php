<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SignVideo extends Model
{
    protected $fillable = ['title', 'filename'];
    public $timestamps = false;
}
