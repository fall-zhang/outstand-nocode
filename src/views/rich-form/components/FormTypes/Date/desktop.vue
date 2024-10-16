<script>
export default {
  name: 'FeDateDesktop',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  params: {
    type: Object,
    default: () => ({})
  }
})
</script>
<template>
  <el-date-picker class="pc-date-picker" v-model="data.options.defaultValue" v-bind="params" />
</template>

<style scoped>
:deep(.el-date-picker) {
  width: 100% !important;
}
</style>
