import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    wasm(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Image Processor PWA',
        short_name: 'ImgProc',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3367D6',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['rust-wasm']
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
})
