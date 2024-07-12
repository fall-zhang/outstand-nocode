import {
  defineComponent,
  resolveComponent,
  unref,
} from 'vue'
import { isHTMLTag } from '@/utils/browser'
import VueDraggable from 'vuedraggable'
import { useTarget } from '@/hooks/use-target'

export const DraggableWrap = defineComponent({
  inheritAttrs: false,
  name: 'CustomDragGable',
  customOptions: {},
  components: {
    VueDraggable
  },
  setup(props, { slots ,attrs }) {
    const { isEditModel } = useTarget()

    let node: JSX.Element = <></>
    if (unref(isEditModel)) {
      node = (
        <VueDraggable
          {...attrs}>
          {slots}
        </VueDraggable>
      )
    } else {
      const RecTag = function () {
        const tagName = attrs.tag as string
        let result = isHTMLTag(tagName) ? tagName : resolveComponent(tagName)
        return result
      }
      const { item } = slots
      node = (
        <RecTag {...attrs.componentData}>
          {attrs.list.map(e => {
            return item({
              element: e
            })
          })}
        </RecTag>
      )
    }
    return () => node
  }
})
