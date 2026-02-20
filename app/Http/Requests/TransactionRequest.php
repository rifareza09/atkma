<?php

namespace App\Http\Requests;

use App\TransactionType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TransactionRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
<<<<<<< Updated upstream
            'ruangan_nama' => ['required_if:type,keluar', 'nullable', 'string', 'max:100'],
=======
            'ruangan_id' => ['required', 'integer', 'exists:ruangans,id'],
            'nama_peminta' => ['required', 'string', 'max:100'],
>>>>>>> Stashed changes
            'type' => ['required', Rule::enum(TransactionType::class)],
            'tanggal' => ['required', 'date'],
            'keperluan' => ['nullable', 'string', 'max:500'],
            'keterangan' => ['nullable', 'string', 'max:500'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.barang_id' => ['required', 'integer', 'exists:barangs,id'],
            'items.*.jumlah' => ['required', 'integer', 'min:1'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
<<<<<<< Updated upstream
            'ruangan_nama' => 'nama ruangan',
=======
            'ruangan_id' => 'ruangan',
            'nama_peminta' => 'nama peminta',
>>>>>>> Stashed changes
            'type' => 'tipe transaksi',
            'tanggal' => 'tanggal transaksi',
            'keperluan' => 'keperluan',
            'keterangan' => 'keterangan',
            'items' => 'daftar barang',
            'items.*.barang_id' => 'barang',
            'items.*.jumlah' => 'jumlah',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'items.required' => 'Minimal 1 barang harus dipilih',
            'items.min' => 'Minimal 1 barang harus dipilih',
            'items.*.barang_id.required' => 'Barang harus dipilih',
            'items.*.barang_id.exists' => 'Barang tidak ditemukan',
            'items.*.jumlah.required' => 'Jumlah harus diisi',
            'items.*.jumlah.min' => 'Jumlah minimal 1',
        ];
    }
}
