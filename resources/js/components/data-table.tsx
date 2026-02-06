import type { ReactNode } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';

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
    isLoading?: boolean;
}

export function DataTable<T extends Record<string, unknown>>({
    columns,
    data,
    keyField = 'id' as keyof T,
    emptyMessage = 'Tidak ada data',
    isLoading = false,
}: DataTableProps<T>) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center rounded-lg border border-dashed py-12">
                <div className="text-center">
                    <p className="text-muted-foreground">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
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
        </div>
    );
}
