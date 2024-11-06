/**
 * utils 中的只作为工具使用，不要添加任何应用相关的逻辑
 * 做到任何项目都可以使用，避免多次开发工具
 */
import { deepClone } from './DeepClone'
import { isDesktop } from './device'
import { checkIsField, disassemblyData1, repairLayout, syncWidthByPlatform, checkIslineChildren, disassemblyData2, combinationData2, pickFields, combinationData1 } from './field'
import { checkIdExistInLogic, removeLogicDataById, } from './logic'
// import { addContext } from './addContext'


export {
  deepClone,
  isDesktop,
  checkIsField,
  disassemblyData1,
  repairLayout,
  syncWidthByPlatform,
  checkIslineChildren,
  disassemblyData2,
  checkIdExistInLogic,
  removeLogicDataById,
  pickFields,
  combinationData1,
  combinationData2,
}
export { wrapElement, transferData, transferLabelPath } from './field'