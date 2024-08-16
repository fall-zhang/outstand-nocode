<script setup>
defineOptions({
  name: 'FeTimeDesktop',
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
  <el-time-picker class="fe-time_pc" v-model="data.options.defaultValue" v-bind="params" />
</template>

<style scoped>
.fe-time_pc {
  width: 100% !important;
}
</style>
