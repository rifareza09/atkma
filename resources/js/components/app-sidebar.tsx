import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Package,
    Building2,
    FileCheck,
    CheckSquare,
    FileText,
    Settings,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    barangIndex,
    ruanganIndex,
    transaksiPermintaanIndex,
    transaksiMasukIndex,
    laporanInventaris
} from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inventory',
        href: barangIndex(),
        icon: Package,
    },
    {
        title: 'Requests',
        href: transaksiPermintaanIndex(),
        icon: FileCheck,
    },
    {
        title: 'Approval Management',
        href: transaksiPermintaanIndex(),
        icon: CheckSquare,
        badge: '12',
    },
    {
        title: 'Rooms',
        href: ruanganIndex(),
        icon: Building2,
    },
    {
        title: 'Reports',
        href: laporanInventaris(),
        icon: FileText,
    },
];

const settingsNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '#',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Mahkamah Agung RI',
        href: 'https://www.mahkamahagung.go.id',
        icon: Building2,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-[#3B5998] border-r-0">
            <SidebarHeader className="bg-[#3B5998] border-b border-white/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-white/10">
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-[#3B5998]">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="bg-[#3B5998] border-t border-white/10">
                <NavMain items={settingsNavItems} />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
