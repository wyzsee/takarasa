<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Voucher;
use App\Models\UserVoucher;
use Carbon\Carbon;

class UserVoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserVoucher::truncate();

        $userIds = User::pluck('id')->toArray();
        $voucherIds = Voucher::pluck('id')->toArray();

        $faker = \Faker\Factory::create('id_ID');

        for ($i = 0; $i < 15; $i++) {
            $userId = $faker->randomElement($userIds);
            $voucherId = $faker->randomElement($voucherIds);

            $status = $faker->randomElement(['redeemed', 'used', 'expired']);
            $redeemedAt = $faker->dateTimeBetween('-1 year', 'now');
            $usedAt = null;
            $expiresAt = null;

            if ($status === 'expired') {
                $redeemedAt = Carbon::now()->subMonths($faker->numberBetween(3, 12));
                $expiresAt = Carbon::now()->subDays($faker->numberBetween(1, 60));
                $usedAt = null;
            } elseif ($status === 'used') {
                $redeemedAt = Carbon::now()->subMonths($faker->numberBetween(2, 6));
                $usedAt = Carbon::parse($redeemedAt)->addDays($faker->numberBetween(1, 30));
                $expiresAt = Carbon::parse($redeemedAt)->addMonths($faker->numberBetween(3, 9));
            } else {
                $redeemedAt = Carbon::now()->subDays($faker->numberBetween(1, 30));
                $expiresAt = Carbon::parse($redeemedAt)->addMonths($faker->numberBetween(1, 6));
            }

            $uniqueCode = null;

            UserVoucher::create([
                'user_id' => $userId,
                'voucher_id' => $voucherId,
                'unique_code' => $uniqueCode,
                'status' => $status,
                'redeemed_at' => $redeemedAt,
                'used_at' => $usedAt,
                'expires_at' => $expiresAt,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
