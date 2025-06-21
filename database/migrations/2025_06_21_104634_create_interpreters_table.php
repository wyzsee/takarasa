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
        Schema::create('interpreters', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Mengganti 'title' menjadi 'name'
            $table->text('description');
            $table->string('image_path'); // Path ke file gambar
            $table->string('link_detail'); // Link ke halaman detail di frontend
            $table->json('experiences'); // Kolom JSON untuk array pengalaman
            $table->json('rates'); // Kolom JSON untuk array harga/tarif
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interpreters');
    }
};
