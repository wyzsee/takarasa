<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\GestureController;
use App\Http\Controllers\API\SignVideoController;
use App\Http\Controllers\API\QuizController;
use App\Http\Controllers\API\QuestionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InterpreterController;
use App\Http\Controllers\Api\BookingController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-password-otp', [AuthController::class, 'verifyPasswordResetOtp']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
// Route::post('/gesture-detection', [GestureController::class, 'store']);
// // Endpoint untuk deteksi real-time (sudah ada)
// Route::post('/detect-sign', [GestureController::class, 'detect']);
// // Endpoint BARU untuk upload video
// Route::post('/upload-video-sign', [GestureController::class, 'uploadVideo']);
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::get('/search', [SignVideoController::class, 'search']);
// Route::get('/kuis', [QuizController::class, 'index']);
// Route::get('/kuis/{slug}', [QuizController::class, 'show']);
// Route::get('/kuis/{slug}/questions', [QuizController::class, 'getQuestions']);
// Route::post('/kuis/{slug}/submit', [QuizController::class, 'submitAnswers']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/gesture-detection', [GestureController::class, 'store']);
    Route::post('/detect-sign', [GestureController::class, 'detect']);
    Route::post('/upload-video-sign', [GestureController::class, 'uploadVideo']);

    Route::get('/search', [SignVideoController::class, 'search']);

    Route::get('/kuis', [QuizController::class, 'index']);
    Route::get('/kuis/{slug}', [QuizController::class, 'show']);
    Route::get('/kuis/{slug}/questions', [QuizController::class, 'getQuestions']);
    Route::post('/kuis/{slug}/submit', [QuizController::class, 'submitAnswers']);

    // Edit Profile
    Route::post('/user/update', [AuthController::class, 'updateProfile']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Route untuk mendapatkan daftar semua Juru Bahasa Isyarat
    Route::get('/interpreters', [InterpreterController::class, 'index']);

    // Route untuk mendapatkan detail satu Juru Bahasa Isyarat
    Route::get('/interpreters/{id}', [InterpreterController::class, 'show']);

    // Route untuk membuat pemesanan baru
    Route::post('/bookings', [BookingController::class, 'store'])->middleware('auth:sanctum');
});
