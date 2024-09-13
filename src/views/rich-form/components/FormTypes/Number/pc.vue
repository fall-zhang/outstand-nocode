<script>
export default {
  name: 'FeNumberDesktop',
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
  <el-input-number class="fe-number" v-model="data.options.defaultValue" v-bind="params" />
</template>

<style scoped>
.fe-number {
  width: 100%;
}
</style>
