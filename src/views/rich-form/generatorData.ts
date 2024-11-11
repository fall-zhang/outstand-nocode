import { wrapElement } from '@/utils'
import { useI18n } from 'vue-i18n'
import { FieldItemBase, FieldItemContainer } from './types/rich-form-item'
export default function generatorData(node: FieldItemBase | FieldItemContainer, {
  isWrap = true,
  isCreateLabel = true,
}) {
  const t = useI18n().t
  let newNode:FieldItemBase | FieldItemContainer

  if (isWrap) {
    newNode = {
      type: 'inline',
      innerData: [
        node
      ]
    }
  } else {
    newNode = node
  }
  const result = wrapElement(newNode)
  if (!node.options) {
    node.options = {}
  }
  if (isCreateLabel) {
    node.label = t(`rf.fields.${node.type}`)
    if (['select', 'cascader', 'region', 'date', 'time'].includes(node.type)) {
      node.options.placeholder = t('validateMsg.placeholder2') // 选择式 - 请选择
    }
    if (['input', 'textarea', 'html'].includes(node.type)) {
      node.options.placeholder = t('validateMsg.placeholder1') // 输入式 - 请输入
    }
  }
  return result
}
