<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
}
