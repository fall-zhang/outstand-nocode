import { useI18n } from 'vue-i18n'
import { FieldItemBase, FieldItemContainer } from './types/rich-form-item'
import { wrapFieldItem } from './utils/form-wrap'
export default function generatorData(node: FieldItemBase | FieldItemContainer, {
  isWrap = true,
  isCreateLabel = true,
}) {
  const { t } = useI18n()
  let newNode:FieldItemBase | FieldItemContainer

  if (isWrap) {
    newNode = {
      type: 'inline',
      innerData: [
        (node as FieldItemBase)
      ],
      columns:[],
      id:'' ,
      key:'',
      label:''
    }
  } else {
    newNode = node
  }
  const result = wrapFieldItem(newNode)
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
