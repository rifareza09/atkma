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
import { CalendarIcon, FilterIcon, PackageIcon, UsersIcon, FileText, FileSpreadsheet } from 'lucide-react';
import axios from 'axios';

interface Transaction {
    ruangan_nama: string;
    tanggal: string;
    jumlah: number;
    kode_transaksi: string;
}

interface RuanganGroup {
    ruangan: string;
    total_jumlah: number;
    transaksi_count: number;
    transaksi: Transaction[];
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
                        Riwayat Permintaan: {barangNama}
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
                    <div className="grid grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {historyData.data.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Ruangan
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {historyData.total_requests}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total Permintaan
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {historyData.total_quantity}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total {historyData.barang.satuan}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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
                        {historyData.data.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Tidak ada riwayat permintaan
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
                                                <UsersIcon className="h-5 w-5 text-primary" />
                                                <div>
                                                    <h3 className="font-semibold">
                                                        {ruanganData.ruangan}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {ruanganData.transaksi_count} permintaan
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-primary">
                                                    {ruanganData.total_jumlah}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {historyData.barang.satuan}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Transaction Details */}
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
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
