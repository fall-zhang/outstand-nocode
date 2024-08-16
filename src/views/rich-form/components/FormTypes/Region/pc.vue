<!-- 省市区 -->
<script>
import hooks from '@/hooks'
export default {
  name: 'FeRegionDesktop',
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
const ns = hooks.useNamespace('FormTypesRegion_pc')
</script>
<template>
  <el-cascader
    :class="[ns.b()]"
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
