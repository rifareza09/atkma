import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Boxes,
    Building2,
    FileText,
    Settings2,
    Database,
    PackagePlus,
    BarChart2,
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
    barangMasukIndex,
    inventoryIndex,
    ruanganIndex,
    transaksiMasukIndex,
    laporanInventaris,
} from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';
import AppLogo from './app-logo';

const settingsNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '#',
        icon: Settings2,
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
    const { auth } = usePage<SharedData>().props;
    const userRole = auth?.user?.role;

    // Define menu items based on role
    const getMainNavItems = (): NavItem[] => {
        const baseItems: NavItem[] = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutDashboard,
            },
        ];

        // All users see the same menu (CRUD buttons are hidden in pages based on role)
        return [
            ...baseItems,
            {
                title: 'Inventory',
                href: inventoryIndex(),
                icon: Boxes,
            },
            {
                title: 'Master Barang',
                href: barangIndex(),
                icon: Database,
            },
            {
                title: 'Barang Masuk',
                href: barangMasukIndex(),
                icon: PackagePlus,
            },
            {
                title: 'Rooms',
                href: ruanganIndex(),
                icon: Building2,
            },
            {
                title: 'Reports',
                href: laporanInventaris(),
                icon: BarChart2,
            },
        ];
    };

    return (
        <Sidebar
            collapsible="icon"
            variant="sidebar"
            className="bg-[#0f172a]"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="group"
                        >
                            <Link href={dashboard()} prefetch className="flex items-center gap-3">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="gap-0">
                <NavMain items={getMainNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavMain items={settingsNavItems} />
            </SidebarFooter>
        </Sidebar>
    );
}
