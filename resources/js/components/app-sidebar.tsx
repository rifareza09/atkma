import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Package,
    Building2,
    FileCheck,
    CheckSquare,
    FileText,
    Settings,
    ClipboardCheck,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
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
    inventoryIndex,
    ruanganIndex,
    transaksiPermintaanIndex,
    transaksiMasukIndex,
    laporanInventaris,
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
        href: inventoryIndex(),
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
        <Sidebar 
            collapsible="icon" 
            variant="inset" 
            className="bg-[#2563eb] transition-smooth"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            size="lg" 
                            asChild 
                            className="hover:bg-white/10 transition-smooth group"
                        >
                            <Link href={dashboard()} prefetch className="flex items-center gap-3">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="gap-0">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavMain items={settingsNavItems} />
            </SidebarFooter>
        </Sidebar>
    );
}
