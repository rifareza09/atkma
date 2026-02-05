<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BarangRequest extends FormRequest
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
        $barangId = $this->route('barang');

        return [
            'kode' => [
                'required',
                'string',
                'max:50',
                Rule::unique('barangs', 'kode')->ignore($barangId),
            ],
            'nama' => 'required|string|max:255',
            'satuan' => 'required|string|max:50',
            'stok' => 'required|integer|min:0',
            'stok_minimum' => 'required|integer|min:0',
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
            'kode.required' => 'Kode barang harus diisi',
            'kode.unique' => 'Kode barang sudah digunakan',
            'nama.required' => 'Nama barang harus diisi',
            'satuan.required' => 'Satuan harus diisi',
            'stok.required' => 'Stok harus diisi',
            'stok.min' => 'Stok minimal 0',
            'stok_minimum.required' => 'Stok minimum harus diisi',
            'stok_minimum.min' => 'Stok minimum minimal 0',
        ];
    }
}
