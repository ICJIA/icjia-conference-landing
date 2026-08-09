import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Relative base so the built site works from any subpath.
  base: './',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        modernist: fileURLToPath(new URL('./pages/modernist.html', import.meta.url)),
        industry: fileURLToPath(new URL('./pages/industry.html', import.meta.url)),
      },
    },
  },
})
