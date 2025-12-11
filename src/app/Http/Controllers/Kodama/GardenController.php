<?php

namespace App\Http\Controllers\Kodama;

use App\Http\Controllers\Controller;
use App\Models\UserSeed;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class GardenController extends Controller
{
    public function index(Request $request): Response
    {
        $seeds = $this->mapSeeds($request->user()->userSeeds()->orderBy('id')->get());

        return Inertia::render('Web/KodamaGarden', [
            'seeds' => $seeds,
        ]);
    }

    public function list(Request $request): JsonResponse
    {
        $seeds = $this->mapSeeds($request->user()->userSeeds()->orderBy('id')->get());

        return response()->json(['seeds' => $seeds]);
    }

    public function place(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_seed_id' => ['required', 'integer', 'exists:user_seeds,id'],
            'pos_x' => ['required', 'numeric', 'between:0,1'],
            'pos_y' => ['required', 'numeric', 'between:0,1'],
        ]);

        $seed = UserSeed::where('id', $validated['user_seed_id'])
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$seed) {
            throw ValidationException::withMessages([
                'user_seed_id' => ['タネが見つかりません。'],
            ]);
        }

        $seed->update([
            'pos_x' => $validated['pos_x'],
            'pos_y' => $validated['pos_y'],
            'status' => 'planted',
        ]);

        return response()->json([
            'seed' => $this->mapSeed($seed),
        ]);
    }

    private function mapSeeds($seeds): array
    {
        return $seeds->map(fn (UserSeed $seed) => $this->mapSeed($seed))->all();
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
