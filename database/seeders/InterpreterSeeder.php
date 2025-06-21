<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Interpreter;

class InterpreterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kosongkan tabel untuk menghindari duplikasi
        Interpreter::truncate();

        $interpreters = [
            [
                'name' => 'Bambang Susanto S.Sos., M.Cs',
                'description' => 'Ahli bahasa isyarat, inklusi disabilitas, dan teknologi aksesibel.',
                'image_path' => '/storage/bambang.jpg', // Pastikan gambar ada di public/images
                'link_detail' => '/detail-jbi/1', // Link bisa dinamis dengan ID
                'experiences' => [
                    "Pengalaman lebih dari 10 tahun sebagai juru bahasa isyarat.",
                    "Pakar dalam teknologi aksesibel untuk disabilitas.",
                    "Pendidikan S.Sos. dan M.Cs di bidang komunikasi inklusif.",
                ],
                'rates' => [
                    ['jenis' => 'Daring', 'tarif' => 180000],
                    ['jenis' => 'Luring', 'tarif' => 200000],
                ]
            ],
            [
                'name' => 'Zuriri Roriri S.Sos., M.Cs',
                'description' => 'Pakar bahasa isyarat, edukator inklusi, dan inovator teknologi disabilitas.',
                'image_path' => '/storage/zuriri.jpg', // Pastikan gambar ada di public/images
                'link_detail' => '/detail-jbi/2',
                'experiences' => [
                    "Berpengalaman dalam mengajar Bahasa Isyarat Indonesia (Bisindo).",
                    "Aktif sebagai pembicara di seminar-seminar inklusivitas.",
                    "Mengembangkan aplikasi pembelajaran isyarat untuk pemula.",
                ],
                'rates' => [
                    ['jenis' => 'Daring', 'tarif' => 175000],
                    ['jenis' => 'Luring', 'tarif' => 195000],
                ]
            ]
        ];

        // Looping dan buat data menggunakan Model
        foreach ($interpreters as $interpreterData) {
            Interpreter::create($interpreterData);
        }
    }
}