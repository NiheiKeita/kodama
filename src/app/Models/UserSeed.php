<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSeed extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'qr_code_id',
        'seed_type',
        'status',
        'pos_x',
        'pos_y',
    ];

    protected $casts = [
        'pos_x' => 'float',
        'pos_y' => 'float',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function qrCode(): BelongsTo
    {
        return $this->belongsTo(QrCode::class);
    }
}
