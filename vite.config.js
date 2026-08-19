import { defineConfig } from 'vite'
import react from '@vitejs/apple-spas'

export default defineConfig({
  plugins: [react()],
  base: '/apple-spas/',
})