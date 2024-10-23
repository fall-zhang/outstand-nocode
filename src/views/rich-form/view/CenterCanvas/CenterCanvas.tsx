import LayoutDraggable from '@Form/components/FormContainer/DraggableDrop.vue'
import CompleteButton from '@/views/rich-form/components/CompleteButton.vue'
import { useTarget } from '@Form/hooks/use-target'
import { useProps } from '@Form/hooks/use-props'
import { ElForm, ElScrollbar } from 'element-plus'
import { Form as VanForm } from 'vant'
import $style from './CenterCanvas.module.scss'
import { RichFormProvider } from '@Form/types/rich-form'
export default defineComponent({
  name: 'PanelsCanvas',
  inheritAttrs: false,
  customOptions: {},
  setup () {
    const ER = inject<RichFormProvider>('rich-form')!
    const {
      state,
      setSelection,
      isEditModel,
      isDesktop
    } = useTarget()
    const form = ref('')
    const typeProps = useProps({
      state,
      data: state,
      isDesktop: unref(isDesktop),
      isRoot: true
    })
    const RenderForm = unref(isDesktop) ? ElForm : VanForm
    const isInEdit = unref(isEditModel)
    return () => (<div
      class={ [
        'center-canvas',
        $style.Canvas,
        isEditModel.value && $style.editModel,
        !unref(isDesktop) && $style.mobile,
        !unref(isDesktop) && $style.mobileLayoutType
      ] }>
      {isInEdit
        ? (
          <div class={$style.container}>
            <ElScrollbar ref={ER.canvasScrollRef}>
              <div class={$style.subject}>
                <RenderForm ref={form} onClick={() => unref(isEditModel) && setSelection('root')} {...typeProps.value}>
                  <LayoutDraggable data-layout-type={'root'} class={[unref(isEditModel) && $style.wrap]} data={state.store} parent={state.store} isRoot></LayoutDraggable>
                </RenderForm>
              </div>
            </ElScrollbar>
          </div>
        )
        : <>
          <h2>
            {
              '预览页面暂为空，需要专门的渲染逻辑'
            }
            {/* <LayoutDraggable data-layout-type={'root'} class={[unref(isEditModel) && $style.wrap]} data={state.store} parent={state.store} isRoot></LayoutDraggable> */}
          </h2>
          {
            state.config && <CompleteButton handle={form}/>
          }
        </>}
    </div>
    )
  }
})
