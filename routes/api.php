<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\GestureController;
use App\Http\Controllers\API\SignVideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp']);
Route::post('/gesture-detection', [GestureController::class, 'store']);
// Endpoint untuk deteksi real-time (sudah ada)
Route::post('/detect-sign', [GestureController::class, 'detect']);
// Endpoint BARU untuk upload video
Route::post('/upload-video-sign', [GestureController::class, 'uploadVideo']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/search', [SignVideoController::class, 'search']);
