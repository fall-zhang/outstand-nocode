import { defineComponent, } from 'vue'
import ElementSelection from '../Selection/ElementSelection.vue'
import LayoutDragGable from './DraggableDrop.vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import $style from './CollapseLayout.module.scss'
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
    if (!props.data.options.defaultValue.length) {
      // eslint-disable-next-line vue/no-mutating-props
      props.data.options.defaultValue.push(props.data.columns[0].id)
    }
    return () => (
      <ElementSelection {...attrs} hasCopy hasDel hasDrag hasWidthScale data={props.data} parent={props.parent}>
        <ElCollapse model-value={props.data.options.defaultValue} accordion={props.data.options.accordion}>
          {
            props.data.columns.map((element) => {
              return (
                <ElCollapseItem title={element.label} name={element.id}>
                  <Selection
                    class={$style.outline}
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
      </ElementSelection>
    )
  }
})
