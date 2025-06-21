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
        $videos = [
            ['title'=>'a', 'filename'=>'a.mp4'],
            ['title'=>'b', 'filename'=>'b.mp4'],
            ['title'=>'c', 'filename'=>'c.mp4'],
            ['title'=>'aku', 'filename'=>'aku.mp4'],
            ['title'=>'kamu', 'filename'=>'kamu.mp4'],
            ['title'=>'mau', 'filename'=>'mau.mp4'],
            ['title'=>'makan', 'filename'=>'makan.mp4'],
            ['title'=>'terima kasih', 'filename'=>'terima_kasih.mp4'],
            ['title'=>'senin', 'filename'=>'senin.mp4']
        ];
        
        foreach ($videos as $video) {
            \App\Models\SignVideo::updateOrCreate($video);
        }
    }
}
