import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'next/image': 'next/dist/client/image.js',
    },
  },
  css: {
    postcss: './postcss.config.cjs', // PostCSS configuration for custom CSS processing
  },
  assetsInclude: ['**/*.glb']
})
