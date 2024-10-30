import {
  withModifiers,
  resolveComponent,
  ref,
  onMounted,
  useAttrs,
  onBeforeUnmount,
  inject,
  computed
} from 'vue'
import { isHTMLTag } from '@/utils/browser'
import { useI18n } from 'vue-i18n'
import { useCss } from '@Form/hooks/use-css'
import { useTarget } from '@Form/hooks/use-target'
import { syncWidthByPlatform, checkIsField, checkIslineChildren, deepTraversal } from '@/utils'
import _ from 'lodash-es'
import Icon from '@/assets'
import $style from './SelectElement.module.scss'
import { ElDropdownMenu, ElDropdownItem, ElDropdown } from 'element-plus'
import { RichFormProvider } from '../../types/rich-form'
export default defineComponent({
  name: 'SelectElement',
  inheritAttrs: false,
  customOptions: {},
  props: {
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
  },
  setup(props, { slots }) {
    const ER = inject<RichFormProvider>('rich-form')!
    const { t } = useI18n()
    const isHover = ref(false)
    const isInlineChildren = checkIslineChildren(props.data)
    const {
      target,
      setSelection,
      state,
    } = useTarget()
    const id = useCss(props.data, state.platform)
    const isWarning = ref(false)
    const isField = checkIsField(props.data)
    const handleClick = () => {
      setSelection(props.data)
    }
    if (props.data.type && isField) {
      state.validateStates.push({
        data: props.data,
        isWarning
      })
    }
    onBeforeUnmount(() => {
      const index = _.findIndex(state.validateStates, { data: { id: props.data.id } })
      if (index !== -1) {
        state.validateStates.splice(index, 1)
      }
    })
    const handleCommand = (command:any) => {
      console.log('🚀 ~ handleCommand ~ command:', command)
      const [fn, param] = command.split(' ')
      props.data.context[fn](param)
    }
    const isShowCell = ref(false)
    const renderTableCellOperator = () => {
      const slots = {
        dropdown: () => (isShowCell.value &&
            <ElDropdownMenu>
              <ElDropdownItem command="insert left">{t('rf.selection.insertLeft')}</ElDropdownItem>
              <ElDropdownItem command="insert right">{t('rf.selection.insertRight')}</ElDropdownItem>
              <ElDropdownItem command="insert top">{t('rf.selection.insertTop')}</ElDropdownItem>
              <ElDropdownItem command="insert bottom">{t('rf.selection.insertBottom')}</ElDropdownItem>
              <ElDropdownItem command="merge left" disabled={props.data.context.isDisableMargeLeft} divided>{t('rf.selection.mergeLeft')}</ElDropdownItem>
              <ElDropdownItem command="merge right" disabled={props.data.context.isDisableMargeRight}>{t('rf.selection.mergeRight')}</ElDropdownItem>
              <ElDropdownItem command="merge row" disabled={props.data.context.isDisableMargeRow}>{t('rf.selection.mergeRow')}</ElDropdownItem>
              <ElDropdownItem command="merge top" disabled={props.data.context.isDisableMargeTop} divided>{t('rf.selection.mergeTop')}</ElDropdownItem>
              <ElDropdownItem command="merge bottom" disabled={props.data.context.isDisableMargeBottom}>{t('rf.selection.mergeBottom')}</ElDropdownItem>
              <ElDropdownItem command="merge column" disabled={props.data.context.isDisableMargeColumn}>{t('rf.selection.mergeColumn')}</ElDropdownItem>
              <ElDropdownItem command="del row" divided disabled={props.data.context.isDisableDelRow}>{t('rf.selection.delRow')}</ElDropdownItem>
              <ElDropdownItem command="del column" disabled={props.data.context.isDisableDelColumn}>{t('rf.selection.delColumn')}</ElDropdownItem>
              <ElDropdownItem command="split column" disabled={props.data.context.isDisableSplitColumn} divided>{t('rf.selection.splitColumn')}</ElDropdownItem>
              <ElDropdownItem command="split row" disabled={props.data.context.isDisableSplitRow}>{t('rf.selection.splitRow')}</ElDropdownItem>
            </ElDropdownMenu>
        )
      }
      return (
        <ElDropdown
          trigger="hover"
          onCommand={handleCommand}
          onVisible-change={(val) => {
            isShowCell.value = val
            if (!val) {
              isHover.value = false
            }
          }}
          v-slots={slots}>
          <Icon class={$style.tableOperator} icon="tableOperation"></Icon>
        </ElDropdown>
      )
    }
    type OptAction = 'top'|'delete' | 'table-insert-col' |'table-insert-row'|'copy'|'plus'
    const handleAction = (type:OptAction) => {
      const index = type !== 'top' && props.parent.indexOf(props.data)
      switch (type) {
        case 'delete':
          if (ER.handler.delete(props.data) === false) return false
          props.data.context.delete()
          deepTraversal(props.data, (node:any) => {
            if (checkIsField(node)) {
              ER.handler.delete(node)
            }
          })
          if (/^(radio|checkbox|select)$/.test(props.data.type)) {
            delete state.data[props.data.options.dataKey]
          }
          if (props.parent.length > 0) {
            if (index === props.parent.length) {
              setSelection(props.parent[index - 1])
            } else {
              setSelection(props.parent[index])
            }
          } else {
            setSelection('root')
          }
          break
        case 'copy':{
          if (ER.handler.copy(props.data) === false) return false
          props.data.context.copy()
          const copyData = props.parent[index + 1]
          setSelection(copyData)
          deepTraversal(copyData, (node:any) => {
            ER.handler.addFieldData(node, true)
            if (checkIsField(node)) {
              ER.handler.addField(node)
            }
          })
          break
        }
        case 'table-insert-row':
          props.data.context.columns[0].at(-1).context.insert('bottom')
          break
        case 'table-insert-col':
          props.data.context.columns.at(-1)[0].context.insert('right')
          break
        case 'top':{
          let parent = props.data.context.parent
          if (/^(inline|tr)$/.test(parent.type)) {
            parent = parent.context.parent
          }
          setSelection(Array.isArray(parent) ? 'root' : parent)
          break
        }
        case 'plus':
          props.data.context.appendCol()
          break
      }
    }
    const elementRef = ref()
    const widthScaleElement = ref()
    const isScale = ref(false)
    const isShowWidthScale = computed(() => props.hasWidthScale)
    onMounted(() => {
      const hoverEl = elementRef.value.$el || elementRef.value
      const widthScaleEl = widthScaleElement.value
      hoverEl.addEventListener('mouseover', (e) => {
        if (!state.widthScaleLock) {
          isHover.value = true
        }
        e.stopPropagation()
      })
      hoverEl.addEventListener('mouseout', (e) => {
        if (isShowCell.value) return false
        isHover.value = false
        e.stopPropagation()
      })
      if (isShowWidthScale.value) {
        widthScaleEl.addEventListener('mousedown', (e) => {
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
              // const isFieldWidth = _.isObject(props.data.style.width)
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
    const TagComponent = isHTMLTag(props.tag) ? props.tag : resolveComponent(props.tag)
    const Selected = computed(() => {
      return target.value.id === props.data.id && $style.Selected
    })

    const isShowCopy = computed(() => isInlineChildren ? props.hasCopy && props.data.context.parent.columns.length < ER.config.inlineMax : props.hasCopy)
    return () => (<TagComponent
      {...useAttrs()}
      span={props.span}
      label={props.label}
      offset={props.offset}
      pull={props.pull}
      class={[
        id.value,
        $style.selectElement,
        !isField && $style.borderless,
        Selected.value,
        isWarning.value && $style.Warning
      ]}
      ref={elementRef} onClick={withModifiers(handleClick, ['stop'])}
    >
      {slots.default()}
      {/* 排序功能 */}
      <div class={$style.topLeft}>
        {props.hasDrag && (<Icon class={['handle', $style.dragIcon]} icon="Rank"></Icon>)}
      </div>
      {/* 其它功能 */}
      <div class={$style.bottomRight}>
        <Icon class={['handle', $style.selectParent]} onClick={withModifiers((e) => handleAction('top'), ['stop'])} icon="top"/>
        {props.hasDel && (
          <Icon class={$style.copy} onClick={withModifiers((e) => handleAction('delete'), ['stop'])} icon="delete"></Icon>
        )}
        {
          props.hasInsertColumn && (<Icon class={$style.insertColIcon} onClick={withModifiers((e) => handleAction('table-insert-col'), ['stop'])} icon="tableInsertCol"></Icon>)
        }
        {
          props.hasInsertRow && (<Icon class={$style.insertRowIcon} onClick={withModifiers((e) => handleAction('table-insert-row'), ['stop'])} icon="tableInsertRow"></Icon>)
        }
        {
          props.hasAddCol && (<Icon class={$style.addCol} onClick={withModifiers((e) => handleAction('plus'), ['stop'])} icon="plus"></Icon>)
        }
        {
          isShowCopy.value && (<Icon class={$style.copyIcon} onClick={withModifiers((e) => handleAction('copy'), ['stop'])} icon="copy"></Icon>)
        }
        {
          isShowWidthScale.value && (<div ref={widthScaleElement}><Icon class={$style.widthScale} icon="dragWidth"></Icon></div>)
        }
        {props.hasTableCellOperator && renderTableCellOperator()}
      </div>
      {
        props.hasMask && <div class={$style.mask}></div>
      }
    </TagComponent>
    )
  }
}
)