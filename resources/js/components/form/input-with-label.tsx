import type { InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    required?: boolean;
    helperText?: string;
}

export function InputWithLabel({
    label,
    error,
    required,
    helperText,
    id,
    className,
    ...props
}: InputWithLabelProps) {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-2">
            <Label htmlFor={inputId} className="text-sm font-medium">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
                id={inputId}
                className={error ? 'border-destructive' : className}
                {...props}
            />
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    );
}
