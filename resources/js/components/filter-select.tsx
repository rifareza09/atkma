import { Filter } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface FilterOption {
    value: string;
    label: string;
}

interface FilterSelectProps {
    value?: string;
    onValueChange: (value: string) => void;
    options: FilterOption[];
    placeholder?: string;
    label?: string;
    className?: string;
}

export function FilterSelect({
    value,
    onValueChange,
    options,
    placeholder = 'Pilih filter',
    label,
    className,
}: FilterSelectProps) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            {label && (
                <div className="flex items-center gap-2 text-sm font-medium">
                    <Filter className="size-4 text-muted-foreground" />
                    <span>{label}</span>
                </div>
            )}
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
