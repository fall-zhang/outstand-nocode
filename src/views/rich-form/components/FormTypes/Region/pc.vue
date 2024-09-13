<!-- 省市区 -->
<script setup>
defineOptions({
  name: 'FeRegionDesktop',
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
  <el-cascader class="region_pc" v-model="data.options.defaultValue" v-bind="params" />
</template>

<style scoped>
.region_pc {
  width: 100%;
}
</style>
