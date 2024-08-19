import { defineComponent, useAttrs } from 'vue'
import { useNamespace } from '@/hooks'
import Selection from '@/views/rich-form/components/Selection/selectElement'
import LayoutDragGable from './DragGable'
export default defineComponent({
  name: 'GridLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ns = useNamespace('GridLayout')
    return () => (
      <Selection {...useAttrs()} hasWidthScale hasCopy hasAddCol hasDel hasDrag data={props.data} parent={props.parent}>
        <ElRow data-layout-type={'grid'} {...{
          gutter: props.data.options.gutter,
          justify: props.data.options.justify,
          align: props.data.options.align
        }} class={[ns.b()]}>
          {
            props.data.columns.map((element, index) => {
              return (
                <Selection
                  key={element.id}
                  hasCopy
                  hasDel={props.data.columns.length > 1}
                  hasWidthScale
                  // hasAddContainer
                  data-layout-type={'grid-col'}
                  tag={'el-col'}
                  class={[ns.e('area')]}
                  span={element.options.span}
                  offset={element.options.offset}
                  pull={element.options.pull}
                  push={element.options.push}
                  data={element}
                  parent={props.data.columns}
                >
                  <LayoutDragGable
                    data={element.list}
                    data-layout-type={'grid-col'}
                    parent={element}
                    ControlInsertion={true}
                  />
                </Selection>
              )
            })
          }
        </ElRow>
      </Selection>
    )
  }
})
