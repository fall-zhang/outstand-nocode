import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router'
import '@/assets/styles/main.scss'
// import ElementPlus from 'element-plus'
// console.log(import.meta.env)
import 'vue-fantable/libs/theme-default.css'
import FanTable from 'vue-fantable'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import 'vant/lib/index.css'
// import VantUI from 'vant'
const app = createApp(App)
app.use(Router)
app.use(FanTable)
app.use(ElementUI)
// app.use(VantUI)
app.mount('#app')
// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
