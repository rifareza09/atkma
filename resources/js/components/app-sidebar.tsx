import { Link } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Package, 
    Building2, 
    ArrowRightLeft, 
    ArrowDownToLine, 
    FileText,
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
        title: 'Data Barang',
        href: barangIndex(),
        icon: Package,
    },
    {
        title: 'Data Ruangan',
        href: ruanganIndex(),
        icon: Building2,
    },
    {
        title: 'Permintaan Barang',
        href: transaksiPermintaanIndex(),
        icon: ArrowRightLeft,
    },
    {
        title: 'Barang Masuk',
        href: transaksiMasukIndex(),
        icon: ArrowDownToLine,
    },
    {
        title: 'Laporan',
        href: laporanInventaris(),
        icon: FileText,
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
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
