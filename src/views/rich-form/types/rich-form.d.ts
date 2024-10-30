import { CSSProperties, StyleValue } from 'vue'
import { AllFieldType, FormItem } from './rich-form-item'
import { GlobalConfig } from './rich-form-config'
/**
 * 平台类型
 * 之后会移除 pc 类型
 */
export type PlatformType = 'desktop' | 'mobile'

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




type FormHandler = {
  setSelection(filed:AllFieldType):void,
  switchPlatform(platform:'mobile' | 'desktop') :void,
  addFieldData() :void,
  delete() :void,
  addField() :void,
  wrapElement() :void
  checkPropsBySelected() :void
  validator() :void
  copy():void
}

export type RichFormProvider = {
  lang:'zh'
  // 左侧菜单的配置
  fieldsList:({
    name: string;
    id: string;
    list: Array<FieldItemContainer|FieldItemBase>;
  })[]
  // 中心区域当前配置的内容
  store: AllFieldType[],
  storeMap: Map<string, AllFieldType>
  canvasScrollRef:any
  // 当前选中的内容，默认选中 root
  selected: AllFieldType
  mode: 'edit' | 'setting' | 'preview'
  platform: 'mobile' | 'desktop'
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
  desktopItems: DesktopConfig
  desktopItems: any
  /**
   *  移动端对每一项都启用的设定
   */
  mobileItems: MobileConfig
  mobileItems:any
  /** 等待移除 */
  state:any
}
