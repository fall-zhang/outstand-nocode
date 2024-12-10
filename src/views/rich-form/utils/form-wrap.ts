import { nanoid } from 'nanoid'
import { AllFieldType, FieldContainerInner, ContainerItemTypes, FieldItemBase, FieldItemContainer } from '../types/rich-form-item'
type FormItem = FieldItemBase | FieldItemContainer
/**
 * 从左侧拖拽到中心后，默认进行一次包装
 * 添加随机 key，id，宽高等
 */
export function wrapFieldItem(filedInfo:FormItem) {
  const result:FormItem = {
    ...filedInfo
  }

  // id key 初始化
  if (!result.id) {
    result.id = nanoid()
  }
  if (!result.key) {
    result.key = `${result.type}_${result.id}`
  }
  // style 包装
  if (!result.desktop) {
    result.desktop = {
      size: '',
      labelPosition: 'left',
      style: {}
    }
    if (['grid', 'tabs', 'collapse', 'table', 'divider'].includes(result.type)) {
      result.desktop.style = {
        width: '100%'
      }
    }
  }
  if (!result.mobile) {
    result.mobile = {
      size: '',
      labelPosition: 'left',
      style: {}
    }
  }
  // 非容器类型，默认宽度 100%
  if (['input', 'textarea', 'number', 'radio', 'checkbox', 'select', 'time', 'date', 'rate', 'switch', 'slider', 'html', 'cascader', 'uploadfile', 'signature', 'region'].includes(result.type)) {
    result.desktop.style = {
      width: '100%'
    }
    result.mobile.style = {
      width: '100%'
    }
  }
  if (result.type === 'tabs') {
    result.columns = new Array(3).fill('').map((_, index) => {
      const data = getContainerInnerData('col')
      data.label = `Tab ${index + 1}`
      return data
    })
  }
  if (result.type === 'collapse') {
    result.columns = new Array(3).fill('').map((_, index) => {
      const data = getContainerInnerData('col')
      data.label = `Tab ${index + 1}`
      return data
    })
  }
  return result
}

const getContainerInnerData = (type:'col') => {
  const result:FieldContainerInner = {
    id: nanoid(),
    type,
    // list: [],
    span: 0,
    offset: 0,
    label: '',
    options: {}
  }
  return result
}