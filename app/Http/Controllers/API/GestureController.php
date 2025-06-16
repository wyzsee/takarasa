<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\ConnectionException;

class GestureController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|string',
        ]);

        $imageData = $request->input('image');

        // Hapus prefix base64
        $imageData = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
        $imageData = str_replace(' ', '+', $imageData);

        $image = base64_decode($imageData);

        if ($image === false) {
            return response()->json(['message' => 'Invalid base64 image'], 422);
        }

        $fileName = 'gesture_' . time() . '.png';
        Storage::put('public/gestures/' . $fileName, $image);

        return response()->json([
            'message' => 'Gesture image received and saved',
            'file' => $fileName,
        ], 201);
    }

    public function detect(Request $request)
    {
        // Validasi request
        $validated = $request->validate([
            'image' => 'required|string',
        ]);

        // URL service Python/Flask Anda
        $pythonServiceUrl = 'http://127.0.0.1:5000/predict'; 

        try {
            // Kirim data gambar ke service Python
            $response = Http::timeout(15)->post($pythonServiceUrl, [
                'image' => $validated['image']
            ]);

            // Periksa apakah request ke Python berhasil
            if ($response->successful()) {
                // Kembalikan respons JSON dari Python langsung ke frontend
                return $response->json();
            } else {
                // Jika service Python memberikan error
                Log::error('Python service returned an error.', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return response()->json(['error' => 'Gagal memproses gambar di service ML'], 502);
            }

        } catch (ConnectionException $e) {
            // Jika service Python tidak berjalan atau tidak bisa dihubungi
            Log::error('Could not connect to Python service.', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Tidak dapat terhubung ke service deteksi'], 504);
        }
    }

       public function uploadVideo(Request $request)
    {
        // 1. Validasi untuk memastikan ada file video yang dikirim
        $request->validate([
            'video' => 'required|file|mimes:mp4,mov,avi,mkv',
        ]);

        try {
            // 2. Kirim file video ke endpoint BARU di service Python
            $response = Http::attach(
                'video', // nama field
                file_get_contents($request->file('video')), // isi file
                $request->file('video')->getClientOriginalName() // nama file original
            )->post('http://127.0.0.1:5000/predict-video'); // <- Perhatikan endpoint BARU

            if ($response->successful()) {
                return $response->json();
            }

            // Handle jika service Python error
            return response()->json(['error' => 'Gagal memproses video di service ML'], 502);

        } catch (\Exception $e) {
            // Handle jika service Python tidak bisa dihubungi
            return response()->json(['error' => 'Tidak dapat terhubung ke service deteksi'], 504);
        }
    }
}
