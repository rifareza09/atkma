import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        // Temporarily disabled wayfinder due to PhpSpreadsheet conflict
        // wayfinder({
        //     formVariants: true,
        // }),
    ],
    server: {
        host: '127.0.0.1', // Force IPv4 instead of IPv6
        port: 5173,
        strictPort: true,
    },
    esbuild: {
        jsx: 'automatic',
    },
});
