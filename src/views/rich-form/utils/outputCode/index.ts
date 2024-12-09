import { DesktopConfig, MobileConfig } from '../../types/rich-form-config'
import { FieldItemBase, FieldItemContainer, PlatformConf } from '../../types/rich-form-item'

/**
 * 将 form 生成 vue 代码
 */
export default function outputCode(formStore:Array<FieldItemContainer|FieldItemBase>, config:{desktop:DesktopConfig, mobile:MobileConfig}) {
  const { desktop, mobile } = config
  const result = {
    list: [],
    config: {
      desktop,
      mobile
    }
  }
}


