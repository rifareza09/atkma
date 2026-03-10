import { useState, useEffect } from 'react';

/**
 * Hook untuk mengelola history nama yang disimpan di localStorage
 * @param key - Key unik untuk menyimpan history di localStorage
 * @param maxItems - Maksimal jumlah item yang disimpan (default: 10)
 */
export function useNameHistory(key: string, maxItems: number = 10) {
    const [history, setHistory] = useState<string[]>([]);

    // Load history dari localStorage saat mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(key);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setHistory(parsed);
                }
            }
        } catch (error) {
            console.error('Error loading history:', error);
        }
    }, [key]);

    // Simpan nama baru ke history
    const addToHistory = (name: string) => {
        if (!name || !name.trim()) return;

        const trimmedName = name.trim();
        
        // Hapus duplikat dan tambahkan ke awal array
        const newHistory = [
            trimmedName,
            ...history.filter((item) => item !== trimmedName),
        ].slice(0, maxItems); // Batasi jumlah item

        setHistory(newHistory);
        
        try {
            localStorage.setItem(key, JSON.stringify(newHistory));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    };

    // Hapus item dari history
    const removeFromHistory = (name: string) => {
        const newHistory = history.filter((item) => item !== name);
        setHistory(newHistory);
        
        try {
            localStorage.setItem(key, JSON.stringify(newHistory));
        } catch (error) {
            console.error('Error removing from history:', error);
        }
    };

    // Bersihkan semua history
    const clearHistory = () => {
        setHistory([]);
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    };

    return {
        history,
        addToHistory,
        removeFromHistory,
        clearHistory,
    };
}
