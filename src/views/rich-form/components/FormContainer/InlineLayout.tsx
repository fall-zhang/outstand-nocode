import { defineComponent, watch, inject } from 'vue'
import LayoutDraggable from './DraggableDrop.vue'
import $style from './InlineLayout.module.scss'
import { syncWidthByPlatform } from '@/utils'
import { useFormProvider } from '../../hooks/use-form-provider'
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
    const { platform } = useFormProvider()
    watch(() => props.data.columns.length, (newVal, oldVal) => {
      if (!newVal) {
        props.data.context.delete()
      }
      if (newVal !== oldVal) {
        syncWidthByPlatform(props.data.columns, platform.value, false, '')
      }
    })
    const dragOptions = {
      direction: 'horizontal'
    }
    return () => {
      return (
        <div
          class={$style.inlineLayout}>
          <LayoutDraggable
            data-layout-type={'inline'}
            class={''}
            {...dragOptions}
            data={props.data.columns}
            parent={props.parent}/>
        </div>
      )
    }
  }
})
