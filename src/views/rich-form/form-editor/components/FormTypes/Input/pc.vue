<script>
export default {
  name: 'FeInput',
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
  },
})
</script>
<template>
  <el-input :model-value="data.options.defaultValue" v-bind="params">
    <template #prepend v-if="params.prepend">{{ params.prepend }}</template>
    <template #append v-if="params.append">{{ params.append }}</template>
  </el-input>
</template>

<style scoped></style>
