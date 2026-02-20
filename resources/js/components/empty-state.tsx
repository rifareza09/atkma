import { LucideIcon, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({
    icon: Icon = PackageOpen,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex min-h-[400px] flex-col items-center justify-center p-8 text-center',
                className
            )}
        >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Icon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-6 text-lg font-semibold">{title}</h3>
            {description && (
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                    {description}
                </p>
            )}
            {action && (
                <Button onClick={action.onClick} className="mt-6">
                    {action.label}
                </Button>
            )}
        </div>
    );
}
