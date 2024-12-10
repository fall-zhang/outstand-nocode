
import { defineComponent, } from 'vue'
import VueDraggable from 'vuedraggable'
/**
 * 对所有中心画布内侧可拖拽内容(vuedraggable)进行包装
 */
export const DraggableWrap = defineComponent({
  inheritAttrs: false,
  name: 'DragGableWrap',
  props: {
    group: {
      type: Object,
      default: () => ({}) // name:string, pull:'clone',put:boolean
    },
    // 拖拽的列表
    list: {
      type: Array,
      default: () => ([])
    },
    // 从一个列表拖拽到另一个列表时，传递前的数据进行操作，返回值作为传递后的数据
    clone: {
      type: Function,
      default: () => (element:any) => {
        return element
      }
    },
    // html 元素名称
    tag: {
      type: String,
      default: 'ul'
    },
    // 是否允许排序
    sort: {
      type: Boolean,
      default: false
    },
    // 拖拽后的位置是否允许移动
    move: {
      type: Function,
      default: () => (element:any) => {
        return true
      }
    },
    // 拖拽动画
    animation:{
      type:Number,
      default:200
    },
    // 局部拖拽整体时，局部元素的类名
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
