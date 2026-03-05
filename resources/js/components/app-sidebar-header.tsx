import { usePage } from '@inertiajs/react';
import { Search, Bell } from 'lucide-react';
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
            
            {/* Center Section - Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-4">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 
                                 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all"
                    />
                </div>
            </div>
            
            {/* Right Section - Icons & Profile */}
            <div className="flex items-center gap-3">
                {/* Search Icon - Mobile */}
                <button 
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Search"
                    title="Search"
                >
                    <Search className="h-5 w-5 text-gray-600" />
                </button>
                
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
