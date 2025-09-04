import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [
    react()
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    port: 3000,
    open: true
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
    port: 3000
  }
});
