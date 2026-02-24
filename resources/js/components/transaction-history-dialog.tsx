import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, FilterIcon, PackageIcon, UsersIcon, FileText, FileSpreadsheet, TrendingDown, TrendingUp } from 'lucide-react';
import axios from 'axios';

interface KeluarTransaction {
    ruangan_nama: string;
    nama_peminta: string;
    tanggal: string;
    jumlah: number;
    kode_transaksi: string;
}

interface MasukTransaction {
    petugas: string;
    tanggal: string;
    jumlah: number;
    kode_transaksi: string;
    keterangan: string;
    sumber: string;
}

interface RuanganGroup {
    ruangan: string;
    total_jumlah: number;
    transaksi_count: number;
    transaksi: KeluarTransaction[];
}

interface PetugasGroup {
    petugas: string;
    total_jumlah: number;
    transaksi_count: number;
    transaksi: MasukTransaction[];
}

interface HistoryData {
    barang: {
        id: number;
        nama: string;
        kode: string;
        satuan: string;
    };
    data: RuanganGroup[];
    total_requests: number;
    total_quantity: number;
    masuk_data: PetugasGroup[];
    total_masuk: number;
    total_masuk_quantity: number;
}

interface TransactionHistoryDialogProps {
    barangId: number | null;
    barangNama: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function TransactionHistoryDialog({
    barangId,
    barangNama,
    open,
    onOpenChange,
}: TransactionHistoryDialogProps) {
    const [loading, setLoading] = useState(false);
    const [historyData, setHistoryData] = useState<HistoryData | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [expandedRuangan, setExpandedRuangan] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'keluar' | 'masuk'>('keluar');

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = [
        { value: '1', label: 'Januari' },
        { value: '2', label: 'Februari' },
        { value: '3', label: 'Maret' },
        { value: '4', label: 'April' },
        { value: '5', label: 'Mei' },
        { value: '6', label: 'Juni' },
        { value: '7', label: 'Juli' },
        { value: '8', label: 'Agustus' },
        { value: '9', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];

    const fetchHistory = async () => {
        if (!barangId) return;

        setLoading(true);
        try {
            const params: any = {};
            if (startDate) params.start_date = startDate;
            if (endDate) params.end_date = endDate;
            // Only add filters if they have actual values (not empty)
            if (selectedMonth && selectedYear) {
                params.month = selectedMonth;
                params.year = selectedYear;
            } else if (selectedYear && selectedYear !== '') {
                params.year = selectedYear;
            }

            const response = await axios.get(
                `/master/barang/${barangId}/transaction-history`,
                { params }
            );
            setHistoryData(response.data);
        } catch (error) {
            console.error('Error fetching transaction history:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && barangId) {
            fetchHistory();
        }
    }, [open, barangId]);

    const handleFilter = () => {
        fetchHistory();
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setSelectedMonth('');
        setSelectedYear('');
        fetchHistory();
    };

    const handleExport = (format: 'pdf' | 'excel') => {
        if (!barangId) return;

        const params = new URLSearchParams();
        params.append('format', format);
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        if (selectedMonth && selectedYear) {
            params.append('month', selectedMonth);
            params.append('year', selectedYear);
        } else if (selectedYear && selectedYear !== '') {
            params.append('year', selectedYear);
        }

        const url = `/master/barang/${barangId}/transaction-history/export?${params.toString()}`;
        window.open(url, '_blank');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <PackageIcon className="h-5 w-5" />
                        Riwayat Transaksi: {barangNama}
                    </DialogTitle>
                </DialogHeader>

                {/* Filter Section */}
                <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                                <FilterIcon className="h-4 w-4" />
                                <span className="font-semibold">Filter Data</span>
                            </div>

                            {/* Date Range Filter */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start-date">Tanggal Mulai</Label>
                                    <Input
                                        id="start-date"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end-date">Tanggal Akhir</Label>
                                    <Input
                                        id="end-date"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Month/Year Filter */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="month">Bulan</Label>
                                    <Select
                                        value={selectedMonth}
                                        onValueChange={setSelectedMonth}
                                    >
                                        <SelectTrigger id="month">
                                            <SelectValue placeholder="Semua Bulan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {months.map((month) => (
                                                <SelectItem key={month.value} value={month.value}>
                                                    {month.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="year">Tahun</Label>
                                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                                        <SelectTrigger id="year">
                                            <SelectValue placeholder="Semua Tahun" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map((year) => (
                                                <SelectItem key={year} value={year.toString()}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex gap-2 pt-2">
                                <Button onClick={handleFilter} className="flex-1" size="sm">
                                    <FilterIcon className="h-4 w-4 mr-2" />
                                    Terapkan Filter
                                </Button>
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="flex-1"
                                    size="sm"
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Section */}
                {historyData && (
                    <div className="grid grid-cols-2 gap-3">
                        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                            <CardContent className="pt-4 pb-4">
                                <div className="flex items-center gap-3">
                                    <TrendingDown className="h-5 w-5 text-orange-500 shrink-0" />
                                    <div>
                                        <div className="text-xs text-muted-foreground">Barang Keluar</div>
                                        <div className="font-bold">{historyData.total_requests} transaksi &bull; {historyData.total_quantity} {historyData.barang.satuan}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                            <CardContent className="pt-4 pb-4">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-5 w-5 text-green-500 shrink-0" />
                                    <div>
                                        <div className="text-xs text-muted-foreground">Barang Masuk</div>
                                        <div className="font-bold">{historyData.total_masuk} transaksi &bull; {historyData.total_masuk_quantity} {historyData.barang.satuan}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Tab Switcher */}
                {historyData && (
                    <div className="flex gap-1 p-1 bg-muted rounded-lg">
                        <button
                            onClick={() => setActiveTab('keluar')}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'keluar'
                                    ? 'bg-background shadow text-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <TrendingDown className="h-4 w-4 text-orange-500" />
                            Barang Keluar ({historyData.total_requests})
                        </button>
                        <button
                            onClick={() => setActiveTab('masuk')}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'masuk'
                                    ? 'bg-background shadow text-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            Barang Masuk ({historyData.total_masuk})
                        </button>
                    </div>
                )}

                {/* Export Buttons */}
                {historyData && historyData.data.length > 0 && (
                    <div className="flex gap-2 justify-end">
                        <Button
                            onClick={() => handleExport('pdf')}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                        >
                            <FileText className="h-4 w-4" />
                            Export PDF
                        </Button>
                        <Button
                            onClick={() => handleExport('excel')}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                        >
                            <FileSpreadsheet className="h-4 w-4" />
                            Export Excel
                        </Button>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-8 text-muted-foreground">
                        Memuat data...
                    </div>
                )}

                {/* Data Section */}
                {!loading && historyData && (
                    <div className="space-y-3">
                        {/* Tab: Barang Keluar */}
                        {activeTab === 'keluar' && (
                            historyData.data.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    Tidak ada riwayat barang keluar
                                </div>
                            ) : (
                                historyData.data.map((ruanganData) => (
                                    <Card key={ruanganData.ruangan} className="overflow-hidden">
                                        <div
                                            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() =>
                                                setExpandedRuangan(
                                                    expandedRuangan === ruanganData.ruangan
                                                        ? null
                                                        : ruanganData.ruangan
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <UsersIcon className="h-5 w-5 text-orange-500" />
                                                    <div>
                                                        <h3 className="font-semibold">{ruanganData.ruangan}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {ruanganData.transaksi_count} permintaan
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-orange-500">
                                                        {ruanganData.total_jumlah}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {historyData.barang.satuan}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {expandedRuangan === ruanganData.ruangan && (
                                            <div className="border-t bg-muted/30 p-4">
                                                <div className="space-y-2">
                                                    {ruanganData.transaksi.map((trans, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center justify-between py-2 px-3 bg-background rounded-md"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                                <div>
                                                                    <div className="text-sm font-medium">
                                                                        {formatDate(trans.tanggal)}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {trans.kode_transaksi}
                                                                        {trans.nama_peminta && trans.nama_peminta !== '-' && (
                                                                            <span> &bull; {trans.nama_peminta}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Badge variant="secondary">
                                                                {trans.jumlah} {historyData.barang.satuan}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                ))
                            )
                        )}

                        {/* Tab: Barang Masuk */}
                        {activeTab === 'masuk' && (
                            historyData.masuk_data.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    Tidak ada riwayat barang masuk
                                </div>
                            ) : (
                                historyData.masuk_data.map((petugasData) => (
                                    <Card key={petugasData.petugas} className="overflow-hidden">
                                        <div
                                            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() =>
                                                setExpandedRuangan(
                                                    expandedRuangan === ('masuk-' + petugasData.petugas)
                                                        ? null
                                                        : ('masuk-' + petugasData.petugas)
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <UsersIcon className="h-5 w-5 text-green-500" />
                                                    <div>
                                                        <h3 className="font-semibold">{petugasData.petugas}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {petugasData.transaksi_count} kali masuk
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-green-500">
                                                        +{petugasData.total_jumlah}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {historyData.barang.satuan}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {expandedRuangan === ('masuk-' + petugasData.petugas) && (
                                            <div className="border-t bg-muted/30 p-4">
                                                <div className="space-y-2">
                                                    {petugasData.transaksi.map((trans, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center justify-between py-2 px-3 bg-background rounded-md"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                                <div>
                                                                    <div className="text-sm font-medium">
                                                                        {formatDate(trans.tanggal)}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {trans.kode_transaksi}
                                                                        {trans.sumber && trans.sumber !== '-' && (
                                                                            <span> &bull; <span className="text-green-700 font-medium">{trans.sumber}</span></span>
                                                                        )}
                                                                        {trans.keterangan && trans.keterangan !== '-' && (
                                                                            <span> &bull; {trans.keterangan}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Badge variant="outline" className="text-green-600 border-green-300">
                                                                +{trans.jumlah} {historyData.barang.satuan}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                ))
                            )
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
