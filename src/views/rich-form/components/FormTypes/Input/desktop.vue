<script setup lang="ts">
defineOptions({
  name: 'FeInputDesktop',
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
  },
})
</script>
<template>
  <el-input :model-value="data.options.defaultValue" v-bind="{
    disabled: params.disabled,
    placeholder: params.placeholder,
    clearable: params.clearable,
    showPassword: params.showPassword
  }">
    <template #prepend v-if="params.prepend">{{ params.prepend }}</template>
    <template #append v-if="params.append">{{ params.append }}</template>
  </el-input>
</template>

<style scoped></style>
