import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  server: {
    hmr: {
      overlay: false
    },
    watch: {
      usePolling: false
    },
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    exclude: ['videos']
  },
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.mov', '**/*.avi'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && (assetInfo.name.endsWith('.mp4') || 
                                assetInfo.name.endsWith('.webm') || 
                                assetInfo.name.endsWith('.mov'))) {
            return 'videos/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        manualChunks: {
          'video-components': ['./src/components/LazyVideo.jsx']
        }
      }
    },
    chunkSizeWarningLimit: 2000,
    target: 'es2015'
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'Content-Type': 'video/mp4'
    }
  }
})
