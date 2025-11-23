<?php

namespace App\Services\Kodama;

use App\Models\QrCode;
use App\Models\User;
use App\Models\UserSeed;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class SeedClaimService
{
    public function claim(User $user, string $code): UserSeed
    {
        $qrCode = QrCode::where('code', $code)
            ->where('is_active', true)
            ->first();

        if (!$qrCode) {
            throw ValidationException::withMessages([
                'code' => ['無効なコードです。'],
            ]);
        }

        $existingSeed = UserSeed::where('user_id', $user->id)
            ->where('qr_code_id', $qrCode->id)
            ->first();

        if ($existingSeed) {
            return $existingSeed;
        }

        return DB::transaction(function () use ($user, $qrCode) {
            return UserSeed::create([
                'user_id' => $user->id,
                'qr_code_id' => $qrCode->id,
                'seed_type' => $qrCode->seed_type,
                'status' => 'acquired',
            ]);
        });
    }
}
