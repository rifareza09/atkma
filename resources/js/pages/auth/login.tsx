import { Form, Head, Link } from '@inertiajs/react';
import { Eye, EyeOff, User, Lock, Shield } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

type Props = {
    status?: string;
};

export default function Login({ status }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Image Layer */}
            <div 
                className="login-bg absolute inset-0 bg-cover bg-center"
                aria-hidden="true"
            />
            
            {/* Blur and Overlay - More transparent */}
            <div className="absolute inset-0 backdrop-blur-sm bg-blue-900/20" />
            
            <Head title="Masuk Admin" />

            {/* Login Card */}
            <div className="relative w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-10">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#1a4d2e] p-3 shadow-lg">
                            <img 
                                src="/Logo_Mahkamah_Agung_RI-removebg-preview.png" 
                                alt="Logo Mahkamah Agung RI" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            SI-ATK
                        </h1>
                        <p className="text-sm text-white/80">
                            Sistem Investaris ATK Mahkamah Agung
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-3 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="space-y-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* NIP/Username Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-white font-medium text-sm">
                                        NIP / Username
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                                        <Input
                                            id="username"
                                            type="text"
                                            name="username"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="username"
                                            inputMode="text"
                                            placeholder="Masukkan NIP atau Username"
                                            className="pl-10 h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30 backdrop-blur-sm"
                                        />
                                    </div>
                                    <InputError message={errors.username} />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-white font-medium text-sm">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="Masukkan Kata Sandi"
                                            className="pl-10 pr-10 h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30 backdrop-blur-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                                            tabIndex={-1}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-blue-600/90 hover:bg-blue-700 text-white font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all mt-6 backdrop-blur-sm"
                                    tabIndex={3}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Masuk
                                </Button>

                                {/* Forgot Password Link */}
                                <div className="text-center mt-4">
                                    <Link
                                        href="#"
                                        className="text-sm text-white/90 hover:text-white hover:underline font-medium"
                                    >
                                        Lupa Kata Sandi?
                                    </Link>
                                </div>
                            </>
                        )}
                    </Form>

                    {/* Internal Access Notice */}
                    <div className="mt-6 pt-6 border-t border-white/20">
                        <div className="flex items-center justify-center gap-2 text-white/70 text-xs">
                            <Shield className="h-4 w-4" />
                            <span className="font-medium">INTERNAL ACCESS ONLY</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-white text-xs">
                        <Lock className="h-3 w-3" />
                        <span>Secure Connection</span>
                    </div>
                    <p className="text-white text-xs">
                        © {new Date().getFullYear()} Mahkamah Agung RI
                    </p>
                </div>
            </div>
        </div>
    );
}
