<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SignVideo;
use App\Models\Quiz;
use App\Models\Question;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            QuizSeeder::class,      // Ini harus dijalankan lebih dulu
            QuestionSeeder::class,  // Baru ini dijalankan setelahnya
            // ... seeder lainnya
        ]);

    }
}
