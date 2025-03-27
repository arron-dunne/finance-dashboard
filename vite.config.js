import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: '/finance-dashboard/',
    root: 'src/',
    build: {
        outDir: '../dist', // Output to a directory outside src
        rollupOptions: {
            input: {
                index: 'src/index.html',
                about: 'src/about.html',
            },
        },
    }
})
