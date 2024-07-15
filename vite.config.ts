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
import VueDevTools from 'vite-plugin-vue-devtools'

// const isProduction = import.meta.env.MODE
// console.log("🚀 ~ isProduction:", isProduction)

// https://vitejs.dev/config/

// const examplePlugin = () => {
//   let config

//   return {
//     name: 'custom-vuedraggableAndSortable',
//     transform(code, id) {
//       /*eslint-disable*/
//       if (true) {
//         if (/vuedraggable\.js/.test(id)) {
//           return code.replace('this._sortable = new Sortable(targetDomElement, sortableOptions);', (...e) => {
//             return `Sortable.mount($attrs.plugins || []);
//             ${e[0]}`
//           })
//         }
//         if (/sortablejs/.test(id)) {
//           return code.replace(`    plugins.forEach(function (p) {
//       if (p.pluginName === plugin.pluginName) {
//         throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
//       }
//     });
//     plugins.push(plugin);`, (...e) => {
//             return `if (!plugins.filter(e => e.pluginName === plugin.pluginName).length) {
//           window.plugins = plugins;
// 			    plugins.push(plugin);}`
//           })
//         }
//       } else {
//         if (/vuedraggable/.test(id)) {
//           let result = code.replace('this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(targetDomElement, sortableOptions);', (...e) => {
//             return `external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a.mount($attrs.plugins || []);
//   ${e[0]}`
//           })
//           result = result.replace(`plugins.forEach(function(p) {
//           if (p.pluginName === plugin.pluginName) {
//             throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
//           }
//         });
//         plugins.push(plugin);`, (...e) => {
//             return `if (!plugins.filter(e => e.pluginName === plugin.pluginName).length) {
//           window.plugins = plugins;
// 			    plugins.push(plugin);}`
//           })
//           return result
//         }
//       }
//       /*eslint-disable*/
//     }
//   }
// }
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
    // examplePlugin(),
    vue(),
    vueJsx(),
    svgLoader(),
    VueDevTools(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      resolvers: [ElementPlusResolver(),VantResolver()],
      dts: './src/global/auto-imports.d.ts',
      imports: ['vue', 'vue-router']
    }),
    Components({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      resolvers: [ElementPlusResolver(),VantResolver()],
      dts: './src/global/components.d.ts'
    })
  ]
})
