import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutocompleteInputProps {
    value: string;
    onChange: (value: string) => void;
    suggestions: string[];
    placeholder?: string;
    onSelectSuggestion?: (value: string) => void;
    className?: string;
}

export function AutocompleteInput({
    value,
    onChange,
    suggestions,
    placeholder,
    onSelectSuggestion,
    className,
}: AutocompleteInputProps) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter suggestions berdasarkan input
    useEffect(() => {
        if (value.trim()) {
            const filtered = suggestions.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions(suggestions.slice(0, 5)); // Tampilkan 5 terakhir
        }
    }, [value, suggestions]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        setShowSuggestions(true);
        setActiveSuggestionIndex(-1);
    };

    const handleSuggestionClick = (suggestion: string) => {
        onChange(suggestion);
        setShowSuggestions(false);
        onSelectSuggestion?.(suggestion);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || filteredSuggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestionIndex((prev) =>
                prev < filteredSuggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(filteredSuggestions[activeSuggestionIndex]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleInputFocus = () => {
        if (suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    const clearInput = () => {
        onChange('');
        inputRef.current?.focus();
    };

    return (
        <div ref={wrapperRef} className="relative">
            <div className="relative">
                <Input
                    ref={inputRef}
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    placeholder={placeholder}
                    className={cn('pr-8', className)}
                    autoComplete="off"
                />
                {value && (
                    <button
                        type="button"
                        onClick={clearInput}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear input"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div className="py-1">
                        {filteredSuggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className={cn(
                                    'w-full text-left px-4 py-2 text-sm transition-colors',
                                    'hover:bg-gray-100',
                                    index === activeSuggestionIndex && 'bg-blue-50 text-blue-600'
                                )}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
