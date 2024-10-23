<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue'

defineOptions({
  name: 'RichFormPreview'
})

const layout = {
  pc: [],
  mobile: []
}
const state = reactive({

})
defineAsyncComponent(() => import('./views/desktop-render.vue'))

function onChange(value: Record<string, any>) {
  // 默认的 input_124
  // if (value) {
  // }
}
defineExpose({
  onChange
})
</script>
<template>
  <el-form>

  </el-form>
</template>
