import locale from '@/locale/rich-form'
import { wrapElement, transferData, transferLabelPath } from '@/utils'
export default function (node, isWrap = true, lang = 'zh-cn', isCreateLabel = true, eachBack) {
  const newNode = isWrap
    ? {
      type: 'inline',
      columns: [
        node
      ]
    }
    : node
  const result = wrapElement(newNode, eachBack && eachBack)
  if (isCreateLabel) {
    node.label = transferData(lang, transferLabelPath(node), locale)
    if (['select', 'cascader', 'region', 'date', 'time'].includes(node.type)) {
      node.options.placeholder = transferData(lang, 'validateMsg.placeholder2', locale) // 选择式 - 请选择
    }
    if (['input', 'textarea', 'html'].includes(node.type)) {
      node.options.placeholder = transferData(lang, 'validateMsg.placeholder1', locale) // 输入式 - 请输入
    }
  }
  return result
}
