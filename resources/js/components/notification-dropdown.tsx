import { Link, router } from '@inertiajs/react';
import { Bell, Check, CheckCheck, Trash2, Package, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Notification } from '@/types/models';
import { useState } from 'react';

interface NotificationDropdownProps {
    notifications?: Notification[];
    unreadCount?: number;
}

export function NotificationDropdown({ notifications = [], unreadCount = 0 }: NotificationDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Debug logs
    console.log('NotificationDropdown rendered', {
        notificationsCount: notifications.length,
        unreadCount
    });

    const handleMarkAsRead = (notificationId: number) => {
        console.log('Mark as read:', notificationId);
        router.post(`/notifications/${notificationId}/read`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Marked as read successfully');
            }
        });
    };

    const handleMarkAllRead = () => {
        console.log('Mark all as read');
        router.post('/notifications/read-all', {}, {
            preserveScroll: true,
            onSuccess: () => {
                setIsOpen(false);
            }
        });
    };

    const handleDelete = (notificationId: number) => {
        console.log('Delete notification:', notificationId);
        router.delete(`/notifications/${notificationId}`, {
            preserveScroll: true,
        });
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'low_stock':
                return <AlertTriangle className="h-4 w-4 text-orange-600" />;
            case 'transaction_created':
                return <ArrowRightLeft className="h-4 w-4 text-blue-600" />;
            case 'stock_replenished':
                return <Package className="h-4 w-4 text-green-600" />;
            default:
                return <Bell className="h-4 w-4 text-muted-foreground" />;
        }
    };

    const getNotificationLink = (notification: Notification): string => {
        const data = notification.data || {};

        if (notification.type === 'transaction_created' && data.transaction_id) {
            return `/transaksi/permintaan/${data.transaction_id}`;
        }
        if (notification.type === 'low_stock' && data.barang_id) {
            return `/barang/${data.barang_id}`;
        }
        return '#';
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Baru saja';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari lalu`;

        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={(open) => {
            console.log('Dropdown state changed:', open);
            setIsOpen(open);
        }}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => console.log('Bell button clicked!')}
                >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                    )}
                    <span className="sr-only">Notifikasi</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifikasi</span>
                    {notifications.length > 0 && unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 text-xs"
                            onClick={handleMarkAllRead}
                        >
                            <CheckCheck className="mr-1 h-3 w-3" />
                            Tandai Semua Dibaca
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {notifications.length === 0 ? (
                    <div className="py-8 text-center">
                        <Bell className="mx-auto h-8 w-8 text-muted-foreground/50" />
                        <p className="mt-2 text-sm text-muted-foreground">
                            Tidak ada notifikasi
                        </p>
                    </div>
                ) : (
                    <ScrollArea className="h-[400px]">
                        {notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={`flex-col items-start gap-2 p-3 cursor-pointer ${
                                    !notification.read_at ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                                }`}
                                asChild
                            >
                                <div>
                                    <Link
                                        href={getNotificationLink(notification)}
                                        className="w-full"
                                        onClick={() => {
                                            if (!notification.read_at) {
                                                handleMarkAsRead(notification.id);
                                            }
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="flex items-start gap-3 w-full">
                                            <div className="mt-0.5">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium line-clamp-1">
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {formatTime(notification.created_at)}
                                                </p>
                                            </div>
                                            {!notification.read_at && (
                                                <div className="flex-shrink-0">
                                                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <div className="flex items-center gap-2 mt-2 w-full">
                                        {!notification.read_at && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-auto p-1 text-xs"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMarkAsRead(notification.id);
                                                }}
                                            >
                                                <Check className="mr-1 h-3 w-3" />
                                                Tandai Dibaca
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-auto p-1 text-xs text-destructive hover:text-destructive"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(notification.id);
                                            }}
                                        >
                                            <Trash2 className="mr-1 h-3 w-3" />
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </ScrollArea>
                )}

                {notifications.length > 0 && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/notifications" className="w-full text-center cursor-pointer">
                                <Button variant="ghost" size="sm" className="w-full">
                                    Lihat Semua Notifikasi
                                </Button>
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
