<script lang="ts" setup>
defineOptions({
  name: 'FeCascaderMobile',
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
  <el-cascader :class="$style.cascaderPC" :model-value="data.options.defaultValue" v-bind="params" />
</template>

<style scoped module lang="scss" src="./index.module.scss"></style>
