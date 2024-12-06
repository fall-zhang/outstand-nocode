<script lang="ts" setup>
defineOptions({
  name: 'FeTextareaDesktop',
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
  <el-input :model-value="data.options.defaultValue" v-bind="params" />
</template>

<style scoped></style>
