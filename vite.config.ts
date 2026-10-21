/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    strictPort: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'chess.js',
      'troika-three-text',
      '@fontsource/inter/files/inter-latin-400-normal.woff2',
    ],
  },
  build: {
    commonjsOptions: {
      include: [/chess\.js/, /node_modules/],
    },
  },
  test: {
    environment: 'node',
  },
})
