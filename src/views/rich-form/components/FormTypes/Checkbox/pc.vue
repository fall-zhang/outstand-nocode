<script>
import hooks from '@/hooks'
export default {
  name: 'FeCheckboxDesktop',
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
const ns = hooks.useNamespace('FormTypesCheckbox')
</script>
<template>
  <el-checkbox-group :class="[ns.e('radioGroup'), data.options.displayStyle === 'block' && ns.e('blockLayout')]"
    v-model="data.options.defaultValue" v-bind="params">
    <el-checkbox v-for="item in params.options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<style scoped></style>
