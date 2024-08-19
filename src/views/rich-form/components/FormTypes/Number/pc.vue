<script>
import { useNamespace } from '@/hooks'
export default {
  name: 'FeNumberDesktop',
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
const ns = useNamespace('FormTypesNumber_pc')
</script>
<template>
  <el-input-number :class="[ns.b()]" v-model="data.options.defaultValue" v-bind="params" />
</template>

<style scoped></style>
