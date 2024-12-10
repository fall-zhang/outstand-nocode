<script lang="ts" setup>
defineOptions({
  name: 'FeRateDesktop',
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
</script>
<template>
  <el-rate
    :model-value="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
