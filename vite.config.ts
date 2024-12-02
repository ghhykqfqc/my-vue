import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
    // proxy: {
    //   // string shorthand:
    //   // http://localhost:5173/foo
    //   //   -> http://localhost:4567/foo
    //   '/foo': 'http://localhost:4567',
    //   // with options:
    //   // http://localhost:5173/api/bar
    //   //   -> http://jsonplaceholder.typicode.com/bar
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // }
  },
  build: {
    outDir: 'dist',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/variables' as *;`,
      },
    },
  },
})
