<template>
  <div class="monaco-container">
    <div class="monaco-dom" ref="codeView"></div>
  </div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api'
// import type { Ele } from 'vue'
const monacoEditor = shallowRef<editor.IStandaloneCodeEditor>()
const codeView = ref(null)
const monacoModel = shallowRef<editor.ITextModel | null>()
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:context'])
onMounted(() => {
  initMonaco()
})

watch(() => props.text, (newVal) => {
  setEditCode(props.text)
}, {
  immediate: true
})

function initMonaco() {
  if (!codeView.value || monacoEditor.value) return
  monacoEditor.value = monaco.editor.create(codeView.value, {
    theme: 'vs-dark',
    value: '',
    language: 'javascript',
    roundedSelection: true,
    scrollBeyondLastLine: true
  })
  monacoModel.value = monacoEditor.value.getModel()
}
function getEditCode() {
  return monacoModel.value?.getValue()
}
function setEditCode(newVal: string) {
  console.log('🚀 ~ nextTick ~ monacoModel.value:', monacoModel.value)
  if (monacoModel.value) {
    monacoModel.value.setValue(newVal)
  } else {
    nextTick(() => {
      monacoModel.value?.setValue(newVal)
    })
  }
  return monacoModel.value
}

defineExpose({
  getEditCode,
  setEditCode,
  initMonaco
})
</script>

<style scoped lang="scss">
.monaco-container {
  width: 100%;
  height: 100%;
  min-height: 600px;

  .monaco-dom {
    height: 100%;
    width: 100%;
    min-height: 600px;
  }
}
</style>
