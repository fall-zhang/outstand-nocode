import {  computed, inject } from 'vue'
import _ from 'lodash-es'
import utils from '@/utils'
import { isEmpty } from '@/utils/utils'
export const useTarget = () => {
  const {
    state,
    setSelection,
    props
  } = inject('Everright')
  const selection = computed(() => {
    return state.selected
  })
  const isSelectAnyElement = computed({
    get () {
      return state.selected !== state.config
    }
  })
  const isSelectRoot = computed({
    get () {
      return state.selected === state.config
    }
  })
  const type = computed(() => {
    return state.selected.type
  })
  const isSelectField = computed({
    get () {
      return utils.checkIsField(state.selected)
    }
  })
  const target = computed({
    get () {
      return state.selected
    }
  })
  const col = computed({
    get () {
      return !isEmpty(state.selected) && state.selected.context.col
    }
  })
  const checkTypeBySelected = (nodes = [], propType) => {
    let result = false
    if (!isEmpty(state.selected)) {
      if (type.value) {
        const fn = props.checkPropsBySelected(state.selected, propType)
        result = fn !== undefined ? fn : nodes.includes(type.value)
      } else {
        result = nodes.includes(type.value)
      }
    }
    return result
  }
  const isSelectGrid = computed({
    get () {
      return checkTypeBySelected(['grid'])
    }
  })
  const isSelectTabs = computed({
    get () {
      return checkTypeBySelected(['tabs'])
    }
  })
  const isSelectCollapse = computed({
    get () {
      return checkTypeBySelected(['collapse'])
    }
  })
  const isSelectTable = computed({
    get () {
      return checkTypeBySelected(['table'])
    }
  })
  const isPc = computed({
    get () {
      return state.platform === 'pc'
    }
  })
  const isEditModel = computed({
    get () {
      return /^(edit|config)$/.test(state.mode)
    }
  })
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
    isPc,
    isEditModel
  }
}
