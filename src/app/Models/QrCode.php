<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QrCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'seed_type',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'bool',
    ];

    public function userSeeds(): HasMany
    {
        return $this->hasMany(UserSeed::class);
    }
}
