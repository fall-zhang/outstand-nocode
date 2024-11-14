<script>
import { ref, nextTick, watch, onBeforeUnmount, unref } from 'vue'
import SignaturePad from 'signature_pad'
import Icon from '@/assets'
import { useI18n, useFetch } from 'vue-i18n'
import { fileToDataURL, dataURLtoFile } from '@/utils/fileData'
export default {
  name: 'FeFeSignatureDesktop',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  t
} = useI18n()
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
const element = ref()
const dialogVisible = ref(false)
const showClear = ref(true)
const changed = ref(false)
const loading = ref(false)
let signaturePad = ''
const resizeCanvas = () => {
  const canvas = element.value
  const data = signaturePad.toData()
  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  canvas.width = canvas.offsetWidth * ratio
  canvas.height = canvas.offsetHeight * ratio
  canvas.getContext('2d').scale(ratio, ratio)
  signaturePad.clear()
  signaturePad.fromData(data)
}
watch(() => props.data.options.penColor, (newVal) => {
  signaturePad && (signaturePad.penColor = newVal)
})
// onBeforeUnmount(() => {
//   window.removeEventListener('resize', resizeCanvas, false)
// })
const handleClear = () => {
  signaturePad.clear()
  showClear.value = true
}
const init = () => {
  signaturePad = new SignaturePad(element.value, {
    penColor: props.data.options.penColor
  })
  signaturePad.addEventListener('beginStroke', () => {
    showClear.value = false
    changed.value = true
  })
  resizeCanvas()
}
const handleOpen = () => {
  dialogVisible.value = true
  nextTick(() => {
    init()
  })
}
const handleReOpen = () => {
  dialogVisible.value = true
  showClear.value = false
  changed.value = false
  nextTick(() => {
    init()
    loading.value = true
    fileToDataURL(props.data.options.defaultValue.url).then(e => {
      signaturePad.fromDataURL(e)
      loading.value = false
    })
  })
}
const handleCommit = async () => {
  if (!unref(changed)) {
    dialogVisible.value = false
    return false
  }
  loading.value = true
  const form = new FormData()
  form.append('file', dataURLtoFile(signaturePad.toDataURL(), 'signature.png'))
  try {
    const response = await useFetch(props.data.options.action, {
      method: 'post',
      data: form
    })
    props.data.options.defaultValue = response.data[0]
  } catch (e) {
  }
  dialogVisible.value = false
  loading.value = false
}
</script>
<template>
  <div :class="$style.signaturePC">
    <template v-if="data.options.defaultValue">
      <el-image @click="handleReOpen" :src="data.options.defaultValue.url" :fit="'contain'"
        style="width: 100%; height: 100%;" />
      <Icon @click="data.options.defaultValue = ''" :class="$style.clear" icon="delete"></Icon>
    </template>
    <div v-else :class="$style.noData">
      <el-button @click="handleOpen" text type="primary" icon="Edit" circle>
        {{ t('rf.form.addSignature') }}
      </el-button>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" :title="t('rf.form.addSignature')" width="900px" destroy-on-close
    :close-on-press-escape="false" :close-on-click-modal="false">
    <div v-loading="loading">
      <canvas :class="$style.canvas" ref="element"></canvas>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="showClear" @click="handleClear">{{ t('rf.public.reset') }}</el-button>
        <el-button :disabled="showClear" type="primary" @click="handleCommit">
          {{ t('rf.form.useSignature') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped module src="./index.module.scss" lang="scss"></style>
