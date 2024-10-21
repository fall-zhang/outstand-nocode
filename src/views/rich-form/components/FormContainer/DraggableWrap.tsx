
import {
  defineComponent,
  resolveComponent,
  unref,
} from 'vue'
import { isHTMLTag } from '@/utils/browser'
import VueDraggable from 'vuedraggable'
import { useTarget } from '@Form/hooks/use-target'

export const DraggableWrap = defineComponent({
  inheritAttrs: false,
  name: 'CustomDragGable',
  props: {
    group: {
      type: Object,
      default: () => ({}) // name:string, pull:'clone',put:boolean
    },
    list: {
      type: Array,
      default: () => ([])
    },
    clone: {
      type: Function,
      default: () => (element:any) => {
        return element
      }
    },
    tag: {
      type: String,
      default: 'ul'
    },
    sort: {
      type: Boolean,
      default: false
    },
    move: {
      type: Function,
      default: () => (element:any) => {
        return true
      }
    },
    handle: {
      type: String,
      default: ''
    },
    componentData: {
      type: Object,
      default: () => ({})
    }
  },
  customOptions: {},
  components: {
    VueDraggable
  },
  setup(props, { attrs }) {
    console.log("🚀 ~ setup ~ props:", props.tag)
    // const node = <></>
    const slots = useSlots()
    // const { isEditModel } = useTarget()
    // if (unref(isEditModel)) {
    // } else {
    //   const tagName = props.tag as string
    //   const { item } = slots
    //   if (!item) return '请添加 item 作为插槽'
    //   let RecTag = <></>
    //   if (isHTMLTag(tagName)) {
    //     RecTag = h(tagName, { ...props.componentData }, () => props.list.map(listItem => item({
    //       element: listItem
    //     })))
    //   } else {
    //     RecTag = h(resolveComponent(tagName), { ...props.componentData }, () => props.list.map(listItem => item({
    //       element: listItem
    //     })))
    //   }
    //   node = RecTag
    // }
    return () => (
      <VueDraggable
        {...attrs} {...props}>
        {slots}
      </VueDraggable>
    )
  }
})
