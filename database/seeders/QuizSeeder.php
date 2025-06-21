<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Quiz;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quiz::create([
            'title' => 'Kuis Alfabet',
            'slug' => 'kuis-alfabet',
            'icon' => 'images/icon_alphabet.png',
            'total_quest' => 10,                 
            'poin' => 100,                       
        ]);

        Quiz::create([
            'title' => 'Kuis Angka',
            'slug' => 'kuis-angka',
            'icon' => 'images/icon_number.png',  
            'total_quest' => 10,                  
            'poin' => 100,                        
        ]);
    }
}
