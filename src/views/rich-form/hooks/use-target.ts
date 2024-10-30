import { computed, } from 'vue'
import { isEmpty } from '@/utils/utils'
import { checkIsField } from '@/utils/field'
import { useFormProvider } from './use-form-provider'
export const useTarget = () => {
  const { selected, platform, handler } = useFormProvider()
  const state = useFormProvider()
  const setSelection = handler.value.setSelection
  const selection = computed(() => {
    return selected.value
  })
  const isSelectRoot = computed(() => {
    return selected.value.type === 'root'
  }
  )
  const selectedType = computed(() => {
    return selected.value.type
  })
  const type = computed(() => {
    return selected.value.type
  })
  const isSelectField = computed(() => {
    return checkIsField(selected.value.type !== 'root')
  }
  )
  const target = computed(() => {
    return selected.value
  })
  /**
   * 当前选中的类型是否在 node 中
   */
  const checkTypeOfSelected = (nodes:string[]) => {
    let result = false
    if (!isEmpty(selected.value)) {
      result = nodes.includes(selectedType.value)
    }
    return result
  }
  /**
   * 当前选中的类型是否在 node 中
   */
  const checkTypeBySelected = (nodes:string[], propType?:unknown) => {
    let result = false
    if (!isEmpty(selected.value)) {
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
  const isDesktop = computed(() => {
    return platform.value === 'desktop'
  })
  return {
    state,
    setSelection,
    type,
    selectedType,
    selection,
    isSelectField,
    target,
    isSelectGrid,
    isSelectTabs,
    isSelectCollapse,
    isSelectTable,
    isSelectRoot,
    isDesktop,
    checkTypeBySelected,
    checkTypeOfSelected,
  }
}
