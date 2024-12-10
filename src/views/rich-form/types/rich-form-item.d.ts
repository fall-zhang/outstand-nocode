import { StyleValue, CSSProperties } from 'vue'
/**
 * 不同平台下，对应平台的 form-item 中配置
 */
export type PlatformConf = {
  [ string ]:any
  size: string
  labelPosition:string
  children?: FormItem[]
  style:CSSProperties
}
export type BaseItemType = 'input'|'number'|'select'|'textarea'|'radio'|'checkbox'|'time'|'date'|'rate'|'switch'|'slider' | 'cascader'
// 'table'
export type ContainerItemTypes = 'col' | 'grid' | 'tabs' |'collapse' | 'divider' | 'inline'


type FieldItemRoot = {
  type: 'root'
  id: 'root'
  label: string
}
/**
 * 无嵌套 form 的类型
 */
export type FieldItemBase = {
  type: BaseItemType
  label: string,
  key: string, // form 中的 key
  name?: string // 用户定义的名称，如果没有使用 label 代替
  id: string, // 唯一标志符
  // 需要区分移动端和桌面端的配置，就需要分开为两个对象
  desktop?:PlatformConf
  mobile?:PlatformConf
  // 改造 option 建议作为 el-form-item 以及 field 的 props 使用，即可实现所有通用
  options:Record<string, any>
  // 上下文相关
  context?:{
    parentId?: string // 父元素的 id
    isContainerChild?: boolean // 父容器是否为容器
    parent?: FieldItemRoot | unknown // 父元素
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
 * 容器内子容器类型，以及配置
 */
export type FieldContainerInner = {
  id: string,
  type: 'col',
  label: string,
  span: number,
  offset: number,
  options:Record<string, any>
  // list?:FieldItemBase[] // 传到该容器上的 data
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
  // column 中放置各个子容器的配置
  columns: FieldContainerInner[]
  options?:Record<string, any>
  // 内部的数据
  innerData:FieldItemBase[]
  context?:{
    parent: FieldItemRoot | unknown // 父元素
  }
  // options: {
  //   gutter: 0,
  //   justify: 'space-around',
  //   align: 'top'
  // }
}


export type AllFieldType = FieldItemContainer |FieldItemRoot |FieldItemBase

