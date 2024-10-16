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
  // setup(props, { slots, attrs }) {
  //   const { isEditModel } = useTarget()
  //   let node: JSX.Element = <></>
  //   if (unref(isEditModel)) {
  //     node = (
  //       <VueDraggable
  //         {...attrs} {...props}>
  //         {slots}
  //       </VueDraggable>
  //     )
  //   } else {
  //     const tagName = attrs.tag as string
  //     const RecTag = isHTMLTag(tagName) ? tagName : resolveComponent(tagName)
  //     const { item } = slots
  //     node = (
  //       <RecTag {...attrs.componentData}>
  //         {attrs.list.map(e => {
  //           return item({
  //             element: e
  //           })
  //         })}
  //       </RecTag>
  //     )
  //   }
  //   return () => node
  // }
  setup(props, { attrs }) {
    const { isEditModel } = useTarget()
    const slots = useSlots()
    let node: JSX.Element = <></>
    if (unref(isEditModel)) {
      node = (
        <VueDraggable
          {...attrs} {...props}>
          {slots}
        </VueDraggable>
      )
    } else {
      const tagName = attrs.tag as string
      const { item } = slots
      if (!item) return '请添加 item 作为插槽'
      let RecTag = <></>
      if (isHTMLTag(tagName)) {
        RecTag = h(tagName, { ...props.componentData }, () => props.list.map(listItem => item({
          element: listItem
        })))
      } else {
        RecTag = h(resolveComponent(tagName), { ...props.componentData }, () => props.list.map(listItem => item({
          element: listItem
        })))
      }
      node = RecTag
    }
    return () => node
  }
})
