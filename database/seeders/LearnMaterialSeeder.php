<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LearnMaterial;

class LearnMaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    
    public function run(): void
    {
        LearnMaterial::truncate();
        
        LearnMaterial::create([
            'learn_id' => 1,
            'media' => 'alfabet/a.mp4',
            'sign' => 'A',
        ]);
        LearnMaterial::create([
            'learn_id' => 1,
            'media' => 'alfabet/b.mp4',
            'sign' => 'B',
        ]);
        LearnMaterial::create([
            'learn_id' => 1,
            'media' => 'alfabet/c.mp4',
            'sign' => 'C',
        ]);
        LearnMaterial::create([
            'learn_id' => 2,
            'media' => 'perkenalan/aku.mp4',
            'sign' => 'Aku',
        ]);
        LearnMaterial::create([
            'learn_id' => 2,
            'media' => 'perkenalan/kamu.mp4',
            'sign' => 'Kamu',
        ]);
    }
}
