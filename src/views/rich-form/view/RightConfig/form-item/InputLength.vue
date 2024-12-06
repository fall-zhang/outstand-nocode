<!--
  负责长度输出功能(px,em,rem,%,vh,vm,mvh,mvm)
  如果输入内容为纯数字，则加上 px，否则按照输入内容来
-->

<template>
  <el-input v-model="jsonValue" size="small" type="textarea" @input="onChangeJSONValue" />
</template>

<script setup lang="ts">
import { shallowRef, toRaw, onMounted } from 'vue'
const emit = defineEmits(['update:modelValue', 'change'])
const prop = defineProps<{
  modelValue: string
}>()
const jsonValue = shallowRef('')
let timberFun: number | null = null
const originValue = toRaw(prop.modelValue)
onMounted(() => {
  if (typeof prop.modelValue !== 'string') {
    jsonValue.value = JSON.stringify(toRaw(prop.modelValue))
  } else {
    jsonValue.value = JSON.stringify(originValue)
  }
})
function onChangeJSONValue() {
  if (timberFun) {
    clearTimeout(timberFun)
  }
  timberFun = setTimeout(parseValue, 500)
}

function parseValue() {
  let parseValue = {}
  try {
    parseValue = JSON.parse(jsonValue.value)
  } catch (e) {
    console.warn('JSON 未能转换成功', e)
  }
  emit('update:modelValue', parseValue)
  emit('change', parseValue)
}
</script>

<style scoped lang="scss">
.el-textarea {
  :deep(.el-textarea__inner) {
    max-height: 102px;
  }
}
</style>
