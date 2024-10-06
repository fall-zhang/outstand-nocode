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
    return state.selected
  })
  const isSelectAnyElement = computed(() => {
    return state.selected !== state.config
  }
  )
  const isSelectRoot = computed(() => {
    return selected.type === 'root'
  }
  )
  const type = computed(() => {
    return state.selected.type
  })
  const isSelectField = computed(() => {
    return checkIsField(state.selected)
  }
  )
  const target = computed(() => {
    return state.selected
  }
  )
  const col = computed(() => {
    return !isEmpty(state.selected) && state.selected.context.col
  }
  )
  const checkTypeBySelected = (nodes:string[], propType?:unknown) => {
    let result = false
    if (!isEmpty(state.selected)) {
      if (type.value) {
        const fn = handler.checkPropsBySelected(state.selected, propType)
        result = fn !== undefined ? fn : nodes.includes(type.value)
      } else {
        result = nodes.includes(type.value)
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
  }
  )
  const isEditModel = computed(() => {
    return ['edit', 'config'].includes(state.mode)
  }
  )
  return {
    state,
    setSelection,
    type,
    col,
    selection,
    isSelectAnyElement,
    isSelectField,
    target,
    checkTypeBySelected,
    isSelectGrid,
    isSelectTabs,
    isSelectCollapse,
    isSelectTable,
    isSelectRoot,
    isPC,
    isEditModel
  }
}
