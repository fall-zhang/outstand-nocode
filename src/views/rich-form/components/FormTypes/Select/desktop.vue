
<script setup lang="ts">
defineOptions({
  name: 'FeSelectDesktop',
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
  <!--  :style="{-->
  <!--  width: data.options.width + data.options.widthType-->
  <!--  }"-->
  <!--  v-bind="data.options"-->
  <el-select class="selectPC" v-model="data.options.defaultValue" v-bind="params">
    <el-option v-for="item in params.options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<style module lang="scss" ></style>