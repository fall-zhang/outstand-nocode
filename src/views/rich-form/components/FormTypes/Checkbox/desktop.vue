<script lang="ts" setup>
defineOptions({
  name: 'FeCheckboxDesktop',
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
const emit = defineEmits(['change'])

const defaultValue = ref()
</script>
<template>
  <el-checkbox-group :class="[data.options.displayStyle === 'block' && $style.blockLayout]"
    v-model="defaultValue" v-bind="params" @change="(newVal) => emit('change', newVal)">
    <el-checkbox v-for="item in params.options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<style scoped module src="./index.module.scss"></style>
