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
  const result = wrapElement(newNode, !!eachBack)
  if (isCreateLabel) {
    node.label = transferData(lang, transferLabelPath(node), '')
    if (['select', 'cascader', 'region', 'date', 'time'].includes(node.type)) {
      node.options.placeholder = transferData(lang, 'validateMsg.placeholder2', '请选择-未翻译') // 选择式 - 请选择
    }
    if (['input', 'textarea', 'html'].includes(node.type)) {
      node.options.placeholder = transferData(lang, 'validateMsg.placeholder1', '请输入-未翻译') // 输入式 - 请输入
    }
  }
  return result
}
