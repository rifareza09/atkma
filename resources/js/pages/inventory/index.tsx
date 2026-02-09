import { Head, Link, router } from '@inertiajs/react';
import { Crown, Search, Plus, Minus, Camera, ArrowRight, PackagePlus } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { barangIndex, barangCreate } from '@/lib/atk-routes';
import { dashboard } from '@/routes';
import type { Barang, Ruangan, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Inventory', href: '/inventory' },
];

interface InventoryIndexProps {
    barangs: Barang[];
    ruangans: Ruangan[];
}

interface CartItem extends Barang {
    quantity: number;
}

const categories = [
    { value: 'all', label: 'Semua' },
    { value: 'kertas', label: 'Kertas' },
    { value: 'alat-tulis', label: 'Alat Tulis' },
    { value: 'pengarsipan', label: 'Pengarsipan' },
    { value: 'teknologi', label: 'Teknologi' },
];

export default function InventoryIndex({ barangs, ruangans }: InventoryIndexProps) {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [formData, setFormData] = useState({
        ruangan_id: '',
        nama_peminta: '',
        keperluan: '',
    });

    const quotaPercentage = 85;

    const filteredBarangs = barangs.filter((barang) => {
        const matchesSearch = searchQuery
            ? barang.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
              barang.kode.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        // For now, show all items for any category since we don't have category data
        return matchesSearch && barang.is_active;
    });

    const addToCart = (barang: Barang) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === barang.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === barang.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...barang, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleSubmit = () => {
        if (!formData.ruangan_id) {
            toast({
                title: 'Perhatian',
                description: 'Pilih ruangan terlebih dahulu',
                variant: 'destructive',
            });
            return;
        }

        if (!formData.nama_peminta) {
            toast({
                title: 'Perhatian',
                description: 'Masukkan nama peminta',
                variant: 'destructive',
            });
            return;
        }

        if (cart.length === 0) {
            toast({
                title: 'Perhatian',
                description: 'Pilih minimal satu barang',
                variant: 'destructive',
            });
            return;
        }

        // Submit the request
        router.post('/transaksi/permintaan', {
            ...formData,
            type: 'keluar',
            tanggal: new Date().toISOString().split('T')[0],
            items: cart.map((item) => ({
                barang_id: item.id,
                jumlah: item.quantity,
                keterangan: '',
            })),
        });
    };

    const getStockBadge = (barang: Barang) => {
        if (barang.stok <= barang.stok_minimum) {
            return (
                <Badge
                    variant="destructive"
                    className="absolute top-3 left-3 bg-red-500"
                >
                    Stok Menipis
                </Badge>
            );
        }
        return (
            <Badge
                variant="default"
                className="absolute top-3 left-3 bg-green-500"
            >
                Stok Aman
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pilih Barang - Inventory" />

            <div className="flex h-full flex-1 gap-6 p-6">
                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Pilih Barang</h1>
                            <p className="text-muted-foreground mt-1">
                                Silakan pilih item ATK yang dibutuhkan untuk ruangan Anda.
                            </p>
                        </div>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <Link href={barangCreate()}>
                                <PackagePlus className="mr-2 h-4 w-4" />
                                Tambah Barang
                            </Link>
                        </Button>
                    </div>

                    {/* Search & Filters */}
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Cari nama barang, kode, atau kategori"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {categories.map((cat) => (
                                    <Button
                                        key={cat.value}
                                        variant={
                                            activeCategory === cat.value
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size="sm"
                                        onClick={() => setActiveCategory(cat.value)}
                                        className={
                                            activeCategory === cat.value
                                                ? 'bg-black text-white hover:bg-black/90'
                                                : ''
                                        }
                                    >
                                        {cat.label}
                                    </Button>
                                ))}
                            </div>
                            <Button variant="outline" size="sm">
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                </svg>
                                Filter
                            </Button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBarangs.map((barang) => {
                            const inCart = cart.find((item) => item.id === barang.id);
                            return (
                                <Card
                                    key={barang.id}
                                    className="overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        {getStockBadge(barang)}
                                        <div className="text-6xl text-gray-300">📦</div>
                                    </div>
                                    <CardContent className="p-4 space-y-3">
                                        <div>
                                            <h3 className="font-semibold text-lg line-clamp-2">
                                                {barang.nama}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                    />
                                                </svg>
                                                Stok: {barang.stok} {barang.satuan}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {inCart ? (
                                                <div className="flex items-center gap-2 w-full">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            updateQuantity(barang.id, -1)
                                                        }
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="flex-1 text-center font-semibold">
                                                        {inCart.quantity}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            updateQuantity(barang.id, 1)
                                                        }
                                                        className="h-8 w-8 p-0 border-blue-600 text-blue-600"
                                                        disabled={
                                                            inCart.quantity >= barang.stok
                                                        }
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => addToCart(barang)}
                                                    className="w-full"
                                                    disabled={barang.stok === 0}
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Tambah
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {filteredBarangs.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            Tidak ada barang ditemukan
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="w-96 space-y-4">
                    {/* Summary Card */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <Crown className="h-5 w-5 text-yellow-500" />
                                <h3 className="font-bold text-lg">Ringkasan Permintaan</h3>
                            </div>

                            {/* Quota Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold text-gray-700">
                                        SISA KUOTA RUANGAN
                                    </span>
                                    <span className="font-bold text-blue-600">
                                        {quotaPercentage}%
                                    </span>
                                </div>
                                <Progress value={quotaPercentage} className="h-2" />
                                <p className="text-xs text-muted-foreground">
                                    Bagian Hukum & Humas
                                </p>
                            </div>

                            {/* Form */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="space-y-2">
                                    <Label className="font-semibold">Informasi Pemohon</Label>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ruangan">
                                        Ruangan / Unit Kerja
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.ruangan_id}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, ruangan_id: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Unit Kerja..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ruangans.map((ruangan) => (
                                                <SelectItem
                                                    key={ruangan.id}
                                                    value={ruangan.id.toString()}
                                                >
                                                    {ruangan.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nama_peminta">
                                        Nama Peminta
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="nama_peminta"
                                            value={formData.nama_peminta}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nama_peminta: e.target.value,
                                                })
                                            }
                                            placeholder="Nama Lengkap"
                                        />
                                        <Camera className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="keperluan">Keperluan / Keterangan</Label>
                                    <Textarea
                                        id="keperluan"
                                        value={formData.keperluan}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                            setFormData({
                                                ...formData,
                                                keperluan: e.target.value,
                                            })
                                        }
                                        placeholder="Contoh: Untuk kegiatan rapat bulanan..."
                                        rows={3}
                                    />
                                </div>
                            </div>

                            {/* Cart Items */}
                            <div className="space-y-3 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <Label className="font-semibold">Item Keranjang</Label>
                                </div>

                                {cart.length === 0 ? (
                                    <p className="text-sm text-muted-foreground py-4 text-center">
                                        Belum ada item dipilih
                                    </p>
                                ) : (
                                    <div className="space-y-3 max-h-48 overflow-y-auto">
                                        {cart.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div className="flex h-8 w-8 items-center justify-center bg-white rounded border text-sm font-semibold">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm line-clamp-1">
                                                        {item.nama}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.satuan}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            updateQuantity(item.id, -1)
                                                        }
                                                        className="h-6 w-6 p-0"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-sm font-semibold w-6 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            updateQuantity(item.id, 1)
                                                        }
                                                        className="h-6 w-6 p-0"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Total & Submit */}
                            <div className="space-y-3 pt-4 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total Item</span>
                                    <span className="text-2xl font-bold">{totalItems}</span>
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={cart.length === 0}
                                >
                                    Proses Permintaan
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    Menunggu persetujuan Kesekbag
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
