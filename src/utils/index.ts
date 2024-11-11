/**
 * utils 中的只作为工具使用，不要添加任何应用相关的逻辑
 * 做到任何项目都可以使用，避免多次开发工具
 */
import { deepClone } from './DeepClone'
import { isDesktop } from './device'
import { checkIdExistInLogic, removeLogicDataById, } from './logic'


export {
  deepClone,
  isDesktop,
  checkIdExistInLogic,
  removeLogicDataById,
}
export { wrapElement, checkIsField, disassemblyData1, repairLayout, syncWidthByPlatform, isInlineChildren, disassemblyData2, combinationData2, pickFields, combinationData1 } from '@Form/utils/field'