import { StyleValue, CSSProperties } from 'vue'
// 基本 Form 类型
enum BaseFormType {
  input,
  textarea,
  number,
  radio,
  checkbox,
  select,
  time,
  date,
  rate,
  switch,
  slider,
  html,
  cascader,
  uploadFile,
  signature,
  region
}
// 容器类型
export enum ContainerType {
  GRID='grid',
  INLINE = 'inline', // 单行
  TABS = 'tabs',
  COLLAPSE = 'collapse'
}
/**
 * 中间区域数据的存储类型
 */
export type PlatformConf = {
  size: string
  labelPosition:string
  label: string
  children?: FormItem[]
  style:CSSProperties
  // options:Record<string, unknown>
}
export type BaseItemType = 'input'|'number'|'select'|'textarea'|'radio'|'checkbox'|'time'|'date'|'rate'|'switch'|'slider'
// 'table'
export type ContainerItemType = 'col' | 'grid' | 'tabs' |'collapse' | 'divider' | 'inline'
/**
 * 通常 form 的类型
 */
 type FieldItemBase = {
  type: BaseItemType
  label: string,
  icon: string,
  key: string, // form 中的 key
  id: string, // 唯一标志符
  desktop?:PlatformConf
  mobile?:PlatformConf
  options:Record<string, any>
  // options: {
  //   contentPosition?: 'center'|'left'|'right',
  //   filterable?: boolean,
  //   defaultValue?:string,
  //   labelWidth?: number,
  //   required: boolean
  // }
}
export type ContainerColumn = {
  id: string,
  name:string
  type: 'col' | 'td'
  // desktop:PlatformConf
  // mobile:PlatformConf
  options: {
    gap:number
    span: number,
    offset: number,
    pull: number,
    push: number
  },
  list: []
}
/**
 * 容器的类型
 */
export type FieldItemContainer = {
  type: ContainerItemType
  id: string
  label: string
  icon?: string
  desktop?:PlatformConf
  mobile?:PlatformConf
  columns: ContainerItem[]
  options?:Record<string, any>
  // options: {
  //   gutter: 0,
  //   justify: 'space-around',
  //   align: 'top'
  // }
}

type FieldItemRoot = {
  // desktop:PlatformConf
  // mobile:PlatformConf
  type: 'root',
  id: 'root',
  label: string
}

export type AllFieldType = FieldItemContainer |FieldItemRoot |FieldItemBase

