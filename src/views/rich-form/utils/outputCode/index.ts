import { FieldItemBase, FieldItemContainer } from '../../types/rich-form-item'

/**
 * 将 form 生成 vue 代码
 */
export default function outputCode(formStore:Array<FieldItemContainer|FieldItemBase>, config:{desktop:PlatformType, mobile:PlatformType}) {
  const { desktop, mobile } = config
  const result = {
    list: [],
    config: {
      desktop,
      mobile
    }
  }
}


