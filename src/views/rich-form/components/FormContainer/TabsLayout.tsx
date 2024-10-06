import { defineComponent, useAttrs } from 'vue'
import Selection from '@/views/rich-form/components/Selection/selectElement'
import LayoutDragGable from './DragGable'
import { ElTabs } from 'element-plus'
import $style from './TabsLayout.module.scss'
export default defineComponent({
  name: 'TabsLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: {
      type: Object,
      default: () => ({
        options: {},
        column: []
      })
    },
    parent: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props) {
    const activeValue = ref()
    function onClickTab(newActive:any) {
      activeValue.value = newActive
    }
    return () => (
      <Selection {...useAttrs()} data={props.data} parent={props.parent} hasCopy hasDel hasDrag hasWidthScale>
        <ElTabs class={$style.tabsLayout} modelValue={activeValue.value} onTabClick={onClickTab} type={props.data.options.type} tabPosition={props.data.options.tabPosition}>
          {
            props.data.columns.map((element, index0) => (
              <Selection
                class={$style.area}
                tag='el-tab-pane' label={element.label} name={element.value} data={element} parent={props.data}
              >
                <LayoutDragGable
                  data-layout-type={'tabs-col'}
                  data={element.list}
                  ControlInsertion={true}
                  parent={element}/>
              </Selection>
            )
            )
          }
        </ElTabs>
      </Selection>
    )
  }
})
