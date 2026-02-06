import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PaginationMeta } from '@/types';

interface PaginationProps {
    meta: PaginationMeta;
    onPageChange?: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
    const { current_page, last_page, from, to, total } = meta;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 5;
        const halfShow = Math.floor(showPages / 2);

        let startPage = Math.max(1, current_page - halfShow);
        let endPage = Math.min(last_page, current_page + halfShow);

        // Adjust if at start
        if (current_page <= halfShow) {
            endPage = Math.min(showPages, last_page);
        }

        // Adjust if at end
        if (current_page + halfShow >= last_page) {
            startPage = Math.max(1, last_page - showPages + 1);
        }

        // Add first page
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add last page
        if (endPage < last_page) {
            if (endPage < last_page - 1) {
                pages.push('...');
            }
            pages.push(last_page);
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (onPageChange) {
            onPageChange(page);
        }
    };

    if (last_page <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-between px-2 py-4">
            <div className="text-sm text-muted-foreground">
                Menampilkan <span className="font-medium">{from}</span> sampai{' '}
                <span className="font-medium">{to}</span> dari{' '}
                <span className="font-medium">{total}</span> data
            </div>

            <div className="flex items-center space-x-2">
                {/* First Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(1)}
                    disabled={current_page === 1}
                    className="size-8"
                >
                    <ChevronsLeft className="size-4" />
                </Button>

                {/* Previous Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(current_page - 1)}
                    disabled={current_page === 1}
                    className="size-8"
                >
                    <ChevronLeft className="size-4" />
                </Button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                    <div key={index}>
                        {page === '...' ? (
                            <span className="px-2">...</span>
                        ) : (
                            <Button
                                variant={current_page === page ? 'default' : 'outline'}
                                size="icon"
                                onClick={() => handlePageChange(page as number)}
                                className="size-8"
                            >
                                {page}
                            </Button>
                        )}
                    </div>
                ))}

                {/* Next Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(current_page + 1)}
                    disabled={current_page === last_page}
                    className="size-8"
                >
                    <ChevronRight className="size-4" />
                </Button>

                {/* Last Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(last_page)}
                    disabled={current_page === last_page}
                    className="size-8"
                >
                    <ChevronsRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}
