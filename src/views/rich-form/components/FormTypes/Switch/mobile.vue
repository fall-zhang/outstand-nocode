<script lang="ts" setup>
defineOptions({
  name: 'FeSwitchMobile',
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
  <van-field readonly v-bind="params">
    <template #input>
      <van-switch v-model="data.options.defaultValue" v-bind="params" />
    </template>
  </van-field>
</template>

<style scoped></style>
