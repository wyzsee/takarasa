<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('acara', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('organizer'); // untuk field 'penyelenggara'
            $table->string('image_path'); // untuk field 'image'
            $table->string('link_detail'); // untuk field 'link'
            $table->string('category')->index(); // cth: 'gathering', 'workshop'. Di-index agar query lebih cepat.
            $table->dateTime('event_date')->nullable(); // Kolom tambahan yang bagus untuk event
            $table->string('location')->nullable(); // Kolom tambahan yang bagus untuk event
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('acara');
    }
};