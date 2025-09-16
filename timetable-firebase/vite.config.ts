import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Optimize React components
      babel: {
        plugins: [
          // Add React optimizations
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
      },
    }),
  ],
  
  // Build optimizations
  build: {
    // Enable source maps for better debugging
    sourcemap: true,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          charts: ['recharts'],
          icons: ['lucide-react'],
        },
      },
    },
    // Optimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Target modern browsers for better performance
    target: 'esnext',
  },

  // Development server optimizations
  server: {
    port: 3000,
    host: true,
    // Enable HMR (Hot Module Replacement)
    hmr: {
      overlay: true,
    },
    // Optimize file watching
    watch: {
      usePolling: false,
      interval: 100,
    },
  },

  // CSS optimizations
  css: {
    // Enable CSS source maps
    devSourcemap: true,
    // Optimize CSS processing
    postcss: {
      plugins: [
        // Add PostCSS plugins for better CSS optimization
      ],
    },
  },

  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // Add more aliases for better imports
      '@/components': resolve(__dirname, './src/components'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/types': resolve(__dirname, './src/types'),
      '@/context': resolve(__dirname, './src/context'),
      '@/hooks': resolve(__dirname, './src/hooks'),
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'next',
      'lucide-react',
      'recharts',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
    ],
    // Exclude problematic dependencies
    exclude: ['@genkit-ai/googleai'],
  },

  // Performance optimizations
  esbuild: {
    // Enable tree shaking
    treeShaking: true,
    // Optimize JSX
    jsx: 'automatic',
    // Target modern JavaScript
    target: 'esnext',
  },

  // Define global constants
  define: {
    // Add environment variables
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
