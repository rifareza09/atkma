<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IncomingStockRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization handled by policy
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'nama_barang' => ['required', 'string', 'max:255'],
            'jumlah' => ['required', 'integer', 'min:1', 'max:999999'],
            'tanggal_masuk' => ['required', 'date', 'before_or_equal:today'],
            'keterangan' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Get custom attribute names for validator errors.
     */
    public function attributes(): array
    {
        return [
            'nama_barang' => 'nama barang',
            'jumlah' => 'jumlah barang',
            'tanggal_masuk' => 'tanggal barang masuk',
            'keterangan' => 'keterangan',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'nama_barang.required' => 'Nama barang harus diisi.',
            'nama_barang.string' => 'Nama barang harus berupa teks.',
            'nama_barang.max' => 'Nama barang maksimal 255 karakter.',
            'jumlah.required' => 'Jumlah barang harus diisi.',
            'jumlah.integer' => 'Jumlah barang harus berupa angka.',
            'jumlah.min' => 'Jumlah barang minimal 1.',
            'jumlah.max' => 'Jumlah barang maksimal 999999.',
            'tanggal_masuk.required' => 'Tanggal barang masuk harus diisi.',
            'tanggal_masuk.date' => 'Format tanggal tidak valid.',
            'tanggal_masuk.before_or_equal' => 'Tanggal barang masuk tidak boleh lebih dari hari ini.',
        ];
    }
}
