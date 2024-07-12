import {
  defineComponent,
  watch,
  useAttrs,
  defineAsyncComponent,
  unref,
  inject,
} from 'vue'
import hooks from '@/hooks'
import _ from 'lodash-es'
import LayoutGridLayout from './GridLayout'
import LayoutTabsLayout from './TabsLayout'
import LayoutCollapseLayout from './CollapseLayout'
import LayoutTableLayout from './TableLayout'
import LayoutInlineLayout from './InlineLayout'
import Selection from '@/views/rich-form/form-editor/components/Selection/selectElement.jsx'
import ControlInsertionPlugin from './ControlInsertionPlugin'
import { DraggableWrap } from './DraggableWrap.tsx'
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
    data: Object,
    parent: Object,
    tag: {
      type: String,
      default: 'div'
    },
    type: {
      type: String
    }
  },
  setup (props) {
    const ER = inject('Everright')
    const ns = hooks.useNamespace('DragGableLayout')
    const {
      state,
      isEditModel,
      isPc,
    } = hooks.useTarget()
    const handleMove = (e) => {
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
        let node = ''
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
            if (unref(isEditModel) || _.get(state.fieldsLogicState.get(element), 'visible', undefined) !== 0) {
              const typeProps = hooks.useProps(state, element, unref(isPc))
              TypeComponent = load.findComponent('FormTypes', element.type)
              const params = {
                data: element,
                parent: props.data
              }
              if (process.env.NODE_ENV === 'test') {
                params['data-field-id'] = `${element.id}`
              }
              if (unref(isPc)) {
                node = (
                // <Selection hasWidthScale hasCopy hasDel hasDrag hasMask data={element} parent={props.data}>
                  <Selection hasWidthScale hasCopy hasDel hasDrag hasMask { ...params }>
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
                node = (
                  <Selection hasWidthScale hasCopy hasDel hasDrag hasMask { ...params }>
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
        let node = ''
        if (_.isEmpty(props.data)) {
          if (!props.isRoot) {
            node = (
              <div class={ns.e('dropHere')}>
                Drop here
              </div>
            )
          }
        }
        return node
      }
    }
    return () => {
      return (
        <dragGableWrap
          list={props.data}
          handle=".handle"
          class={[ns.b(), unref(isEditModel) && ns.e('edit')]}
          tag={props.tag}
          item-key="id"
          move={handleMove}
          {...dragOptions}
          v-slots={slots}
          componentData={useAttrs()}
        >
        </dragGableWrap>
      )
    }
  }
})
