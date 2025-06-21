<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    // Fungsi untuk Registrasi User
    public function register(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'tipe_pengguna' => 'required|in:Dengar,Tuli',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'nullable|string',
            'no_telepon' => 'nullable|string|max:15',
        ]);

        // Jika validasi gagal, kembalikan pesan error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'data' => $validator->errors()
            ], 422); // Kode HTTP 422 untuk Unprocessable Entity
        }

        // Create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'tipe_pengguna' => $request->tipe_pengguna,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'alamat' => $request->alamat,
            'no_telepon' => $request->no_telepon,
        ]);

        
        // Kirim OTP
        $this->sendOtp($user);

        // // Membuat pengguna baru
        // $input = $request->all();
        // $input['password'] = Hash::make($input['password']);
        // $user = User::create($input);

        // // Membuat token autentikasi
        // $success['token'] = $user->createToken('auth_token')->plainTextToken;
        // $success['name'] = $user->name;
        // $success['email'] = $user->email;

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil!',
            'data' => [
                'user' => $user
            ]
        ], 201); // Kode HTTP 201 untuk resource yang berhasil dibuat
    }

    public function sendOtp($user){
        // Generate OTP
        $otp = rand(1000, 9999); // 4 digit OTP

        // Simpan OTP di database, set juga expirednya bre
        $user->otp = $otp;
        $user->otp_expiry = now()->addMinutes(3); // 3 menit exp
        $user->save();

        // Kirim OTP ke email pengguna
        try {
            Mail::to($user->email)->send(new OtpMail($otp));
        } catch (\Exception $e) {
            \Log::error('Gagal kirim email OTP: ' . $e->getMessage());
        }
    }

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:4',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        // Cek OTP dan expiry
        if ((string)$user->otp !== (string)$request->otp){
            return response()->json([
                'success' => false,
                'message' => 'OTP salah'
            ], 400);
        }

        if ($user->otp_expiry->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'OTP sudah kadaluarsa'
            ], 400);
        }

        // OTP valid, hapus otp dan expiry
        $user->otp = null;
        $user->otp_expiry = null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'OTP valid, registrasi selesai!'
        ]);
    }

    public function resendOtp(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email|exists:users,email',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal',
            'data' => $validator->errors(),
        ], 422);
    }

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'User tidak ditemukan',
        ], 404);
    }

    // CEGAH RESEND: Cek jika otp_expiry belum lewat 2 menit
    if ($user->otp_expiry && $user->otp_expiry->isFuture()) {
        $diffSeconds = now()->diffInSeconds($user->otp_expiry);
        if ($diffSeconds > 60) {
            return response()->json([
                'success' => false,
                'message' => 'Mohon tunggu beberapa saat sebelum mengirim ulang OTP.',
            ], 429);
        }
    }

    // Kirim ulang OTP
    $this->sendOtp($user);

    return response()->json([
        'success' => true,
        'message' => 'OTP berhasil dikirim ulang',
    ]);
}


    // Fungsi untuk Login User
    public function login(Request $request)
    {
        // Validasi input login
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'data' => $validator->errors()
            ], 422);
        }

        // Cek kredensial user
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $auth = Auth::user();
            $success['token'] = $auth->createToken('auth_token')->plainTextToken;
            $success['name'] = $auth->name;

            return response()->json([
                'success' => true,
                'message' => 'Login berhasil!',
                'data' => $success
            ], 200); // Kode HTTP 200 untuk permintaan berhasil
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Login gagal, periksa kembali email dan kata sandi Anda!',
            ], 401); // Kode HTTP 401 untuk Unauthorized
        }
    }

    // Update Profile
    public function updateProfile(Request $request)
    {
        // Dapatkan user yang sedang login
        $user = Auth::user();

        // Validasi input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'foto_profil' => 'nullable|image|mimes:jpeg,png,jpg|max:5120'  // maks 5MB
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update data user
        $user->name = $request->name;
        $user->email = $request->email;

        // Handle upload foto profil jika ada file baru yang dikirim
        if ($request->hasFile('foto_profil')) {
            // Hapus foto lama jika ada, untuk menghemat storage
            if ($user->foto_profil) {
                Storage::disk('public')->delete($user->foto_profil);
            }

            // Simpan foto baru dan dapatkan path-nya
            $path = $request->file('foto_profil')->store('profile-pictures', 'public');
            $user->foto_profil = $path;
        }

        $user->save();

        // Kembalikan data user yang sudah diupdate
        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui!',
            'data' => $user
        ], 200);
    }

    // Logout
     public function logout(Request $request)
    {
        // Hapus token akses saat ini yang digunakan untuk autentikasi
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil!'
        ], 200);
    }

    // Forgot Password
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Email tidak terdaftar.'], 404);
        }

        $user = User::where('email', $request->email)->first();

        // Kirim OTP ke email pengguna (menggunakan kembali fungsi sendOtp yang sudah ada)
        $this->sendOtp($user);

        return response()->json([
            'success' => true,
            'message' => 'Kode OTP untuk reset password telah dikirim ke email Anda.'
        ], 200);
    }

    // Verifikasi OTP Forgot Password
    public function verifyPasswordResetOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:4',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Input tidak valid.', 'errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)
                    ->where('otp', $request->otp)
                    ->where('otp_expiry', '>', now())
                    ->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'OTP salah atau sudah kadaluarsa.'], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'OTP valid. Silakan masukkan password baru Anda.'
        ], 200);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:4',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Input tidak valid.', 'errors' => $validator->errors()], 422);
        }

        // Verifikasi sekali lagi untuk keamanan
        $user = User::where('email', $request->email)
                    ->where('otp', $request->otp)
                    ->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Proses reset gagal. Silakan coba lagi dari awal.'], 400);
        }
        
        // Update password pengguna
        $user->password = Hash::make($request->password);
        
        // Hapus OTP setelah berhasil digunakan
        $user->otp = null;
        $user->otp_expiry = null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password Anda telah berhasil direset. Silakan login.'
        ], 200);
    }
}
