import { StyleValue } from 'vue'

/**
 * 平台类型
 * 之后会移除 pc 类型
 */
export type PlatformType = 'desktop' | 'mobile' | 'pc'

type MobileConfig = {
  labelWidth: number
  size:'large' | 'normal'
  labelPosition: 'left' | 'top'
  style: StyleValue
}
type DesktopConfig = {
  labelWidth: number
  size:'large'|'default'|'small'
  labelPosition: 'left' | 'top'
  style: StyleValue
}

type FormItem = {
  id: string
  key:string
  label: string
  children?: FormItem
  options:Record<string, unknown>
}

/**
 * rich form 的数据格式
 */
export type RichFormData = {
  formList: FormItem[]
  // 全局容器设定
  desktop: StyleValue
  mobile: StyleValue
  // 对每一项都启用的设定
  desktopItems: Partial<DesktopConfig>
  mobileItems: Partial<MobileConfig>
}


type GlobalConfig = {
  isSync: boolean,
  pc: {
    size: 'default',
    completeButton: {
      text: string,
    }
  },
  mobile: {
    completeButton: {
      text: string,
    }
  }
}


export type RichFormProvider = {
  store: FormItem[],
  selected: Record<string, unknown>,
  mode: 'edit' | 'setting' | 'preview',
  platform: 'pc',
  config: GlobalConfig,
  widthScaleLock: boolean,
  data: Record<string, unknown>,
  validateStates: [],
  fields: unknown[],
  logic: {},
  validator(target: any, fn: any): void
}
