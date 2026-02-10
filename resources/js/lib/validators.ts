// Validation utility functions

export const validators = {
    required: (fieldName: string) => (value: string) => {
        return value.trim() ? undefined : `${fieldName} wajib diisi`;
    },

    email: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? undefined : 'Email tidak valid';
    },

    minLength: (min: number, fieldName: string) => (value: string) => {
        return value.length >= min
            ? undefined
            : `${fieldName} minimal ${min} karakter`;
    },

    maxLength: (max: number, fieldName: string) => (value: string) => {
        return value.length <= max
            ? undefined
            : `${fieldName} maksimal ${max} karakter`;
    },

    numeric: (value: string) => {
        return /^\d+$/.test(value) ? undefined : 'Harus berupa angka';
    },

    phone: (value: string) => {
        const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
        return phoneRegex.test(value)
            ? undefined
            : 'Nomor telepon tidak valid';
    },

    alphanumeric: (value: string) => {
        return /^[a-zA-Z0-9]+$/.test(value)
            ? undefined
            : 'Hanya boleh huruf dan angka';
    },

    username: (value: string) => {
        return /^[a-zA-Z0-9_-]+$/.test(value)
            ? undefined
            : 'Username hanya boleh huruf, angka, underscore, dan dash';
    },

    password: (value: string) => {
        if (value.length < 8) {
            return 'Password minimal 8 karakter';
        }
        if (!/[A-Z]/.test(value)) {
            return 'Password harus mengandung huruf besar';
        }
        if (!/[a-z]/.test(value)) {
            return 'Password harus mengandung huruf kecil';
        }
        if (!/[0-9]/.test(value)) {
            return 'Password harus mengandung angka';
        }
        return undefined;
    },

    match: (otherValue: string, fieldName: string) => (value: string) => {
        return value === otherValue
            ? undefined
            : `${fieldName} tidak cocok`;
    },

    url: (value: string) => {
        try {
            new URL(value);
            return undefined;
        } catch {
            return 'URL tidak valid';
        }
    },

    // Compose multiple validators
    compose: (...validators: Array<(value: string) => string | undefined>) => {
        return (value: string) => {
            for (const validator of validators) {
                const error = validator(value);
                if (error) return error;
            }
            return undefined;
        };
    },
};

// Check if form is valid
export function isFormValid(errors: Record<string, string | undefined>): boolean {
    return Object.values(errors).every((error) => !error);
}

// Get form error messages
export function getFormErrors(errors: Record<string, string | undefined>): string[] {
    return Object.values(errors).filter((error): error is string => !!error);
}
