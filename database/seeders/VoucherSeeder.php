<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use carbon\Carbon;

use App\Models\Voucher;

class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Voucher::truncate();

        $faker = Faker::create('id_ID');

        for ($i=0; $i<20; $i++){
            $pointCost = $faker->numberBetween(10, 100);
            $value = $faker->randomElement([0.1, 0.2, 0.3, 0.4]);
            $totalQuantity = $faker->numberBetween(10, 100);
            $redeemCount = $faker->numberBetween(0, $totalQuantity);
            $activeFrom = Carbon::parse($faker->dateTimeBetween('-1 month', '+2 weeks')->format('Y-m-d H:i:s'));
            $activeUntil = Carbon::parse($faker->dateTimeBetween($activeFrom, '+6 months')->format('Y-m-d H:i:s'));
            $isActive = $faker->boolean(50);
            if (!$isActive || Carbon::now()->greaterThan($activeUntil)){
                $isActive = false;
            }

            $percentage = $value * 100;
            $name = 'Voucher Diskon ' . $percentage . '%';
            $description = "Dapatkan potongan harga " . $percentage . "% untuk pembelian Anda berikutnya!";
            if ($faker->boolean(40)) {
                $description = $faker->paragraph(1) . " Nikmati diskon spesial " . $percentage . "%!";
            }

            Voucher::create([
                'name' => $name,
                'description' => $description,
                'point_cost' => $pointCost,
                'value' => $value,
                'code' => $faker->unique()->regexify('[A-Z0-9]{8}'),
                'total_quantity' => $totalQuantity,
                'redeem_count' => $redeemCount,
                'active_from' => $activeFrom,
                'active_until' => $activeUntil,
                'is_active' => $isActive,
            ]);
        }
    }
}
