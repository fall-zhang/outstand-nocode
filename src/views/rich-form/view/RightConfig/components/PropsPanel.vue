<!-- 右侧面板 -->
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, computed, unref, onMounted } from 'vue'
import { checkIdExistInLogic, removeLogicDataById, syncWidthByPlatform, isInlineChildren } from '@/utils'
import { useI18n } from 'vue-i18n'
import { useProps } from '@Form/hooks/use-props'

import PanelItemCheckbox from './CheckboxComponent.vue'
import PanelItemCollapse from './CollapseComponent.vue'
import RadioButton from './RadioButton.vue'
import PanelItemBorder from './BorderComponent.vue'
import PanelItemLimit from './LimitComponent.vue'
import PanelItemAllSide from './SidesComponent.vue'
import PanelItemBackground from './BackgroundComponent.vue'
import DataComponentDefault from './DataComponentDefault.vue'
import DataComponentCascader from './DataComponentCascader.vue'
import DataComponentTab from './DataComponentTab.vue'
import { ArrowDown } from '@icon-park/vue-next'
import Icon from '@/assets'
import { useFormProvider } from '@/views/rich-form/hooks/use-form-provider'
defineOptions({
  name: 'ConfigPropsPanel',
  inheritAttrs: false,
  customOptions: {}
})
defineEmits(['changePanel'])

const { t } = useI18n()
const { isDesktop, selected, isSelectRoot } = useFormProvider()
const state = reactive(useFormProvider())

function checkSelectedType(list: string[]) {
  return list.includes(selected.value.type)
}
const isSelectTabs = computed(() => {
  return checkSelectedType(['tabs'])
})
const isSelectCollapse = computed(() => {
  return checkSelectedType(['collapse'])
})
const isSelectGrid = computed(() => {
  return checkSelectedType(['grid'])
})
// provide('rich-form-bg', bgStatus)
const dialogVisible = ref(false)
const dataRef = ref()
const titleRef = ref()
const options = [
  {
    value: 'date',
    label: 'date'
  },
  {
    value: 'dates',
    label: 'dates'
  },
  {
    value: 'datetime',
    label: 'datetime'
  },
  {
    value: 'daterange',
    label: 'daterange'
  }
]
const timePickerType = computed(() => {
  let result: Record<'label' | 'value', any>[] = []
  if (checkSelectedType(['time'])) {
    result = [
      {
        label: 'HH:mm:ss',
        value: 'HH:mm:ss'
      },
      {
        label: 'HH时mm分ss秒',
        value: 'HH时mm分ss秒'
      }
    ]
  }
  if (checkSelectedType(['date'])) {
    if (selected.value.options.type === 'datetime') {
      result = [
        {
          label: 'YYYY-MM-DD HH:mm:ss',
          value: 'YYYY-MM-DD HH:mm:ss'
        },
        {
          label: 'YYYY-MM-DD hh:mm:ss',
          value: 'YYYY-MM-DD hh:mm:ss'
        }
      ]
    } else {
      result = [
        {
          label: 'YYYY-MM-DD',
          value: 'YYYY-MM-DD'
        },
        {
          label: 'YYYY/MM/DD',
          value: 'YYYY/MM/DD'
        },
        {
          label: 'YYYY年MM月DD日',
          value: 'YYYY年MM月DD日'
        }
      ]
    }
  }
  return result
})
const widthOptions = ['1/4', '1/3', '1/2', '2/3', '3/4', '1']
const options1 = computed(() => {
  return widthOptions.map((e, index) => {
    const result = {
      value: e,
      disabled: false,
      icon: `widthRatioP${index + 1}`
    }
    const otherNodes = selected.value.context.parent.columns
    switch (otherNodes.length) {
      case 2:
        result.disabled = /^(1)$/.test(result.value)
        break
      case 3:
        result.disabled = /^(1|3\/4|2\/3|1\/4)$/.test(result.value)
        break
    }
    return result
  })
})
const options2 = [
  'none',
  'solid',
  'dotted',
  'dashed',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset'
]
const options4 = computed(() => {
  return [
    {
      label: t('rf.config.tabsLayout.style.options[0]'),
      value: '',
      icon: 'tabStyleP1'
    },
    {
      label: t('rf.config.tabsLayout.style.options[1]'),
      value: 'card',
      icon: 'tabStyleP2'
    },
    {
      label: t('rf.config.tabsLayout.style.options[2]'),
      value: 'border-card',
      icon: 'tabStyleP3'
    }
  ]
})
const options5 = computed(() => {
  return [
    {
      label: t('rf.config.tabsLayout.tabPosition.options[0]'),
      value: 'top',
      icon: 'tabsLocationP1'
    },
    {
      label: t('rf.config.tabsLayout.tabPosition.options[1]'),
      value: 'bottom',
      icon: 'tabsLocationP2'
    },
    {
      label: t('rf.config.tabsLayout.tabPosition.options[2]'),
      value: 'left',
      icon: 'tabsLocationP3'
    },
    {
      label: t('rf.config.tabsLayout.tabPosition.options[3]'),
      value: 'right',
      icon: 'tabsLocationP4'
    }
  ]
})

const options7 = computed(() => {
  return [
    {
      label: t('rf.config.propsPanel.layout.options[0]'),
      value: 'block'
    },
    {
      label: t('rf.config.propsPanel.layout.options[1]'),
      value: 'inline'
    }
  ]
})
const options8 = computed(() => {
  return [
    {
      label: t('rf.config.propsPanel.region.options[0]'),
      value: 1
    },
    {
      label: t('rf.config.propsPanel.region.options[1]'),
      value: 2
    },
    {
      label: t('rf.config.propsPanel.region.options[2]'),
      value: 3
    }
  ]
})
const options9 = computed(() => {
  return [
    {
      icon: 'numberButtonP2',
      value: false
    },
    {
      icon: 'numberButtonP1',
      value: true
    }
  ]
})
const options10 = computed(() => {
  return [
    {
      icon: 'dividerLocationP1',
      value: 'left'
    },
    {
      icon: 'dividerLocationP2',
      value: 'center'
    },
    {
      icon: 'dividerLocationP3',
      value: 'right'
    }
  ]
})
const typeProps = useProps({
  state,
  data: selected.value,
  isDesktop: true,
  isRoot: false
}, (type: string, props: any) => {
  if (selected.value.type === 'slider') {
    delete props.disabled
  }
})
const checkLogicData = () => {
  if (checkIdExistInLogic(selected.value.id, state.logic)) {
    ElMessage({
      showClose: true,
      duration: 4000,
      message: t('rf.logic.logicSuggests'),
      type: 'warning'
    })
    removeLogicDataById(selected.value.id, state.logic)
  }
}
const handleChange0 = (value: string) => {
  checkLogicData()
  if (/^(dates|daterange)$/.test(value)) {
    selected.value.options.defaultValue = []
  } else {
    selected.value.options.defaultValue = ''
  }
  if (!timePickerType.value.includes(value)) {
    selected.value.options.format = timePickerType.value[0].value
  }
}
const handleChange1 = () => {
  checkLogicData()
  selected.value.options.defaultValue = ''
}
const handleMultipleChange = (value) => {
  checkLogicData()
  if (value) {
    selected.value.options.defaultValue = []
  } else {
    selected.value.options.defaultValue = ''
  }
}
const onConfirmDialog = () => {
  const dataKey = selected.value.options.dataKey
  if (checkSelectedType(['cascader'])) {
    unref(dataRef).getData().then(({ data }) => {
      state.data[dataKey].list = data
      dialogVisible.value = false
    })
  } else {
    unref(dataRef).getData().then(({ data, defaultValue }) => {
      state.data[dataKey].list = data
      selected.value.options.defaultValue = defaultValue
      dialogVisible.value = false
    })
  }
}
function onCloseDialog() {
  dialogVisible.value = false
}
const handleTypeListener = ({ property, data }: any) => {
  switch (property) {
    case 'width': {
      const val = (Number(data.value) * 100).toFixed(2)
      syncWidthByPlatform(selected.value, state.platform, false, val)
      break
    }
    case 'type':
      selected.value.options.type = data.value
      break
    case 'tabPosition':
      selected.value.options.tabPosition = data.value
      break
    case 'justify':
      selected.value.options.justify = data.value
      break
    case 'displayStyle':
      selected.value.options.displayStyle = data.value
      break
    case 'selectType':
      selected.value.options.selectType = data.value
      selected.value.options.defaultValue = ''
      break
    case 'controlsPosition':
      selected.value.options.controlsPosition = data.value
      break
    case 'contentPosition':
      selected.value.options.contentPosition = data.value
      break
  }
}
onMounted(() => {
  titleRef.value && titleRef.value.focus()
})
</script>
<template>
  <div :class="$style.PropsPanel">
    <el-form-item v-if="isSelectRoot" :label="t('rf.config.propsPanel.id')" prop="key">
      <el-input v-model="selected.key" />
    </el-form-item>
    <PanelItemCollapse v-if="isSelectRoot" :label="t('rf.config.propsPanel.title')" operationKey="options"
      field="isShowLabel">
      <template #content>
        <div :class="[$style.collapseWrap, $style.collapseWrapLeft]">
          <el-row justify="space-between" align="middle">
            <el-col :span="isDesktop ? 11 : 24">
              <el-form-item>
                <template #label>
                  <Icon icon="title" />
                </template>
                <el-input ref="titleRef" clearable v-model="selected.label" />
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="isDesktop">
              <el-form-item>
                <template #label>
                  <Icon icon="dragWidth" />
                </template>
                <el-input-number controls-position="right" v-model="selected.options.labelWidth" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </template>
    </PanelItemCollapse>
    <RadioButton :label="t('rf.config.propsPanel.defaultContent')" layoutType="slot" v-if="checkSelectedType([
      'input',
      'textarea',
      'time',
      'date',
      'number',
      'rate',
      'color',
      'switch',
      'slider',
      'button',
      'divider',
      'cascader',
      'region'
    ])">
      <template v-if="checkSelectedType(['cascader', 'region'])">
        <el-cascader v-model="selected.options.defaultValue" v-bind="typeProps" clearable style="width: 100%;" />
      </template>
      <template v-else-if="checkSelectedType(['textarea'])">
        <el-input type="textarea" :rows="4" v-model="selected.options.defaultValue" />
      </template>
      <template v-else-if="checkSelectedType(['input', 'divider'])">
        <el-input v-model="selected.options.defaultValue" clearable />
      </template>
      <template v-else-if="checkSelectedType(['number'])">
        <el-input-number style="width: 100%;" v-bind="typeProps" v-model="selected.options.defaultValue" />
      </template>
      <template v-else-if="checkSelectedType(['time'])">
        <el-time-picker v-bind="typeProps" style="width: 100%" clearable v-model="selected.options.defaultValue" />
      </template>
      <template v-else-if="checkSelectedType(['date'])">
        <el-date-picker v-bind="typeProps" style="width: 100%" v-model="selected.options.defaultValue" clearable />
      </template>
      <template v-else-if="checkSelectedType(['rate'])">
        <el-rate v-bind="typeProps" v-model="selected.options.defaultValue" />
        <el-button v-if="selected.options.defaultValue > 0" link @click="selected.options.defaultValue = 0">{{
          t('rf.public.clear') }}</el-button>
      </template>
      <template v-else-if="checkSelectedType(['switch'])">
        <el-switch v-bind="typeProps" v-model="selected.options.defaultValue" />
      </template>
      <template v-else-if="checkSelectedType(['slider'])">
        <el-slider v-bind="typeProps" v-model="selected.options.defaultValue" style="padding: 0 14px;" />
      </template>
    </RadioButton>
    <RadioButton :label="t('rf.public.Data')" layoutType="slot"
      v-if="checkSelectedType(['select', 'radio', 'checkbox', 'cascader'])">
      <el-button style="width: 100%;" type="primary" @click="dialogVisible = true">{{ t('rf.public.dataEntry')
        }}</el-button>
    </RadioButton>
    <RadioButton :label="t('rf.config.propsPanel.star')" layoutType="slot" v-if="checkSelectedType(['rate'])">
      <el-input-number :min="1" controls-position="right" v-model="selected.options.max" />
    </RadioButton>
    <!-- placeholder -->
    <RadioButton layoutType="slot" :label="t('rf.config.propsPanel.placeholder')" v-if="checkSelectedType([
      'input',
      'textarea',
      'select',
      'cascader',
      'time',
      'date',
      'html',
      'region'
    ])">
      <el-input v-if="checkSelectedType(['input', 'select', 'cascader', 'time', 'date', 'html', 'region'])"
        v-model="selected.options.placeholder" clearable />
      <el-input v-else-if="checkSelectedType(['textarea'])" type="textarea" v-model="selected.options.placeholder"
        clearable />
    </RadioButton>
    <RadioButton layoutType="slot" v-if="checkSelectedType(['signature'])"
      :label="t('rf.config.propsPanel.brushColor')">
      <el-color-picker color-format="rgb" v-model="selected.options.penColor" />
    </RadioButton>
    <RadioButton v-if="checkSelectedType(['time', 'date'])" layoutType="slot" :label="t('rf.config.propsPanel.format')">
      <el-select v-model="selected.options.format" style="width: 100%">
        <el-option v-for="item in timePickerType" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </RadioButton>
    <RadioButton v-if="checkSelectedType(['date'])" layoutType="slot" :label="t('rf.config.propsPanel.dateType')">
      <el-select v-model="selected.options.type" @change="handleChange0" style="width: 100%">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </RadioButton>
    <RadioButton v-if="checkSelectedType(['radio', 'checkbox'])" @listener="handleTypeListener" property="displayStyle"
      :label="t('rf.config.propsPanel.layout.label')" :val="selected.options.displayStyle" :nodes="options7"
      layoutType="inline" />
    <RadioButton v-if="checkSelectedType(['divider'])" :label="t('rf.config.propsPanel.contentPosition.label')"
      @listener="handleTypeListener" property="contentPosition" :height="50" :fontSize="80" :nodes="options10"
      :val="selected.options.contentPosition" />
    <RadioButton layoutType="slot" v-if="checkSelectedType(['textarea'])"
      :label="t('rf.config.propsPanel.textareaHeight')">
      <el-slider v-model="selected.options.rows" :max="10" show-input />
    </RadioButton>
    <div v-if="checkSelectedType(['uploadfile'])">
      <el-form-item :label="t('rf.config.propsPanel.uploadfile.fileType')">
        <el-input v-model="selected.options.accept" placeholder="输入只接受的文件类型后缀。例如 .png,.jpg" />
      </el-form-item>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item :label="t('rf.config.propsPanel.uploadfile.uploadLimit')">
            <el-input-number style="width: 100%;" :min="1" controls-position="right" v-model="selected.options.limit" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="`${t('rf.config.propsPanel.uploadfile.fileSize')}(MB)`">
            <el-input-number style="width: 100%;" v-model="selected.options.size" controls-position="right" :min="1" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <el-row v-if="checkSelectedType(['input']) && selected.options.renderType === 1 && isDesktop" :gutter="8">
      <el-col :span="12">
        <el-form-item :label="t('rf.config.propsPanel.prepend')">
          <el-input style="width: 100%;" v-model="selected.options.prepend" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="t('rf.config.propsPanel.append')">
          <el-input style="width: 100%;" v-model="selected.options.append" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="8" v-if="checkSelectedType(['number', 'slider'])">
      <el-col :span="selected.type !== 'slider' ? 12 : 24">
        <el-form-item :label="t('rf.config.propsPanel.step')">
          <el-input-number :min="0" style="width: 100%;" controls-position="right" v-model="selected.options.step" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item v-if="selected.type !== 'slider'" :label="t('rf.config.propsPanel.precision')">
          <el-input-number :min="0" controls-position="right" v-model="selected.options.precision" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="8" v-if="checkSelectedType(['slider'])">
      <el-col :span="12">
        <el-form-item :label="t('rf.public.max')">
          <el-input-number controls-position="right" v-model="selected.options.max" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="t('rf.public.min')">
          <el-input-number controls-position="right" v-model="selected.options.min" />
        </el-form-item>
      </el-col>
    </el-row>
    <RadioButton v-if="checkSelectedType(['region'])" :label="t('rf.config.propsPanel.region.label')" layoutType="slot">
      <el-select v-model="selected.options.selectType" @change="handleChange1">
        <el-option v-for="item in options8" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </RadioButton>
    <RadioButton v-if="isInlineChildren(selected) && selected.context.parent.columns.length !== 4"
      @listener="handleTypeListener" property="width" :label="t('rf.public.width')" :height="40" :fontSize="28"
      :nodes="options1" />
    <PanelItemCheckbox v-if="checkSelectedType(['input', 'textarea'])" :label="t('rf.config.propsPanel.trim')"
      field="isShowTrim" />
    <PanelItemCheckbox
      v-if="(checkSelectedType(['input']) && selected.options.renderType === 1) || checkSelectedType(['textarea', 'number'])"
      :label="t('rf.config.propsPanel.wordLimit')" field="isShowWordLimit">
      <el-row align="middle" :gutter="8">
        <el-col :span="11">
          <el-form-item :label="t('rf.public.min')">
            <el-input-number controls-position="right"
              :max="(selected.options.max === null || selected.options.max === undefined) ? undefined : selected.options.max - 1"
              v-model="selected.options.min" />
          </el-form-item>
        </el-col>
        <el-col :span="2">~</el-col>
        <el-col :span="11">
          <el-form-item :label="t('rf.public.max')">
            <el-input-number :min="selected.options.min + 1" controls-position="right" :step="10"
              v-model="selected.options.max" />
          </el-form-item>
        </el-col>
      </el-row>
    </PanelItemCheckbox>
    <PanelItemCheckbox v-if="checkSelectedType(['date'])" :label="t('rf.config.propsPanel.daterange')"
      field="isShowWordLimit">
      <PanelItemLimit />
    </PanelItemCheckbox>
    <PanelItemCheckbox v-if="isSelectRoot && !checkSelectedType(['rate', 'switch', 'slider', 'divider'])"
      :label="t('rf.validateMsg.required')" field="required" />
    <RadioButton v-if="isSelectGrid" @listener="handleTypeListener" property="justify"
      :label="t('rf.config.gridLayout.justify.label')" :height="40" :fontSize="40" :val="selected.options.justify"
      :nodes="[
        {
          label: t('rf.config.gridLayout.justify.options[0]'),
          value: 'start',
          icon: 'horizontalLayoutP1'
        },
        {
          label: t('rf.config.gridLayout.justify.options[1]'),
          value: 'end',
          icon: 'horizontalLayoutP2'
        },
        {
          label: t('rf.config.gridLayout.justify.options[2]'),
          value: 'center',
          icon: 'horizontalLayoutP3'
        },
        {
          label: t('rf.config.gridLayout.justify.options[3]'),
          value: 'space-around',
          icon: 'horizontalLayoutP4'
        },
        {
          label: t('rf.config.gridLayout.justify.options[4]'),
          value: 'space-between',
          icon: 'horizontalLayoutP5'
        }
      ]" />
    <DataComponentTab v-if="checkSelectedType(['collapse', 'tabs'])" />
    <RadioButton v-if="isSelectTabs" @listener="handleTypeListener" property="type"
      :label="t('rf.config.tabsLayout.style.label')" :height="66" :fontSize="70" :val="selected.options.type"
      :nodes="options4" />
    <RadioButton v-if="isSelectTabs" @listener="handleTypeListener" property="tabPosition"
      :label="t('rf.config.tabsLayout.tabPosition.label')" :height="40" :fontSize="66"
      :val="selected.options.tabPosition" :nodes="options5" />
    <PanelItemCollapse v-if="checkSelectedType(['table', 'grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol'])"
      :label="t('rf.public.margin')" operationKey="style" field="isShowMargin">
      <template #content>
        <PanelItemAllSide field="margin" />
      </template>
    </PanelItemCollapse>
    <PanelItemCollapse v-if="checkSelectedType(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'td'])"
      :label="t('rf.public.padding')" operationKey="style" field="isShowPadding">
      <template #content>
        <PanelItemAllSide field="padding" />
      </template>
    </PanelItemCollapse>
    <PanelItemCollapse
      v-if="checkSelectedType(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'td', 'table'])"
      :label="t('rf.public.background')" operationKey="style" field="isShowBackground">
      <template #subSelect>
        <div :class="$style.collapseSubSelect">
          <!-- <el-dropdown @command="(command) => { bgStatus = command }">
            <span>
              {{ bgStatus ? t('rf.public.image') : t('rf.public.color') }}<el-icon
                class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="0">{{ t('rf.public.color') }}</el-dropdown-item>
                <el-dropdown-item :command="1">{{ t('rf.public.image') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </div>
      </template>
      <template #content>
        <PanelItemBackground />
      </template>
    </PanelItemCollapse>
    <PanelItemCollapse v-if="checkSelectedType(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'table'])"
      :label="t('rf.config.borderComponent.borderLine')" operationKey="style" field="isShowBorder">
      <template v-if="!checkSelectedType(['table', 'borderLine'])" #subSelect>
        <div :class="[$style.collapseSubSelect]">
          <el-dropdown @command="(command) => selected.style.border.style = command">
            <span>
              {{ selected.style.border && selected.style.border.style }}<el-icon
                class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="item" v-for="item in options2" :key="item">{{ item }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
      <template #content>
        <div :class="[$style.collapseWrap, $style.collapseWrapLeft]">
          <PanelItemBorder />
        </div>
      </template>
    </PanelItemCollapse>
    <PanelItemCheckbox v-if="isSelectCollapse" :label="t('rf.config.propsPanel.accordion')" field="accordion">
    </PanelItemCheckbox>
    <template v-if="isSelectRoot && !checkSelectedType(['divider'])">
      <PanelItemCheckbox :label="t('rf.public.disabled')" field="disabled">
      </PanelItemCheckbox>
      <PanelItemCheckbox v-if="checkSelectedType(['input']) && selected.options.renderType === 1"
        :label="t('rf.config.propsPanel.showPassword')" field="showPassword">
      </PanelItemCheckbox>
      <PanelItemCheckbox v-if="checkSelectedType(['select', 'cascader', 'uploadfile'])"
        :label="t('rf.config.propsPanel.multiple')" @change="handleMultipleChange" field="multiple">
      </PanelItemCheckbox>
      <PanelItemCheckbox v-if="checkSelectedType(['select', 'cascader', 'transfer', 'region'])"
        :label="t('rf.config.propsPanel.filterable')" field="filterable">
      </PanelItemCheckbox>
      <PanelItemCheckbox v-if="isDesktop && checkSelectedType(['number'])"
        :label="t('rf.config.propsPanel.numberControls.label')" field="controls">
        <RadioButton @listener="handleTypeListener" property="controlsPosition" :height="30" :fontSize="50"
          :nodes="options9" :val="selected.options.controlsPosition" />
      </PanelItemCheckbox>
      <PanelItemCheckbox v-if="checkSelectedType(['rate'])" :label="t('rf.config.propsPanel.allowHalf')"
        field="allowHalf">
      </PanelItemCheckbox>
      <PanelItemCheckbox v-if="checkSelectedType(['color'])" :label="t('rf.config.propsPanel.alpha')" field="showAlpha">
      </PanelItemCheckbox>
      <PanelItemCheckbox v-if="checkSelectedType(['cascader'])" :label="t('rf.config.propsPanel.anyNode')"
        field="checkStrictly" @change="checkLogicData">
      </PanelItemCheckbox>
      <PanelItemCheckbox v-if="checkSelectedType(['input', 'select', 'time', 'date', 'cascader', 'region'])"
        :label="t('rf.config.propsPanel.clearable')" field="clearable">
      </PanelItemCheckbox>
    </template>
  </div>
  <el-dialog v-model="dialogVisible" :title="t('rf.public.dataEntry')" :destroy-on-close="true"
    :close-on-click-modal="false" :close-on-press-escape="false" append-to-body width="80%" draggable>
    <DataComponentCascader v-if="checkSelectedType(['cascader'])" ref="dataRef">
    </DataComponentCascader>
    <DataComponentDefault v-else ref="dataRef" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCloseDialog()">
          {{ t('rf.public.cancel') }}
        </el-button>
        <el-button type="primary" @click="onConfirmDialog()">>
          {{ t('rf.public.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" module>
.PropsPanel {
  .collapseWrap {
    width: 100%;

    .el-row {
      margin-bottom: 0 !important;
    }

    &.collapseWrapLeft {
      .el-form-item {
        display: flex;
        align-items: baseline;

        .el-form-item__label {
          padding-right: 4px;
        }
      }
    }
  }


  .collapseSubSelect {
    cursor: pointer;
    display: flex;
    align-items: center;

    .el-tooltip__trigger {
      font-size: 12px;
      color: $primary-color;
    }
  }

  .el-rate {
    height: auto;
    flex-wrap: wrap;
  }
}
</style>