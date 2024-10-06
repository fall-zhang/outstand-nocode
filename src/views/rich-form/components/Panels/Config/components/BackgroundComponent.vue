<script>
import { reactive, ref, onMounted, inject, watch, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useTarget } from '@Form/hooks/use-target'

export default {
  name: 'ConfigBackground',
  inheritAttrs: false,
  customOptions: {}
}

</script>
<script setup>
const {
  t
} = useI18n()
const {
  target
} = useTarget()
const element = ref()
const state = reactive({
  visible: false,
  value0: false,
  color: '',
  defaultBackground: {}
})
const ER = inject('rich-form')
const ERp = inject('Everright-propsPanel')
watch(ERp.bgStatus, (newVal) => {
  state.value0 = newVal
}, {
  immediate: true
})
const quickColors = ER.config.colorList

const options0 = [
  [
    'repeat',
    'repeat-x',
    'repeat-y',
    'no-repeat'
  ],
  [
    'left top',
    'left center',
    'left bottom',
    'right top',
    'right center',
    'right bottom',
    'center top',
    'center center',
    'center bottom'
  ],
  [
    'scroll',
    'fixed',
    'local'
  ],
  [
    'auto',
    'cover',
    'contain'
  ]
]
if (!target.value.style.background) {
  target.value.style.background = {
    color: '',
    image: '',
    repeat: 'repeat',
    position: 'center center',
    attachment: 'scroll',
    size: 'auto'
  }
}
if (!(!target.value.style.background.color && !target.value.style.background.image)) {
  if (target.value.style.background.color) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    state.defaultBackground.backgroundColor = target.value.style.background.color
  } else {
    // eslint-disable-next-line vue/no-setup-props-destructure
    state.defaultBackground.backgroundImage = target.value.style.background.image
  }
  // if (target.value.style.isCustomBackground) {
  //   // eslint-disable-next-line vue/no-setup-props-destructure
  //   state.color = target.value.style.background.color
  // }
  ERp.bgStatus.value = !target.value.style.background.color
}
const modifyBackBackground = (key, value) => {
  const keys = ['color', 'image']
  let i = 0
  while (i !== keys.length) {
    const item = keys[i]
    if (item === key) {
      target.value.style.background[item] = value
    } else {
      target.value.style.background[item] = ''
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
  target.value.style.background.color = value
  if (!value) {
    if (state.defaultBackground.backgroundColor) {
      modifyBackBackground('color', state.defaultBackground.backgroundColor)
    } else {
      modifyBackBackground('image', state.defaultBackground.backgroundImage)
    }
  } else {
    target.value.style.backgroundImage = ''
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
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size > 2 * 1024 * 1024) {
    ElMessage({
      message: t('rf.validateMsg.fileSize', { size: 2 }),
      type: 'warning'
    })
    return false
  }
  return true
}
const handleError = (error) => {
  ElMessage.error(error.toString())
}
const handleSuccess = (response, uploadFile) => {
  nextTick(() => {
    element.value.children[1].click()
  })
}
</script>
<template>
  <div style="width: 100%" class="ConfigBackground">
    <div class="background">
      <div v-if="!state.value0">
        <el-color-picker size="large" @active-change="handleActiveChange" @change="handleChange"
          v-model="target.style.background.color" show-alpha />
      </div>
      <ul :class="[!state.value0 ? 'quickColor' : 'quickImage']" ref="element">
        <li v-if="state.value0" class="uploadFile">
          <el-upload accept=".png,.jpg" :action="'candidate-feature'" list-type="picture-card" ref="element"
            :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="handleSuccess"
            :on-error="handleError">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </li>
        <li v-for="(item0, index0) in quickColors" :key="index0" :data-value="item0"
          :style="!state.value0 && { backgroundColor: item0 }"
          :class="[checkIsSelected(item0) && 'selectedBg', 'selectColorFirst']">
          <el-image v-if="state.value0" :data-value="item0" :src="item0" lazy />
        </li>
      </ul>
    </div>
    <div v-if="state.defaultBackground.backgroundImage">
      <el-row :gutter="14">
        <el-col :span="12">
          <div>Reapeat</div>
          <el-select v-model="target.style.background.repeat" placeholder="Select" size="large">
            <el-option v-for="item in options0[0]" :key="item" :label="item" :value="item" />
          </el-select>
        </el-col>
        <el-col :span="12">
          <div>Position</div>
          <el-select v-model="target.style.background.position" placeholder="Select" size="large">
            <el-option v-for="item in options0[1]" :key="item" :label="item" :value="item" />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="14">
        <el-col :span="12">
          <div>Attachment</div>
          <el-select v-model="target.style.background.attachment" placeholder="Select" size="large">
            <el-option v-for="item in options0[2]" :key="item" :label="item" :value="item" />
          </el-select>
        </el-col>
        <el-col :span="12">
          <div>Size</div>
          <el-select v-model="target.style.background.size" placeholder="Select" size="large">
            <el-option v-for="item in options0[3]" :key="item" :label="item" :value="item" />
          </el-select>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ConfigBackground {
  display: flex;

  .backgroundTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .clear {
    padding-top: 10px;
  }

  .background {
    display: flex;

    .el-color-picker {
      .el-color-picker__trigger {
        border-right: none !important;
        border-radius: 4px 0px 0px 4px;
      }
    }

    ul {
      width: 100%;
      display: flex;

      li {
        height: 38px;
        cursor: pointer;

        .el-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .quickColor {
    overflow: hidden;

    li:not(:last-child) {
      border-right: none;
    }

    li:last-child {
      border-radius: 0px 4px 4px 0px;
    }

    li {
      border: 1px solid #DCDFE6;
      flex: 1;
    }

    li.selectedBg {
      border-color: $primary-color;

      &+li {
        border-left-color: $primary-color;
      }
    }
  }

  .quickImage {
    flex-wrap: wrap;
    justify-content: start;

    li {
      width: 30%;
      border: 1px solid #DDDDDD;
      border-radius: 4px;
      flex-shrink: 0;
      margin-bottom: 8px;
      height: 30px;
      margin-right: 11px;

      &:nth-child(3n) {
        margin-right: 0px;
      }

      &.selectedBg {
        border-color: $primary-color;
      }
    }
  }

  .uploadFile {
    border-color: transparent !important;

    &>.el-upload-list,
    .el-upload {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
