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
            'tanggal'              => ['required', 'date', 'before_or_equal:today'],
            'sumber_tujuan'        => ['nullable', 'string', 'max:255'],
            'nomor_referensi'      => ['nullable', 'string', 'max:255'],
            'keterangan'           => ['nullable', 'string', 'max:1000'],
            'nomor_faktur'         => ['nullable', 'string', 'max:100'],
            'nomor_surat_jalan'    => ['nullable', 'string', 'max:100'],
            'tanggal_faktur'       => ['nullable', 'date'],
            'items'                => ['required', 'array', 'min:1'],
            'items.*.barang_id'    => ['required', 'integer', 'exists:barangs,id'],
            'items.*.jumlah'       => ['required', 'integer', 'min:1', 'max:999999'],
        ];
    }

    /**
     * Get custom attribute names for validator errors.
     */
    public function attributes(): array
    {
        return [
            'tanggal'           => 'tanggal barang masuk',
            'sumber_tujuan'     => 'sumber',
            'nomor_referensi'   => 'nomor referensi',
            'nomor_faktur'      => 'nomor faktur',
            'nomor_surat_jalan' => 'nomor surat jalan',
            'tanggal_faktur'    => 'tanggal faktur',
            'keterangan'        => 'keterangan',
            'items'             => 'daftar barang',
            'items.*.barang_id' => 'barang',
            'items.*.jumlah'    => 'jumlah barang',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'tanggal.required'            => 'Tanggal barang masuk harus diisi.',
            'tanggal.date'                => 'Format tanggal tidak valid.',
            'tanggal.before_or_equal'     => 'Tanggal barang masuk tidak boleh lebih dari hari ini.',
            'items.required'              => 'Minimal 1 barang harus diisi.',
            'items.array'                 => 'Format daftar barang tidak valid.',
            'items.min'                   => 'Minimal 1 barang harus diisi.',
            'items.*.barang_id.required'  => 'Barang harus dipilih.',
            'items.*.barang_id.exists'    => 'Barang yang dipilih tidak valid.',
            'items.*.jumlah.required'     => 'Jumlah barang harus diisi.',
            'items.*.jumlah.integer'      => 'Jumlah barang harus berupa angka.',
            'items.*.jumlah.min'          => 'Jumlah barang minimal 1.',
            'items.*.jumlah.max'          => 'Jumlah barang maksimal 999999.',
        ];
    }
}
