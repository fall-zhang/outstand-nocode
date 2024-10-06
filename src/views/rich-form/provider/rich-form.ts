import { RichFormData, RichFormProvider } from '../types/rich-form'

// 获取注入的内容
export function getFormInject():RichFormProvider {
  const res = inject<RichFormProvider>('rich-form', {
    state: undefined,
    store: [],
    selected: {},
    mode: 'edit',
    platform: 'pc',
    config: {
      isSync: false,
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
      }
    },
    widthScaleLock: false,
    data: {},
    validateStates: [],
    fields: [],
    logic: {},
    setSelection: function (node: any): void {
      throw new Error('Function not implemented.')
    },
    validator: function (target: any, fn: any): void {
      throw new Error('Function not implemented.')
    },
    desktop: undefined,
    mobile: undefined,
    desktopItems: {},
    mobileItems: {}
  })
  return res
}

export function injectFormInfo(info:RichFormProvider) {
  provide('rich-form', info)
}