<script>
import hooks from '@/hooks'
export default {
  name: 'FeRadioDesktop',
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
const ns = hooks.useNamespace('FormTypesRadio')
const {
  isEditModel
} = hooks.useTarget()
</script>
<template>
  <el-radio-group :class="[ns.e('radioGroup'), data.options.displayStyle === 'block' && ns.e('blockLayout')]"
    v-model="data.options.defaultValue" v-bind="params">
    <!--    <el-radio v-for="item in params.options" :key="item.value" :label="isEditModel ? item.id : item.value">-->
    <el-radio v-for="item in params.options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<style scoped></style>
