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
            'barang_id'       => ['required', 'integer', 'exists:barangs,id'],
            'jumlah'          => ['required', 'integer', 'min:1', 'max:999999'],
            'tanggal'         => ['required', 'date', 'before_or_equal:today'],
            'sumber_tujuan'   => ['nullable', 'string', 'max:255'],
            'nomor_referensi' => ['nullable', 'string', 'max:255'],
            'keterangan'      => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Get custom attribute names for validator errors.
     */
    public function attributes(): array
    {
        return [
            'barang_id'       => 'barang',
            'jumlah'          => 'jumlah barang',
            'tanggal'         => 'tanggal barang masuk',
            'sumber_tujuan'   => 'sumber',
            'nomor_referensi' => 'nomor referensi',
            'keterangan'      => 'keterangan',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'barang_id.required' => 'Barang harus dipilih.',
            'barang_id.exists'   => 'Barang yang dipilih tidak valid.',
            'jumlah.required'    => 'Jumlah barang harus diisi.',
            'jumlah.integer'     => 'Jumlah barang harus berupa angka.',
            'jumlah.min'         => 'Jumlah barang minimal 1.',
            'jumlah.max'         => 'Jumlah barang maksimal 999999.',
            'tanggal.required'          => 'Tanggal barang masuk harus diisi.',
            'tanggal.date'              => 'Format tanggal tidak valid.',
            'tanggal.before_or_equal'   => 'Tanggal barang masuk tidak boleh lebih dari hari ini.',
        ];
    }
}
