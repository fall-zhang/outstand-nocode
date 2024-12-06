<script>
export default {
  name: 'FeSliderDesktop',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script lang="ts" setup>
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
  <el-slider
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
