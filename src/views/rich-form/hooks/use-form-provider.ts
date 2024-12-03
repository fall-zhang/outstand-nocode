import { inject ,ToRefs } from 'vue'
import { RichFormProvider } from '../types/rich-form'

export interface FeatureProvider extends ToRefs<RichFormProvider> {
  isDesktop:ComputedRef<boolean>
  isSelectRoot:ComputedRef<boolean>
  basicFieldList:Ref<string[]>
  containerFiledList:Ref<string[]>
}

export const useFormProvider = ():FeatureProvider => {
  const storeMap = new Map()

  function errorHandler() {
    throw new Error('未获取到真实 inject')
  }
  const defaultInject = reactive<RichFormProvider>({
    lang: 'zh',
    fieldsList: [], // 左侧菜单的配置
    store: [], // 中心区域当前配置的内容
    storeMap,
    editForm: {},
    canvasScrollRef: {
      value: undefined
    },
    selected: {
      id: 'root',
      type: 'root',
      label: '未获取到真实 inject，默认选中 root'
    },
    mode: 'edit',
    platform: 'desktop',
    widthScalable: false,
    data: {},
    validateStates: [],
    logic: {},
    handler: {
      setSelection: errorHandler,
      switchPlatform: errorHandler,
      addFieldData: errorHandler,
      delete: errorHandler,
      addFieldItem: errorHandler,
      wrapElement: errorHandler,
      checkPropsBySelected: errorHandler,
      validator: errorHandler,
      copy: errorHandler,
    },
    config: {
      isSync: false,
      colorList: [],
      inlineMax: 0,
    },
    desktop: {
      style: {},
      formOption: {
        size: 'default',
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
      },
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
      },
    },
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