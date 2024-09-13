<!-- 省市区 -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
defineOptions({
  name: 'FeRegionMobile',
  inheritAttrs: false,
  customOptions: {}
})
const props = defineProps({
  data: {
    require: true,
    type: Object,
    default: () => ({})
  },
  params: {
    require: true,
    type: Object,
    default: () => ({})
  }
})
const dialogVisible = ref(false)
const popup = ref()
const currentArea = ref()
const areaRef = ref()
watch(() => props.data.options.defaultValue, (newVal) => {
  currentArea.value = newVal
}, {
  immediate: true
})
const currentValue = computed({
  get() {
    let result = ''
    if (props.data.options.defaultValue) {
      const getSelectedOptions = areaRef.value.getSelectedOptions || false
      if (getSelectedOptions) {
        result = getSelectedOptions().map(e => e.text).join('/')
      }
    }
    return result
  },
  set(value) {
    props.data.options.defaultValue = value
  }
})
const onConfirm = (value) => {
  currentValue.value = currentArea.value
  dialogVisible.value = false
}
const onCancel = () => {
  dialogVisible.value = false
  currentValue.value = props.data.options.defaultValue
}
const onClear = () => {
  props.data.options.defaultValue = ''
}
</script>
<template>
  <van-field readonly v-model="currentValue" @click="!params.disabled && (dialogVisible = true)" v-bind="params">
    <template v-if="!params.disabled && data.options.defaultValue && params.clearable" #button>
      <van-icon @click.stop="onClear" name="clear" />
    </template>
  </van-field>
  <van-popup ref="popup" :lock-scroll="false" :lazy-render="false" teleport="body"
    v-model:show="dialogVisible" position="bottom" :safe-area-inset-bottom="true">
    <van-area ref="areaRef" @confirm="onConfirm" @cancel="onCancel" v-model="currentArea" v-bind="params" />
  </van-popup>
</template>

<style scoped></style>
