/**
 * utils 中的只作为工具使用，不要添加任何应用相关的逻辑
 * 做到任何项目都可以使用，避免多次开发工具
 */
import { deepClone } from './DeepClone'
import { isPC } from './device'
import { checkIsField, disassemblyData1, repairLayout, deepTraversal, syncWidthByPlatform, checkIslineChildren, disassemblyData2, combinationData2, pickFields, combinationData1 } from './field'
import { checkIdExistInLogic, removeLogicDataById, } from './logic'
import { addContext } from './addContext'


export {
  deepClone,
  isPC,
  checkIsField,
  disassemblyData1,
  repairLayout,
  deepTraversal,
  syncWidthByPlatform,
  checkIslineChildren,
  disassemblyData2,
  checkIdExistInLogic,
  removeLogicDataById,
  pickFields,
  combinationData1,
  combinationData2,
  addContext
}
const importModules = import.meta.glob('./*.ts', { eager: true })
const modules:Record<string, unknown> = {}

// 将 forIn 转换为原生写法
Object.values(importModules).forEach((func:any) => {
  Object.keys(func).forEach((key) => {
    modules[key] = func[key]
  })
})

export default {
  ...modules
}

export { wrapElement, transferData, transferLabelPath } from './field'