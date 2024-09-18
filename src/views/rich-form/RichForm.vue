<script lang="ts" setup>
import './theme/index.scss'
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'
import { defineProps, ref, reactive, nextTick, watch } from 'vue'
import FieldsPanel from './components/Panels/Fields'
import CanvasPanel from './components/Panels/Canvas/CenterCanvas'
import ConfigPanel from './components/Panels/Config/ConfigPanel.vue'
import DeviceSwitch from './components/DeviceSwitch.vue'
import Icon from '@/assets'
import { useI18n } from 'vue-i18n'
import utils, {
  deepClone, checkIsField, disassemblyData1, repairLayout, disassemblyData2, removeLogicDataById,
  checkIdExistInLogic, combinationData2, pickFields
} from '@/utils'
import _ from 'lodash-es'
import { isEmpty } from '@/utils/utils'
import defaultProps from './defaultProps'
import generatorData from './generatorData'
import { PlatformType } from './types/rich-form'
const emit = defineEmits(['changeParams', 'save'])
const props = defineProps({
  ...defaultProps,
  fieldsPanelWidth: {
    type: String,
    default: '220px'
  },
  fieldsPanelDefaultOpened: {
    type: Array,
    default: () => ['defaultField', 'field', 'container']
  },
  delHandle: {
    type: Function,
    default: () => { }
  },
  copyHandle: {
    type: Function,
    default: () => { }
  },
  inlineMax: {
    type: Number,
    default: 4
  },
  isShowClear: {
    type: Boolean,
    default: true
  },
  isShowI18n: {
    type: Boolean,
    default: true
  }
})
const layout = {
  pc: [],
  mobile: []
}
const state = reactive({
  store: [],
  selected: {},
  mode: 'edit',
  platform: 'pc',
  children: [],
  config: props.globalConfig,
  previewVisible: false,
  widthScaleLock: false,
  data: {},
  validateStates: [],
  fields: [],
  Namespace: 'formEditor',
  logic: {},
  validator(target, fn) {
    if (target) {
      const count = _.countBy(state.validateStates, 'data.key')
      const newValue = target.key.trim()
      if (isEmpty(newValue)) {
        _.find(state.validateStates, { data: { key: target.key } }).isWarning = true
        fn && fn(0)
        return false
      }
      state.validateStates.forEach(e => {
        if (count[e.data.key] > 1) {
          e.isWarning = true
        } else {
          e.isWarning = false
        }
      })
      if (fn) {
        fn(!(count[newValue] > 1) ? 1 : 2)
      }
    } else {
      fn(state.validateStates.every(e => !e.isWarning))
    }
  }
})
const isFoldFields = ref(true)
const isFoldConfig = ref(true)

const { t } = useI18n()
const isShow = ref(true)
const isShowConfig = ref(true)
const setSelection = (node) => {
  let result: any = ''
  if (node === 'root') {
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
setSelection(state.config)
const addField = (node) => {
  if (checkIsField(node)) {
    const findIndex = _.findIndex(state.fields, {
      id: node.id
    })
    if (findIndex === -1) {
      state.fields.push(node)
    } else {
      state.fields.splice(findIndex, 1, node)
    }
  }
}
const delField = (node) => {
  const fieldIndex = _.findIndex(state.fields, {
    id: node.id
  })
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
const addFieldData = (node, isCopy = false) => {
  if (/^(radio|cascader|checkbox|select)$/.test(node.type)) {
    if (isCopy) {
      state.data[node.id] = deepClone(state.data[node.options.dataKey])
      node.options.dataKey = node.id
    } else if (!state.data[node.id]) {
      node.options.dataKey = node.id
      state.data[node.id] = {
        type: node.type,
        list: utils.generateOptions(3).map((e, i) => {
          e.label += i + 1
          return e
        })
      }
    }
  }
  if (/^(uploadfile|signature|html)$/.test(node.type)) {
    node.options.action = props.fileUploadURI
  }
}
const wrapElement = (el, isWrap = true, isSetSelection = true, sourceBlock = true, resetWidth = true) => {
  const node = sourceBlock
    ? generatorData(el, isWrap, lang.value, sourceBlock, (node) => {
      addFieldData(node)
      addField(node)
    })
    : isWrap
      ? {
        type: 'inline',
        columns: [
          el
        ]
      }
      : el
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
const syncLayout = (platform: PlatformType, fn: any) => {
  const isPC = platform === 'pc'
  const original = deepClone(state.store)
  disassemblyData2(original)
  layout[isPC ? 'mobile' : 'pc'] = original
  if (isEmpty(isPC ? layout.pc : layout.mobile)) {
    const newData = state.fields.map(e => wrapElement(e, true, false, false, false))
    fn && fn(newData)
  } else {
    // debugger
    const layoutFields = pickFields(isPC ? layout.pc : layout.mobile).map(e => {
      return {
        id: e
      }
    })
    const copyData = deepClone(isPC ? layout.pc : layout.mobile)
    const addFields = _.differenceBy(state.fields, layoutFields, 'id')
    const delFields = _.differenceBy(layoutFields, state.fields, 'id')
    repairLayout(copyData, delFields)
    combinationData2(copyData, state.fields)
    copyData.push(...addFields.map(e => wrapElement(e, true, false, false, false)))
    // copyData.push(...addFields)
    fn && fn(copyData)
  }
}
const getLayoutDataByPlatform = (platform: PlatformType) => {
  const isPC = platform === 'pc'
  if (isEmpty(isPC ? layout.pc : layout.mobile)) {
    if (platform === state.platform) {
      const original = deepClone(state.store)
      disassemblyData2(original)
      return original
    }
    const newData = deepClone(state.fields.map(e => wrapElement(e, true, false, false, false)))
    disassemblyData2(newData)
    return newData
  }
  if (platform === state.platform) {
    const original = deepClone(state.store)
    disassemblyData2(original)
    layout[isPC ? 'pc' : 'mobile'] = original
  }
  const layoutFields = pickFields(isPC ? layout.pc : layout.mobile).map(e => {
    return {
      id: e
    }
  })
  const copyData = deepClone(isPC ? layout.pc : layout.mobile)
  const addFields = deepClone(_.differenceBy(state.fields, layoutFields, 'id').map(e => wrapElement(e, true, false, false, false)))
  const delFields = _.differenceBy(layoutFields, state.fields, 'id')
  repairLayout(copyData, delFields)
  disassemblyData2(addFields)
  copyData.push(...addFields)
  return copyData
}
const switchPlatform = (platform: PlatformType) => {
  if (state.platform === platform) {
    return false
  }
  state.platform = platform
}
const canvasScrollRef = ref('')
const fireEvent = (type, data) => {
  console.log('🚀 ~ fireEvent ~ type:', type)
  console.log('🚀 ~ fireEvent ~ data:', data)
  emit(type, data)
}

const richFormPreviewData = ref({

})
provide('rich-form-preview', richFormPreviewData)
provide('Everright', {
  state,
  // 准备添加 移动端和桌面端的配置
  setSelection,
  props,
  wrapElement,
  delField,
  addField,
  switchPlatform,
  addFieldData,
  canvasScrollRef,
  fireEvent
})

const getData1 = () => {
  return Object.assign(disassemblyData1(deepClone({
    list: state.store,
    config: state.config,
    data: state.data
  })), {
    logic: state.logic
  })
}
// const getData2 = () => {
//   layout.pc = getLayoutDataByPlatform('pc')
//   layout.mobile = getLayoutDataByPlatform('mobile')
//   return deepClone({
//     layout,
//     data: state.data,
//     config: state.config,
//     fields: state.fields,
//     logic: state.logic
//   })
// }
// const setData1 = (data) => {
//   if (isEmpty(data)) return false
//   const newData = combinationData1(deepClone(data))
//   isShow.value = false
//   state.store = newData.list
//   state.config = newData.config
//   state.data = newData.data
//   state.fields = newData.fields
//   state.logic = newData.logic
//   setSelection(state.config)
//   state.store.forEach((e) => {
//     addContext(e, state.store)
//   })
//   nextTick(() => {
//     isShow.value = true
//   })
// }
// const setData2 = (data) => {
//   if (isEmpty(data)) return false
//   const newData = deepClone(data)
//   layout.pc = newData.layout.pc
//   layout.mobile = newData.layout.mobile
//   isShow.value = false
//   state.store = newData.list
//   state.fields = newData.fields
//   const curLayout = deepClone(newData.layout[state.platform])
//   combinationData2(curLayout, state.fields)
//   state.store = curLayout
//   state.config = newData.config
//   state.data = newData.data
//   setSelection(state.config)
//   state.store.forEach((e) => {
//     addContext(e, state.store)
//   })
//   nextTick(() => {
//     isShow.value = true
//   })
// }
const getData = () => {
  if (!state.validateStates.every(e => !e.isWarning)) {
    return {}
  }
  return getData1()
}
type OperationType = 'resetData' | 'preview'
const handleOperation = (type: OperationType) => {
  switch (type) {
    case 'resetData':
      layout.pc = []
      layout.mobile = []
      state.fields.splice(0)
      state.store.splice(0)
      state.data = {}
      setSelection('root')
      break
    case 'preview':
      richFormPreviewData.value = getData()
      break
  }
}
function onCollapseLeft() {
  isFoldFields.value = !isFoldFields.value
}
function onCollapseRight() {
  isFoldConfig.value = !isFoldConfig.value
}
watch(() => state.selected, (newVal) => {
  fireEvent('changeParams', deepClone(newVal))
}, {
  deep: true,
  immediate: true
})
const onClickOutside = () => {
}
const onSaveData = () => {
  fireEvent('save', getData())
}
</script>
<template>
  <el-container :class="$style.mainOuter">
    <FieldsPanel v-show="isFoldFields" />
    <el-container :class="$style.container">
      <el-header :class="$style.operation">
        <div>
          <Icon @click="onSaveData" class="fe-icon" icon="save"></Icon>
          <Icon v-if="isShowClear" @click="handleOperation('resetData')" class="fe-icon" icon="clear0"></Icon>
        </div>
        <DeviceSwitch :modelValue="state.platform" @update:model-value="switchPlatform"> </DeviceSwitch>
        <div>
          <el-dropdown v-if="isShowI18n" @command="(command) => fireEvent('lang', command)">
            <Icon class="fe-icon" icon="language"></Icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="zh-cn" :disabled="lang === 'zh-cn'">中文</el-dropdown-item>
                <el-dropdown-item command="en" :disabled="lang === 'en'">English</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <Icon @click="handleOperation('preview')" class="fe-icon" icon="preview"></Icon>
        </div>
      </el-header>
      <CanvasPanel v-click-outside="onClickOutside" v-if="isShow" :data="state.store"></CanvasPanel>
      <Icon @click="onCollapseLeft" :class="[$style.arrowLeft, !isFoldFields && $style.close]" icon="arrowLeft" />
      <Icon @click="onCollapseRight" :class="[$style.arrowRight, !isFoldConfig && $style.close]" icon="arrowRight" />
    </el-container>
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

  .fe-icon {}

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