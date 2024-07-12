import { defineComponent, resolveComponent, watch, useAttrs, defineAsyncComponent } from 'vue'
import Selection from '@/views/rich-form/form-editor/components/Selection/selectElement.jsx'
import LayoutDragGable from './DragGable.jsx'
import hooks from '@/hooks'
import { ElTabs } from 'element-plus'
export default defineComponent({
  name: 'TabsLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ns = hooks.useNamespace('TabsLayout')
    return () => {
      return (
        <Selection {...useAttrs()} data={props.data} parent={props.parent} hasCopy hasDel hasDrag hasWidthScale>
          <ElTabs class={[ns.b()]} vModel={props.data.options.defaultValue} type={props.data.options.type} tabPosition={props.data.options.tabPosition}>
            {
              props.data.columns.map((element, index0) => {
                return (
                  <Selection
                    class={[ns.e('area')]}
                    tag='el-tab-pane' label={element.label} name={element.value} data={element} parent={props.data}
                  >
                    <LayoutDragGable
                      data-layout-type={'tabs-col'}
                      data={element.list}
                      ControlInsertion={true}
                      parent={element}/>
                  </Selection>
                )
              })
            }
          </ElTabs>
        </Selection>
      )
    }
  }
})
