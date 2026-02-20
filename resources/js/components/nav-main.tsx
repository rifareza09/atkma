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
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                            className="group relative text-white hover:text-white hover:bg-white/10 
                                     data-[active=true]:bg-white/20 data-[active=true]:text-white
                                     transition-smooth rounded-md px-3 py-2
                                     hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-3 w-full text-white">
                                {item.icon && (
                                    <item.icon 
                                        className="flex-shrink-0 transition-transform group-hover:scale-110 text-white" 
                                        size={20} 
                                        strokeWidth={2}
                                    />
                                )}
                                <span className="text-sm text-white">
                                    {item.title}
                                </span>
                                {item.badge && (
                                    <SidebarMenuBadge className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold animate-pulse">
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
