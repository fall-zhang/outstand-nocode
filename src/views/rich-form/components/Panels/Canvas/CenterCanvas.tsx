import LayoutDragGable from '../../Layout/DragGable'
import CompleteButton from '@/views/rich-form/components/CompleteButton.vue'
import { useTarget } from '@/hooks/use-target'
import { useNamespace } from '@/hooks/use-namespace'
import { useProps } from '@/hooks/use-props'
import { ElForm, ElScrollbar } from 'element-plus'
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
      isPC
    } = useTarget()
    const form = ref('')
    const renderContent = () => {
      const TagComponent = unref(isPC) ? ElForm : VanForm
      const typeProps = useProps(state, state, unref(isPC) as boolean, true)
      return (
        <div>
          <TagComponent ref={form} onClick={() => unref(isEditModel) && setSelection('root')} {...typeProps.value}>
            {
              <LayoutDragGable data-layout-type={'root'} class={[unref(isEditModel) && ns.e('wrap')]} data={state.store} parent={state.store} isRoot></LayoutDragGable>
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
            !unref(isPC) && ns.e('mobile'),
            !unref(isPC) && ns.e(`mobile_layoutType${ER.props.layoutType}`)
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
