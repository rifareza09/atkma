import { Head, Link } from '@inertiajs/react';
import { 
    Package2, 
    AlertCircle,
    FileCheck,
    Eye,
    ExternalLink,
    Download,
    CheckCheck,
    Info,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        total_items: number;
        low_stock: number;
        pending_review: number;
        monthly_quota_percentage: number;
    };
    pending_approvals: Array<{
        id: number;
        date: string;
        requester_room: string;
        items: string[];
        items_count: number;
        status: string;
    }>;
    low_stock_items: Array<{
        id: number;
        name: string;
        remaining: number;
        unit: string;
        status: string;
    }>;
    workflow_stats: {
        approved: number;
        rejected: number;
        revised: number;
        pending: number;
    };
}

export default function Dashboard({ 
    stats, 
    pending_approvals,
    low_stock_items,
    workflow_stats,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-50">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Inventory Dashboard Overview</h1>
                </div>

                {/* Stats Cards and Monthly Quota */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Total Items Card */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">TOTAL ITEMS</p>
                                    <p className="text-3xl font-bold mt-2">{stats.total_items.toLocaleString()}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                                    <Package2 className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Low Stock Card */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">LOW STOCK</p>
                                    <p className="text-3xl font-bold mt-2 text-orange-600">{stats.low_stock}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                                    <AlertCircle className="h-6 w-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Review Card */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">PENDING REVIEW</p>
                                    <p className="text-3xl font-bold mt-2 text-amber-600">{stats.pending_review}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50">
                                    <FileCheck className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Monthly Quota Status */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded bg-green-50">
                                    <CheckCheck className="h-4 w-4 text-green-600" />
                                </div>
                                <p className="text-sm font-semibold text-gray-700">MONTHLY QUOTA STATUS</p>
                            </div>
                            <span className="text-sm font-bold text-green-600">{stats.monthly_quota_percentage}% Used</span>
                        </div>
                        <Progress value={stats.monthly_quota_percentage} className="h-2" />
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Pending Approvals & Workflow Statistics */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Pending Approvals */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-4">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-lg">Pending Approvals</CardTitle>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                        Priority View
                                    </Badge>
                                </div>
                                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    View Approval Management
                                    <ExternalLink className="h-3 w-3" />
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>REQUEST DATE</TableHead>
                                            <TableHead>REQUESTER ROOM</TableHead>
                                            <TableHead>ITEMS</TableHead>
                                            <TableHead>STATUS</TableHead>
                                            <TableHead>ACTION</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pending_approvals.map((approval) => (
                                            <TableRow key={approval.id}>
                                                <TableCell className="font-medium">{approval.date}</TableCell>
                                                <TableCell>{approval.requester_room}</TableCell>
                                                <TableCell>
                                                    {approval.items.slice(0, 2).join(', ')}
                                                    {approval.items_count > 2 && ` (+${approval.items_count - 2})`}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                                                        Diproses
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="h-4 w-4 text-blue-600" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {pending_approvals.length === 0 && (
                                    <p className="py-8 text-center text-sm text-muted-foreground">
                                        No pending approvals
                                    </p>
                                )}
                                <div className="mt-4 text-center">
                                    <Button variant="link" className="text-blue-600">
                                        Load more pending requests
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Workflow Statistics & Quick Actions */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Workflow Statistics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative mx-auto w-48 h-48">
                                        {/* Donut Chart - Using CSS */}
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke="#22c55e"
                                                strokeWidth="20"
                                                strokeDasharray={`${workflow_stats.approved * 2.51} ${251 - workflow_stats.approved * 2.51}`}
                                                transform="rotate(-90 50 50)"
                                            />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="20"
                                                strokeDasharray={`${workflow_stats.rejected * 2.51} ${251 - workflow_stats.rejected * 2.51}`}
                                                strokeDashoffset={-workflow_stats.approved * 2.51}
                                                transform="rotate(-90 50 50)"
                                            />
                                            <text x="50" y="50" textAnchor="middle" dy=".3em" className="text-2xl font-bold fill-gray-900">
                                                {workflow_stats.approved + workflow_stats.rejected + workflow_stats.pending}
                                            </text>
                                            <text x="50" y="65" textAnchor="middle" className="text-xs fill-gray-500">
                                                Total
                                            </text>
                                        </svg>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-green-500" />
                                                <span>Diterima (Approved)</span>
                                            </div>
                                            <span className="font-semibold">{workflow_stats.approved}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                                <span>Ditolak (Rejected)</span>
                                            </div>
                                            <span className="font-semibold">{workflow_stats.rejected}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-blue-500" />
                                                <span>Di revisi (Revised)</span>
                                            </div>
                                            <span className="font-semibold">{workflow_stats.revised}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full bg-amber-500" />
                                                <span>Diproses (Pending)</span>
                                            </div>
                                            <span className="font-semibold">{workflow_stats.pending}%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                                    <CardDescription>Commonly used workflow tools</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        <CheckCheck className="mr-2 h-4 w-4" />
                                        Bulk Approve
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export Logs
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column - Low Stock Alert & Workflow Tip */}
                    <div className="flex flex-col gap-6">
                        {/* Low Stock Alert */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-4">
                                <CardTitle className="text-lg">Low Stock Alert</CardTitle>
                                <Badge variant="destructive" className="bg-red-600">
                                    Action Needed
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {low_stock_items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="h-5 w-5 text-orange-500" />
                                            <div>
                                                <p className="font-semibold text-sm">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.remaining} {item.unit} {item.status !== 'Critical' ? item.status : ''}
                                                    {item.status === 'Critical' && (
                                                        <span className="text-red-600 font-semibold"> ({item.status})</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                                            Restock
                                        </Badge>
                                    </div>
                                ))}
                                {low_stock_items.length === 0 && (
                                    <p className="py-4 text-center text-sm text-muted-foreground">
                                        All stock levels are healthy
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Workflow Tip */}
                        <Card className="bg-gray-900 text-white border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg text-white">Workflow Tip</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Items with status 'Diproses' require your final verification before they can be released from the stock. Check the "Approval Management" tab for detailed breakdowns.
                                </p>
                                <Button variant="secondary" size="sm" className="w-full">
                                    <Info className="mr-2 h-4 w-4" />
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
