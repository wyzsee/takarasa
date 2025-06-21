<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('communities', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama lengkap komunitas, cth: "Teman Tuli"
            $table->string('username'); // Username di platform, cth: "teman_tuli"
            $table->text('description');
            $table->string('link_url'); // URL lengkap ke halaman komunitas
            $table->string('platform')->default('Instagram'); // Platform, cth: Instagram, Facebook
            $table->string('logo_path')->nullable(); // Path ke logo platform
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('communities');
    }
};