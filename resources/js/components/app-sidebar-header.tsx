import { usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenuContent } from '@/components/user-menu-content';
import { NotificationDropdown } from '@/components/notification-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { BreadcrumbItem as BreadcrumbItemType, SharedData } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const getInitials = useInitials();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const userName = user?.name?.split(' ')[0] || 'User';

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 
                         bg-white px-6 shadow-sm rounded-2xl mb-4
                         group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 
                         md:px-6 lg:px-8">
            {/* Left Section - Logo/Brand & Welcome */}
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1 text-gray-700 hover:bg-gray-100 rounded-lg p-2" />
                <div className="hidden md:block">
                    <p className="text-sm text-gray-500">
                        Welcome back, <span className="text-blue-600 font-semibold">{userName}! 👋</span>
                    </p>
                </div>
            </div>
            
            {/* Right Section - Icons & Profile */}
            <div className="flex items-center gap-3">
                {/* Notification */}
                <NotificationDropdown />
                
                {/* User Avatar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 focus:outline-none">
                            <Avatar className="h-9 w-9 ring-2 ring-gray-200 hover:ring-blue-500 transition-all cursor-pointer">
                                <AvatarImage src={user?.avatar} alt={user?.name} />
                                <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
                                    {getInitials(user?.name || 'User')}
                                </AvatarFallback>
                            </Avatar>
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
