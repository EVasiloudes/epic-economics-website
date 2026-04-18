import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Enable JSX transform optimization
      jsxRuntime: 'automatic',
      // Babel optimizations for production
      babel: {
        plugins: mode === 'production' 
          ? [['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]]
          : []
      }
    }),
    // Bundle analyzer - only in analyze mode
    mode === 'analyze' && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    })
  ].filter(Boolean),
  
  define: {
    'process.env': {},
    __DEV__: mode === 'development'
  },
  
  server: {
    hmr: { overlay: false },
    watch: { usePolling: false },
    fs: { strict: false }
  },
  
  optimizeDeps: {
    exclude: ['videos'],
    include: ['react', 'react-dom', 'react-router-dom']
  },
  
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.mov', '**/*.avi'],
  
  build: {
    target: 'es2020',
    cssTarget: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React vendors - loaded on every page
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // GSAP only loaded when needed
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger'],
          // Lenis smooth scroll - separate chunk
          'vendor-lenis': ['lenis/react'],
          // Utilities - loaded on every page
          'vendor-utils': ['react-helmet-async']
        },
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || ''
          if (/\.(mp4|webm|mov|avi)$/i.test(info)) {
            return 'videos/[name][extname]'
          }
          if (/\.(woff2?|ttf|otf|eot)$/i.test(info)) {
            return 'fonts/[name]-[hash][extname]'
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(info)) {
            return 'images/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js'
      }
    },
    // Warn on larger chunks but don't fail
    chunkSizeWarningLimit: 500,
    // Generate source maps for debugging
    sourcemap: mode !== 'production',
    // Optimize CSS
    cssMinify: true,
    // Improve asset handling
    assetsInlineLimit: 4096
  },
  
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  
  // CSS optimizations
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  
  // Resolve optimizations
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@assets': '/src/assets'
    }
  }
}))
