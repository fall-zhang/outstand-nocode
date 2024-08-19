import { defineComponent, } from 'vue'
import Selection from '../Selection/selectElement'
import LayoutDragGable from './DragGable'
import { useNamespace } from '@/hooks'
import { ElCollapse, ElCollapseItem } from 'element-plus'
export default defineComponent({
  name: 'CollapseLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    parent: {
      require: true,
      type: Array,
      default: () => []
    }
  },
  setup (props, { attrs }) {
    const ns = useNamespace('CollapseLayout')
    if (!props.data.options.defaultValue.length) {
      // eslint-disable-next-line vue/no-mutating-props
      props.data.options.defaultValue.push(props.data.columns[0].id)
    }
    return () => (
      <Selection {...attrs} hasCopy hasDel hasDrag hasWidthScale data={props.data} parent={props.parent}>
        <ElCollapse model-value={props.data.options.defaultValue} accordion={props.data.options.accordion}>
          {
            props.data.columns.map((element) => {
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
})
