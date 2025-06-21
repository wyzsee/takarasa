<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Community;

class CommunitySeeder extends Seeder
{
    public function run(): void
    {
        Community::truncate();

        $communities = [
            [
                'name' => 'Teman Tuli',
                'username' => 'teman_tuli',
                'description' => 'Komunitas sosial untuk edukasi mahasiswa dan masyarakat mengenai budaya Tuli dan bahasa isyarat.',
                'link_url' => 'https://www.instagram.com/teman_tuli',
                'platform' => 'Instagram',
                'logo_path' => '/images/logos/instagram.png',
            ],
            [
                'name' => 'Fantasi Tuli',
                'username' => 'fantasituli',
                'description' => 'Fantasi Tuli berdaya yang bergerak di bidang seni dan kreativitas. Kolaborasi bidang seni antara teman Tuli & Dengar.',
                'link_url' => 'https://www.instagram.com/fantasituli',
                'platform' => 'Instagram',
                'logo_path' => '/images/logos/instagram.png',
            ],
        ];

        foreach ($communities as $communityData) {
            Community::create($communityData);
        }
    }
}