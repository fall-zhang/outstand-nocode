import { AllFieldType, FieldItemBase, FieldItemContainer, FormItem } from './rich-form-item'
import { GlobalConfig, DesktopConfig, MobileConfig } from './rich-form-config'
/**
 * 平台类型
 * 之后会移除 pc 类型
 */
export type PlatformType = 'desktop' | 'mobile'


/**
 * rich form 的数据格式
 */
export type RichFormData = {
  formList: FormItem[]
}


type FormHandler = {
  setSelection(filed:AllFieldType):void
  switchPlatform(platform:'mobile' | 'desktop') :void
  addFieldData(node:any, isCopy?:boolean) :void
  delete(filed:FieldItemBase|FieldItemContainer) :void
  /**
   * 将 FiledItem 添加到 store 中
   * @param newFiled 新的 FieldItem 字段
   * @param parentField 可选，父级容器字段
   */
  addFieldItem(newFiled:AllFieldType, parentField?:FieldItemContainer):void
  wrapElement(filedInfo:FieldItemBase|FieldItemContainer, options:Record<'isWrap'|'sourceBlock', boolean>):void
  checkPropsBySelected() :void
  validator(filedInfo:FieldItemBase, options:unknown) :void
  copy(fieldInfo:FieldItemBase|FieldItemContainer):void
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
  // 当前 form 中正在编辑的内容
  editForm:Record<string, unknown>
  canvasScrollRef:any
  // 当前选中的内容，默认选中 root
  selected: AllFieldType
  mode: 'edit' | 'setting'
  platform: 'mobile' | 'desktop'
  widthScalable: boolean,
  data: Record<string, unknown>,
  validateStates: unknown[],
  // fields: unknown[]
  // 放置逻辑 - 暂无
  logic: Record<string, unknown>
  // 放置可以用来执行的方法
  // handler:Record<string, { (params: unknown): void }>
  handler:FormHandler
  // 全局容器设定
  config: GlobalConfig
  // 全局设定
  /**
   *  桌面端对每一项都启用的设定
   */
  desktop: DesktopConfig
  // 移动端全局设定
  /**
   *  移动端对每一项都启用的设定
   */
  mobile: MobileConfig
  // desktopItems: MobileConfig
  // mobileItems: MobileConfig
}
