// import _ from 'lodash-es'
// // const importModules = import.meta.glob('./*.js', { import: 'setup' })
// const importModules = import.meta.glob('./*.js', { import: 'default', eager: true })
// const modules = {}
// _.forIn(importModules, (func, path) => {
//   const re = /[a-zA-Z0-9_-]*(?=\.js)/g
//   modules[path.match(re)[0]] = func
// })
// console.log('🚀 ~ modules:', modules)
// export default modules
import zhCn from './zh-cn'
import en from './en'

export default {
  'zh-cn':zhCn,
  en
}