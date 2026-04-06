import { useState, useRef } from 'react';
import { Upload, X, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface BarangImageUploadProps {
    barangId: number;
    currentImage?: string | null;
    onImageUploaded?: (imagePath: string, imageUrl: string) => void;
}

export default function BarangImageUpload({
    barangId,
    currentImage,
    onImageUploaded,
}: BarangImageUploadProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage ? `/storage/${currentImage}` : null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('File harus berupa gambar');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Ukuran file tidak boleh lebih dari 5MB');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('image', file);
            formData.append('_token', (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '');

            const response = await fetch(`/master/barang/${barangId}/upload-image`, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const data = await response.json();

            toast({
                title: 'Berhasil',
                description: data.message,
            });

            onImageUploaded?.(data.image_path, data.image_url);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Gagal upload gambar';
            setError(message);
            toast({
                title: 'Error',
                description: message,
                variant: 'destructive',
            });
            setPreviewUrl(null);
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleClear = () => {
        setPreviewUrl(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-3">
            <div className="relative aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-gray-400 transition-colors group">
                {previewUrl ? (
                    <>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isLoading}
                                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                title="Ubah gambar"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Upload className="w-4 h-4" />
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                disabled={isLoading}
                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                                title="Hapus gambar"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center pointer-events-none">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                            ) : (
                                <Upload className="w-6 h-6 text-gray-400" />
                            )}
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                            {isLoading ? 'Uploading...' : 'Klik atau drop gambar di sini'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            JPG, PNG, GIF, WebP - Max 5MB
                        </p>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={isLoading}
                    className="hidden"
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <Upload className="w-4 h-4 mr-2" />
                        {previewUrl ? 'Ubah Gambar' : 'Upload Gambar'}
                    </>
                )}
            </Button>
        </div>
    );
}
