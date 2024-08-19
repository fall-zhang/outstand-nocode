<script lang="ts" setup>
import ConfigPanel from './components/Panels/Config/ConfigPanel.vue'
import utils from '@/utils'
import defaultProps from './defaultProps'
import { globalConfig } from './componentsConfig'
import { deepClone } from '@/utils/utils'

defineOptions({
  name: 'FeFormConfig'
})
const emit = defineEmits(['listener'])
const props = defineProps({
  field: {
    type: [Object, String],
    required: true
  },
  fields: {
    type: Array,
    default: () => ([])
  },
  ...defaultProps
})

const state = reactive({
  store: [],
  selected: {},
  config: globalConfig,
  platform: 'pc',
  Namespace: 'formEditor',
  validateStates: [],
  data: {},
  mode: 'config',
  fields: props.fields,
  logic: {}
})
const setSelection = (node) => {
  let result: any = ''
  if (node === 'root') {
    result = state.config
  } else if (node.type === 'inline') {
    result = node.columns[0]
  } else {
    result = node
  }

  state.selected = result
}
const switchPlatform = (platform: string) => {
  state.platform = platform
}
const fireEvent = (type, data) => {
  emit('listener', {
    type,
    data
  })
}
provide('Everright', {
  state,
  emit,
  props,
  setSelection,
  switchPlatform,
  fireEvent
})
watch(() => props.field, (newVal) => {
  if (newVal !== 'root') {
    state.store[0] = newVal
    utils.addContext(newVal, state.store)
  }
  setSelection(newVal)
}, {
  immediate: true
})
defineExpose({
  switchPlatform
})
watch(() => state.selected, (newVal) => {
  fireEvent('changeParams', deepClone(newVal))
}, {
  deep: true,
  immediate: true
})
</script>
<template>
  <ConfigPanel mode="config"></ConfigPanel>
</template>
