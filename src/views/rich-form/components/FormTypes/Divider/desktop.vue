<script setup>
defineOptions({
  name: 'FeDividerDesktop',
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
  <el-divider  v-bind="params">{{ data.options.defaultValue }}</el-divider>
</template>

<style scoped></style>
