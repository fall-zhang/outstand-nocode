<script lang="ts" setup>
defineOptions({
  name: 'FeSwitchDesktop',
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
  <el-switch v-model="data.options.defaultValue" v-bind="params" />
</template>

<style scoped></style>
