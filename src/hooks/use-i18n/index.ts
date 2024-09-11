import { computed } from 'vue'
import locale from '@/locale/rich-form'
import { transferData } from '@/utils/field'

export const useI18n = (props?:string) => {
  const lang = computed(() => {
    return 'zh-cn'
  })
  return {
    lang,
    t (path:string, options = {}) {
      return transferData(lang.value, path, locale, options)
    }
  }
}
