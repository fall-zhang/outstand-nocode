<script setup>
import { useNamespace } from '@/hooks'
defineOptions({
  name: 'FeDividerDesktop',
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
const ns = useNamespace('FormTypesDivider_pc')
</script>
<template>
  <el-divider :class="[ns.b()]" v-bind="params">{{ data.options.defaultValue }}</el-divider>
</template>

<style scoped></style>
