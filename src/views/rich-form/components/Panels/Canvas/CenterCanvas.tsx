import LayoutDragGable from '../../Layout/DragGable'
import CompleteButton from '@/views/rich-form/components/CompleteButton.vue'
import { useTarget } from '@/hooks/use-target'
import { useNamespace } from '@/hooks/use-namespace'
import { useProps } from '@/hooks/use-props'
import { ElForm, ElMain, ElScrollbar } from 'element-plus'
import { Form as VanForm } from 'vant'
import { isEmpty } from '@/utils/utils'
export default defineComponent({
  name: 'PanelsCanvas',
  inheritAttrs: false,
  customOptions: {},
  setup () {
    const ER = inject('Everright')
    const ns = useNamespace('Canvas')
    const {
      state,
      setSelection,
      isEditModel,
      isPc
    } = useTarget()
    const form = ref('')
    const handleClick = () => {
      setSelection('root')
    }
    const renderContent = () => {
      const TagComponent = unref(isPc) ? ElForm : VanForm
      const typeProps = useProps(state, state, unref(isPc) as boolean, true)
      const Layout = (<LayoutDragGable data-layout-type={'root'} class={[unref(isEditModel) && ns.e('wrap')]} data={state.store} parent={state.store} isRoot></LayoutDragGable>)
      return (
        <div>
          <TagComponent ref={form} onClick={unref(isEditModel) && handleClick} {...typeProps.value}>
            {
              Layout
            }
          </TagComponent>
          {
            !unref(isEditModel) && !isEmpty(state.config) && ER.props.isShowCompleteButton && <CompleteButton handle={form}/>
          }
        </div>
      )
    }
    return () => (
      <div
        class={
          [
            'center-canvas',
            ns.b(),
            isEditModel.value && ns.e('editModel'),
            !unref(isPc) && ns.e('mobile'),
            !unref(isPc) && ns.e(`mobile_layoutType${ER.props.layoutType}`)
            // ER.props.layoutType === 1  && ns.e('layoutType1')
          ]
        }>
        {unref(isEditModel)
          ? (
            <div class={[ns.e('container')]}>
              <ElScrollbar ref={ER.canvasScrollRef}>
                <div class={[ns.e('subject')]}>
                  {renderContent()}
                </div>
              </ElScrollbar>
            </div>
          )
          : renderContent()}
      </div>
    )
  }
})
