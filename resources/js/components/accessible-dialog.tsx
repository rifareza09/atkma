import { ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useFocusTrap, useEscapeKey, useRestoreFocus } from '@/hooks/use-accessibility';

interface AccessibleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function AccessibleDialog({
    open,
    onOpenChange,
    title,
    description,
    children,
    className,
}: AccessibleDialogProps) {
    const containerRef = useFocusTrap<HTMLDivElement>(open);
    
    useEscapeKey(() => onOpenChange(false), open);
    useRestoreFocus();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                ref={containerRef as any}
                className={className}
                aria-labelledby="dialog-title"
                aria-describedby={description ? 'dialog-description' : undefined}
            >
                <DialogHeader>
                    <DialogTitle id="dialog-title">{title}</DialogTitle>
                    {description && (
                        <DialogDescription id="dialog-description">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
