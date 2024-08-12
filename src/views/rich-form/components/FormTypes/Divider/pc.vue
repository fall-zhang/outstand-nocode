<script>
import hooks from '@/hooks'
export default {
  name: 'FeDividerDesktop',
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
const ns = hooks.useNamespace('FormTypesDivider_pc')
</script>
<template>
  <el-divider
    :class="[ns.b()]"
    v-bind="params"
  >{{data.options.defaultValue}}</el-divider>
</template>

<style scoped>

</style>
