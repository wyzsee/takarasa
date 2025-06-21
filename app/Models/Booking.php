<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


// app/Models/Booking.php

class Booking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * Pastikan semua kolom ini ada.
     */
    protected $fillable = [
        'user_id',
        'interpreter_id',
        'customer_name',
        'customer_gender',
        'customer_email',
        'customer_phone',
        'event_name',
        'event_type',
        'event_formality',
        'organization_name',
        'event_datetime',
        'event_location',
        'status',
        'total_price',
    ];

    /**
     * Mendefinisikan relasi: Sebuah Booking dimiliki oleh satu User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Mendefinisikan relasi: Sebuah Booking untuk satu Interpreter.
     */
    public function interpreter()
    {
        return $this->belongsTo(Interpreter::class);
    }

    public function transactions()
    {
        return $this->hasMany(Booking::class);
    }
}