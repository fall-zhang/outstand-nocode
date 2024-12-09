<!-- 有候选颜色的 color-picker -->

<template>
  <div class="background">
    <el-color-picker @active-change="handleActiveChange" @change="handleChange" :model-value="modelValue" show-alpha />
    <ul :class="[!state.value0 ? 'quickColor' : 'quickImage']" ref="element">
      <li v-if="state.value0" class="uploadFile">
        <el-upload accept=".png,.jpg" :action="'candidate-feature'" list-type="picture-card" ref="element"
          :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="handleSuccess"
          :on-error="handleError">
          <Plus />
        </el-upload>
      </li>
      <li v-for="(item0, index0) in quickColors" :key="index0" :data-value="item0"
        :style="!state.value0 && { backgroundColor: item0 }"
        :class="[checkIsSelected(item0) && 'selectedBg', 'selectColorFirst']">
        <el-image v-if="state.value0" :data-value="item0" :src="item0" lazy />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, inject, watch, nextTick } from 'vue'
import { ElMessage, UploadRawFile } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useFormProvider } from '@/views/rich-form/hooks/use-form-provider'
import { Plus } from '@icon-park/vue-next'
defineOptions({
  name: 'ConfigBackground',
  inheritAttrs: false,
  customOptions: {}
})
const props = defineProps<{
  modelValue: string
}>()
const { t } = useI18n()
const { selected, config } = useFormProvider()
const element = ref()
type PageState = {
  visible: boolean
  value0: boolean
  color: string
  defaultBackground: {
    backgroundColor?: string
    backgroundImage?: string
  }
}
const state = reactive<PageState>({
  visible: false,
  value0: false,
  color: '',
  defaultBackground: {
    backgroundColor: '',
    backgroundImage: '',
  }
})

const quickColors = config.value.colorList

if (!selected.value.style) {
  selected.value.style = {}
}
if (!selected.value.style.background) {
  selected.value.style.background = {
    color: '',
    image: '',
    repeat: 'repeat',
    position: 'center center',
    attachment: 'scroll',
    size: 'auto'
  }
}
if (!(!selected.value.style.background.color && !selected.value.style.background.image)) {
  if (selected.value.style.background.color) {
    state.defaultBackground.backgroundColor = selected.value.style.background.color
  } else {
    state.defaultBackground.backgroundImage = selected.value.style.background.image
  }
}
const modifyBackBackground = (key: string, value: any) => {
  const keys = ['color', 'image']
  let i = 0
  while (i !== keys.length) {
    const item = keys[i]
    if (item === key) {
      selected.value.style.background[item] = value
    } else {
      selected.value.style.background[item] = ''
    }
    i++
  }
}
// modifyBackBackground('backgroundColor')
onMounted(() => {
  element.value.addEventListener('click', (e) => {
    if (/[LI, IMG]/.test(e.target.tagName)) {
      if (state.value0) {
        if (e.target.dataset.value) {
          modifyBackBackground('image', e.target.dataset.value)
          state.defaultBackground = {
            backgroundImage: e.target.dataset.value
          }
        }
      } else {
        modifyBackBackground('color', e.target.dataset.value)
        state.defaultBackground = {
          backgroundColor: e.target.dataset.value
        }
        // target.value.style.isCustomBackground = false
      }
    }
  })
  element.value.addEventListener('mousemove', (e) => {
    if (/[LI, IMG]/.test(e.target.tagName)) {
      if (e.target.dataset.value) {
        if (state.value0) {
          modifyBackBackground('image', e.target.dataset.value)
        } else {
          modifyBackBackground('color', e.target.dataset.value)
        }
      }
    }
  })
  element.value.addEventListener('mouseleave', (e) => {
    if (state.defaultBackground.backgroundColor) {
      modifyBackBackground('color', state.defaultBackground.backgroundColor)
    } else {
      modifyBackBackground('image', state.defaultBackground.backgroundImage)
    }
  })
})
const handleActiveChange = (value) => {
  // target.value.style.isCustomBackground = !!value
  selected.value.style.background.color = value
  if (!value) {
    if (state.defaultBackground.backgroundColor) {
      modifyBackBackground('color', state.defaultBackground.backgroundColor)
    } else {
      modifyBackBackground('image', state.defaultBackground.backgroundImage)
    }
  } else {
    selected.value.style.backgroundImage = ''
  }
}
const handleChange = (value) => {
  if (value) {
    state.defaultBackground = {
      backgroundColor: value
    }
  }
}
const checkIsSelected = (key) => {
  const curVal = state.value0 ? state.defaultBackground.backgroundImage : state.defaultBackground.backgroundColor
  return key === curVal
}
const beforeAvatarUpload = (rawFile: UploadRawFile) => {
  if (rawFile.size > 2 * 1024 * 1024) {
    ElMessage({
      message: t('rf.validateMsg.fileSize', { size: 2 }),
      type: 'warning'
    })
    return false
  }
  return true
}
const handleError = (error: Error) => {
  ElMessage.error(error.toString())
}
const handleSuccess = () => {
  nextTick(() => {
    element.value.children[1].click()
  })
}
</script>

<style lang="scss" scoped></style>
