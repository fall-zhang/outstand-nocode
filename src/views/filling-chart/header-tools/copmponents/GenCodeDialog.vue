<template>
  <el-button v-bind="$attrs" type="primary" size="small" @click="onGenCode">出码</el-button>

  <el-dialog class="dialog-custom" v-model="codeGenShow" title="代码生成" width="68%" top="48px" @opened="openedDialog">
    <el-tabs @tab-click="onSelectTab">
      <el-tab-pane label="Vue2"></el-tab-pane>
      <el-tab-pane label="Vue3"></el-tab-pane>
      <el-tab-pane label="Vue3 setup"></el-tab-pane>
    </el-tabs>
    <MonacoEditor v-if="showMonaco" ref="editorView" />
    <div v-else style="width: 600px;height: 600px;"></div>
  </el-dialog>
</template>

<script setup lang="ts">
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import { onMounted, ref, inject } from 'vue'
import { genVue2Code, genVue3Code, genVue3SetupCode } from '../tools/genVueCode'
import MonacoEditor from '@/components/module/MonacoEditor.vue'
const codeGenShow = ref(false)
const showMonaco = ref<boolean>()
const editorView = ref()
const chartOption = inject('chartOption')
function onGenCode() {
  codeGenShow.value = true
}
// 将生成后的代码暂存
// let changeState = false
// const store = {
//   vue2: '',
//   vue3: '',
//   vueSetup: ''
// }
// watch(chartOption, () => {
//   changeState = true
// })
onMounted(() => {
  // console.log(chartOption)
})
function openedDialog() {
  // console.log(6464)

  showMonaco.value = true
}
function onSelectTab(label: any) {
  if (label.props.label === 'Vue2') {
    const code = genVue2Code(chartOption)
    editorView.value?.setEditCode(code)
  } else if (label.props.label === 'Vue3') {
    const code = genVue3Code(chartOption)
    editorView.value?.setEditCode(code)
  } else if (label.props.label === 'Vue3 setup') {
    const code = genVue3SetupCode(chartOption)
    editorView.value?.setEditCode(code)
  }
}
function onValueChange() {
  // 更新值
  // monacoEditor.value.getModel().getValue()
  // monacoEditor.value.getModel().setValue()
}
</script>

<!-- <style lang="scss" scoped>
:deep(.el-dialog) :deep(.el-dialog__body) {
  padding: 0;
}
</style> -->
<style>
.el-dialog__body {
  padding: 0;
}
</style>
<!-- <style lang="scss">
.el-dialog__body {
  padding: 0;
}
</style> -->