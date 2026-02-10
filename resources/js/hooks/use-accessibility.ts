import { useEffect, useRef } from 'react';

/**
 * Hook to trap focus within a container element
 * Useful for modals, dialogs, and dropdown menus
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
    isActive: boolean = true
) {
    const containerRef = useRef<T>(null);

    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const container = containerRef.current;
        const focusableElements = container.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element on mount
        firstElement?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        container.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('keydown', handleKeyDown);
        };
    }, [isActive]);

    return containerRef;
}

/**
 * Hook to handle ESC key press
 */
export function useEscapeKey(callback: () => void, isActive: boolean = true) {
    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                callback();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback, isActive]);
}

/**
 * Hook to restore focus to the element that triggered the dialog
 */
export function useRestoreFocus() {
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        previouslyFocusedElement.current = document.activeElement as HTMLElement;

        return () => {
            previouslyFocusedElement.current?.focus();
        };
    }, []);
}
