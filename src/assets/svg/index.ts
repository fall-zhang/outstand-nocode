const importModules = import.meta.glob('./*.svg', { eager: true })
const modules:Record<string, any> = {}
Object.keys(importModules).forEach(key => {
  const filenameReg = /[a-zA-Z0-9_-]*(?=\.svg)/g
  const exposeName = key.match(filenameReg)
  if (Array.isArray(exposeName)) {
    modules[exposeName[0]] = importModules[key]
  } else {
    console.warn('存在 icon 名称未被解析', key)
  }
})

export default modules
