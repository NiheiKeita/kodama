<?php

namespace App\Http\Requests\Kodama;

use Illuminate\Foundation\Http\FormRequest;

class SeedClaimRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'code' => ['required', 'string'],
        ];
    }
}
