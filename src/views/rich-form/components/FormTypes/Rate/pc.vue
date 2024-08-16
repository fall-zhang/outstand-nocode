<script>
export default {
  name: 'FeRateDesktop',
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
  <el-rate
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
