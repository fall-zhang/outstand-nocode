<template>
  <component :is="isHTMLTag(props.tag) ? props.tag : resolveComponent(props.tag)" v-bind="$attrs" :span="props.span"
    :label="props.label" :offset="props.offset" :pull="props.pull" :class="[
      id,
      $style.selectElement,
      !isField && $style.borderless,
      Selected,
      isWarning && $style.Warning
    ]" ref="elementRef" @click="withModifiers(handleClick, ['stop'])">
    <slog></slog>
    <!-- 排序功能 -->
    <div :class="$style.topLeft">
      <Icon v-if="props.hasDrag" :class="['handle', $style.dragIcon]" icon="Rank"></Icon>
    </div>
    <!-- 其它功能 -->
    <div :class="$style.bottomRight">
      <Icon :class="['handle', $style.selectParent]" @click.stop="(e) => handleAction('top')" icon="top" />
      <Icon v-if="props.hasDel" :class="$style.copy" @click.stop="(e) => handleAction('delete')" icon="delete">
      </Icon>
      <Icon v-if="props.hasInsertColumn" :class="$style.insertColIcon"
        @click.stop="(e) => handleAction('table-insert-col')" icon="tableInsertCol"></Icon>
      <Icon v-if="props.hasInsertRow" :class="$style.insertRowIcon" @click.stop="(e) =>
        handleAction('table-insert-row')" icon="tableInsertRow"></Icon>
      <Icon v-if="props.hasAddCol" :class="$style.addCol" @click.stop="(e) => handleAction('plus')" icon="plus">
      </Icon>
      <Icon v-if="isShowCopy" :class="$style.copyIcon" @click.stop="(e) => handleAction('copy')" icon="copy">
      </Icon>
      <div v-if="isShowWidthScale" ref="widthScaleElement">
        <Icon :class="$style.widthScale" icon="dragWidth"></Icon>
      </div>
      <ElDropdown trigger="hover" v-if="props.hasTableCellOperator" @command="handleCommand" @visible-change="(val) => {
        isShowCell = val
        if (!val) {
          isHover = false
        }
      }">
        <template #dropdown v-if="isShowCell">
          <ElDropdownMenu>
            <ElDropdownItem command="insert-left">{{ t('rf.selection.insertLeft') }}</ElDropdownItem>
            <ElDropdownItem command="insert-right">{{ t('rf.selection.insertRight') }}</ElDropdownItem>
            <ElDropdownItem command="insert-top">{{ t('rf.selection.insertTop') }}</ElDropdownItem>
            <ElDropdownItem command="insert-bottom">{{ t('rf.selection.insertBottom') }}</ElDropdownItem>
            <ElDropdownItem command="merge-left" :disabled="props.data.context.isDisableMargeLeft" divided>
              {{ t('rf.selection.mergeLeft') }}</ElDropdownItem>
            <ElDropdownItem command="merge-right" :disabled="props.data.context.isDisableMargeRight">
              {{ t('rf.selection.mergeRight') }}</ElDropdownItem>
            <ElDropdownItem command="merge-row" :disabled="props.data.context.isDisableMargeRow">
              {{ t('rf.selection.mergeRow') }}</ElDropdownItem>
            <ElDropdownItem command="merge-top" :disabled="props.data.context.isDisableMargeTop" divided>
              {{ t('rf.selection.mergeTop') }}</ElDropdownItem>
            <ElDropdownItem command="merge-bottom" :disabled="props.data.context.isDisableMargeBottom">
              {{ t('rf.selection.mergeBottom') }}</ElDropdownItem>
            <ElDropdownItem command="merge-column" :disabled="props.data.context.isDisableMargeColumn">
              {{ t('rf.selection.mergeColumn') }}</ElDropdownItem>
            <ElDropdownItem command="del-row" divided :disabled="props.data.context.isDisableDelRow">
              {{ t('rf.selection.delRow') }}</ElDropdownItem>
            <ElDropdownItem command="del-column" :disabled="props.data.context.isDisableDelColumn">
              {{ t('rf.selection.delColumn') }}</ElDropdownItem>
            <ElDropdownItem command="split-column" :disabled="props.data.context.isDisableSplitColumn" divided>
              {{ t('rf.selection.splitColumn') }}</ElDropdownItem>
            <ElDropdownItem command="split-row" :disabled="props.data.context.isDisableSplitRow">
              {{ t('rf.selection.splitRow') }}</ElDropdownItem>
          </ElDropdownMenu>
        </template>
        <Icon class="$style.tableOperator" icon="tableOperation"></Icon>
      </ElDropdown>
    </div>
    <div v-if="props.hasMask" :class="$style.mask"></div>
  </component>
</template>

<script lang="ts" setup>

import {
  withModifiers,
  resolveComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  inject,
  computed,
} from 'vue'
import { isHTMLTag } from '@/utils/browser'
import { useI18n } from 'vue-i18n'
import { useTarget } from '@Form/hooks/use-target'
import { syncWidthByPlatform, checkIsField, checkIslineChildren, deepTraversal } from '@/utils'
import Icon from '@/assets'
import $style from './SelectElement.module.scss'
import { ElDropdownMenu, ElDropdownItem, ElDropdown } from 'element-plus'
import { RichFormProvider } from '../../types/rich-form'
import { useCss } from '../../hooks/use-css'
import { useFormProvider } from '../../hooks/use-form-provider'
const props = defineProps({
  data: {
    type: Object,
    require: true,
    default: () => ({})
  },
  parent: {
    type: Object,
    require: true,
    default: () => ({})
  },
  tag: {
    type: String,
    default: 'div'
  },
  hasMask: {
    type: Boolean,
    default: false
  },
  hasDrag: {
    type: Boolean,
    default: false
  },
  hasDel: {
    type: Boolean,
    default: false
  },
  hasCopy: {
    type: Boolean,
    default: false
  },
  hasTableCellOperator: {
    type: Boolean,
    default: false
  },
  hasWidthScale: {
    type: Boolean,
    default: false
  },
  hasInsertColumn: {
    type: Boolean,
    default: false
  },
  hasInsertRow: {
    type: Boolean,
    default: false
  },
  hasAddCol: {
    type: Boolean,
    default: false
  },
  span: {
    type: Number,
    default: 0
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: ''
  }
})
const { t } = useI18n()
const ER = inject<RichFormProvider>('rich-form')!
const isHover = ref(false)
const isInlineChildren = checkIslineChildren(props.data)

const { selected, handler } = useFormProvider()
const { state } = useTarget()
const isWarning = ref(false)
const handleClick = () => {
  handler.value.setSelection(props.data)
}
const elementRef = useTemplateRef<any>('elementRef')

type OptAction = 'top' | 'delete' | 'table-insert-col' | 'table-insert-row' | 'copy' | 'plus'
const handleAction = (type: OptAction) => {
  const index = type !== 'top' && props.parent.indexOf(props.data)
  switch (type) {
    case 'delete':
      if (handler.value.delete(props.data) === false) return false
      props.data.context.delete()
      deepTraversal(props.data, (node: any) => {
        if (checkIsField(node)) {
          handler.value.delete(node)
        }
      })
      if (/^(radio|checkbox|select)$/.test(props.data.type)) {
        delete state.data[props.data.options.dataKey]
      }
      if (props.parent.length > 0) {
        if (index === props.parent.length) {
          handler.value.setSelection(props.parent[index - 1])
        } else {
          handler.value.setSelection(props.parent[index])
        }
      } else {
        handler.value.setSelection('root')
      }
      break
    case 'copy': {
      if (handler.value.copy(props.data) === false) return false
      props.data.context.copy()
      const copyData = props.parent[index + 1]
      handler.value.setSelection(copyData)
      deepTraversal(copyData, (node: any) => {
        handler.value.addFieldData(node, true)
        if (checkIsField(node)) {
          handler.value.addField(node)
        }
      })
      break
    }
    case 'table-insert-row':
      props.data.context.columns[0].at(-1).context.insert('bottom')
      break
    case 'table-insert-col':
      props.data.context.columns[0].at(-1).context.insert('right')
      break
    case 'top': {
      let parent = props.data.context.parent
      if (/^(inline|tr)$/.test(parent.type)) {
        parent = parent.context.parent
      }
      handler.value.setSelection(Array.isArray(parent) ? 'root' : parent)
      break
    }
    case 'plus':
      props.data.context.appendCol()
      break
  }
}
const id = useCss(props.data, state.platform)
const isField = checkIsField(props.data)
if (props.data.type && isField) {
  state.validateStates.push({
    data: props.data,
    isWarning
  })
}
const isShowCopy = computed(() => isInlineChildren ? props.hasCopy && props.data.context.parent.columns.length < ER.config.inlineMax : props.hasCopy)

onBeforeUnmount(() => {
  const index = state.validateStates.findIndex((item: any) => item.data.id === props.data.id)
  if (index !== -1) {
    state.validateStates.splice(index, 1)
  }
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
    if (!state.widthScaleLock) {
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
      state.widthScaleLock = isScale.value = true
      const oldX = e.clientX
      const oldWidth = hoverEl.offsetWidth
      document.ondragstart = document.onselectstart = () => false
      document.onmouseup = function () {
        document.ondragstart = document.onselectstart = document.onmousemove = null
        state.widthScaleLock = isScale.value = false
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
          props.data.options.span = offset
        } else {
          const curNewWidth = oldWidth + e.clientX - oldX
          let curWidth = Math.round(curNewWidth / hoverEl.parentNode.offsetWidth * 100)
          if (curWidth <= 25) {
            curWidth = 25
          }
          syncWidthByPlatform(props.data, state.platform, false, curWidth)
        }
      }
    })
  }
})
const handleCommand = (command: any) => {
  const [fn, param] = command.split('-')
  props.data.context[fn](param)
}
const isShowCell = ref(false)
defineOptions({
  name: 'SelectElement',
  inheritAttrs: false,
  customOptions: {},
})
</script>

<style lang="scss" scoped></style>
