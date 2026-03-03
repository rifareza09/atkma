import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
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
        <SidebarGroup className="px-2 py-3">
            <SidebarGroupLabel className="text-white/60 text-xs font-medium uppercase tracking-wider px-3 mb-2">
                Platform
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item, index) => (
                    <SidebarMenuItem 
                        key={item.title}
                    >
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                            className="group relative text-white/80 hover:text-white hover:bg-white/10 
                                     data-[active=true]:bg-white data-[active=true]:text-[#2563eb]
                                     rounded-xl px-3 py-2 transition-all duration-150"
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-3 w-full">
                                {item.icon && (
                                    <item.icon 
                                        className="flex-shrink-0 group-data-[active=true]:text-[#2563eb] text-white" 
                                        size={20} 
                                        strokeWidth={2}
                                    />
                                )}
                                <span className="text-sm font-medium group-data-[active=true]:text-[#2563eb] text-white">
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
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
