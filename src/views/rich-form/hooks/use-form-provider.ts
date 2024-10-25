import { inject } from 'vue'
import { RichFormProvider } from '../types/rich-form'
import { BaseItemType, ContainerItemType } from '../types/rich-form-item'

export const useFormProvider = () => {
  const defaultInject:RichFormProvider = reactive({
    lang: 'zh',
    fieldsList: [], // 左侧菜单的配置
    store: [], // 中心区域当前配置的内容
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
    handler: {
      setSelection() {
        throw new Error('未获取到真实 inject')
      },
      switchPlatform() {
        throw new Error('未获取到真实 inject')
      },
      addFieldData() {
        throw new Error('未获取到真实 inject')
      },
      delete() {
        throw new Error('未获取到真实 inject')
      },
      addField() {
        throw new Error('未获取到真实 inject')
      },
      wrapElement() {
        throw new Error('未获取到真实 inject')
      },
      checkPropsBySelected() {
        throw new Error('未获取到真实 inject')
      },
      validator() {
        throw new Error('未获取到真实 inject')
      },
      copy() {
        throw new Error('未获取到真实 inject')
      },
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

  const basicFieldList = ref<BaseItemType[]>(['input', 'number', 'select', 'textarea', 'radio', 'checkbox', 'time', 'date', 'rate', 'switch', 'slider'])
  const containerFiledList = ref<ContainerItemType[]>(['col', 'grid', 'tabs', 'collapse', 'divider', 'inline'])
  return {
    ...toRefs(formProvider),
    isDesktop,
    isSelectRoot,
    basicFieldList,
    containerFiledList
  }
}