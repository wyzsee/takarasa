<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 5; $i++) {
            Question::create([
                'media' => 'a.png', 
                'question' => 'Isyarat apakah ini?',
                'option_1' => 'Huruf A',
                'option_2' => 'Huruf B',
                'option_3' => 'Huruf C',
                'option_4' => 'Huruf D',
                'answer' => 1,
                'quiz_id' => 1,
            ]);
        }
    }
}
