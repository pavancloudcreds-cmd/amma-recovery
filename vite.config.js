import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/amma-recovery/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Amma Recovery',
        short_name: 'Amma',
        description: 'Pre-surgery diet tracker for Mrs. Jayalakshmi',
        theme_color: '#1a3a5c',
        background_color: '#f0f4f8',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/amma-recovery/',
        start_url: '/amma-recovery/',
        icons: [
          {
            src: '/amma-recovery/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/amma-recovery/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
