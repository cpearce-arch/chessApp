/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** Relative `./` for local zip; `/chessApp/` for GitHub Pages (see build:web). */
const base = process.env.VITE_BASE_PATH ?? './'

export default defineConfig({
  plugins: [react()],
  base,
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
      '@react-three/postprocessing',
      'postprocessing',
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
