<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\User;
use App\Models\Voucher;
use App\Models\Interpreter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Menyimpan data pemesanan baru dari form.
     */
    public function store(Request $request)
    {
        // 1. Validasi data yang masuk
        $validatedData = $request->validate([
            'interpreter_id' => 'required|exists:interpreters,id',
            'namaLengkap' => 'required|string|max:255',
            'jenisKelamin' => 'required|string|in:Laki-laki,Perempuan',
            'email' => 'required|email|max:255',
            'noTelp' => 'required|string|max:20',
            'namaAcara' => 'required|string|max:255',
            'bentukAcara' => 'required|string|in:Daring,Luring',
            'jenisAcara' => 'required|string|in:Formal,Semi-Formal,Non-Formal',
            'namaInstansi' => 'required|string|max:255',
            'waktu' => 'required|date',
            'lokasi' => 'required|string',
        ]);

        $interpreter = Interpreter::findOrFail($validatedData['interpreter_id']);

        $rates = $interpreter->rates;
        $hargaAwal = 0;

        // Cek dulu apakah $rates adalah array dan tidak kosong sebelum di-looping
        if (is_array($rates)) {
            foreach ($rates as $rate) {
                // Pastikan juga 'jenis' dan 'tarif' ada di dalam array
                if (isset($rate['jenis'], $rate['tarif']) && strtolower(trim($rate['jenis'])) === strtolower(trim($validatedData['bentukAcara']))) {
                    $hargaAwal = (float) $rate['tarif']; // Pastikan tarif di-cast sebagai angka
                    break;
                }
            }
        }

        // Jika setelah semua proses harga masih 0, berarti ada yang salah
        if ($hargaAwal == 0) {
            return response()->json(['message' => 'Tarif untuk JBI dengan bentuk acara ini tidak ditemukan.'], 400);
        }

        // 3. Hitung diskon jika ada voucher
        $potongan = 0;
        if (!empty($validatedData['voucher_code'])) {
            $voucher = Voucher::where('kode_voucher', $validatedData['voucher_code'])->first();
            if ($voucher) { // Lakukan pengecekan lain jika perlu (misal: voucher masih aktif)
                // Contoh diskon persentase
                $potongan = ($voucher->persentase / 100) * $hargaAwal;
            }
        }

        $subtotal = $hargaAwal - $potongan;
        $biayaAdmin = 4000; // Contoh biaya admin tetap, atau bisa dihitung dinamis
        $hargaFinal = $subtotal + $biayaAdmin;

        // 2. Buat booking baru di database
        $booking = Booking::create([
            'user_id'           => Auth::id(),
            'interpreter_id'    => $validatedData['interpreter_id'],
            'customer_name'     => $validatedData['namaLengkap'],
            'customer_gender'   => $validatedData['jenisKelamin'],
            'customer_email'    => $validatedData['email'],
            'customer_phone'    => $validatedData['noTelp'],
            'event_name'        => $validatedData['namaAcara'],
            'event_type'        => $validatedData['bentukAcara'],
            'event_formality'   => $validatedData['jenisAcara'],
            'organization_name' => $validatedData['namaInstansi'],
            'event_datetime'    => $validatedData['waktu'],
            'event_location'    => $validatedData['lokasi'],
            'harga_awal'        => $hargaAwal,
            'potongan_voucher'  => $potongan,
            'biaya_admin'       => $biayaAdmin,
            'total_harga'       => $hargaFinal,
        ]);

        // 3. Kirim respons sukses
        return response()->json([
            'message' => 'Pemesanan berhasil dibuat dan sedang menunggu konfirmasi.',
            'data' => $booking
        ], 201); // 201 = Created
    }

    public function show($id)
    {
        // Ambil booking beserta data user dan JBI-nya
        $booking = Booking::with(['user', 'interpreter'])->findOrFail($id);

        // Pastikan hanya user yang membuat booking yang bisa melihatnya
        if ($booking->user_id !== Auth::id()) {
            return response()->json(['message' => 'Tidak diizinkan'], 403);
        }

        return response()->json($booking);
    }

    public function createTransaction(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        
        // Buat Nomor VA palsu (contoh: kode bank + ID booking)
        // '8808' adalah contoh, Anda bisa ganti
        $vaNumber = '8808' . str_pad($booking->id, 10, '0', STR_PAD_LEFT);

        // Update booking dengan status pending dan no VA
        $booking->status = 'pending';
        $booking->va_number = $vaNumber;
        $booking->save();

        // Kembalikan data booking yang sudah diupdate
        return response()->json($booking);
    }
}
