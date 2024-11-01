type CompleteButton = {
  text: string
  style: CSSProperties
}

export type GlobalConfig = {
  isSync: boolean,
  colorList:string[]
  inlineMax:number // 每行最多放置多少个 form
}


export type DesktopConfig ={
  style:CSSProperties
  formOption:{
    size: 'default'| 'large' | 'default' | 'small'| ''
    labelPosition:'left'|'top'|'right'
    hideRequiredAsterisk:boolean // 必填的 * 是否隐藏
    labelWidth:string // 以数字结束时，默认加上 px
  }
  completeButton: {

  }
}

export type MobileConfig ={
  style:CSSProperties
  formOption:{
    labelPosition:'left'|'top'
    hideRequiredAsterisk:boolean // 必填的 * 是否隐藏
    labelWidth:string // 以数字结束时，默认加上 px
  }
  completeButton: {

  }
}