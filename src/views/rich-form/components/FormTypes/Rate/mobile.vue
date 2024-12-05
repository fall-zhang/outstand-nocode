<script lang="ts" setup>
defineOptions({
  name: 'FeRateMobile',
  inheritAttrs: false,
  customOptions: {}
})
defineEmits(['change'])
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
  <van-field readonly v-bind="params">
    <template #input>
      <van-rate :model-value="data.options.defaultValue" @change="ev => $emit('change', ev)" v-bind="params" />
    </template>
  </van-field>
</template>

<style scoped></style>
