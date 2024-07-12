<script>
import hooks from '@/hooks'
export default {
  name: 'er-rate',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
</script>
<template>
  <el-rate
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
