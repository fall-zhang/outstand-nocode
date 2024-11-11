<template>
  <component :is="isHTMLTag(props.tag) ? props.tag : resolveComponent(props.tag)" v-bind="$attrs" :span="props.span"
    :label="props.label" :offset="props.offset" :pull="props.pull" :class="[
      id,
      'selectElement',
      !isField && 'borderless',
      Selected,
      isWarning && 'Warning'
    ]" ref="elementRef" @click="withModifiers(handleClick, ['stop'])">
    <slot></slot>
    <!-- 排序功能 -->
    <div :class="'topLeft'">
      <Icon v-if="hasDrag" :class="['handle', 'dragIcon']" icon="Rank"></Icon>
    </div>
    <!-- 其它功能 -->
    <div :class="'bottomRight'">
      <Icon :class="['handle', 'selectParent']" @click.stop="(e) => handleAction('select-parent')" icon="top" />
      <Icon v-if="props.hasDel" :class="'copy'" @click.stop="(e) => handleAction('delete')" icon="delete">
      </Icon>
      <!-- <Icon v-if="props.hasInsertColumn" :class="'insertColIcon'"
        @click.stop="(e) => handleAction('table-insert-col')" icon="tableInsertCol"></Icon>
      <Icon v-if="props.hasInsertRow" :class="'insertRowIcon'" @click.stop="(e) =>
        handleAction('table-insert-row')" icon="tableInsertRow"></Icon> -->
      <Icon v-if="props.hasAddCol" :class="'addCol'" @click.stop="(e) => handleAction('plus')" icon="plus">
      </Icon>
      <Icon v-if="isShowCopy" :class="'copyIcon'" @click.stop="(e) => handleAction('copy')" icon="copy">
      </Icon>
      <div v-if="isShowWidthScale" ref="widthScaleElement">
        <Icon :class="'widthScale'" icon="dragWidth"></Icon>
      </div>
      <el-dropdown trigger="hover" v-if="props.hasTableCellOperator" @command="handleCommand" @visible-change="(val) => {
        isShowCell = val
        if (!val) isHover = false
      }">
        <template #dropdown v-if="isShowCell">
          <el-dropdown-menu>
            <el-dropdown-item command="insert-left">{{ t('rf.selection.insertLeft') }}</el-dropdown-item>
            <el-dropdown-item command="insert-right">{{ t('rf.selection.insertRight') }}</el-dropdown-item>
            <el-dropdown-item command="insert-top">{{ t('rf.selection.insertTop') }}</el-dropdown-item>
            <el-dropdown-item command="insert-bottom">{{ t('rf.selection.insertBottom') }}</el-dropdown-item>
            <!-- <el-dropdown-item command="merge-left" :disabled="props.data.context.isDisableMargeLeft" divided>
              {{ t('rf.selection.mergeLeft') }}</el-dropdown-item>
            <el-dropdown-item command="merge-right" :disabled="props.data.context.isDisableMargeRight">
              {{ t('rf.selection.mergeRight') }}</el-dropdown-item>
            <el-dropdown-item command="merge-row" :disabled="props.data.context.isDisableMargeRow">
              {{ t('rf.selection.mergeRow') }}</el-dropdown-item>
            <el-dropdown-item command="merge-top" :disabled="props.data.context.isDisableMargeTop" divided>
              {{ t('rf.selection.mergeTop') }}</el-dropdown-item>
            <el-dropdown-item command="merge-bottom" :disabled="props.data.context.isDisableMargeBottom">
              {{ t('rf.selection.mergeBottom') }}</el-dropdown-item>
            <el-dropdown-item command="merge-column" :disabled="props.data.context.isDisableMargeColumn">
              {{ t('rf.selection.mergeColumn') }}</el-dropdown-item>
            <el-dropdown-item command="del-row" divided :disabled="props.data.context.isDisableDelRow">
              {{ t('rf.selection.delRow') }}</el-dropdown-item>
            <el-dropdown-item command="del-column" :disabled="props.data.context.isDisableDelColumn">
              {{ t('rf.selection.delColumn') }}</el-dropdown-item>
            <el-dropdown-item command="split-column" :disabled="props.data.context.isDisableSplitColumn" divided>
              {{ t('rf.selection.splitColumn') }}</el-dropdown-item>
            <el-dropdown-item command="split-row" :disabled="props.data.context.isDisableSplitRow">
              {{ t('rf.selection.splitRow') }}</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
        <Icon class="$style.tableOperator" icon="tableOperation"></Icon>
      </el-dropdown>
    </div>
    <div v-if="props.hasMask" class="mask"></div>
  </component>
</template>

<script lang="ts" setup>

import {
  withModifiers,
  resolveComponent,
  ref,
  onMounted,
  computed,
} from 'vue'
import { isHTMLTag } from '@/utils/browser'
import { useI18n } from 'vue-i18n'
import { syncWidthByPlatform, checkIsField, isInlineChildren as isInlineChild } from '@/utils'
import Icon from '@/assets'
import { useCss } from '../hooks/use-css'
import { useFormProvider } from '../hooks/use-form-provider'
import { AllFieldType, FieldItemBase, FieldItemContainer } from '../types/rich-form-item'
const props = withDefaults(defineProps<{
  data: FieldItemBase | FieldItemContainer,
  parent: Array<any>,
  tag?: string, // div
  hasMask?: boolean, // false
  hasDrag?: boolean, // false
  hasDel?: boolean, // false
  hasCopy?: boolean, // false
  hasTableCellOperator?: boolean, // false
  hasWidthScale?: boolean, // false
  hasInsertColumn?: boolean, // false
  hasInsertRow?: boolean, // false
  hasAddCol?: boolean, // false
  span?: number, // 0
  offset?: number, // 0
  pull?: number, // 0
  label?: string // ''
}>(), {
  tag: 'div',
  hasMask: false,
  hasDrag: false,
  hasDel: false,
  hasCopy: false,
  hasTableCellOperator: false,
  hasWidthScale: false,
  hasInsertColumn: false,
  hasInsertRow: false,
  hasAddCol: false,
  span: 0,
  offset: 0,
  pull: 0,
  label: ''
})
const { t } = useI18n()

const isHover = ref(false)
const isInlineChildren = isInlineChild(props.data)

const { selected, handler, platform, widthScalable } = useFormProvider()
const isWarning = ref(false)
const handleClick = () => {
  handler.value.setSelection(props.data)
}
const elementRef = useTemplateRef<any>('elementRef')

type OptAction = 'select-parent' | 'delete' | 'table-insert-col' | 'table-insert-row' | 'copy' | 'plus'
const handleAction = (type: OptAction) => {
  const index = props.parent.indexOf(props.data)
  switch (type) {
    case 'delete': {
      handler.value.delete(props.data)
      if (props.parent.length > 0) {
        if (index === props.parent.length) {
          handler.value.setSelection(props.parent[index - 1])
        } else {
          handler.value.setSelection(props.parent[index])
        }
      } else {
        handler.value.setSelection({
          type: 'root',
          id: 'root',
          label: ''
        })
      }
      break
    }
    case 'copy': {
      handler.value.copy(props.data)
      break
    }
    case 'select-parent': {
      const parent = props.data.context?.parent
      if (!parent) {
        handler.value.setSelection({
          type: 'root',
          id: 'root',
          label: ''
        })
        return
      }
      handler.value.setSelection(parent as AllFieldType)
      break
    }
  }
}
const id = useCss(props.data, platform.value)
const isField = checkIsField(props.data)
const isShowCopy = computed(() => {
  // if (isInlineChildren) {
  //   return props.hasCopy && props.data.context.parent.columns.length < config.value.inlineMax
  // }
  return props.hasCopy
})

const Selected = computed(() => {
  return selected.value.id === props.data.id && $style.Selected
})
const isShowWidthScale = computed(() => props.hasWidthScale)
const widthScaleElement = ref()
const isScale = ref(false)
onMounted(() => {
  if (!elementRef.value) return false
  const hoverEl: any = elementRef.value.$el || elementRef.value
  const widthScaleEl = widthScaleElement.value
  hoverEl.addEventListener('mouseover', (e: MouseEvent) => {
    if (!widthScalable.value) {
      isHover.value = true
    }
    e.stopPropagation()
  })
  hoverEl.addEventListener('mouseout', (e: MouseEvent) => {
    if (isShowCell.value) return false
    isHover.value = false
    e.stopPropagation()
  })
  if (isShowWidthScale.value) {
    widthScaleEl.addEventListener('mousedown', (e: MouseEvent) => {
      const columnWidth = hoverEl.offsetParent.offsetWidth / 24
      isScale.value = true
      widthScalable.value = true
      const oldX = e.clientX
      const oldWidth = hoverEl.offsetWidth
      document.onselectstart = () => false
      document.ondragstart = () => false
      document.onmouseup = function () {
        document.onmousemove = null
        document.onselectstart = null
        document.ondragstart = null
        isScale.value = false
        widthScalable.value = false
      }
      document.onmousemove = (e) => {
        if (!isInlineChildren) {
          let offset = Math.ceil((oldWidth + Math.round((e.clientX - oldX) / columnWidth) * columnWidth) / columnWidth)
          if (offset >= 24) {
            offset = 24
          }
          if (offset <= 6) {
            offset = 6
          }
          // eslint-disable-next-line vue/no-mutating-props
          // props.data.options.span = offset
        } else {
          const curNewWidth = oldWidth + e.clientX - oldX
          let curWidth = Math.round(curNewWidth / hoverEl.parentNode.offsetWidth * 100)
          if (curWidth <= 25) {
            curWidth = 25
          }
          syncWidthByPlatform(props.data, platform.value, false, curWidth)
        }
      }
    })
  }
})
const handleCommand = (command: string) => {
  const [fn, param] = command.split('-')
  // props.data.context[fn](param)
}
const isShowCell = ref(false)
defineOptions({
  name: 'SelectElement',
  inheritAttrs: false,
  customOptions: {},
})
</script>

<style lang="scss" scoped>
.selectElement {
  padding: 16px;
  position: relative;
  outline-offset: -1px;
  box-sizing: border-box;

  .mask {
    display: block;
    position: absolute;
    cursor: pointer;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 1;

    &:hover {
      border: 1px solid #9a9a9a;
    }
  }

  .borderless {
    padding: 0;
  }

  &.Selected {
    outline: 1px solid $primary-color;

    &>.topLeft,
    &>.topRight,
    &>.bottomRight {
      display: flex;
    }
  }

  &.Warning {
    outline: 1px solid #FD3E3E;
  }

  .dragIcon {
    padding: 0;
    font-size: 20px;
  }

  .copyIcon,
  .copy,
  .widthScale,
  .tableOperator,
  .insertColIcon,
  .charuhang,
  .insertRowIcon,
  .selectParent,
  .dragIcon,
  .addCol {
    border-radius: 4px;
    background: $primary-color;
    width: 24px;
    height: 24px;
    color: #fff;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 4px;
  }

  .widthScale {
    cursor: col-resize;
  }

  .topLeft,
  .topRight,
  .bottomRight {
    position: absolute;
    bottom: 0;
    height: 30px;
    display: none;
    align-items: center;
    z-index: 2;
  }

  .topLeft {
    left: 1px;
    top: 1px;
    height: 24px;
  }

  .topRight {
    right: 0;
    top: 0;
  }

  .bottomRight {
    right: 0;
    bottom: -15px;
  }
}
</style>
