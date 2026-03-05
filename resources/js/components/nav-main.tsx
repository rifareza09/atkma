import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-3">
            <SidebarMenu className="space-y-1">
                {items.map((item, index) => {
                    const isActive = isCurrentUrl(item.href);
                    return (
                        <SidebarMenuItem 
                            key={item.title}
                            className="relative"
                        >
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                                className="group relative text-white hover:text-white hover:bg-white/10 
                                         data-[active=true]:bg-white/30 data-[active=true]:text-white
                                         data-[active=true]:shadow-md data-[active=true]:font-semibold
                                         rounded-lg px-4 py-2.5 transition-all duration-200"
                            >
                                <Link href={item.href} prefetch className="flex items-center gap-3 w-full">
                                    {item.icon && (
                                        <item.icon 
                                            className="flex-shrink-0 text-white" 
                                            size={18} 
                                            strokeWidth={2}
                                        />
                                    )}
                                    <span className="text-sm font-medium text-white">
                                        {item.title}
                                    </span>
                                    {item.badge && (
                                        <SidebarMenuBadge className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                            {item.badge}
                                        </SidebarMenuBadge>
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
