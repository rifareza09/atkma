import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps {
    value?: string;
    onSearch: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
    className?: string;
}

export function SearchInput({
    value = '',
    onSearch,
    placeholder = 'Cari...',
    debounceMs = 500,
    className,
}: SearchInputProps) {
    const [searchValue, setSearchValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchValue !== value) {
                onSearch(searchValue);
            }
        }, debounceMs);

        return () => clearTimeout(timeout);
    }, [searchValue, debounceMs, onSearch, value]);

    return (
        <div className={cn('relative', className)}>
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-9"
            />
        </div>
    );
}
