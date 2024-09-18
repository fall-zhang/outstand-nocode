<script>
import { computed } from 'vue'

export default {
  name: 'FeNumberMobile',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
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
const model = computed({
  get() {
    return props.data.options.defaultValue === null ? '' : props.data.options.defaultValue
  },
  set(value) {
    props.data.options.defaultValue = value
  }
})
</script>
<template>
  <van-field readonly v-bind="params">
    <template #input>
      <van-stepper v-model="model" v-bind="params" />
    </template>
  </van-field>
</template>

<style scoped></style>
