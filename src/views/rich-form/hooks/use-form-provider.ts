import { inject } from 'vue'
import { RichFormProvider } from '../types/rich-form'
import { BaseItemType, ContainerItemType } from '../types/rich-form-item'

export const useFormProvider = () => {
  const storeMap = new Map()

  function errorHandler() {
    throw new Error('未获取到真实 inject')
  }
  const defaultInject:RichFormProvider = reactive({
    lang: 'zh',
    fieldsList: [], // 左侧菜单的配置
    store: [], // 中心区域当前配置的内容
    storeMap,
    canvasScrollRef: { // 画布区域的 scroll
      value: undefined
    },
    selected: {
      id: 'root',
      type: 'root',
      label: '未获取到真实 inject，默认选中 root'
    },
    mode: 'edit',
    platform: 'desktop',
    config: {
      isSync: false,
      fieldsPanelDefaultOpened: [],
      fieldsPanelWidth: '',
      colorList: [],
      inlineMax: 0,
      mobile: {
        completeButton: {
          text: ''
        }
      },
      desktop: {
        formOption: {
          size: 'default',
          labelPosition: 'left',
          hideRequiredAsterisk: false,
          labelWidth: ''
        },
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
    handler: {
      setSelection: errorHandler,
      switchPlatform: errorHandler,
      addFieldData: errorHandler,
      delete: errorHandler,
      addField: errorHandler,
      wrapElement: errorHandler,
      checkPropsBySelected: errorHandler,
      validator: errorHandler,
      copy: errorHandler,
    },
    desktop: {},
    mobile: {},
    desktopItems: {
      labelWidth: '',
      size: 'default',
      labelPosition: 'left'
    },
    mobileItems: {
      labelWidth: '',
      size: 'large',
      labelPosition: 'left'
    },
    state: {}
  })
  const formProvider = inject<RichFormProvider>('rich-form', defaultInject)
  const isDesktop = computed(() => formProvider.platform === 'desktop')
  const isSelectRoot = computed(() => formProvider.selected.id === 'root')

  const basicFieldList = ref<string[]>(['input', 'number', 'select', 'textarea', 'radio', 'checkbox', 'time', 'date', 'rate', 'switch', 'slider'])
  const containerFiledList = ref<string[]>(['col', 'grid', 'tabs', 'collapse', 'divider', 'inline'])
  return {
    ...toRefs(formProvider),
    isDesktop,
    isSelectRoot,
    basicFieldList,
    containerFiledList
  }
}