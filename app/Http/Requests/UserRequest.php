<?php

namespace App\Http\Requests;

use App\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization handled by controller with policies
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user')?->id;
        $isUpdate = $this->isMethod('PUT') || $this->isMethod('PATCH');

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'username' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('users', 'username')->ignore($userId),
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'role' => [
                'required',
                Rule::enum(Role::class),
            ],
            'is_active' => [
                'sometimes',
                'boolean',
            ],
        ];

        // Password rules
        if ($isUpdate) {
            // Password optional on update
            $rules['password'] = [
                'nullable',
                'string',
                Password::min(8)
                    ->letters()
                    ->numbers(),
                'confirmed',
            ];
        } else {
            // Password required on create
            $rules['password'] = [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->numbers(),
                'confirmed',
            ];
        }

        return $rules;
    }

    /**
     * Get custom error messages
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama lengkap wajib diisi',
            'name.max' => 'Nama lengkap maksimal 255 karakter',
            'username.required' => 'Username wajib diisi',
            'username.unique' => 'Username sudah digunakan',
            'username.alpha_dash' => 'Username hanya boleh berisi huruf, angka, dash dan underscore',
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah digunakan',
            'role.required' => 'Role wajib dipilih',
            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 8 karakter',
            'password.confirmed' => 'Konfirmasi password tidak cocok',
        ];
    }

    /**
     * Get custom attribute names
     */
    public function attributes(): array
    {
        return [
            'name' => 'nama lengkap',
            'username' => 'username',
            'email' => 'email',
            'role' => 'role',
            'password' => 'password',
        ];
    }
}
