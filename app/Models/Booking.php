<?php

namespace App\Models;

use App\Models\User;
use App\Models\Interpreter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


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
        'voucher_id',
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
        'harga_awal',
        'potongan_voucher',
        'biaya_admin',
        'total_harga',
    ];

    /**
     * Mendefinisikan relasi: Sebuah Booking dimiliki oleh satu User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Mendefinisikan relasi: Sebuah Booking untuk satu Interpreter.
     */
    public function interpreter()
    {
        return $this->belongsTo(Interpreter::class, 'interpreter_id');
    }

    public function transactions()
    {
        return $this->hasMany(Booking::class);
    }
}