type CompleteButton = {
  text: string
}

export type GlobalConfig = {
  isSync: boolean,
  fieldsPanelDefaultOpened: string[]
  fieldsPanelWidth:string
  colorList:string[]
  inlineMax:number // 每行最多放置多少个 form
  desktop: {
    formOption:{
      size: 'default'| 'large' | 'default' | 'small'| ''
      labelPosition:'left'|'top'|'right'
      hideRequiredAsterisk:boolean // 必填的 * 是否隐藏
      labelWidth:string // 以数字结束时，默认加上 px
    }
    completeButton: {

    }
  },
  mobile: {
    completeButton: {

    }
  }
}