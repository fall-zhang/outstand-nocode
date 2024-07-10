import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { resolve as pathResolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver ,VantResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    port: 6080,
    host: true, // 表示可以通过 ip 进行访问
    proxy: {
      '/api': {
        target: 'http://localhost:6000/',
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': pathResolve(__dirname, 'src'),
      '@C': pathResolve(__dirname, 'src/components'),
      '@A': pathResolve(__dirname, 'src/assets'),
      '@V': pathResolve(__dirname, 'src/views')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use 'sass:math';
        @use 'sass:map';
        @use '@/styles/er-base.scss' as *;
        `

      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    svgLoader(),
    AutoImport({
      resolvers: [ElementPlusResolver(),VantResolver()],
      dts: './src/global/auto-imports.d.ts',
      imports: ['vue', 'vue-router']
    }),
    Components({
      resolvers: [ElementPlusResolver(),VantResolver()],
      dts: './src/global/components.d.ts'
    })
  ]
})
