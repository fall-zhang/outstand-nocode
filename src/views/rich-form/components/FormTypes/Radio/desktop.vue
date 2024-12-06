<script lang="ts" setup>
defineOptions({
  name: 'FeRadioDesktop',
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
  <el-radio-group :class="[$style.feRadio, data.options.displayStyle === 'block' && $style.blockLayout]"
    :model-value="data.options.defaultValue" v-bind="params">
    <el-radio v-for="item in params.options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<style src="./index.module.scss" scoped module lang="scss"></style>
