type CompleteButton = {
  text: string
  theme: 'primary' | 'dashed' | 'text' | 'link' | 'ghost' | 'default'
  preset: '' | 'primary' | 'dashed' | 'text' | 'link' | 'ghost' | 'default'
  style: CSSProperties
}

/**
 * 全局配置，方便用户的自定义配置
 */
export type GlobalConfig = {
  isSync: boolean,
  colorList:string[]
  inlineMax:number // 每行最多放置多少个 form
}

export type DesktopFormOption = {
  height:number // 画布的高度
  width:number// 画布的宽度
  size: 'default'| 'large' | 'small'| ''
  labelPosition:'left'|'top'|'right'
  hideRequiredAsterisk:boolean // 必填的 * 是否隐藏
  labelWidth:string // 以数字结束时，默认加上 px
}

export type DesktopConfig ={
  style:CSSProperties
  formOption:DesktopFormOption
  completeButton: CompleteButton
}
export type MobileFormOption = {
  labelPosition:'left'|'top'
  hideRequiredAsterisk:boolean // 必填的 * 是否隐藏
  labelWidth:string // 以数字结束时，默认加上 px
}
export type MobileConfig ={
  style: CSSProperties
  formOption: MobileFormOption
  completeButton: CompleteButton
}