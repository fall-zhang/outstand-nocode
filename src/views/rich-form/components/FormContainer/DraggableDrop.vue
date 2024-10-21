<!-- 将内容拖拽到的位置 -->
<template>
  <DraggableWrap handle=".handle" :class="[$style.DragGableLayout, unref(isEditModel) &&
    $style.edit]" :tag="tag" item-key="id" :move="handleMove" v-bind="dragOptions" :componentData="$attrs">
    <template #item="{ element }">
      {{ element }}
      <LayoutGridLayout v-if="element.type === 'grid'" :data="element" :parent="data">
      </LayoutGridLayout>
      <LayoutTableLayout v-else-if="element.type === 'table'" :data="element" :parent="data">
      </LayoutTableLayout>
      <LayoutTabsLayout v-else-if="element.type === 'tabs'" :data="element" :parent="data">
      </LayoutTabsLayout>
      <LayoutCollapseLayout v-else-if="element.type === 'collapse'" :data="element" :parent="data">
      </LayoutCollapseLayout>
      <LayoutInlineLayout v-else-if="element.type === 'inline'" :data="element" :parent="data">
      </LayoutInlineLayout>
      <template v-else>
        <!-- if (unref(isEditModel) || get(state.fieldsLogicState.get(element), 'visible', undefined) !== 0) { -->
        <Selection v-if="isDesktop" hasWidthScale hasCopy hasDel hasDrag hasMask :data="element" :parent="props.data">
          <component :is="findComponent(element.type)" v-if="element.type === 'divider'" :data="element"
            :params="useProps(state, element, unref(isDesktop)).value">
          </component>
          <el-form-item v-else v-bind="useProps(state, element, unref(isDesktop)).value">
            <component :is="findComponent(element.type)" :data="element"
              :params="useProps(state, element, unref(isDesktop)).value"></component>
          </el-form-item>
        </Selection>
        <Selection v-else hasWidthScale hasCopy hasDel hasDrag hasMask :data="element" :parent="props.data">
          <component :is="findComponent(element.type)" :data="element"
            :params="useProps(state, element, unref(isDesktop)).value"></component>
        </Selection>

      </template>
    </template>
    <template #footer>
      <div v-if="isEmpty(data) && !isRoot" :class="$style.dropHere">放置在此处</div>
    </template>
  </DraggableWrap>
</template>

<script lang="ts" setup>
import {
  watch,
  defineAsyncComponent,
  unref,
  inject,
  Component,
} from 'vue'
import { useProps } from '@/hooks'
import { useTarget } from '@Form/hooks/use-target'
import _ from 'lodash-es'
import LayoutGridLayout from '../FormContainer/GridLayout'
import LayoutTabsLayout from './TabsLayout.vue'
import LayoutCollapseLayout from './CollapseLayout'
import LayoutTableLayout from './TableLayout'
import LayoutInlineLayout from './InlineLayout'
import Selection from '../Selection/selectElement'
import ControlInsertionPlugin from './ControlInsertionPlugin'
import { DraggableWrap } from './DraggableWrap'
import $style from './Draggable.module.scss'
import { isEmpty } from '@/utils/utils'
import { RichFormProvider } from '../../types/rich-form'
defineOptions({
  name: 'DraggableDrop',
})
const props = defineProps({
  isRoot: {
    type: Boolean,
    default: false
  },
  data: {
    require: true,
    type: Array,
    default: () => ([])
  },
  parent: {
    type: Object,
    default: () => ({})
  },
  tag: {
    type: String,
    default: 'div'
  }
})
const ER = inject<RichFormProvider>('rich-form')!
const { state, isEditModel, isDesktop, } = useTarget()
const loadComponent = () => {
  let componentMap: Record<string, Component> = {}
  watch(() => ER.platform, () => {
    componentMap = {}
  })
  return function findComponent(type: string) {
    console.log('🚀 ~ findComponent ~ type:', type)
    let info = componentMap[type]
    if (!info) {
      info = componentMap[type] = defineAsyncComponent(() => import(`../FormTypes/${_.startCase(type)}/${ER.platform}.vue`))
    }
    return info
  }
}
const findComponent = loadComponent()
const dragOptions = {
  swapThreshold: 1,
  list: [],
  group: {
    name: 'nocode-form'
  },
  parent: props.parent,
  plugins: [ControlInsertionPlugin(ER)],
  ControlInsertion: true
}
const handleMove = () => {
  return true
}

</script>

<style lang="scss" scoped></style>
