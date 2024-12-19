import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    eslintPlugin({
      cache: false, // 禁用缓存
      emitWarning: true, // 在控制台中显示警告
      emitError: true, // 在控制台中显示错误
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.vue'], // 指定要检查的文件
      exclude: ['node_modules/**'], // 排除的文件
    }),
  ],
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
  }
})
