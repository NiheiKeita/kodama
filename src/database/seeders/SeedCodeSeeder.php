<?php

namespace Database\Seeders;

use App\Models\QrCode;
use Illuminate\Database\Seeder;

class SeedCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaults = [
            ['code' => 'KDM-BELL-X7Q9', 'seed_type' => 'bell'],
            ['code' => 'KDM-WIND-2LM3', 'seed_type' => 'wind'],
            ['code' => 'KDM-WATER-8CZ1', 'seed_type' => 'water'],
        ];

        foreach ($defaults as $data) {
            QrCode::updateOrCreate(
                ['code' => $data['code']],
                [
                    'seed_type' => $data['seed_type'],
                    'is_active' => true,
                ]
            );
        }
    }
}
