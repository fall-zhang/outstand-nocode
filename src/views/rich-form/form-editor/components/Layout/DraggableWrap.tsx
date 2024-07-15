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
  props:{
    group:{
      type:Object,
      default:() => ({}) // name:string, pull:'clone',put:boolean
    },
    list:{
      type:Array,
      default:() => ([])
    }
  },
  customOptions: {},
  components: {
    VueDraggable
  },
  setup(props, { slots ,attrs }) {
    // console.log('🚀 ~ setup ~ attrs:', attrs)
    const { isEditModel } = useTarget()

    let node: JSX.Element = <></>
    if (unref(isEditModel)) {
      node = (
        <VueDraggable
          {...attrs}  {...props}>
          {slots}
        </VueDraggable>
      )
    } else {
      const tagName = attrs.tag as string
      let RecTag = isHTMLTag(tagName) ? tagName : resolveComponent(tagName)
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
