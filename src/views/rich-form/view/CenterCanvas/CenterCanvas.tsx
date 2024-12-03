import DraggableDrop from './components/DraggableDrop.vue'
import { useFormProps } from '@Form/hooks/use-form-props'
import { ElForm, ElScrollbar } from 'element-plus'
import { Form as VanForm } from 'vant'
import $style from './CenterCanvas.module.scss'
import { useFormProvider } from '../../hooks/use-form-provider'
export default defineComponent({
  name: 'PanelsCanvas',
  inheritAttrs: false,
  customOptions: {},
  setup () {
    const { isDesktop, handler, canvasScrollRef, store } = useFormProvider()
    const state = useFormProvider()
    const form = ref('')
    const typeProps = useFormProps({
      state:state,
      isDesktop: unref(isDesktop),
    })
    const RenderForm = unref(isDesktop) ? ElForm : VanForm
    function onClickCenter () {
      handler.value.setSelection({
        type: 'root',
        id: 'root',
        label: 'default'
      })
    }
    return () => (<div
      class={[
        'center-canvas',
        $style.Canvas,
        $style.editModel,
        $style.container,
        !unref(isDesktop) && $style.mobile,
        !unref(isDesktop) && $style.mobileLayoutType
      ] } style={{ height: '100%' }} onClick={onClickCenter}>
      <ElScrollbar class={$style.subject} ref={canvasScrollRef}>
        <RenderForm ref={form} {...typeProps.value}>
          <DraggableDrop data-layout-type={'root'} class={$style.wrap} data={store.value} parent={state.store} isRoot></DraggableDrop>
        </RenderForm>
      </ElScrollbar>
      {/* <h2>预览页面暂为空，需要专门的渲染逻辑</h2> */}
    </div>
    )
  }
})
