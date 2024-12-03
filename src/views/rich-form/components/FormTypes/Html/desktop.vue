<script lang="ts" setup>
import CKEditor from '@/components/module/ckeditor/index'
defineOptions({
  name: 'FeHtmlDesktop',
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
const han = () => {
  // console.log(123123123123)
}
</script>
<template>
  <CKEditor v-model="data.options.defaultValue" style="width: 100px;" @ready="han" v-bind="params"></CKEditor>
</template>

<style scoped></style>
