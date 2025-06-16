<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\SignVideo::create([
        'title' => 'a',
        'filename' => 'a.mp4'
        ]);
        \App\Models\SignVideo::create([
        'title' => 'aku',
        'filename' => 'aku.mp4'
        ]);
        \App\Models\SignVideo::create([
        'title' => 'b',
        'filename' => 'b.mp4'
        ]);
        \App\Models\SignVideo::create([
        'title' => 'kamu',
        'filename' => 'kamu.mp4'
        ]);
        \App\Models\SignVideo::create([
        'title' => 'senin',
        'filename' => 'senin.mp4'
        ]);
    }
}
