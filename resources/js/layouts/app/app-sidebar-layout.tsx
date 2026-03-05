import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-y-auto">
                <div className="sticky top-0 z-50 pt-2 px-2 bg-background">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                </div>
                <div className="flex-1 min-h-0 overflow-x-clip px-2">
                    {children}
                </div>
            </AppContent>
        </AppShell>
    );
}
