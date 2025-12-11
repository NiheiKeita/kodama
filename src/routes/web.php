<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminLoginController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\ImageController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Web\LoginController;
use App\Http\Controllers\Web\PasswordController;
use App\Http\Controllers\Web\TopController;
use App\Http\Controllers\Kodama\AuthController as KodamaAuthController;
use App\Http\Controllers\Kodama\GardenController as KodamaGardenController;
use App\Http\Controllers\Kodama\HomeController as KodamaHomeController;
use App\Http\Controllers\Kodama\SeedController as KodamaSeedController;
use App\Http\Middleware\VerifyCsrfToken;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => 'basicauth'], function () {
    Route::get('/', [TopController::class, 'index'])->name('web.top');
    Route::fallback(function () {
        return redirect(route('web.top'));
    });

    Route::middleware('guest.web')->group(function () {
        Route::get('password/edit/{token}', [PasswordController::class, 'edit'])->name('web.password.edit');
        Route::post('password/edit/{token}', [PasswordController::class, 'update'])->name('web.password.update');
    });
    Route::get('login', [LoginController::class, 'create'])->name('user.login');
    Route::post('login', [LoginController::class, 'store']);
    Route::post('kodama/auth/mock', [KodamaAuthController::class, 'mock'])->name('kodama.auth.mock');
    Route::get('kodama', [KodamaHomeController::class, 'index'])->name('kodama.home');
    Route::get('seed', [KodamaSeedController::class, 'show'])->name('kodama.seed.show');


    //管理画面側
    Route::get('admin/login', [AdminLoginController::class, 'index'])->name('admin.login');
    Route::post('admin/login', [AdminLoginController::class, 'store'])->name('admin.login');
    Route::middleware('guest.admin')->group(function () {
        Route::get('admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard.index');

        Route::get('admin/admin_users', [AdminUserController::class, 'index'])->name('admin_user.list');
        Route::get('admin/admin_users/add', [AdminUserController::class, 'create'])->name('admin_user.create');
        Route::post('admin/admin_users/add', [AdminUserController::class, 'store'])->name('admin_user.store');

        Route::get('admin/users', [UserController::class, 'index'])->name('user.list');
        Route::get('admin/users/add', [UserController::class, 'create'])->name('user.create');
        Route::post('admin/users/add', [UserController::class, 'store'])->name('user.store');
        Route::get('admin/users/{id}', [UserController::class, 'edit'])->name('user.edit');
        Route::post('admin/users/{id}', [UserController::class, 'update'])->name('user.update');
    });

    // API
    Route::post('/api/upload', [ImageController::class, 'upload'])->withoutMiddleware(VerifyCsrfToken::class)->name('upload');
    Route::post('/api/upload/ma', [ImageController::class, 'maUpload'])->withoutMiddleware(VerifyCsrfToken::class)->name('upload.ma');
    Route::middleware('auth')->group(function () {
        Route::get('kodama/garden', [KodamaGardenController::class, 'index'])->name('kodama.garden');
        Route::get('/api/garden', [KodamaGardenController::class, 'list'])->name('kodama.api.garden');
        Route::post('/api/garden/seed/place', [KodamaGardenController::class, 'place'])->withoutMiddleware(VerifyCsrfToken::class)->name('kodama.api.garden.place');

        Route::post('/api/seed/claim', [KodamaSeedController::class, 'claim'])->withoutMiddleware(VerifyCsrfToken::class)->name('kodama.api.seed.claim');
    });
});
