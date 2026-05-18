import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
    open: false,
    host: true,
    strictPort: false
  },
  resolve: {
    preserveSymlinks: true
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    host: true,
    strictPort: false
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
})
