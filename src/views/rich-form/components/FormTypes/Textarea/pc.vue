<script>
export default {
  name: 'FeTextarea',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
</script>
<template>
  <el-input v-model="data.options.defaultValue" v-bind="params" />
</template>

<style scoped></style>
