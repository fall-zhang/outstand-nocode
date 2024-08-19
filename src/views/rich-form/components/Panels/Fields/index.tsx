import { useI18n, useNamespace } from '@/hooks'
import { useTarget } from '@/hooks/use-target'
import utils, { deepClone } from '@/utils'
import { DraggableWrap } from '../../Layout/DraggableWrap'
import { inject, reactive, nextTick } from 'vue'

import Icon from '@/assets'
import ControlInsertionPlugin from '../../Layout/ControlInsertionPlugin.ts'
import { ElAside, ElScrollbar, ElMenu, ElSubMenu } from 'element-plus'
export default defineComponent({
  name: 'FeFields',
  inheritAttrs: false,
  customOptions: {},
  props: {
    type: {
      type: Number,
      default: 1
    },
    visible: {}
  },
  setup(props) {
    const ER = inject('Everright')
    const ns = useNamespace('Fields')
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
            <Icon class={[ns.e('icon')]} icon={element.icon}></Icon>
            <span>{utils.fieldLabel(t, element)}</span>
          </li>
        )
      }
    }
    const handleClone = (element) => {
      // return wrapElement(element)
      return deepClone(element)
    }
    const handleMove = (evt, originalEvent) => {
      return true
    }
    const dragOptions = {
      ControlInsertion: true,
      dataSource: 'block',
      direction: 'horizontal',
      scroll: false,
      plugins: [ControlInsertionPlugin(ER)]
    }

    return () => (<ElAside class={[ns.b()]} width={ER.props.fieldsPanelWidth}>
      <ElScrollbar>
        <ElMenu
          default-openeds={ER.props.fieldsPanelDefaultOpeneds}>
          {ER.props.fieldsConfig.map((element, index) => {
            return (
              <ElSubMenu
                index={element.id}
                v-slots={{
                  title() {
                    return t(`er.fields.${element.id}`)
                  },
                  default() {
                    return (
                      <DraggableWrap
                        class={[ns.e('dragContent')]}
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
          })}
        </ElMenu>
      </ElScrollbar>
      {/* <DeviceSwitch justifyContent={'flex-end'}></DeviceSwitch> */}
    </ElAside>)
  }
}
)