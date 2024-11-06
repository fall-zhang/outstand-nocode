import { StyleValue, CSSProperties } from 'vue'
/**
 * 中间区域数据的存储类型
 */
export type PlatformConf = {
  size: string
  labelPosition:string
  children?: FormItem[]
  style:CSSProperties
}
export type BaseItemType = 'input'|'number'|'select'|'textarea'|'radio'|'checkbox'|'time'|'date'|'rate'|'switch'|'slider'
// 'table'
type ContainerItemTypes = 'col' | 'grid' | 'tabs' |'collapse' | 'divider' | 'inline'

type FieldItemRoot = {
  type: 'root'
  id: 'root'
  label: string
}
/**
 * 通常 form 的类型
 */
export type FieldItemBase = {
  type: BaseItemType
  label: string,
  key: string, // form 中的 key
  name?: string // 用户定义的名称，如果没有使用 label 代替
  id: string, // 唯一标志符
  desktop?:PlatformConf
  mobile?:PlatformConf
  options:Record<string, any>
  context?:{
    parent: FieldItemRoot | unknown // 父元素
  }
  // options: {
  //   contentPosition?: 'center'|'left'|'right',
  //   filterable?: boolean,
  //   defaultValue?:string,
  //   labelWidth?: number,
  //   required: boolean
  // }
}

/**
 * 容器嵌套的子类型
 */
export type ContainerItem = {
  id: string,
  type: 'col',
  label: string,
  span: number,
  offset: number,
  options:Record<string, any>
  list?:FieldItemBase[] // 传到该容器上的 data
}
/**
 * 容器的类型
 */
export type FieldItemContainer = {
  type: ContainerItemTypes
  id: string
  name?: string // 用户定义的名称，如果没有使用 label 代替
  key: string, // form 中的 key
  label: string
  desktop?:PlatformConf
  mobile?:PlatformConf
  columns: ContainerItem[]
  options?:Record<string, any>
  innerData:FieldItemBase[]
  // options: {
  //   gutter: 0,
  //   justify: 'space-around',
  //   align: 'top'
  // }
}


export type AllFieldType = FieldItemContainer |FieldItemRoot |FieldItemBase

