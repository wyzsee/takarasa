<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Learn;

class LearnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Learn::create([
            'icon' => 'icon.svg',
            'name' => 'Alfabet',
            'total_material' => 26,
        ]);
        Learn::create([
            'icon' => 'icon.svg',
            'name' => 'Perkenalan',
            'total_material' => 10,
        ]);
    }
}
