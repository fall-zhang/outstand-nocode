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
import supportLangs from '@/locales'
import { createI18n } from 'vue-i18n'

// localStorage.getItem('CURRENT_LANGUAGE')
// localStorage.setItem('CURRENT_LANGUAGE', 'zh-cn')

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: ['en', 'zh'],
  messages: supportLangs
})
const app = createApp(App)
app.use(Router)
app.use(FanTable)
app.use(ElementUI)
app.use(i18n)
// app.use(VantUI)
app.mount('#app')
// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
