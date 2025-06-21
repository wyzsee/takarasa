<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'point_cost',
        'value',
        'code',
        'total_quantity',
        'redeem_count',
        'active_from',
        'active_until',
        'is_active',
    ];

    protected $casts = [
        'active_from' => 'datetime',
        'active_until' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_vouchers')->withTimestamps();
    }

    public function userVouchers()
    {
        return $this->hasMany((UserVoucher::class));
    }
}
