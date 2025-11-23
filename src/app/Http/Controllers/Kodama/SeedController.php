<?php

namespace App\Http\Controllers\Kodama;

use App\Http\Controllers\Controller;
use App\Http\Requests\Kodama\SeedClaimRequest;
use App\Models\UserSeed;
use App\Services\Kodama\SeedClaimService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class SeedController extends Controller
{
    public function show(Request $request, SeedClaimService $service): Response|RedirectResponse
    {
        $code = (string) $request->query('code', '');

        if (!Auth::check()) {
            return Inertia::render('Web/KodamaSeedResult', [
                'code' => $code,
                'needsAuth' => true,
                'success' => false,
                'message' => 'タネを取得するにはログインしてください。',
                'seed' => null,
            ]);
        }

        if ($code === '') {
            return Inertia::render('Web/KodamaSeedResult', [
                'code' => $code,
                'needsAuth' => false,
                'success' => false,
                'message' => 'コードが指定されていません。',
                'seed' => null,
            ]);
        }

        try {
            $seed = $service->claim($request->user(), $code);
            return Inertia::render('Web/KodamaSeedResult', [
                'code' => $code,
                'needsAuth' => false,
                'success' => true,
                'message' => 'タネを手に入れました！',
                'seed' => $this->mapSeed($seed),
            ]);
        } catch (ValidationException $e) {
            return Inertia::render('Web/KodamaSeedResult', [
                'code' => $code,
                'needsAuth' => false,
                'success' => false,
                'message' => '無効なコードです。',
                'seed' => null,
            ]);
        }
    }

    public function claim(SeedClaimRequest $request, SeedClaimService $service): JsonResponse
    {
        $seed = $service->claim($request->user(), $request->validated('code'));

        return response()->json([
            'success' => true,
            'seed' => $this->mapSeed($seed),
        ]);
    }

    private function mapSeed(UserSeed $seed): array
    {
        return [
            'id' => $seed->id,
            'seedType' => $seed->seed_type,
            'status' => $seed->status,
            'posX' => $seed->pos_x,
            'posY' => $seed->pos_y,
        ];
    }
}
