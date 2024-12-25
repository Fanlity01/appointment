import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    Pages({
      dirs: ['src/pages'],
      extensions: ['vue'],

    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
