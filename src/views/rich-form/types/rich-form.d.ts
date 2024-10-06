import { ScrollPos } from 'element-plus/es/components/table-v2/src/composables'
import { StyleValue } from 'vue'

/**
 * 平台类型
 * 之后会移除 pc 类型
 */
export type PlatformType = 'desktop' | 'mobile' | 'pc'

type MobileConfig = {
  labelWidth: number |string
  size:'large' | 'normal'
  labelPosition: 'left' | 'top'
  style: StyleValue
}
type DesktopConfig = {
  labelWidth: number|string
  size:'large'|'default'|'small'
  labelPosition: 'left' | 'top'
  style: StyleValue
}

/**
 * rich form 的数据格式
 */
export type RichFormData = {
  formList: FormItem[]
}

export type GlobalConfig = {
  isSync: boolean,
  // uploadURL: '',
  fieldsPanelDefaultOpened: string[]
  fieldsPanelWidth:string
  colorList:string[]
  inlineMax:number // 每行最多放置多少个 form
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
  // 左侧菜单的配置
  fieldsList:any[]
  // 配置好的内容
  store: FormItem[],
  // formItems:any[]
  canvasScrollRef:Ref<ScrollPos>
  selected: AllNodeType,
  mode: 'edit' | 'setting' | 'preview',
  platform: 'pc'|'mobile',
  config: GlobalConfig,
  widthScaleLock: boolean,
  data: Record<string, unknown>,
  validateStates: [],
  fields: unknown[],
  logic: {},
  handler:Record<string, any>
  // setSelection(node:any):void
  // validator(target: any, fn: any): void
  // 全局容器设定
  desktop: StyleValue
  mobile: StyleValue
  // 对每一项都启用的设定
  desktopItems: Partial<DesktopConfig>
  mobileItems: Partial<MobileConfig>
  /** 等待移除 */
  state:any
}
