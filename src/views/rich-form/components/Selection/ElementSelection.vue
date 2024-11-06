<template>
  <component :is="isHTMLTag(props.tag) ? props.tag : resolveComponent(props.tag)" v-bind="$attrs" :span="props.span"
    :label="props.label" :offset="props.offset" :pull="props.pull" :class="[
      id,
      $style.selectElement,
      !isField && $style.borderless,
      Selected,
      isWarning && $style.Warning
    ]" ref="elementRef" @click="withModifiers(handleClick, ['stop'])">
    <slot></slot>
    <!-- 排序功能 -->
    <div :class="$style.topLeft">
      <Icon v-if="hasDrag" :class="['handle', $style.dragIcon]" icon="Rank"></Icon>
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
  computed,
} from 'vue'
import { isHTMLTag } from '@/utils/browser'
import { useI18n } from 'vue-i18n'
import { syncWidthByPlatform, checkIsField, checkIslineChildren } from '@/utils'
import Icon from '@/assets'
import $style from './SelectElement.module.scss'
import { ElDropdownMenu, ElDropdownItem, ElDropdown } from 'element-plus'
import { useCss } from '../../hooks/use-css'
import { useFormProvider } from '../../hooks/use-form-provider'
import { FieldItemBase, FieldItemContainer } from '../../types/rich-form-item'
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
const isInlineChildren = checkIslineChildren(props.data)

const { selected, handler, config, platform, widthScaleLock } = useFormProvider()
const isWarning = ref(false)
const handleClick = () => {
  handler.value.setSelection(props.data)
}
const elementRef = useTemplateRef<any>('elementRef')

type OptAction = 'top' | 'delete' | 'table-insert-col' | 'table-insert-row' | 'copy' | 'plus'
const handleAction = (type: OptAction) => {
  const index = type !== 'top' && props.parent.indexOf(props.data)
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
      if (handler.value.copy(props.data) === false) return false
      props.data.context.copy()
      const copyData = props.parent[index + 1]
      handler.value.setSelection(copyData)
      // deepTraversal(copyData, (node: any) => {
      //   handler.value.addFieldData(node, true)
      //   if (checkIsField(node)) {
      //     handler.value.addField(node)
      //   }
      // })
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
const id = useCss(props.data, platform.value)
const isField = checkIsField(props.data)
const isShowCopy = computed(() => isInlineChildren ? props.hasCopy && props.data.context.parent.columns.length < config.value.inlineMax : props.hasCopy)

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
    if (!widthScaleLock.value) {
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
      widthScaleLock.value = true
      const oldX = e.clientX
      const oldWidth = hoverEl.offsetWidth
      document.onselectstart = () => false
      document.ondragstart = () => false
      document.onmouseup = function () {
        document.onmousemove = null
        document.onselectstart = null
        document.ondragstart = null
        isScale.value = false
        widthScaleLock.value = false
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
