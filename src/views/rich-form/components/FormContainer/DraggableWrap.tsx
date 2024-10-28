
import { defineComponent, } from 'vue'
import VueDraggable from 'vuedraggable'

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
  setup(props, { attrs, slots }) {
    return () => (
      <VueDraggable
        {...attrs} {...props}>
        {slots}
      </VueDraggable>
    )
  }
})
