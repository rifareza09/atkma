import { usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenuContent } from '@/components/user-menu-content';
import { NotificationDropdown } from '@/components/notification-dropdown';
import type { BreadcrumbItem as BreadcrumbItemType, SharedData } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    // Get initials from user name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 
                         border-b border-slate-800 bg-[#0f172a] px-6
                         group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 
                         md:px-4 lg:px-6">
            <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg p-2 transition-colors" />
                <div className="hidden md:block">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
                {/* Notification Bell */}
                <NotificationDropdown />
                
                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 md:gap-3 rounded-xl px-2 md:px-3 py-2 
                                         hover:bg-slate-800 border border-slate-700 transition-colors">
                            {/* User Info - Hidden on mobile */}
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-semibold text-slate-100">
                                    {user?.name || 'Admin User'}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {user?.username || 'admin'}
                                </p>
                            </div>
                            
                            {/* Avatar */}
                            <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center 
                                          rounded-full bg-indigo-600 text-xs md:text-sm font-bold text-white 
                                          shadow-lg ring-2 ring-indigo-500/40">
                                {user?.name ? getInitials(user.name) : 'AU'}
                            </div>
                            
                            {/* Chevron Icon */}
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                        align="end" 
                        className="w-56"
                    >
                        {user && <UserMenuContent user={user} />}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
