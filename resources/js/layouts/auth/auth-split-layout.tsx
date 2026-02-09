import { Building2, LockKeyhole } from 'lucide-react';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Blue Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#1e7fd6] text-white flex-col justify-between p-12">
                <div>
                    {/* Logo and Header */}
                    <div className="flex items-center gap-3 mb-16">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10 backdrop-blur">
                            <Building2 className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-wide">
                                MAHKAMAH AGUNG
                            </h1>
                            <p className="text-xs tracking-widest opacity-90">
                                REPUBLIK INDONESIA
                            </p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold mb-6 leading-tight">
                            Sistem Inventaris
                            <br />
                            ATK Internal
                        </h2>
                        <p className="text-lg opacity-90 leading-relaxed">
                            Platform manajemen aset terpadu untuk efisiensi dan
                            transparansi penggunaan alat tulis kantor di lingkungan
                            Mahkamah Agung.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-sm opacity-75">
                    © {new Date().getFullYear()} Mahkamah Agung Republik Indonesia. Hak Cipta Dilindungi.
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {title}
                        </h2>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>

                    {children}

                    {/* Restricted Area Notice */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <LockKeyhole className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                                    AREA TERBATAS
                                </h3>
                                <p className="text-xs text-blue-800 leading-relaxed">
                                    Hanya untuk staf berwenang. Segala aktivitas login dicatat dan
                                    dipantau untuk tujuan keamanan. Akses tanpa izin dilarang keras.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
