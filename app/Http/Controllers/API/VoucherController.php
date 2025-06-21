<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Point;
use App\Models\UserVoucher;
use App\Models\Voucher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VoucherController extends Controller
{
    /**
     * Menampilkan semua voucher yang aktif dan bisa ditebus.
     */
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

    /**
     * Menampilkan detail satu voucher.
     */
    public function show($id)
    {
        $detail = Voucher::findOrFail($id);
        return response()->json($detail);
    }

    /**
     * Menampilkan voucher yang dimiliki oleh user yang sedang login.
     */
    public function myVouchers()
    {
        $user = Auth::user();

        $myVouchers = UserVoucher::where('user_id', $user->id)
            ->where('status', 'redeemed') // Hanya ambil yang siap dipakai
            ->where(function ($query) {
                // Pastikan juga voucher belum kadaluarsa
                $query->whereNull('expires_at')
                      ->orWhere('expires_at', '>', now());
            })
            ->with('voucher') // Ambil juga detail master vouchernya
            ->orderByDesc('redeemed_at')
            ->get();

        return response()->json($myVouchers);
    }

    /**
     * Menampilkan voucher yang dimiliki oleh user berdasarkan ID (method lama, diperbaiki).
     */
    public function redeemedByUser($id)
    {
        // FIX: Menghapus argumen 'operator:' yang salah sintaks
        $redeemed = UserVoucher::where('user_id', $id)
            ->with('voucher')
            ->orderByDesc('redeemed_at')
            ->get();

        return response()->json($redeemed);
    }

    /**
     * Proses untuk user menebus/mengklaim voucher dengan poin.
     */
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

        $userPoints = Point::where('user_id', $userId)->sum('value');

        if ($userPoints < $voucher->point_cost) {
            return response()->json(['message' => "Poin anda tidak cukup"], 400);
        }

        // Proses pengurangan poin dan pembuatan UserVoucher
        DB::transaction(function () use ($voucher, $userId) {
            Voucher::where('id', $voucher->id)->increment('redeem_count');

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
        });
        
        return response()->json(['message' => 'Voucher berhasil ditebus!'], 201);
    }

    /**
     * Menerapkan voucher yang dimiliki user ke sebuah booking.
     */
    public function apply(Request $request, $booking_id)
    {
        $request->validate([
            'voucher_code' => 'required|string|exists:user_vouchers,unique_code',
        ]);

        $user = Auth::user();
        $booking = Booking::findOrFail($booking_id);

        $userVoucher = UserVoucher::where('unique_code', $request->voucher_code)
            ->where('user_id', $user->id)
            ->first();

        // Validasi ketat
        if (!$userVoucher) {
            return response()->json(['message' => 'Anda tidak memiliki voucher ini.'], 404);
        }
        if ($userVoucher->status !== 'redeemed') {
            return response()->json(['message' => 'Voucher ini sudah digunakan atau tidak valid.'], 400);
        }
        if ($userVoucher->expires_at && $userVoucher->expires_at->isPast()) {
            return response()->json(['message' => 'Voucher ini sudah kadaluarsa.'], 400);
        }

        $voucher = $userVoucher->voucher;
        $hargaAwal = $booking->harga_awal;
        
        // FIX: Pastikan nama properti 'persentase' sesuai dengan nama kolom di DB Anda
        $potongan = $voucher->value * $hargaAwal;

        if ($voucher->max_discount && $potongan > $voucher->max_discount) {
            $potongan = $voucher->max_discount;
        }

        // FIX: Pengaman untuk mencegah potongan 0 mengupdate status voucher
        if ($potongan <= 0) {
            return response()->json(['message' => 'Voucher tidak memberikan diskon.'], 400);
        }

        $hargaFinal = ($hargaAwal - $potongan) + $booking->biaya_admin;

        // Update booking dan status voucher dalam satu transaksi
        DB::transaction(function () use ($booking, $voucher, $potongan, $hargaFinal, $userVoucher) {
            $booking->update([
                'voucher_id' => $voucher->id,
                'potongan_voucher' => $potongan,
                'total_harga' => $hargaFinal,
            ]);
            
            $userVoucher->update([
                'status' => 'used',
                'used_at' => now()
            ]);
        });

        // Kembalikan respons sukses dengan data harga yang sudah diperbarui
        return response()->json([
            'message' => 'Voucher berhasil diterapkan!',
            'data' => [
                'harga_awal' => (float) $hargaAwal,
                'potongan_voucher' => (float) $potongan,
                'biaya_admin' => (float) $booking->biaya_admin,
                'total_harga' => (float) $hargaFinal,
            ]
        ]);
    }
}