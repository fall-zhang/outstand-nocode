<!-- 省市区 -->
<script setup>
import { useNamespace } from '@/hooks'
defineOptions({
  name: 'FeRegionDesktop',
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
const ns = useNamespace('FormTypesRegion_pc')
</script>
<template>
  <el-cascader :class="[ns.b()]" v-model="data.options.defaultValue" v-bind="params" />
</template>

<style scoped></style>
