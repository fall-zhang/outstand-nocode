
import { defineComponent, } from 'vue'
import VueDraggable from 'vuedraggable'
/**
 * 对所有中心画布内侧可拖拽内容进行包装
 */
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
    animation:{
      type:Number,
      default:200
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
    // 既然是包装，应该把 attrs，隐式数据传递给去掉
    return () => (
      <VueDraggable
        {...attrs} {...props} v-slots={slots}>
        {/* {slots.item?.()} */}
        {/* {slots} */}
      </VueDraggable>
    )
  }
})
