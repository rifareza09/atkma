import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTableWrapperProps {
    children: ReactNode;
    className?: string;
}

export function ResponsiveTableWrapper({
    children,
    className,
}: ResponsiveTableWrapperProps) {
    return (
        <div
            className={cn(
                'relative w-full overflow-auto',
                'rounded-md border',
                'max-h-[calc(100vh-300px)]',
                className
            )}
        >
            <div className="min-w-full inline-block align-middle">
                {children}
            </div>
        </div>
    );
}

/**
 * Mobile-friendly card view for table data
 * Shows data in a card format on small screens
 */
interface MobileTableCardProps {
    children: ReactNode;
    className?: string;
}

export function MobileTableCard({
    children,
    className,
}: MobileTableCardProps) {
    return (
        <div
            className={cn(
                'block md:hidden',
                'space-y-4',
                className
            )}
        >
            {children}
        </div>
    );
}

/**
 * Desktop table view
 * Hidden on mobile, shown on medium screens and up
 */
interface DesktopTableProps {
    children: ReactNode;
    className?: string;
}

export function DesktopTable({
    children,
    className,
}: DesktopTableProps) {
    return (
        <div className={cn('hidden md:block', className)}>
            <ResponsiveTableWrapper>
                {children}
            </ResponsiveTableWrapper>
        </div>
    );
}
