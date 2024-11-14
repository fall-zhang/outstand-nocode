import { FormHandler, RichFormProvider } from '../types/rich-form'
import { fieldsConfig } from './componentsConfig'

export function getDefaultProvide(handler:FormHandler) {
  const storeMap = ref(new Map())
  const defaultProvide:RichFormProvider = {
    lang: 'zh',
    fieldsList: fieldsConfig,
    storeMap: storeMap.value,
    store: [],
    selected: {
      type: 'root',
      id: 'root',
      label: 'default'
    },
    mode: 'edit',
    platform: 'desktop',
    widthScalable: false,
    data: {},
    validateStates: [],
    logic: {},
    desktop: {
      style: {},
      formOption: {
        size: '',
        labelPosition: 'left',
        hideRequiredAsterisk: false,
        labelWidth: '',
        height: 0,
        width: 0
      },
      completeButton: {
        text: '',
        theme: 'default',
        preset: '',
        style: undefined
      }
    },
    mobile: {
      style: {},
      formOption: {
        labelPosition: 'left',
        hideRequiredAsterisk: false,
        labelWidth: ''
      },
      completeButton: {
        text: '',
        theme: 'default',
        preset: '',
        style: undefined
      }
    },
    config: {
      inlineMax: 4,
      isSync: false,
      colorList: [
        'rgba(255, 255, 255, 1)',
        'rgba(249, 249, 249, 1)',
        'rgba(233, 233, 233, 1)',
        'rgba(254, 249, 210, 1)',
        'rgba(253, 246, 236, 1)',
        'rgba(254, 241, 241, 1)',
        'rgba(236, 246, 255, 1)',
        'rgba(235, 242, 244, 1)',
        'rgba(240, 249, 236, 1)'
      ],
    },
    canvasScrollRef: ref(),
    handler
  }
  return defaultProvide
}