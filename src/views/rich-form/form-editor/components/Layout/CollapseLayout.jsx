import { defineComponent,  useAttrs,  } from 'vue'
import Selection from '@/views/rich-form/form-editor/components/Selection/selectElement.jsx'
import LayoutDragGable from './DragGable.jsx'
import hooks from '@/hooks'
import { ElCollapse,ElCollapseItem } from 'element-plus'
export default defineComponent({
  name: 'CollapseLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ns = hooks.useNamespace('CollapseLayout')
    if (!props.data.options.defaultValue.length) {
      // eslint-disable-next-line vue/no-mutating-props
      props.data.options.defaultValue.push(props.data.columns[0].id)
    }
    return () => {
      return (
        <Selection {...useAttrs()} hasCopy hasDel hasDrag hasWidthScale data={props.data} parent={props.parent}>
          <ElCollapse vModel={props.data.options.defaultValue} accordion={props.data.options.accordion}>
            {
              props.data.columns.map((element, index0) => {
                return (
                  <ElCollapseItem title={element.label} name={element.id}>
                    <Selection
                      class={[ns.e('area')]}
                      data={element} parent={props.data}
                    >
                      <LayoutDragGable
                        data={element.list}
                        data-layout-type={'collapse-col'}
                        parent={element}/>
                    </Selection>
                  </ElCollapseItem>
                )
              })
            }
          </ElCollapse>
        </Selection>
      )
    }
  }
})
