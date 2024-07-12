<script>
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'
import { defineProps, ref, reactive, provide, nextTick, watch } from 'vue'
import FieldsPanel from './components/Panels/Fields'
import CanvasPanel from './components/Panels/Canvas/CenterCanvas'
import ConfigPanel from './components/Panels/Config/index.vue'
import DeviceSwitch from './components/DeviceSwitch.vue'
import Icon from '@/assets'
import hooks from '@/hooks'
import utils from '@/utils'
import _ from 'lodash-es'
import { isEmpty } from '@/utils/utils'
import defaultProps from './defaultProps'
import generatorData from './generatorData'
export default {
  name: 'EverrightFormEditor'
}
</script>
<script setup>
const emit = defineEmits(['listener'])
const props = defineProps({
  ...defaultProps,
  fieldsPanelWidth: {
    type: String,
    default: '220px'
  },
  fieldsPanelDefaultOpeneds: {
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
const previewPlatform = ref('pc')
const previewLoading = ref(true)
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
  logic: {}
})
const isFoldFields = ref(true)
const isFoldConfig = ref(true)
state.validator = (target, fn) => {
  if (target) {
    const count = _.countBy(state.validateStates, 'data.key')
    const newValue = target.key.trim()
    if (utils.isNull(newValue)) {
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
// const {
//   canUndo,
//   canRedo,
//   undo,
//   redo,
//   undoStack,
//   redoStack,
//   last
//   // stop,
//   // restart
// } = hooks.useHistory(state)
const {
  t,
  lang
} = hooks.useI18n(props)
const EReditorPreviewRef = ref('')
const isShow = ref(true)
const isShowConfig = ref(true)
const setSelection = (node) => {
  let result = ''
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
  if (utils.checkIsField(node)) {
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
    if (utils.checkIdExistInLogic(node.id, state.logic)) {
      ElMessage({
        showClose: true,
        duration: 4000,
        message: t('er.logic.logicSuggests'),
        type: 'warning'
      })
      utils.removeLogicDataByid(node.id, state.logic)
    }
    state.fields.splice(fieldIndex, 1)
  }
}
const addFieldData = (node, isCopy = false) => {
  if (/^(radio|cascader|checkbox|select)$/.test(node.type)) {
    if (isCopy) {
      state.data[node.id] = _.cloneDeep(state.data[node.options.dataKey])
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
    if (utils.checkIsField(el)) {
      if (state.platform === 'pc') {
        el.style.width.pc = '100%'
      } else {
        el.style.width.mobile = '100%'
      }
    } else {
      el.style.width = '100%'
    }
  }
  if (isSetSelection) {
    // nextTick(() => {
    //   setSelection(node)
    // })
  }
  return node
}
const syncLayout = (platform, fn) => {
  const isPc = platform === 'pc'
  const original = _.cloneDeep(state.store)
  utils.disassemblyData2(original)
  layout[isPc ? 'mobile' : 'pc'] = original
  if (isEmpty(isPc ? layout.pc : layout.mobile)) {
    // const newData = _.cloneDeep(state.fields.map(e => wrapElement(e, true, false)))
    const newData = state.fields.map(e => wrapElement(e, true, false, false, false))
    fn && fn(newData)
  } else {
    // debugger
    const layoutFields = utils.pickfields(isPc ? layout.pc : layout.mobile).map(e => {
      return {
        id: e
      }
    })
    const copyData = _.cloneDeep(isPc ? layout.pc : layout.mobile)
    const addFields = _.differenceBy(state.fields, layoutFields, 'id')
    const delFields = _.differenceBy(layoutFields, state.fields, 'id')
    utils.repairLayout(copyData, delFields)
    utils.combinationData2(copyData, state.fields)
    copyData.push(...addFields.map(e => wrapElement(e, true, false, false, false)))
    // copyData.push(...addFields)
    fn && fn(copyData)
  }
}
const getLayoutDataByplatform = (platform) => {
  const isPc = platform === 'pc'
  if (isEmpty(isPc ? layout.pc : layout.mobile)) {
    if (platform === state.platform) {
      const original = _.cloneDeep(state.store)
      utils.disassemblyData2(original)
      return original
    }
    const newData = _.cloneDeep(state.fields.map(e => wrapElement(e, true, false, false, false)))
    utils.disassemblyData2(newData)
    return newData
  }
  if (platform === state.platform) {
    const original = _.cloneDeep(state.store)
    utils.disassemblyData2(original)
    layout[isPc ? 'pc' : 'mobile'] = original
  }
  const layoutFields = utils.pickfields(isPc ? layout.pc : layout.mobile).map(e => {
    return {
      id: e
    }
  })
  const copyData = _.cloneDeep(isPc ? layout.pc : layout.mobile)
  const addFields = _.cloneDeep(_.differenceBy(state.fields, layoutFields, 'id').map(e => wrapElement(e, true, false, false, false)))
  const delFields = _.differenceBy(layoutFields, state.fields, 'id')
  utils.repairLayout(copyData, delFields)
  utils.disassemblyData2(addFields)
  copyData.push(...addFields)
  return copyData

}
const switchPlatform = (platform) => {
  if (state.platform === platform) {
    return false
  }
  if (props.layoutType === 2) {
    syncLayout(platform, (newData) => {
      state.store = newData
      state.store.forEach((e) => {
        utils.addContext(e, state.store)
      })
    })
  }
  state.platform = platform
}
const canvasScrollRef = ref('')
const fireEvent = (type, data) => {
  emit('listener', {
    type,
    data
  })
}
provide('Everright', {
  state,
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

// Namespace: formEditor
const ns = hooks.useNamespace('Main', state.Namespace)
const getData1 = () => {
  return Object.assign(utils.disassemblyData1(_.cloneDeep({
    list: state.store,
    config: state.config,
    data: state.data
  })), {
    logic: state.logic
  })
}
const getData2 = () => {
  layout.pc = getLayoutDataByplatform('pc')
  layout.mobile = getLayoutDataByplatform('mobile')
  return _.cloneDeep({
    layout,
    data: state.data,
    config: state.config,
    fields: state.fields,
    logic: state.logic
  })
}
const setData1 = (data) => {
  if (isEmpty(data)) return false
  // stop()
  const newData = utils.combinationData1(_.cloneDeep(data))
  isShow.value = false
  state.store = newData.list
  state.config = newData.config
  state.data = newData.data
  state.fields = newData.fields
  state.logic = newData.logic
  setSelection(state.config)
  state.store.forEach((e) => {
    utils.addContext(e, state.store)
  })
  nextTick(() => {
    isShow.value = true
  })
}
const setData2 = (data) => {
  if (isEmpty(data)) return false
  const newData = _.cloneDeep(data)
  layout.pc = newData.layout.pc
  layout.mobile = newData.layout.mobile
  isShow.value = false
  state.store = newData.list
  state.fields = newData.fields
  const curLayout = _.cloneDeep(newData.layout[state.platform])
  utils.combinationData2(curLayout, state.fields)
  state.store = curLayout
  state.config = newData.config
  state.data = newData.data
  setSelection(state.config)
  state.store.forEach((e) => {
    utils.addContext(e, state.store)
  })
  nextTick(() => {
    isShow.value = true
  })
}
const getData = () => {
  if (!state.validateStates.every(e => !e.isWarning)) {
    return {}
  }
  return (props.layoutType === 1 ? getData1 : getData2)()

}
const setData = props.layoutType === 1 ? setData1 : setData2
defineExpose({
  switchPlatform(platform) {
    switchPlatform(platform)
  },
  setData,
  getData
})
const handleOperation = (type, val) => {
  switch (type) {
    case 1:
      break
    case 2:
      layout.pc = []
      layout.mobile = []
      state.fields.splice(0)
      state.store.splice(0)
      state.data = {}
      setSelection('root')
      break
    case 3:
      state.previewVisible = true
      previewLoading.value = true
      nextTick(() => {
        EReditorPreviewRef.value.setData(getData())
        nextTick(() => {
          previewLoading.value = false
        })
      })
      break
    case 4:
      fireEvent('save', getData())
      break
    case 5:
      isFoldFields.value = !isFoldFields.value
      break
    case 6:
      isFoldConfig.value = !isFoldConfig.value
      break
    case 7:
      previewLoading.value = true
      previewPlatform.value = val
      EReditorPreviewRef.value.switchPlatform(val)
      EReditorPreviewRef.value.setData(getData())
      nextTick(() => {
        nextTick(() => {
          previewLoading.value = false
        })
      })
      break
  }
}
watch(() => state.selected, (newVal) => {
  fireEvent('changeParams', _.cloneDeep(newVal))
}, {
  deep: true,
  immediate: true
})
const onClickOutside = () => {
}
watch(state.store, (newVal) => {
  console.log('🚀 ~ watch ~ newVal:', newVal)
})
</script>
<template>
  <el-dialog destroy-on-close fullscreen :class="[ns.e('previewDialog')]" @closed="previewPlatform = pc"
    v-model="state.previewVisible">
    <template #header>
      <DeviceSwitch :modelValue="previewPlatform" @update:model-value="(val) => handleOperation(7, val)"></DeviceSwitch>
    </template>
    <el-scrollbar>
      <div v-loading="previewLoading"
        :class="[ns.e('previewDialogWrap'), previewPlatform === 'mobile' && ns.is('mobilePreview')]">
        <FormPreview v-bind="props" ref="EReditorPreviewRef" />
      </div>
    </el-scrollbar>
  </el-dialog>
  <el-container :class="[ns.b()]" direction="vertical">
    <el-container>
      <FieldsPanel v-show="isFoldFields" />
      <el-container :class="[ns.e('container')]">
        <el-header :class="[ns.e('operation')]">
          <div>
            <Icon @click="handleOperation(4)" :class="[ns.e('icon')]" icon="save"></Icon>
            <Icon v-if="isShowClear" @click="handleOperation(2)" :class="[ns.e('icon')]" icon="clear0"></Icon>
            <slot name="operation-left"></slot>
          </div>
          <div>
            <DeviceSwitch :modelValue="state.platform" @update:model-value="(val) => switchPlatform(val)">
            </DeviceSwitch>
          </div>
          <div>
            <slot name="operation-right"></slot>
            <el-dropdown v-if="isShowI18n" @command="(command) => fireEvent('lang', command)">
              <Icon :class="[ns.e('icon')]" icon="language"></Icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="zh-cn" :disabled="lang === 'zh-cn'">中文</el-dropdown-item>
                  <el-dropdown-item command="en" :disabled="lang === 'en'">English</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <Icon @click="handleOperation(3)" :class="[ns.e('icon')]" icon="preview"></Icon>
          </div>
        </el-header>
        <CanvasPanel v-click-outside="onClickOutside" v-if="isShow" :data="state.store"></CanvasPanel>
        <Icon @click="handleOperation(5)" :class="[ns.e('arrowLeft'), !isFoldFields && ns.is('close')]"
          icon="arrowLeft">
        </Icon>
        <Icon @click="handleOperation(6)" :class="[ns.e('arrowRight'), !isFoldConfig && ns.is('close')]"
          icon="arrowRight"></Icon>
      </el-container>
      <ConfigPanel v-show="isFoldConfig" v-if="isShow && isShowConfig"></ConfigPanel>
    </el-container>
  </el-container>
</template>
