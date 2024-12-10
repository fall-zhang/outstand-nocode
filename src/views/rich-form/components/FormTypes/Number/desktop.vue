<script lang="ts" setup>
defineOptions({
  name: 'FeNumberDesktop',
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
  <el-input-number class="fe-number" :model-value="data.options.defaultValue" v-bind="params" />
</template>

<style scoped>
.fe-number {
  width: 100%;
}
</style>
