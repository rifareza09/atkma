<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionApprovalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $action = $this->route()->getActionMethod();

        return match ($action) {
            'reject' => [
                'rejection_reason' => ['required', 'string', 'min:10', 'max:1000'],
            ],
            'revise' => [
                'revision_notes' => ['required', 'string', 'min:10', 'max:1000'],
            ],
            default => [],
        };
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'rejection_reason.required' => 'Alasan penolakan harus diisi.',
            'rejection_reason.min' => 'Alasan penolakan minimal :min karakter.',
            'rejection_reason.max' => 'Alasan penolakan maksimal :max karakter.',
            'revision_notes.required' => 'Catatan revisi harus diisi.',
            'revision_notes.min' => 'Catatan revisi minimal :min karakter.',
            'revision_notes.max' => 'Catatan revisi maksimal :max karakter.',
        ];
    }
}

