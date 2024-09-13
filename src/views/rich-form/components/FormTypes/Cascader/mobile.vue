<script>
export default {
  name: 'FeCascaderMobile',
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
const onClear = () => {
  props.data.options.defaultValue = []
}
</script>
<template>
  <van-field readonly :class="$style.cascaderMobile" v-bind="params">
    <template #input>
      <el-cascader v-model="data.options.defaultValue" v-bind="params" :popper-class="$style.cascader" />
    </template>
    <template v-if="data.options.defaultValue && data.options.defaultValue.length && params.clearable" #button>
      <van-icon @touchstart.stop="onClear" name="clear" />
    </template>
  </van-field>
</template>

<style scoped module lang="scss" src="./index.module.scss"></style>
