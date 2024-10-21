<script lang="ts" setup>
import './theme/index.scss'
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'
import { reactive, nextTick, watch } from 'vue'
import IconTooltip from '@/components/more-layer/tooltip/IconTooltip.vue'
import FieldsPanel from './view/LeftFields/LeftFields.vue'
import CanvasPanel from './view/CenterCanvas/CenterCanvas'
import ConfigPanel from './view/RightConfig/ConfigPanel.vue'
import DeviceSwitch from './components/DeviceSwitch.vue'
import Icon from '@/assets'
import { useI18n } from 'vue-i18n'
import {
  deepClone, checkIsField, disassemblyData1, repairLayout, disassemblyData2, removeLogicDataById,
  checkIdExistInLogic, combinationData2, pickFields
} from '@/utils'
import { isEmpty } from '@/utils/utils'
import defaultProps from './defaultProps'
import generatorData from './generatorData'
import { PlatformType, RichFormProvider } from './types/rich-form'
import { fieldsConfig } from './config/componentsConfig'
import { AllNodeType } from './types/rich-form-item'
import richFormConfig from './config/richFormConfig'
import { generateOptions } from '@/utils/generateOptions'
const emit = defineEmits(['changeParams', 'save', 'changeLang'])
const props = defineProps({
  ...defaultProps,
  isShowClear: {
    type: Boolean,
    default: true
  },
  isShowI18n: {
    type: Boolean,
    default: true
  }
})

const isFoldFields = ref(true)
const isFoldConfig = ref(true)

const { t } = useI18n()
const isShow = ref(true)
const isShowConfig = ref(true)
const setSelection = (node: AllNodeType) => {
  let result: any = ''
  if (node.type === 'root') {
    result = state.config
  } else if (node.type === 'inline') {
    result = node.columns[0]
  } else {
    result = node
  }
  isShowConfig.value = state.selected === result
  state.selected = result
  nextTick(() => {
    isShowConfig.value = true
  })
}
const addField = (node: any) => {
  if (checkIsField(node)) {
    const findIndex = state.fields.findIndex((item: any) => item.id === node.id)
    if (findIndex === -1) {
      state.fields.push(node)
    } else {
      state.fields.splice(findIndex, 1, node)
    }
  }
}
const delField = (node: any) => {
  const fieldIndex = state.fields.findIndex((item: any) => item.id === node.id)
  if (fieldIndex !== -1) {
    if (checkIdExistInLogic(node.id, state.logic)) {
      ElMessage({
        showClose: true,
        duration: 4000,
        message: t('rf.logic.logicSuggests'),
        type: 'warning'
      })
      removeLogicDataById(node.id, state.logic)
    }
    state.fields.splice(fieldIndex, 1)
  }
}
const addFieldData = (node: any, isCopy = false) => {
  console.log('🚀 ~ addFieldData ~ node:', node)
  if (['radio', 'cascader', 'checkbox', 'select'].includes(node.type)) {
    if (isCopy) {
      state.data[node.id] = deepClone(state.data[node.options.dataKey])
      node.options.dataKey = node.id
    } else if (!state.data[node.id]) {
      node.options.dataKey = node.id
      state.data[node.id] = {
        type: node.type,
        list: generateOptions(3).map((e, i) => {
          e.label += i + 1
          return e
        })
      }
    }
  }
  if (['uploadFile', 'signature', 'html'].includes(node.type)) {
    node.options.action = ''
  }
}

const wrapElement = (el: any, {
  isWrap = true,
  isSetSelection = true,
  sourceBlock = true,
  resetWidth = true
}) => {
  let node: any
  if (sourceBlock) {
    node = generatorData(el, {
      isWrap,
      isCreateLabel: sourceBlock,

    })
  } else if (isWrap) {
    node = {
      type: 'inline',
      columns: [
        el
      ]
    }
  } else {
    node = el
  }

  if (!sourceBlock && resetWidth) {
    if (checkIsField(el)) {
      if (state.platform === 'pc') {
        el.style.width.pc = '100%'
      } else {
        el.style.width.mobile = '100%'
      }
    } else {
      el.style.width = '100%'
    }
  }
  return node
}

const switchPlatform = (platform: PlatformType) => {
  if (state.platform === platform) {
    return false
  }
  state.platform = platform
}

const richFormPreviewData = ref({

})

function validator(target: any, fn: any) {
  console.warn('暂时不提供表单验证')
  // if (target) {
  //   const count = _.countBy(state.validateStates, 'data.key')
  //   const newValue = target.key.trim()
  //   if (isEmpty(newValue)) {
  //     const findItem: any = state.validateStates.find((item: any) => (item.data.key === target.key))
  //     if (findItem) findItem.isWarning = true
  //     fn && fn(0)
  //     return false
  //   }
  //   state.validateStates.forEach((e: any) => {
  //     if (count[e.data.key] > 1) {
  //       e.isWarning = true
  //     } else {
  //       e.isWarning = false
  //     }
  //   })
  //   if (fn) {
  //     fn(!(count[newValue] > 1) ? 1 : 2)
  //   }
  // } else {
  //   fn(state.validateStates.every((e: any) => !e.isWarning))
  // }
}

const getData = () => {
  if (!state.validateStates.every((e: any) => !e.isWarning)) {
    return {}
  }
  return Object.assign(disassemblyData1(deepClone({
    list: state.store,
    config: state.config,
    data: state.data
  })), {
    logic: state.logic
  })
}
type OperationType = 'resetData' | 'preview'
const onPreview = (type: OperationType) => {
  richFormPreviewData.value = getData()
}
function onCollapseLeft() {
  isFoldFields.value = !isFoldFields.value
}
function onCollapseRight() {
  isFoldConfig.value = !isFoldConfig.value
}
const canvasScrollRef = ref()

const state = reactive<RichFormProvider>({
  lang: 'zh',
  state: {
    selected: {},
    mode: 'edit',
    platform: 'pc',
    config: richFormConfig,
    previewVisible: false,
    widthScaleLock: false,
    validateStates: [],
    fields: [],
    Namespace: 'formEditor',
  },
  // 准备添加 移动端和桌面端的配置
  store: [],
  selected: {
    type: 'root',
    id: 'root',
    label: 'default'
  },
  mode: 'edit',
  platform: 'pc',
  widthScaleLock: false,
  data: {},
  validateStates: [],
  fields: [],
  logic: {},
  desktop: {},
  mobile: {},
  desktopItems: {},
  mobileItems: {},
  config: richFormConfig,
  fieldsList: fieldsConfig,
  canvasScrollRef,
  handler: {
    setSelection,
    switchPlatform,
    addFieldData,
    delete: delField,
    addField,
    wrapElement,
    checkPropsBySelected() { },
    validator,
    copy: () => { },
  },
})

// provider
// provide('rich-form-preview', richFormPreviewData)
setSelection({
  type: 'root',
  id: 'root',
  label: '根节点'
})
provide<RichFormProvider>('rich-form', state)
watch(() => state.selected, (newVal) => {
  emit('changeParams', deepClone(newVal))
}, {
  deep: true,
  immediate: true
})
const onClickOutside = () => {
}
const onSaveData = () => {
  emit('save', getData())
}
const onResetData = () => {
  // layout.pc = []
  // layout.mobile = []
  state.fields.splice(0)
  state.store.splice(0)
  state.data = {}
  setSelection({
    type: 'root',
    label: '根容器',
    id: 'root'
  })
}
</script>
<template>
  <el-container :class="$style.mainOuter">
    <FieldsPanel v-show="isFoldFields" />
    <div :class="$style.container">
      <el-header :class="$style.operation">
        <div style="display: flex;">
          <!-- <IconTooltip tip="保存">
            <Icon @click="onSaveData" class="fe-icon" icon="save"></Icon>
          </IconTooltip>
          <IconTooltip tip="清空">
            <Icon v-if="isShowClear" @click="onResetData" class="fe-icon" icon="clear0"></Icon>
          </IconTooltip> -->
        </div>
        <DeviceSwitch :modelValue="state.platform" @update:model-value="switchPlatform"> </DeviceSwitch>
        <div>
          <!-- <el-dropdown v-if="isShowI18n" @command="(command) => emit('changeLang', command)">
            <Icon class="fe-icon" icon="language"></Icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="zh-cn" :disabled="lang === 'zh-cn'">中文</el-dropdown-item>
                <el-dropdown-item command="en" :disabled="lang === 'en'">English</el-dropdown-item>
              </el-dropdown-menu>
            </template>
</el-dropdown> -->
          <!-- <Icon @click="onPreview" class="fe-icon" icon="preview"></Icon> -->
        </div>
      </el-header>
      <CanvasPanel v-click-outside="onClickOutside" v-if="isShow" :data="state.store"></CanvasPanel>
      <Icon @click="onCollapseLeft" :class="[$style.arrowLeft, !isFoldFields && $style.close]" icon="arrowLeft" />
      <Icon @click="onCollapseRight" :class="[$style.arrowRight, !isFoldConfig && $style.close]" icon="arrowRight" />
    </div>
    <ConfigPanel v-show="isFoldConfig" v-if="isShow"></ConfigPanel>
  </el-container>
</template>

<style lang="scss" module>
.previewDialogWrap {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  margin: 10px 40px;

  &.mobilePreview {
    width: 400px;
    margin: 0 auto;
  }
}

.mainOuter {
  height: 100vh;

  .el-container {
    height: 100%;
  }

  .operation {
    height: 40px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 3;

    .fe-icon {
      border-radius: 4px;
      width: 24px;
      height: 24px;
      display: inline-flex;
      justify-content: center;
      align-items: center;

      &:hover {
        color: $primary-color;
        background: #ECF6FF;
      }
    }
  }

  .container {
    flex: 1 0 0;
    position: relative;
    overflow: hidden;
  }

  .arrowLeft {
    left: 0;
    transform: perspective(10px) rotateY(9deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 0px 12px rgba(0, 0, 0, 0.1);
    border-radius: 0 6px 6px 0;
  }

  .arrowRight {
    right: 0;
    transform: perspective(10px) rotateY(-9deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -2px 0px 12px rgba(0, 0, 0, 0.1);
    border-radius: 6px 0 0 6px;
  }

  .arrowLeft,
  .arrowRight {
    position: absolute;
    top: 48%;
    height: 32px;
    width: 16px;
    z-index: 2;
    background: #FFFFFF;
    transition: .3s;

    &:hover {
      color: $primary-color;
    }

    svg {
      transition: .3s;
    }

    &.close {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>