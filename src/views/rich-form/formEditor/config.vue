<script>
import { defineProps, reactive, provide, watch } from 'vue'
import ConfigPanel from './components/Panels/Config/index.vue'
import utils from '@/utils'
import _ from 'lodash-es'
import defaultProps from './defaultProps'
import { globalConfig } from './componentsConfig'
export default {
  name: 'FeFormConfig'
}
</script>
<script setup>
const emit = defineEmits(['listener'])
const props = defineProps(_.merge({
  field: {
    type: [Object, String],
    required: true
  },
  fields: {
    type: Array,
    default: () => ([])
  }
}, defaultProps))

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
  let result = ''
  if (node === 'root') {
    result = state.config
  } else if (node.type === 'inline') {
    result = node.columns[0]
  } else {
    result = node
  }

  state.selected = result
}
const switchPlatform = (platform) => {
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
  switchPlatform(platform) {
    state.platform = platform
  }
})
watch(() => state.selected, (newVal) => {
  fireEvent('changeParams', _.cloneDeep(newVal))
}, {
  deep: true,
  immediate: true
})
</script>
<template>
  <ConfigPanel mode="config"></ConfigPanel>
</template>
