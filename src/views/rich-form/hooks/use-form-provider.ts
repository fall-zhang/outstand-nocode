import { inject } from 'vue'
import { RichFormProvider } from '../types/rich-form'

export const useFormProvider = () => {
  return inject<RichFormProvider>('rich-form', {
    fieldsList: [],
    store: [],
    canvasScrollRef: {
      value: undefined
    },
    selected: {
      id: 'root',
      type: 'root',
      label: '未获取到真实 inject，默认值提供的 root'
    },
    mode: 'edit',
    platform: 'pc',
    config: {
      isSync: false,
      fieldsPanelDefaultOpened: [],
      fieldsPanelWidth: '',
      colorList: [],
      inlineMax: 0,
      pc: {
        size: 'default',
        completeButton: {
          text: ''
        }
      },
      mobile: {
        completeButton: {
          text: ''
        }
      },
      desktop: {
        size: 'default',
        completeButton: {
          text: ''
        }
      }
    },
    widthScaleLock: false,
    data: {},
    validateStates: [],
    fields: [],
    logic: {},
    handler: {},
    desktop: {},
    mobile: {},
    desktopItems: {},
    mobileItems: {},
    state: {}
  })
}