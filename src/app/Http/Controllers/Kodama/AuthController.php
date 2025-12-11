<?php

namespace App\Http\Controllers\Kodama;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function mock(Request $request): RedirectResponse
    {
        $user = User::firstOrCreate(
            ['google_uid' => 'mock-google-uid'],
            [
                'name' => 'KODAMA Guest',
                'email' => 'guest+kodama@example.com',
                'password' => bcrypt(Str::random(32)),
                'avatar_url' => null,
            ]
        );

        Auth::login($user, true);

        return redirect()->route('kodama.home');
    }
}
