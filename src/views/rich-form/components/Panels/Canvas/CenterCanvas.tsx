import LayoutDragGable from '../../Layout/DragGable'
import CompleteButton from '@/views/rich-form/components/CompleteButton.vue'
import { useTarget } from '@Form/hooks/use-target'
import { useProps } from '@/hooks/use-props'
import { ElForm, ElScrollbar } from 'element-plus'
import { Form as VanForm } from 'vant'
import { isEmpty } from '@/utils/utils'
import $style from './CenterCanvas.module.scss'
export default defineComponent({
  name: 'PanelsCanvas',
  inheritAttrs: false,
  customOptions: {},
  setup () {
    const ER = inject('rich-form')
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
        <>
          <TagComponent ref={form} onClick={() => unref(isEditModel) && setSelection('root')} {...typeProps.value}>
            {
              <LayoutDragGable data-layout-type={'root'} class={[unref(isEditModel) && $style.wrap]} data={state.store} parent={state.store} isRoot></LayoutDragGable>
            }
          </TagComponent>
          {
            !unref(isEditModel) && !isEmpty(state.config) && <CompleteButton handle={form}/>
          }
        </>
      )
    }
    return () => (<div
      class={
        [
          'center-canvas',
          $style.Canvas,
          isEditModel.value && $style.editModel,
          !unref(isPC) && $style.mobile,
          !unref(isPC) && $style[`mobileLayoutType${ER.props.layoutType}`]
        ]
      }>
      {unref(isEditModel)
        ? (
          <div class={$style.container}>
            <ElScrollbar ref={ER.canvasScrollRef}>
              <div class={$style.subject}>
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
