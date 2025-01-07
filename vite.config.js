import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Remove base if you're not deploying to a subdirectory
  // base: '/Neoma_Cap/',
  
  plugins: [react()],
  
  build: {
    chunkSizeWarningLimit: 1500, // Increased limit for larger chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Dynamic chunk creation based on dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('recharts')) {
              return 'recharts'
            }
            if (id.includes('lucide-react')) {
              return 'icons'
            }
            // Group other node_modules into a separate vendor chunk
            return 'vendor'
          }
        }
      }
    },
    sourcemap: process.env.NODE_ENV !== 'production', // Only generate sourcemaps in development
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.info'] : []
      }
    }
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'pages': path.resolve(__dirname, './src/pages'),
      'assets': path.resolve(__dirname, './src/assets')
    }
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'recharts'
    ],
    exclude: [] // Add any dependencies that shouldn't be pre-bundled
  },
  
  server: {
    port: 3000,
    open: true,
    host: true, // Enable access from network
    cors: true, // Enable CORS
    proxy: {
      // Add proxy configuration if needed
      // '/api': {
      //   target: 'http://your-api-server.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  },

  // Add preview configuration for testing production builds locally
  preview: {
    port: 4000,
    open: true,
    host: true
  },

  // Add environment variable configurations
  envPrefix: 'VITE_', // Only expose env variables prefixed with VITE_
  
  // Add performance configurations
  esbuild: {
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})