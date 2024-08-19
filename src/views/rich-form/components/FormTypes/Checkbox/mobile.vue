<script setup>
import { useNamespace } from '@/hooks'
import { ref } from 'vue'
defineOptions({
  name: 'FeCheckboxMobile',
  inheritAttrs: false,
  customOptions: {}
})
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  params: {
    type: Object,
    default: () => ({})
  }
})
const defaultValue = ref()
const ns = useNamespace('FormTypesCheckbox')
const element = ref()
</script>
<template>
  <van-field readonly v-bind="params" ref="element">
    <template #input>
      <el-checkbox-group @change="element.resetValidation()"
        :class="[ns.e('radioGroup'), data.options.displayStyle === 'block' && ns.e('blockLayout')]"
        v-model="defaultValue" v-bind="params">
        <el-checkbox v-for="item in params.options" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </template>
  </van-field>
</template>

<style scoped></style>
