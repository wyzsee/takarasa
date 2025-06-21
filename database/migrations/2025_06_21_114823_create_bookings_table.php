<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
        {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            // Relasi ke tabel users dan interpreters
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('interpreter_id')->constrained('interpreters')->onDelete('cascade');

            // Data Pemesan (dari form)
            $table->string('customer_name'); // dari namaLengkap
            $table->string('customer_gender'); // dari jenisKelamin
            $table->string('customer_email'); // dari email
            $table->string('customer_phone'); // dari noTelp

            // Detail Acara (dari form)
            $table->string('event_name'); // dari namaAcara
            $table->string('event_type'); // dari bentukAcara (Online/Offline)
            $table->string('event_formality'); // dari jenisAcara (Formal, dll)
            $table->string('organization_name'); // dari namaInstansi
            $table->dateTime('event_datetime'); // dari waktu
            $table->text('event_location'); // dari lokasi

            // Status Pemesanan (Penting untuk manajemen)
            $table->string('status')->default('pending'); // cth: pending, confirmed, completed, cancelled
            $table->unsignedInteger('total_price')->nullable(); // Harga total bisa diisi nanti

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};