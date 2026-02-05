<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RuanganRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $ruanganId = $this->route('ruangan');

        return [
            'kode' => [
                'required',
                'string',
                'max:50',
                Rule::unique('ruangans', 'kode')->ignore($ruanganId),
            ],
            'nama' => 'required|string|max:255',
            'penanggung_jawab' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'kode.required' => 'Kode ruangan harus diisi',
            'kode.unique' => 'Kode ruangan sudah digunakan',
            'nama.required' => 'Nama ruangan harus diisi',
        ];
    }
}
