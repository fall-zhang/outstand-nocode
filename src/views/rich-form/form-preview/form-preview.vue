<script setup lang="ts">
import { defineProps, reactive, provide } from 'vue'
import CanvasPanel from '../components/Panels/Canvas/CenterCanvas'
import { useLogic } from '@/hooks/use-logic'
import utils, { deepClone } from '@/utils'
import defaultProps from '../defaultProps'
import { isEmpty } from '@/utils/utils'
defineOptions({
  name: 'FormPreview'
})
const emit = defineEmits(['listener'])
const props = defineProps(defaultProps)
const layout = {
  pc: [],
  mobile: []
}
const state = reactive({
  store: [],
  selection: {},
  platform: utils.isPc() ? 'pc' : 'mobile',
  mode: 'preview',
  config: {},
  Namespace: 'formEditor',
  validateStates: [],
  data: {},
  fields: [],
  logic: {},
  fieldsLogicState: new Map()
})
useLogic(state)
const getData = () => {
  const result = {}
  state.fields.forEach(e => {
    result[e.key] = e.options.defaultValue
  })
  return deepClone(result)
}
const fireEvent = (type, data) => {
  emit('listener', {
    type,
    data
  })
}
// 提供给预览功能的所有数据
provide('Everright', {
  state,
  getData,
  props,
  fireEvent
})
const setData2 = (data, value) => {
  const newData = deepClone(data)
  layout.pc = newData.layout.pc
  layout.mobile = newData.layout.mobile
  state.store = newData.list
  state.fields = newData.fields
  const curLayout = deepClone(newData.layout[state.platform])
  utils.combinationData2(curLayout, state.fields)
  state.store = curLayout
  state.config = newData.config
  state.data = newData.data
  state.logic = newData.logic
  state.store.forEach((e) => {
    utils.addContext(e, state.store, false)
  })
  if (!isEmpty(value)) {
    state.fields.forEach((e) => {
      if (e.type === 'time' && !e.options.valueFormat) {
        e.options.valueFormat = 'HH:mm:ss'
      }
      if (value[e.key]) {
        e.options.defaultValue = value[e.key]
      }
    })
  }
}
const setData1 = (data, value) => {
  if (isEmpty(data)) return false
  const newData = utils.combinationData1(deepClone(data))
  state.store = newData.list
  state.config = newData.config
  state.data = newData.data
  state.fields = newData.fields
  state.logic = newData.logic
  state.store.forEach((e) => {
    utils.addContext(e, state.store)
  })
  if (!isEmpty(value)) {
    state.fields.forEach((e) => {
      if (e.type === 'time' && !e.options.valueFormat) {
        e.options.valueFormat = 'HH:mm:ss'
      }
      if (value[e.key]) {
        e.options.defaultValue = value[e.key]
      }
    })
  }
}
const setData = props.layoutType === 1 ? setData1 : setData2
defineExpose({
  switchPlatform(platform) {
    state.platform = platform
  },
  setData,
  getData
})
</script>
<template>
  <CanvasPanel v-if="state.store.length"></CanvasPanel>
</template>
