<script lang="ts" setup>
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
const element = ref()
</script>
<template>
  <van-field readonly v-bind="params" ref="element">
    <template #input>
      <el-checkbox-group @change="element.resetValidation()"
        :class="[$style.radioGroup, data.options.displayStyle === 'block' && $style.blockLayout]"
        v-model="defaultValue" v-bind="params">
        <el-checkbox v-for="item in params.options" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </template>
  </van-field>
</template>

<style src="./index.module.scss" module></style>
