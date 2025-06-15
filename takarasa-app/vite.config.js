import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
        allowedHosts: [
            'ffa0-114-10-44-114.ngrok-free.app'
        ],
        host: true,
    },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
