import { Head, Link, router, usePage } from '@inertiajs/react';
import { Search, Plus, Minus, Camera, ArrowRight, PackagePlus, LayoutGrid, List } from 'lucide-react';
import { useState, useEffect } from 'react';
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
import type { Barang, Ruangan, BreadcrumbItem, SharedData } from '@/types';
import TransactionHistoryDialog from '@/components/transaction-history-dialog';

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

export default function InventoryIndex({ barangs, ruangans }: InventoryIndexProps) {
    const { toast } = useToast();
    const { auth } = usePage<SharedData>().props;
    const userRole = auth?.user?.role;
    const isSuperadmin = userRole === 'superadmin';

    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [transactionMode, setTransactionMode] = useState<'masuk' | 'keluar'>('keluar'); // 'masuk' = Tambah Stock, 'keluar' = Permintaan Barang
    const [formData, setFormData] = useState({
        ruangan_nama: '',
        nama_peminta: '',
        tanggal_permintaan: new Date().toISOString().split('T')[0],
        keperluan: '',
    });
    const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
    const [selectedBarang, setSelectedBarang] = useState<{ id: number; nama: string } | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Get ruangan names for autocomplete suggestions
    const ruanganNames = ruangans.map((r) => r.nama);

    // Clear form data when transaction mode changes
    useEffect(() => {
        setFormData({
            ruangan_nama: '',
            nama_peminta: '',
            tanggal_permintaan: new Date().toISOString().split('T')[0],
            keperluan: '',
        });
    }, [transactionMode]);

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

    const setQuantityDirect = (id: number, value: number, maxStok?: number) => {
        const clamped = Math.max(1, maxStok !== undefined ? Math.min(value, maxStok) : value);
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: isNaN(clamped) ? 1 : clamped } : item
            )
        );
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleSubmit = () => {
        // Validation untuk mode Permintaan Barang (keluar)
        if (transactionMode === 'keluar' && !formData.ruangan_nama) {
            toast({
                title: 'Perhatian',
                description: 'Masukkan nama ruangan terlebih dahulu',
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
        const requestData: any = {
            type: transactionMode,
            tanggal: transactionMode === 'keluar' && formData.tanggal_permintaan
                ? formData.tanggal_permintaan
                : new Date().toISOString().split('T')[0],
            keterangan: formData.keperluan || (transactionMode === 'masuk' ? 'Penambahan stock gudang' : ''),
            items: cart.map((item) => ({
                barang_id: item.id,
                jumlah: item.quantity,
            })),
        };

        // Hanya kirim ruangan jika mode keluar (permintaan barang)
        if (transactionMode === 'keluar') {
            requestData.ruangan_nama = formData.ruangan_nama;
            requestData.nama_peminta = formData.nama_peminta;
        } else {
            requestData.ruangan_nama = 'Gudang'; // Default untuk transaksi masuk
        }

        router.post('/transaksi/permintaan', requestData, {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Permintaan barang berhasil dibuat',
                });
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                toast({
                    title: 'Error',
                    description: Object.values(errors).flat().join(', '),
                    variant: 'destructive',
                });
            },
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

            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 p-3 sm:p-6">
                {/* Main Content */}
                <div className="flex-1 space-y-4 lg:space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">Pilih Barang</h1>
                            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                                Silakan pilih item ATK yang dibutuhkan untuk ruangan Anda.
                            </p>
                        </div>
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

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                            <div className="flex items-center gap-2">
                                {/* View Toggle */}
                                <div className="flex items-center border rounded-md overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 transition-colors ${
                                            viewMode === 'grid'
                                                ? 'bg-black text-white'
                                                : 'bg-white text-gray-500 hover:bg-gray-100'
                                        }`}
                                        title="Tampilan Grid"
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 transition-colors ${
                                            viewMode === 'list'
                                                ? 'bg-black text-white'
                                                : 'bg-white text-gray-500 hover:bg-gray-100'
                                        }`}
                                        title="Tampilan List"
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBarangs.map((barang) => {
                            const inCart = cart.find((item) => item.id === barang.id);
                            return (
                                <Card
                                    key={barang.id}
                                    className="overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div
                                        className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-colors overflow-hidden group"
                                        onClick={() => {
                                            setSelectedBarang({ id: barang.id, nama: barang.nama });
                                            setHistoryDialogOpen(true);
                                        }}
                                        title="Klik untuk melihat riwayat permintaan"
                                    >
                                        {getStockBadge(barang)}
                                        {barang.image_path ? (
                                            <img
                                                src={`/storage/${barang.image_path}`}
                                                alt={barang.nama}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-6xl text-gray-300">📦</div>
                                        )}
                                    </div>
                                    <CardContent className="p-4 space-y-3">
                                        <div>
                                            <h3 className="font-semibold text-lg line-clamp-2">
                                                {barang.nama}
                                            </h3>
                                            <p className="text-xs font-mono text-muted-foreground mt-0.5 tracking-wide">
                                                {barang.kode}
                                            </p>
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
                                            {isSuperadmin ? (
                                                <div className="w-full text-center py-2 text-sm text-muted-foreground font-medium">
                                                    View Only - Monitoring
                                                </div>
                                            ) : (
                                                <>
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
                                                            <Input
                                                                type="number"
                                                                min="1"
                                                                max={transactionMode === 'keluar' ? barang.stok : undefined}
                                                                value={inCart.quantity}
                                                                onChange={(e) =>
                                                                    setQuantityDirect(
                                                                        barang.id,
                                                                        parseInt(e.target.value),
                                                                        transactionMode === 'keluar' ? barang.stok : undefined
                                                                    )
                                                                }
                                                                className="h-8 w-12 text-center px-1 font-semibold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                            />
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() =>
                                                                    updateQuantity(barang.id, 1)
                                                                }
                                                                className="h-8 w-8 p-0 border-blue-600 text-blue-600"
                                                                disabled={
                                                                    transactionMode === 'keluar' && inCart.quantity >= barang.stok
                                                                }
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {transactionMode === 'keluar' && barang.stok === 0 ? (
                                                                <div className="w-full text-center py-2 text-sm text-red-500 font-medium">
                                                                    Stok Habis
                                                                </div>
                                                            ) : (
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => addToCart(barang)}
                                                                    className="w-full"
                                                                >
                                                                    <Plus className="h-4 w-4 mr-2" />
                                                                    Tambah
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                    ) : (
                    /* List View */
                    <div className="space-y-2">
                        {filteredBarangs.map((barang) => {
                            const inCart = cart.find((item) => item.id === barang.id);
                            const isHabis = transactionMode === 'keluar' && barang.stok === 0;
                            return (
                                <div
                                    key={barang.id}
                                    className="flex items-center gap-4 px-4 py-3 rounded-lg border bg-white hover:shadow-sm transition-shadow"
                                >
                                    {/* Icon */}
                                    <div
                                        className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-colors"
                                        onClick={() => {
                                            setSelectedBarang({ id: barang.id, nama: barang.nama });
                                            setHistoryDialogOpen(true);
                                        }}
                                        title="Klik untuk melihat riwayat"
                                    >
                                        <span className="text-2xl">📦</span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-sm truncate">{barang.nama}</span>
                                            {barang.stok <= barang.stok_minimum ? (
                                                <Badge variant="destructive" className="text-xs shrink-0">Stok Menipis</Badge>
                                            ) : (
                                                <Badge className="bg-green-500 text-xs shrink-0">Stok Aman</Badge>
                                            )}
                                        </div>
                                        <p className="text-xs font-mono text-muted-foreground mt-0.5">{barang.kode}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Stok: <span className="font-medium text-gray-700">{barang.stok} {barang.satuan}</span>
                                        </p>
                                    </div>

                                    {/* Action */}
                                    {!isSuperadmin ? (
                                        isHabis ? (
                                            <span className="text-xs text-red-500 font-medium shrink-0">Stok Habis</span>
                                        ) : inCart ? (
                                            <div className="flex items-center gap-1 shrink-0">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateQuantity(barang.id, -1)}
                                                    className="h-7 w-7 p-0"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max={transactionMode === 'keluar' ? barang.stok : undefined}
                                                    value={inCart.quantity}
                                                    onChange={(e) =>
                                                        setQuantityDirect(
                                                            barang.id,
                                                            parseInt(e.target.value),
                                                            transactionMode === 'keluar' ? barang.stok : undefined
                                                        )
                                                    }
                                                    className="h-7 w-10 text-center px-0 text-sm font-semibold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateQuantity(barang.id, 1)}
                                                    className="h-7 w-7 p-0 border-blue-600 text-blue-600"
                                                    disabled={transactionMode === 'keluar' && inCart.quantity >= barang.stok}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => addToCart(barang)}
                                                className="shrink-0 h-8"
                                            >
                                                <Plus className="h-3 w-3 mr-1" />
                                                Tambah
                                            </Button>
                                        )
                                    ) : (
                                        <span className="text-xs text-muted-foreground shrink-0">View Only</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    )}

                    {filteredBarangs.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            Tidak ada barang ditemukan
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Hidden for Superadmin */}
                {!isSuperadmin && (
                <div className="w-full lg:w-96 flex-shrink-0 lg:sticky lg:top-6 lg:self-start space-y-4">
                    {/* Summary Card */}
                    <Card>
                        <CardContent className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)] lg:max-h-none">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg">
                                    {transactionMode === 'masuk' ? 'Ringkasan Tambah Stock' : 'Ringkasan Permintaan'}
                                </h3>
                            </div>

                            {/* Mode Selector */}
                            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                                <Button
                                    type="button"
                                    variant={transactionMode === 'masuk' ? 'default' : 'ghost'}
                                    className="flex-1 text-xs sm:text-sm px-2 py-2"
                                    onClick={() => setTransactionMode('masuk')}
                                >
                                    <span className="truncate">📦 Tambah Stock Awal</span>
                                </Button>
                                <Button
                                    type="button"
                                    variant={transactionMode === 'keluar' ? 'default' : 'ghost'}
                                    className="flex-1 text-xs sm:text-sm px-2 py-2"
                                    onClick={() => setTransactionMode('keluar')}
                                >
                                    <span className="truncate">🏢 Permintaan Barang</span>
                                </Button>
                            </div>

                            {/* Form */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="space-y-2">
                                    <Label className="font-semibold">
                                        {transactionMode === 'masuk' ? 'Informasi Stock' : 'Informasi Pemohon'}
                                    </Label>
                                </div>

                                {/* Ruangan field - Only show for 'keluar' mode */}
                                {transactionMode === 'keluar' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="ruangan_nama">
                                            Ruangan / Unit Kerja
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="ruangan_nama"
                                            list="ruangan-suggestions"
                                            value={formData.ruangan_nama}
                                            onChange={(e) =>
                                                setFormData({ ...formData, ruangan_nama: e.target.value })
                                            }
                                            placeholder="Ketik atau pilih nama ruangan/unit kerja"
                                        />
                                        <datalist id="ruangan-suggestions">
                                            {ruanganNames.map((nama, index) => (
                                                <option key={index} value={nama} />
                                            ))}
                                        </datalist>
                                        <p className="text-xs text-muted-foreground">
                                            Anda bisa memilih dari daftar atau mengetik manual
                                        </p>
                                    </div>
                                )}

                                {/* Tanggal Permintaan - Only show for 'keluar' mode */}
                                {transactionMode === 'keluar' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="tanggal_permintaan">
                                            Tanggal Permintaan
                                        </Label>
                                        <Input
                                            id="tanggal_permintaan"
                                            type="date"
                                            value={formData.tanggal_permintaan}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    tanggal_permintaan: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                )}

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
                                        placeholder={
                                            transactionMode === 'masuk'
                                                ? 'Contoh: Pembelian rutin bulanan, penerimaan dari supplier...'
                                                : 'Contoh: Untuk kegiatan rapat bulanan...'
                                        }
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
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        max={transactionMode === 'keluar' ? item.stok : undefined}
                                                        value={item.quantity}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value) || 1;
                                                            setCart(prev =>
                                                                prev.map(cartItem =>
                                                                    cartItem.id === item.id
                                                                        ? {
                                                                            ...cartItem,
                                                                            quantity: transactionMode === 'keluar'
                                                                                ? Math.min(val, item.stok)
                                                                                : val
                                                                        }
                                                                        : cartItem
                                                                )
                                                            );
                                                        }}
                                                        className="h-8 w-16 text-center"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        title="Hapus"
                                                    >
                                                        <Minus className="h-4 w-4" />
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
                                    {transactionMode === 'masuk' ? 'Tambah ke Stock Gudang' : 'Proses Permintaan'}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    {transactionMode === 'masuk'
                                        ? 'Barang akan ditambahkan ke stock gudang'
                                        : 'Menunggu persetujuan Kesekbag'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                )}
            </div>

            {/* Transaction History Dialog */}
            <TransactionHistoryDialog
                barangId={selectedBarang?.id ?? null}
                barangNama={selectedBarang?.nama ?? ''}
                open={historyDialogOpen}
                onOpenChange={setHistoryDialogOpen}
            />
        </AppLayout>
    );
}
