/**
 * 单个 formItem 的类型
 */
export type FormNodeItem = {
  name: '容器',
  id: 'container',
  list: []
}

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

/**
 * 容器的类型
 */
export type ContainerNodeItem = {
  type: 'grid' |'inline',
  id: string,
  label: string,
  icon?: string,
  columns: {
    id: string,
    options: {
      span: number,
      offset: number,
      pull: number,
      push: number
    },
    type: 'col',
    list: []
  }[],
  options?:Record<string, any>
  // options: {
  //   gutter: 0,
  //   justify: 'space-around',
  //   align: 'top'
  // }
}
export type RootNodeItem = {
  type: 'root',
  id: 'root',
  label: string
}

export type AllNodeType = ContainerNodeItem |RootNodeItem |BaseNodeItem

