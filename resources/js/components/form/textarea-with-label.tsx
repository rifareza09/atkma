import type { TextareaHTMLAttributes } from 'react';
import { Label } from '@/components/ui/label';

interface TextareaWithLabelProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    required?: boolean;
    helperText?: string;
}

export function TextareaWithLabel({
    label,
    error,
    required,
    helperText,
    id,
    className,
    ...props
}: TextareaWithLabelProps) {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-2">
            <Label htmlFor={textareaId} className="text-sm font-medium">
                {label}
                {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
            <textarea
                id={textareaId}
                className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                    error ? 'border-destructive' : ''
                } ${className || ''}`}
                {...props}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            {helperText && !error && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    );
}
