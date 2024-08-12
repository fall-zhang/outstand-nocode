<script>
export default {
  name: 'FeDividerMobile',
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
    readonly
    :label="params.label"
    :required="params.required"
  >
    <template #input>
      <van-divider
        v-bind="params"
        style="width: 100%;"
      >
        {{data.options.defaultValue}}
      </van-divider>
    </template>
  </van-field>
</template>

<style scoped>

</style>
