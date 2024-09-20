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
type BaseNodeItem = {
  type: 'input'|'number'|'select'|'textarea'|'radio'
  label: string,
  // icon: string,
  key: string, // form 中的 key
  id: string, // 唯一标志符
  options: {
    contentPosition?: 'center'|'left'|'right',
    filterable?: boolean,
    defaultValue?:string,
    labelWidth?: number,
    required: boolean
  }
}

/**
 * 容器的类型
 */
type ContainerNodeItem = {
  type: 'grid',
  label: string,
  icon: 'grid',
  id: string,
  columns: [
    {
      id: '',
      options: {
        span: 6,
        offset: 0,
        pull: 0,
        push: 0
      },
      type: 'col',
      list: []
    },
    {
      id: '',
      options: {
        span: 6,
        offset: 0,
        pull: 0,
        push: 0
      },
      type: 'col',
      list: []
    },
    {
      id: '',
      options: {
        span: 6,
        offset: 0,
        pull: 0,
        push: 0
      },
      type: 'col',
      list: []
    }
  ],
  options: {
    gutter: 0,
    justify: 'space-around',
    align: 'top'
  }
}


