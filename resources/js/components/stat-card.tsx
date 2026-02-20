import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export function StatCard({
    title,
    value,
    icon,
    description,
    trend,
    className,
}: StatCardProps) {
    // Ensure value is never undefined
    const displayValue = value ?? 0;
    
    return (
        <Card className={cn("transition-smooth hover:shadow-xl hover:-translate-y-1 hover-glow border-2 hover:border-blue-200", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-muted-foreground transition-smooth hover:scale-125 hover:rotate-12 animate-bounce-subtle">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl md:text-3xl font-bold animate-fade-in">{displayValue}</div>
                {description && (
                    <p className="text-xs text-gray-600 mt-1">{description}</p>
                )}
                {trend && (
                    <div className="flex items-center gap-1 mt-2">
                        <span
                            className={cn(
                                "inline-flex items-center text-xs font-medium px-2 py-1 rounded-full",
                                trend.isPositive 
                                    ? "bg-green-100 text-green-700" 
                                    : "bg-red-100 text-red-700"
                            )}
                        >
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </span>
                        <span className="text-xs text-gray-500">dari bulan lalu</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
