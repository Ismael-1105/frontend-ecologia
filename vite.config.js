import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),

        // Compresión Gzip para archivos estáticos
        compression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 10240, // Solo comprimir archivos > 10KB
            deleteOriginFile: false,
        }),

        // Compresión Brotli (mejor ratio que Gzip)
        compression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 10240,
            deleteOriginFile: false,
        }),

        // Visualizador de bundle (genera stats.html en dist/)
        visualizer({
            open: false,
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true,
            template: 'treemap', // 'sunburst', 'treemap', 'network'
        }),
    ],

    // Configuración de build para producción
    build: {
        // Directorio de salida
        outDir: 'dist',

        // Generar source maps solo para errores (no completos)
        sourcemap: false,

        // Tamaño máximo de chunk antes de mostrar warning (1MB)
        chunkSizeWarningLimit: 1000,

        // Minificación con esbuild (más rápido y sin dependencias extra)
        minify: 'esbuild',

        // Configuración de esbuild para eliminar console.log en producción
        esbuild: {
            drop: ['console', 'debugger'],
        },

        // Configuración de Rollup para code splitting
        rollupOptions: {
            output: {
                // Code splitting manual para mejor caché
                manualChunks: {
                    // Chunk de React y relacionados
                    'react-vendor': [
                        'react',
                        'react-dom',
                        'react-router-dom',
                    ],

                    // Chunk de Material UI core
                    'mui-core': [
                        '@mui/material',
                        '@emotion/react',
                        '@emotion/styled',
                    ],

                    // Chunk de Material UI icons (suele ser grande)
                    'mui-icons': [
                        '@mui/icons-material',
                    ],

                    // Chunk de lucide-react icons
                    'lucide-icons': [
                        'lucide-react',
                    ],

                    // Chunk de video player
                    'video-vendor': [
                        'hls.js',
                    ],

                    // Chunk de utilidades
                    'utils-vendor': [
                        'axios',
                        'date-fns',
                    ],
                },

                // Nombres de archivos con hash para caché
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },

        // Optimización de assets
        assetsInlineLimit: 4096, // Inline assets < 4KB como base64
    },

    // Optimización de dependencias (pre-bundling)
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            '@mui/material',
            '@emotion/react',
            '@emotion/styled',
            'axios',
        ],
        // Excluir dependencias que no necesitan pre-bundling
        exclude: [],
    },

    // Configuración del servidor de desarrollo
    server: {
        port: 3000, // Mantener puerto 3000 como CRA
        open: true, // Abrir navegador automáticamente
        cors: true, // Habilitar CORS

        // Proxy para API (si es necesario)
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
        },
    },

    // Configuración del servidor de preview (para testing del build)
    preview: {
        port: 3000,
        open: true,
    },

    // Resolver aliases (opcional, para imports más limpios)
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@pages': '/src/pages',
            '@core': '/src/core',
            '@layouts': '/src/layouts',
            '@styles': '/src/styles',
            '@themes': '/src/themes',
        },
    },
});
