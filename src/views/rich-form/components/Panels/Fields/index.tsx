// 左侧功能面板
import { useI18n } from 'vue-i18n'
import { useTarget } from '@/hooks/use-target'
import utils, { deepClone } from '@/utils'
import { DraggableWrap } from '../../Layout/DraggableWrap'
import { inject, reactive, nextTick } from 'vue'

import Icon from '@/assets'
import ControlInsertionPlugin from '../../Layout/ControlInsertionPlugin'
import { ElAside, ElScrollbar, ElMenu, ElSubMenu } from 'element-plus'
import $style from './index.module.scss'
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
    const ER = inject('Everright')
    const {
      t
    } = useI18n()
    const {
      state,
      setSelection
    } = useTarget()
    const addStore = (element) => {
      const newElement = reactive(ER.wrapElement(deepClone(element)))
      state.store.push(newElement)
      utils.addContext(newElement, state.store)
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

    return () => (<ElAside class={$style.Fields} width={ER.props.fieldsPanelWidth}>
      <ElMenu
        default-openeds={ER.props.fieldsPanelDefaultOpened}>
        {ER.props.fieldsConfig.map((element, index) => (
          <ElSubMenu
            index={element.id}
            v-slots={{
              title() {
                return t(`er.fields.${element.id}`)
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