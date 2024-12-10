<script lang="ts" setup>
defineOptions({
  name: 'FeRadioMobile',
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
const element = ref()
</script>
<template>
  <van-field readonly v-bind="params" ref="element">
    <template #input>
      <el-radio-group @change="element.resetValidation()" :model-value="data.options.defaultValue"
        :class="['radioGroup', data.options.displayStyle === 'block' && 'blockLayout']" v-bind="params">
        <el-radio v-for="item in params.options" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>
  </van-field>
</template>

<style scoped></style>
