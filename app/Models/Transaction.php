<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Transaction extends Model
{
    protected $fillable = [
        'booking_id',
        'user_id',
        'midtrans_transaction_id',
        'midtrans_order_id',
        'gross_amount',
        'payment_type',
        'transaction_status',
        'va_number',
        'bank_name',
        'bill_key',
        'biller_code',
        'qr_code_url',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function booking()
    {
        return $this->belongsTo(Bookings::class);
    }

    
}
