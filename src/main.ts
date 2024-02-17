import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router'
import '@/assets/styles/main.scss'
// import ElementPlus from 'element-plus'
// console.log(import.meta.env)

import FanTable from 'vue-fantable'

const app = createApp(App)
app.use(Router)
app.use(FanTable)
app.mount('#app')
// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
