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
export type FormItem = {
  id: string
  key:string
  label: string
  children?: FormItem
  options:Record<string, unknown>
}
/**
 * 通常 form 的类型
 */
export type BaseNodeItem = {
  type: 'input'|'number'|'select'|'textarea'|'radio'
  label: string,
  icon: string,
  key: string, // form 中的 key
  id: string, // 唯一标志符
  options:Record<string, any>
  // options: {
  //   contentPosition?: 'center'|'left'|'right',
  //   filterable?: boolean,
  //   defaultValue?:string,
  //   labelWidth?: number,
  //   required: boolean
  // }
}
type ContainerItem = {
  id: string,
  options: {
    span: number,
    offset: number,
    pull: number,
    push: number
  },
  type: 'col',
  list: []
}
/**
 * 容器的类型
 */
export type FieldItemContainer = {
  type: ContainerType
  id: string
  label: string
  icon?: string
  columns: ContainerItem[]
  options?:Record<string, any>
  // options: {
  //   gutter: 0,
  //   justify: 'space-around',
  //   align: 'top'
  // }
}

export type FieldItemRoot = {
  type: 'root',
  id: 'root',
  label: string
}

export type AllFieldType = FieldItemContainer |FieldItemRoot |FieldItemBase

