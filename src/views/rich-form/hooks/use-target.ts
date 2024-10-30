import { computed, inject } from 'vue'
import { isEmpty } from '@/utils/utils'
import { checkIsField } from '@/utils/field'
import { RichFormProvider } from '../types/rich-form'
export const useTarget = () => {
  const {
    state,
    handler,
    selected,
  } = inject<RichFormProvider>('rich-form')!

  const setSelection = handler.setSelection
  const selection = computed(() => {
    return selected
  })
  const isSelectAnyElement = computed(() => {
    return state.selected !== state.config
  }
  )
  const isSelectRoot = computed(() => {
    return selected.type === 'root'
  }
  )
  const selectedType = computed(() => {
    return selected.type
  })
  const type = computed(() => {
    return state.selected.type
  })
  const isSelectField = computed(() => {
    return checkIsField(selected.type !== 'root')
  }
  )
  const target = computed(() => {
    return state.selected
  })
  const col = computed(() => {
    return !isEmpty(state.selected) && state.selected.context.col
  })
  /**
   * 当前选中的类型是否在 node 中
   */
  const checkTypeOfSelected = (nodes:string[]) => {
    let result = false
    if (!isEmpty(state.selected)) {
      result = nodes.includes(selectedType.value)
    }
    return result
  }
  /**
   * 当前选中的类型是否在 node 中
   */
  const checkTypeBySelected = (nodes:string[], propType?:unknown) => {
    let result = false
    if (!isEmpty(state.selected)) {
      if (selectedType.value) {
        result = nodes.includes(selectedType.value)
      } else {
        result = nodes.includes(selectedType.value)
      }
    }
    return result
  }
  const isSelectGrid = computed(() => {
    return checkTypeBySelected(['grid'])
  }
  )
  const isSelectTabs = computed(() => {
    return checkTypeBySelected(['tabs'])
  }
  )
  const isSelectCollapse = computed(() => {
    return checkTypeBySelected(['collapse'])
  }
  )
  const isSelectTable = computed(() => {
    return checkTypeBySelected(['table'])
  }
  )
  const isPC = computed(() => {
    return state.platform === 'pc'
  })
  const isDesktop = computed(() => {
    return state.platform === 'desktop'
  })
  const isEditModel = computed(() => {
    return ['edit', 'config'].includes(state.mode)
  }
  )
  return {
    state,
    setSelection,
    type,
    selectedType,
    col,
    selection,
    isSelectAnyElement,
    isSelectField,
    target,
    isSelectGrid,
    isSelectTabs,
    isSelectCollapse,
    isSelectTable,
    isSelectRoot,
    isPC,
    isDesktop,
    checkTypeBySelected,
    checkTypeOfSelected,
    isEditModel
  }
}
