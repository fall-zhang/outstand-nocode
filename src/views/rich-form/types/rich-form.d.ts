import { CSSProperties, StyleValue } from 'vue'
import { AllNodeType, FormItem } from './rich-form-item'
/**
 * 平台类型
 * 之后会移除 pc 类型
 */
export type PlatformType = 'desktop' | 'mobile' | 'pc'

type MobileConfig = {
  labelWidth: number |string
  size:'large' | 'normal'
  labelPosition: 'left' | 'top'
  style?: CSSProperties
}
type DesktopConfig = {
  labelWidth: number|string
  size:'large'|'default'|'small'
  labelPosition: 'left' | 'top'
  style?: CSSProperties
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
  desktop: {
    size: 'default',
    completeButton: {
      text: string,
    }
  },
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
  lang:'zh'
  // 左侧菜单的配置
  fieldsList:any[]
  // 配置好的内容
  store: FormItem[],
  canvasScrollRef:any
  // 当前选中的内容，默认选中 root
  selected: AllNodeType
  mode: 'edit' | 'setting' | 'preview'
  platform: 'pc' | 'mobile' | 'desktop'
  widthScaleLock: boolean,
  data: Record<string, unknown>,
  validateStates: unknown[],
  fields: unknown[]
  // 放置逻辑 - 暂无
  logic: Record<string, unknown>
  // 放置可以用来执行的方法
  handler:Record<string, any>
  // 全局容器设定
  config: GlobalConfig
  // 全局样式设定
  // desktop: CSSProperties
  desktop: CSSProperties
  // 移动端全局样式设定
  // mobile: CSSProperties
  mobile: CSSProperties
  /**
   *  桌面端对每一项都启用的设定
   */
  // desktopItems: Partial<DesktopConfig>
  desktopItems: any
  /**
   *  移动端对每一项都启用的设定
   */
  // mobileItems: Partial<MobileConfig>
  mobileItems:any
  /** 等待移除 */
  state:any
}
