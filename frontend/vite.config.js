import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react-core';
            }
            if (id.includes('react')) {
              return 'vendor-react-base';
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animation';
            }
            if (id.includes('three') || id.includes('react-globe.gl')) {
              return 'vendor-globe-heavy';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
            return 'vendor-others';
          }
        },
      },
    },
  },
})
