import {
  defineComponent,
  resolveComponent,
  useAttrs,
  useSlots,
  unref,
  VueElement,
} from 'vue'
import { isHTMLTag } from '@/utils/browser'
import VueDraggable from 'vuedraggable'
import hooks from '@/hooks'

export const DraggableWrap = defineComponent({
  inheritAttrs: false,
  name: 'CustomDragGable',
  customOptions: {},
  components: {
    VueDraggable
  },
  setup (props) {
    const {
      isEditModel
    } = hooks.useTarget()
    return () => {
      const attrs = useAttrs()
      let node:JSX.Element = <></>
      if (unref(isEditModel)) {
        node = (
          <VueDraggable
            {...attrs}>
            {useSlots()}
          </VueDraggable>
        )
      } else {
        const RecTag:JSX.Element =  function() {
          const result = isHTMLTag(attrs.tag) ? attrs.tag : resolveComponent(attrs.tag)
          return result
        }
        const {
          item
        } = useSlots()
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
      return node
    }
  }
})
