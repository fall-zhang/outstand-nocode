import { defineComponent, useAttrs } from 'vue'
import ElementSelection from '@Form/components/ElementSelection.vue'
import LayoutDraggable from './DraggableDrop.vue'
import { ElRow } from 'element-plus'
import $style from './Layout.module.scss'
export default defineComponent({
  name: 'GridLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    parent: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props,{ attrs }) {
    return () => (
      <ElementSelection {...attrs} hasWidthScale hasCopy hasAddCol hasDel hasDrag data={props.data} parent={props.parent}>
        {'GridLayout'}
        <ElRow data-layout-type={'grid'} gutter={props.data.options.gutter} justify={props.data.options.justify} align={props.data.options.align} class={$style.gridLayoutArea}>
          { props.data.columns.map((element:any) => (
            <ElementSelection
              key={element.id}
              hasCopy
              hasDel={props.data.columns.length > 1}
              hasWidthScale
              // hasAddContainer
              data-layout-type={'grid-col'}
              tag={'el-col'}
              class={$style.area}
              span={element.options.span}
              offset={element.options.offset}
              data={element}
              parent={props.data.columns}
            >
              <LayoutDraggable
                data={element.list}
                data-layout-type={'grid-col'}
                parent={element}
              />
            </ElementSelection>
          ))
          }
        </ElRow>
      </ElementSelection>
    )
  }
})
