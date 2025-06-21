<?php

namespace App\Http\Controllers\API;

use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Booking;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User; // Asumsi JBI adalah User

class PaymentController extends Controller
{
    public function __construct()
    {
        // Set konfigurasi Midtrans saat controller diinisialisasi
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function createTransaction(Request $request)
    {
        // Validasi request dari frontend
     $request->validate(['booking_id' => 'required|exists:bookings,id']);
        
        $booking = Booking::with(['user', 'interpreter'])->find($request->booking_id);

        $item_details = [
            // Harga Jasa
            [
                'id' => 'JASA-' . $booking->interpreter->id,
                'price' => $booking->harga_awal,
                'quantity' => 1,
                'name' => 'Jasa Interpreter: ' . $booking->interpreter->name,
            ],
            // Biaya Admin
            [
                'id' => 'ADMIN_FEE',
                'price' => $booking->biaya_admin,
                'quantity' => 1,
                'name' => 'Biaya Admin',
            ],
        ];

        // Jika ada potongan, tambahkan sebagai item dengan harga negatif
        if ($booking->potongan_voucher > 0) {
            $item_details[] = [
                'id' => 'VOUCHER-' . $booking->voucher_code, // Asumsi ada kolom voucher_code
                'price' => -$booking->potongan_voucher, // Harga negatif
                'quantity' => 1,
                'name' => 'Diskon Voucher',
            ];
        }

        $params = [
            'transaction_details' => [
                'order_id' => 'BOOK-' . $booking->id . '-' . time(),
                'gross_amount' => $booking->total_harga, // Total akhir
            ],
            'item_details' => $item_details,
            'customer_details' => [
                'first_name' => $booking->user->name,
                'email' => $booking->user->email,
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            // Simpan midtrans_order_id ke booking Anda jika perlu
            // $booking->update(['midtrans_order_id' => $params['transaction_details']['order_id']]);

            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function handleCallback(Request $request)
    {
        // 1. Ambil server key Anda dari config atau .env
        $serverKey = config('midtrans.server_key'); // Pastikan Anda sudah set ini

        // 2. Ambil data notifikasi dari Midtrans
        $notification = $request->all();
        $orderId = $notification['order_id'];
        $statusCode = $notification['status_code'];
        $grossAmount = $notification['gross_amount'];
        $signatureKey = $notification['signature_key'];
        
        // 3. Verifikasi signature key untuk keamanan
        $hashed = hash("sha512", $orderId . $statusCode . $grossAmount . $serverKey);
        if ($signatureKey !== $hashed) {
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        // 4. Cari booking berdasarkan order_id
        $booking = Booking::find($orderId);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        // 5. Update status booking berdasarkan status transaksi dari Midtrans
        $transactionStatus = $notification['transaction_status'];
        $paymentType = $notification['payment_type'];

        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            // Pembayaran berhasil (untuk kartu kredit, gopay, dll)
            $booking->status = 'confirmed';
        } else if ($transactionStatus == 'pending') {
            // Menunggu pembayaran (untuk transfer bank / VA)
            $booking->status = 'pending';
        } else if ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
            // Pembayaran gagal atau dibatalkan
            $booking->status = 'cancelled';
        }
        
        $booking->save();

        return response()->json(['message' => 'Notification handled successfully']);
    }
}