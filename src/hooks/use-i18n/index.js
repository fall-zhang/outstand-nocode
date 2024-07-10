import { computed, inject } from 'vue'
import locale from '@/views/rich-form/formEditor/locale'
import utils from '@/utils'
import { get, template, isEmpty } from 'lodash-es'
// const transferData = (lang, path, options = {}) => {
//   let result = ''
//   if (isEmpty(options)) {
//     result = get(locale[lang.value], path, '')
//   } else {
//     result = template(get(locale[lang.value], path, ''))(options)
//   }
//   return result
// }
export const useI18n = (props) => {
  const ER = inject('Everright', { props })
  const lang = computed(() => {
    return ER.props.lang
  })
  return {
    lang,
    t (path, options) {
      return utils.transferData(lang.value, path, locale, options)
    }
  }
}
