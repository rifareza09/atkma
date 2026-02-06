import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { SelectOption } from '@/types';

interface SelectWithLabelProps {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    error?: string;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
}

export function SelectWithLabel({
    label,
    value,
    onValueChange,
    options,
    error,
    required,
    placeholder = 'Pilih opsi',
    disabled,
}: SelectWithLabelProps) {
    const selectId = label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-2">
            <Label htmlFor={selectId} className="text-sm font-medium">
                {label}
                {required && <span className="ml-1 text-destructive">*</span>}
            </Label>
            <Select value={value} onValueChange={onValueChange} disabled={disabled}>
                <SelectTrigger
                    id={selectId}
                    className={error ? 'border-destructive' : ''}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={String(option.value)}
                            value={String(option.value)}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
