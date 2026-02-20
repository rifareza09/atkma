import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Package,
    Building2,
    FileCheck,
    CheckSquare,
    FileText,
    Settings,
    ClipboardCheck,
    Box,
    TrendingUp,
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
    transaksiPermintaanIndex,
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
        
        if (userRole === 'superadmin') {
            // Superadmin can view everything for monitoring, but CRUD buttons are hidden in pages
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
        }
        
        // Admin and other roles see full menu
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
                title: 'Barang Masuk Admin',
                href: barangMasukIndex(),
                icon: TrendingUp,
            },
            {
                title: 'Requests',
                href: transaksiPermintaanIndex(),
                icon: FileCheck,
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
    };
    
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
                <NavMain items={getMainNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavMain items={settingsNavItems} />
            </SidebarFooter>
        </Sidebar>
    );
}
