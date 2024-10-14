// 左侧功能面板
import { useI18n } from 'vue-i18n'
import { useTarget } from '@Form/hooks/use-target'
import utils, { addContext, deepClone } from '@/utils'
import { DraggableWrap } from '@Form/components/FormContainer/DraggableWrap'
import { inject, reactive, nextTick } from 'vue'

import Icon from '@/assets'
import ControlInsertionPlugin from '@Form/components/FormContainer/ControlInsertionPlugin'
import { ElAside, ElScrollbar, ElMenu, ElSubMenu } from 'element-plus'
import $style from './index.module.scss'
import { RichFormProvider } from '@Form/types/rich-form'
export default defineComponent({
  name: 'FeFields',
  inheritAttrs: false,
  customOptions: {},
  props: {
    type: {
      type: Number,
      default: 1
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const ER = inject<RichFormProvider>('rich-form')
    const {
      t
    } = useI18n()
    const {
      state,
      setSelection
    } = useTarget()
    const addStore = (element) => {
      const newElement = reactive(ER?.handler.wrapElement(deepClone(element), {}))
      state.store.push(newElement)
      addContext(newElement, state.store)
      nextTick(() => {
        setSelection(newElement)
        setTimeout(() => {
          ER.canvasScrollRef.value.setScrollTop(ER.canvasScrollRef.value.wrapRef.scrollHeight)
        }, 100)
      })
    }
    const slots = {
      item: ({ element }) => {
        return (
          <li onClick={() => addStore(element)}>
            <Icon class={$style.icon} icon={element.icon}></Icon>
            <span>{utils.fieldLabel(t, element)}</span>
          </li>
        )
      }
    }
    const handleClone = (element) => {
      return deepClone(element)
    }
    const handleMove = () => {
      return true
    }
    const dragOptions = {
      ControlInsertion: true,
      dataSource: 'block',
      direction: 'horizontal',
      scroll: false,
      plugins: [ControlInsertionPlugin(ER)]
    }

    return () => (<ElAside class={$style.Fields} width={ER.config.fieldsPanelWidth}>
      <ElMenu
        default-openeds={ER.config.fieldsPanelDefaultOpened}>
        {ER.fieldsList.map((element, index) => (
          <ElSubMenu
            index={element.id}
            v-slots={{
              title() {
                return t(`rf.fields.${element.id}`)
              },
              default() {
                return (
                  <DraggableWrap
                    class={$style.dragContent}
                    list={element.list}
                    clone={handleClone}
                    tag="ul"
                    sort={false}
                    move={handleMove}
                    {...dragOptions}
                    group={
                      { name: 'er-Canvas', pull: 'clone', put: false }
                    }
                    item-key="null"
                    v-slots={slots}
                  >
                  </DraggableWrap>
                )
              }
            }}
          >
          </ElSubMenu>
        )
        )}
      </ElMenu>
    </ElAside>)
  }
}
)