<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Voucher;
use App\Models\UserVoucher;
use App\Models\Point;

use Carbon\Carbon;
class VoucherController extends Controller
{
    public function index()
    {
        $vouchers = Voucher::where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('active_from')
                    ->orWhere('active_from', '<=', now('Asia/Jakarta'));
            })
            ->where(function ($query) {
                $query->whereNull('active_until')
                    ->orWhere('active_until', '>=', now('Asia/Jakarta'));
            })
            ->get();
        return response()->json($vouchers);
    }

    public function show($id)
    {
        $detail = Voucher::where('id', $id)
            ->firstOrFail();

        return response()->json($detail);
    }

    public function redeemedByUser($id)
    {
        $userId = $id;
        $redeemed = UserVoucher::where('user_id', operator: $userId)
            ->with('voucher')
            ->orderByDesc('redeemed_at')
            ->get();

        return response()->json($redeemed);
    }

    public function redeemVoucher(Request $request, Voucher $voucher)
    {
        $user = $request->user();
        $userId = $user->id;

        if (
            !$voucher->is_active ||
            ($voucher->active_from && $voucher->active_from->isFuture()) ||
            ($voucher->active_until && $voucher->active_until->isPast())
        ) {
            return response()->json(['message' => 'Voucher tidak aktif atau sudah kadaluarsa untuk ditebus.'], 400);
        }

        $userPoints = Point::where('user_id', $userId)->sum(column: 'value');

        if ($userPoints < $voucher->point_cost) {
            return response()->json(['message' => "Poin anda tidak cukup"]);
        }

        DB::transaction(function () use ($voucher) {
            $updatedRows = Voucher::where('id', $voucher->id)
                ->update([
                    'redeem_count' => DB::raw('redeem_count + 1'),
                ]);
            if ($updatedRows === 0) {
                throw new \Exception("Voucher not found or total_quantity is already zero.");
            }
        });

        Point::create([
            'value' => -$voucher->point_cost,
            'category' => 'out',
            'date' => Carbon::now('Asia/Jakarta'),
            'description' => 'Poin keluar untuk ' . $voucher->name,
            'user_id' => $userId,
        ]);

        UserVoucher::create([
            'user_id' => $userId,
            'voucher_id' => $voucher->id,
            'unique_code' => $voucher->code,
            'status' => 'redeemed',
            'redeemed_at' => Carbon::now('Asia/Jakarta'),
            'expires_at' => $voucher->active_until,
        ]);

    }
}
