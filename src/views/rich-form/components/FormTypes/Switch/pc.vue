<script>
import hooks from '@/hooks'
export default {
  name: 'er-switch',
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
</script>
<template>
  <el-switch
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
