import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface ValidatedInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    validate?: (value: string) => string | undefined;
    showValidIcon?: boolean;
}

export const ValidatedInput = forwardRef<
    HTMLInputElement,
    ValidatedInputProps
>(
    (
        {
            label,
            error,
            hint,
            validate,
            showValidIcon = true,
            className,
            onChange,
            ...props
        },
        ref
    ) => {
        const [touched, setTouched] = useState(false);
        const [validationError, setValidationError] = useState<
            string | undefined
        >();

        const displayError = error || validationError;
        const isValid = touched && !displayError && props.value;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            if (validate && touched) {
                const error = validate(value);
                setValidationError(error);
            }

            onChange?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true);
            if (validate) {
                const error = validate(e.target.value);
                setValidationError(error);
            }
            props.onBlur?.(e);
        };

        return (
            <div className="space-y-2">
                {label && (
                    <Label htmlFor={props.id} className="text-sm font-medium">
                        {label}
                        {props.required && (
                            <span className="text-destructive ml-1">*</span>
                        )}
                    </Label>
                )}
                <div className="relative">
                    <Input
                        ref={ref}
                        className={cn(
                            displayError && 'border-destructive focus-visible:ring-destructive',
                            isValid && 'border-green-500 focus-visible:ring-green-500',
                            showValidIcon && (displayError || isValid) && 'pr-10',
                            className
                        )}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={displayError ? 'true' : 'false'}
                        aria-describedby={
                            displayError
                                ? `${props.id}-error`
                                : hint
                                ? `${props.id}-hint`
                                : undefined
                        }
                        {...props}
                    />
                    {showValidIcon && displayError && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
                    )}
                    {showValidIcon && isValid && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                </div>
                {displayError && (
                    <p
                        id={`${props.id}-error`}
                        className="text-sm text-destructive flex items-center gap-1"
                        role="alert"
                    >
                        {displayError}
                    </p>
                )}
                {!displayError && hint && (
                    <p
                        id={`${props.id}-hint`}
                        className="text-sm text-muted-foreground"
                    >
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

ValidatedInput.displayName = 'ValidatedInput';
