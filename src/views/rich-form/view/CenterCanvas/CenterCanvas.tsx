import LayoutDraggable from '@Form/components/FormContainer/DraggableDrop.vue'
import { useTarget } from '@Form/hooks/use-target'
import { useProps } from '@Form/hooks/use-props'
import { ElForm, ElScrollbar } from 'element-plus'
import { Form as VanForm } from 'vant'
import $style from './CenterCanvas.module.scss'
import { useFormProvider } from '../../hooks/use-form-provider'
export default defineComponent({
  name: 'PanelsCanvas',
  inheritAttrs: false,
  customOptions: {},
  setup () {
    const { isDesktop, handler, canvasScrollRef } = useFormProvider()
    const { state } = useTarget()
    const form = ref('')
    const typeProps = useProps({
      state,
      data: state,
      isDesktop: unref(isDesktop),
      isRoot: true
    })
    const RenderForm = unref(isDesktop) ? ElForm : VanForm
    function onClickCenter () {
      handler.value.setSelection({ id: 'root' })
    }
    return () => (<div
      class={[
        'center-canvas',
        $style.Canvas,
        $style.editModel,
        $style.container,
        !unref(isDesktop) && $style.mobile,
        !unref(isDesktop) && $style.mobileLayoutType
      ] } style={{ height: '100%' }}>
      <ElScrollbar class={$style.subject} ref={canvasScrollRef}>
        <RenderForm ref={form} onClick={onClickCenter} {...typeProps.value}>
          <LayoutDraggable data-layout-type={'root'} class={$style.wrap} data={state.store} parent={state.store} isRoot></LayoutDraggable>
        </RenderForm>
      </ElScrollbar>
      {/* <h2>预览页面暂为空，需要专门的渲染逻辑</h2> */}
    </div>
    )
  }
})
