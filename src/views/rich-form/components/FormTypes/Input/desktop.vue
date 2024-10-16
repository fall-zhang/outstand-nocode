<script>
export default {
  name: 'FeInputDesktop',
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
  <el-form-item :label="params.label" :required="params.required" :rules="params.rules"
    :label-width="params.labelWidth">
    <el-input :model-value="data.options.defaultValue" v-bind="{
      disabled: params.disabled,
      placeholder: params.placeholder,
      clearable: params.clearable,
      showPassword: params.showPassword
    }">
      <template #prepend v-if="params.prepend">{{ params.prepend }}</template>
      <template #append v-if="params.append">{{ params.append }}</template>
    </el-input>
  </el-form-item>
</template>

<style scoped></style>
