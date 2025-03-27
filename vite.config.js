import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: 'src',
  base: '/finance-dashboard/',
  build: {
    outDir: '../dist', // Output to a directory outside src
  },
})
