<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
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
            'bentukAcara' => 'required|string|in:Online,Offline',
            'jenisAcara' => 'required|string|in:Formal,Semi-Formal,Non-Formal',
            'namaInstansi' => 'required|string|max:255',
            'waktu' => 'required|date',
            'lokasi' => 'required|string',
        ]);

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
        ]);

        // 3. Kirim respons sukses
        return response()->json([
            'message' => 'Pemesanan berhasil dibuat dan sedang menunggu konfirmasi.',
            'data' => $booking
        ], 201); // 201 = Created
    }
}