import { defineComponent, watch, inject } from 'vue'
import LayoutDragGable from './DragGable'
import $style from './InlineLayout.module.scss'
import { syncWidthByPlatform } from '@/utils'
export default defineComponent({
  name: 'InlineLayout',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    parent: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const ER = inject('Everright')
    watch(() => props.data.columns.length, (newVal, oldVal) => {
      if (!newVal) {
        props.data.context.delete()
      }
      if (newVal !== oldVal) {
        syncWidthByPlatform(props.data.columns, ER.state.platform, ER.props.layoutType === 1)
      }
    })
    const dragOptions = {
      direction: 'horizontal'
    }
    return () => {
      return (
        <div
          class={$style.inlineLayout}>
          <LayoutDragGable
            data-layout-type={'inline'}
            class={''}
            type={'inline'}
            {...dragOptions}
            data={props.data.columns}
            parent={props.parent}/>
        </div>
      )
    }
  }
})
