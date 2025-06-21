<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Acara;

class AcaraSeeder extends Seeder
{
    public function run(): void
    {
        Acara::truncate(); // Kosongkan tabel sebelum seeding

    $acaraData = [
        // Data Gathering
        [
            'title' => 'Gathering Teman Tuli',
            'description' => 'Acara perkumpulan komunitas teman teman tuli banjarmasin',
            'image_path' => '/storage/gathering-2.jpg',
            'organizer' => 'Diselenggarakan oleh Teman Tuli Banjarmasin',
            'link_detail' => '/detail-event/1',
            'category' => 'gathering',
            'event_date' => '2025-07-15 10:00:00',
            'location' => 'Siring Menara Pandang, Banjarmasin', // TAMBAHAN
        ],
        [
            'title' => 'Gathering Teman Tuli Jabo',
            'description' => 'Acara perkumpulan komunitas teman teman tuli Jabodetabek.',
            'image_path' => '/storage/gathering.png',
            'organizer' => 'Diselenggarakan oleh Teman Tuli Jabodetabek.',
            'link_detail' => '/detail-event/2',
            'category' => 'gathering',
            'event_date' => '2025-08-05 14:00:00', // TAMBAHAN
            'location' => 'Taman Mini Indonesia Indah, Jakarta', // TAMBAHAN
        ],
        // Data Workshop
        [
            'title' => 'Workshop Belajar Bahasa Isyarat',
            'description' => 'Belajar bahasa isyarat bersama teman teman tuli maupun teman dengar.',
            'image_path' => '/storage/workshop.jpg',
            'organizer' => 'Diselenggarakan oleh Ikatan Peduli Tuli',
            'link_detail' => '/detail-workshop/3',
            'category' => 'workshop',
            'event_date' => '2025-07-26 09:00:00', // TAMBAHAN
            'location' => 'Aula Universitas Lambung Mangkurat, Banjarmasin', // TAMBAHAN
        ],
        [
            'title' => 'Seminar Nasional Teman Tuli',
            'description' => 'Acara perkumpulan komunitas teman teman tuli banjarmasin',
            'image_path' => '/storage/workshop-2.jpg',
            'organizer' => 'Diselenggarakan oleh Teman Tuli Banjar',
            'link_detail' => '/detail-workshop/4',
            'category' => 'workshop',
            'event_date' => '2025-09-10 09:30:00', // TAMBAHAN
            'location' => 'Gedung Serbaguna, Balai Kota Banjarbaru', // TAMBAHAN
        ],
    ];

        foreach ($acaraData as $data) {
            Acara::create($data);
        }
    }
}