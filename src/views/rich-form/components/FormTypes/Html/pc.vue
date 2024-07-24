<script>
import CKEditor from '@/componets/module/ckeditor'
export default {
  name: 'FeEditor',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const han = () => {
  // console.log(123123123123)
}
</script>
<template>
  <CKEditor
    v-model="data.options.defaultValue"
    style="width: 100px;"
    @ready="han"
    v-bind="params"
  ></CKEditor>
</template>

<style scoped>

</style>
