<template>
  <el-button v-bind="$attrs" type="primary" size="small" @click="onGenCode">出码</el-button>

  <el-dialog class="dialog-custom" v-model="codeGenShow" title="代码生成" width="68%" top="48px" @opened="openedDialog">
    <el-tabs @tab-click="onSelectTab">
      <el-tab-pane label="Vue2"></el-tab-pane>
      <el-tab-pane label="Vue3"></el-tab-pane>
      <el-tab-pane label="Vue3 setup"></el-tab-pane>
    </el-tabs>
    <MonacoEditor v-if="showMonaco" ref="editorView" :text="code" />
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
  // console.log(toRaw(chartOption))
  // onSelectTab('Vue2')
})
const code = ref('')
function openedDialog() {
  showMonaco.value = true
  code.value = genVue2Code(toRaw(chartOption.value))
}
function onSelectTab(label: any) {
  if (label.props.label === 'Vue2') {
    code.value = genVue2Code(toRaw(chartOption.value))
    editorView.value?.setEditCode(code.value)
  } else if (label.props.label === 'Vue3') {
    code.value = genVue3Code(toRaw(chartOption.value))
    editorView.value?.setEditCode(code.value)
  } else if (label.props.label === 'Vue3 setup') {
    code.value = genVue3SetupCode(toRaw(chartOption.value))
    editorView.value?.setEditCode(code.value)
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