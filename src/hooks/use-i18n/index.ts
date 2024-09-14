import { computed } from 'vue'
import locale from '@/locale/rich-form'
import { transferData } from '@/utils/field'
let currentLang = 'zh-cn'
export const useI18n = (props?:string) => {
  const lang = computed(() => {
    return currentLang
  })
  const setLang = (lang:string) => {
    currentLang = lang
  }

  return {
    lang,
    t (path:string, options = {}) {
      return transferData(lang.value, path, locale, options)
    }
  }
}
