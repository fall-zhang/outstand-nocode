<script>
import hooks from '@/hooks'
export default {
  name: 'FeInputMobile',
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
</script>
<template>
  <van-field
    v-model="data.options.defaultValue"
    v-bind="params" />
</template>

<style scoped>

</style>
