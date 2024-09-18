// 先只在 rich-form 中实现 i18n
import richFormZH from './zh/rich-form.json'
import richFormEN from './en/rich-form.json'

export default {
  en: {
    ...richFormEN
  },
  zh: {
    ...richFormZH
  }
}