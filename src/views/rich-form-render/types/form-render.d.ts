export type FormRenderProvider = {
  lang:'zh'
  // 配置好的内容
  store: FormItem[],
  mode: 'preview'
  platform: 'mobile' | 'desktop'
  data: Record<string, unknown>,
  // 放置逻辑 - 暂无
  logic: Record<string, unknown>
  // 全局容器设定
  config: GlobalConfig
  // 全局样式设定
  // desktop: CSSProperties
  desktop: {

  },
  // 移动端全局样式设定
  // mobile: {  }
  mobile: {

  }
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
}