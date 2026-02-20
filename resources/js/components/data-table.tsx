import type { ReactNode } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { SkeletonTable } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/empty-state';
import { ResponsiveTableWrapper } from '@/components/responsive-table';
import { PackageOpen, LucideIcon } from 'lucide-react';

export interface Column<T> {
    key: string;
    label: string;
    render?: (item: T, index: number) => ReactNode;
    sortable?: boolean;
    className?: string;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField?: keyof T;
    emptyMessage?: string;
    emptyDescription?: string;
    emptyIcon?: LucideIcon;
    emptyAction?: {
        label: string;
        onClick: () => void;
    };
    isLoading?: boolean;
    'aria-label'?: string;
}

export function DataTable<T extends Record<string, unknown>>({
    columns,
    data,
    keyField = 'id' as keyof T,
    emptyMessage = 'Tidak ada data',
    emptyDescription,
    emptyIcon = PackageOpen,
    emptyAction,
    isLoading = false,
    'aria-label': ariaLabel,
}: DataTableProps<T>) {
    if (isLoading) {
        return <SkeletonTable rows={5} />;
    }

    if (data.length === 0) {
        return (
            <EmptyState
                icon={emptyIcon}
                title={emptyMessage}
                description={emptyDescription}
                action={emptyAction}
            />
        );
    }

    return (
        <ResponsiveTableWrapper>
            <Table aria-label={ariaLabel}>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead
                                key={column.key}
                                className={column.className}
                            >
                                {column.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={String(item[keyField])}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    className={column.className}
                                >
                                    {column.render
                                        ? column.render(item, index)
                                        : String(item[column.key] ?? '-')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ResponsiveTableWrapper>
    );
}
