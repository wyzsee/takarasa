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
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $faker = \Faker\Factory::create();

        $quizIds = Quiz::pluck('id')->toArray();

        foreach(range(1, 5) as $index){
            Question::create([
                'media' => 'b.png',
                'question' => 'Isyarat apakah ini?',
                'option_1' => 'Huruf '. strtoupper($faker->randomLetter),
                'option_2' => 'Huruf '. strtoupper($faker->randomLetter),
                'option_3' => 'Huruf '. strtoupper($faker->randomLetter),
                'option_4' => 'Huruf '. strtoupper($faker->randomLetter),
                'answer' => $faker->numberBetween(1,4),
                'quiz_id' => 4,
            ]);
        }

    }
}
