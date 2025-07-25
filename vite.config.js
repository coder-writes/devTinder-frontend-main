import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1500,
    outDir: 'dist',
  },
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  }
})
