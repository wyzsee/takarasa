<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acara extends Model
{
    use HasFactory;

    protected $table = 'acara';

    protected $fillable = [
        'title',
        'description',
        'organizer',
        'image_path',
        'link_detail',
        'category',
        'event_date',
        'location',
    ];

    protected $casts = [
        'event_date' => 'datetime',
    ];
}