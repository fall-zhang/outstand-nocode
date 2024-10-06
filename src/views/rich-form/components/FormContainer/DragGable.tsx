import {
  defineComponent,
  watch,
  useAttrs,
  defineAsyncComponent,
  unref,
  inject,
} from 'vue'
import { useProps } from '@/hooks'
import { useTarget } from '@Form/hooks/use-target'
import _ from 'lodash-es'
import LayoutGridLayout from '../FormContainer/GridLayout'
import LayoutTabsLayout from './TabsLayout'
import LayoutCollapseLayout from './CollapseLayout'
import LayoutTableLayout from './TableLayout'
import LayoutInlineLayout from './InlineLayout'
import Selection from '../Selection/selectElement'
import ControlInsertionPlugin from './ControlInsertionPlugin'
import { DraggableWrap } from './DraggableWrap'
import $style from './Draggable.module.scss'
import { isEmpty, get } from '@/utils/utils'

const dragGableWrap = DraggableWrap
export {
  dragGableWrap
}
export default defineComponent({
  name: 'DragGableLayout',
  props: {
    isRoot: {
      type: Boolean,
      default: false
    },
    data: {
      require: true,
      type: Object,
      default: () => ({})
    },
    parent: {
      type: Object,
      default: () => ({})
    },
    tag: {
      type: String,
      default: 'div'
    },
    type: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const ER = inject('rich-form')
    const {
      state,
      isEditModel,
      isPC,
    } = useTarget()
    const handleMove = () => {
      return true
    }
    const dragOptions = {
      swapThreshold: 1,
      group: {
        name: 'er-Canvas'
      },
      parent: props.parent,
      plugins: [ControlInsertionPlugin(ER)],
      ControlInsertion: true
    }
    const loadComponent = () => {
      let componentMap = {}
      watch(() => state.platform, () => {
        componentMap = {}
      })
      return {
        findComponent (type, element) {
          let info = componentMap[type + element]
          if (!info) {
            info = componentMap[type + element] = defineAsyncComponent(() => import(`../${type}/${_.startCase(element)}/${state.platform}.vue`))
          }
          return info
        }
      }
    }
    const load = loadComponent()
    const slots = {
      item: ({ element }) => {
        let node:JSX.Element|string = <></>
        switch (element.type) {
          case 'grid':
            node = (<LayoutGridLayout key={element.id} data={element} parent={props.data}></LayoutGridLayout>)
            break
          case 'table':
            node = (<LayoutTableLayout key={element.id} data={element} parent={props.data}></LayoutTableLayout>)
            break
          case 'tabs':
            node = (<LayoutTabsLayout key={element.id} data={element} parent={props.data}></LayoutTabsLayout>)
            break
          case 'collapse':
            node = (<LayoutCollapseLayout key={element.id} data={element} parent={props.data}></LayoutCollapseLayout>)
            break
          case 'inline':
            node = (<LayoutInlineLayout key={element.id} data={element} parent={props.data}></LayoutInlineLayout>)
            break
          default:{
            let TypeComponent = ''
            if (unref(isEditModel) || get(state.fieldsLogicState.get(element), 'visible', undefined) !== 0) {
              const typeProps = useProps(state, element, unref(isPC))
              TypeComponent = load.findComponent('FormTypes', element.type)
              const params = {
                data: element,
                parent: props.data
              }
              if (unref(isPC)) {
                node = (<Selection hasWidthScale hasCopy hasDel hasDrag hasMask { ...params }>
                  {
                    element.type !== 'divider'
                      ? (<el-form-item
                        {...typeProps.value}
                      >
                        <TypeComponent data={element} params={typeProps.value}></TypeComponent>
                      </el-form-item>)
                      : <TypeComponent data={element} params={typeProps.value}></TypeComponent>
                  }
                </Selection>
                )
              } else {
                node = (<Selection hasWidthScale hasCopy hasDel hasDrag hasMask { ...params }>
                  <TypeComponent data={element} params={typeProps.value}></TypeComponent>
                </Selection>
                )
              }
            }
            break
          }
        }
        return node
      },
      footer () {
        let node:JSX.Element|string = ''
        if (isEmpty(props.data)) {
          if (!props.isRoot) {
            node = (
              <div class={$style.dropHere}>
                放置在此处
              </div>
            )
          }
        }
        return node
      }
    }
    return () => {
      return (
        <DraggableWrap
          list={props.data}
          handle=".handle"
          class={[$style.DragGableLayout, unref(isEditModel) && $style.edit]}
          tag={props.tag}
          item-key="id"
          move={handleMove}
          {...dragOptions}
          v-slots={slots}
          componentData={useAttrs()}
        >
        </DraggableWrap>
      )
    }
  }
})
