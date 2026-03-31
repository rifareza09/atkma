import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Package,
    Building2,
    CheckSquare,
    FileText,
    Settings,
    ClipboardCheck,
    Box,
    TrendingUp,
    History,
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
    historyIndex,
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
        href: '/settings/profile',
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
    const { auth } = usePage<SharedData>().props;
    const userRole = auth?.user?.role;

    // Define menu items based on role
    const getMainNavItems = (): NavItem[] => {
        const baseItems: NavItem[] = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ];

        // All users see the same menu (CRUD buttons are hidden in pages based on role)
        return [
            ...baseItems,
            {
                title: 'Inventory',
                href: inventoryIndex(),
                icon: Package,
            },
            {
                title: 'Master Barang',
                href: barangIndex(),
                icon: Box,
            },
            {
                title: 'Barang Masuk',
                href: barangMasukIndex(),
                icon: TrendingUp,
            },
            {
                title: 'Rooms',
                href: ruanganIndex(),
                icon: Building2,
            },
            {
                title: 'History',
                href: historyIndex(),
                icon: History,
            },
            {
                title: 'Reports',
                href: laporanInventaris(),
                icon: FileText,
            },
            {
                title: 'Cetakan Faktur',
                href: '/laporan/cetak-faktur',
                icon: FileText,
            },
        ];
    };

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="bg-[#2563eb]"
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
