<script lang="ts">
import hooks from '@/hooks'
export default {
  name: 'FeTimeDesktop',
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
const ns = hooks.useNamespace('FormTypesTime_pc')
</script>
<template>
  <el-time-picker :class="[ns.b()]" v-model="data.options.defaultValue" v-bind="params" />
</template>

<style scoped></style>
