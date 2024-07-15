import { computed, inject } from 'vue'
import locale from '@/locale/rich-form'
import { transferData } from '@/utils/field'

export const useI18n = (props) => {
  const ER = inject('Everright', { props })
  const lang = computed(() => {
    return ER.props.lang
  })
  return {
    lang,
    t (path, options) {
      return transferData(lang.value, path, locale, options)
    },
    $t (path, options) {
      return transferData(lang.value, path, locale, options)
    }
  }
}
