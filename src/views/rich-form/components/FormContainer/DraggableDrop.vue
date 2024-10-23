<!-- 将内容拖拽到的位置 -->
<template>
  <DraggableWrap handle=".handle" :class="[$style.DragGableLayout, unref(isEditModel) &&
    $style.edit]" :tag="tag" item-key="id" :move="handleMove" v-bind="dragOptions" :componentData="$attrs"
    @change="onDrag">
    <template #item="{ element }">
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
      <Selection v-else hasWidthScale hasCopy hasDel hasDrag hasMask :data="element" :parent="props.data">
        <!-- state.fieldsLogicState.get(element), 'visible', undefined) !== 0 -->
        <template v-if="isDesktop">
          <component :is="findComponent(element.type)" v-if="element.type === 'divider'" :data="element" :params="useProps({
            state,
            data: element,
            isDesktop: unref(isDesktop)
          })">
          </component>
          <el-form-item v-else v-bind="useProps({
            state,
            element,
            isDesktop: unref(isDesktop)
          })">
            <component :is="findComponent(element.type)" :data="element" :params="useProps({
              state,
              data: element,
              isDesktop: unref(isDesktop)
            })"></component>
          </el-form-item>
        </template>
        <component v-else :is="findComponent(element.type)" :data="element" :params="useProps({
          state,
          data: element,
          isDesktop: unref(isDesktop)
        })"></component>
      </Selection>
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
} from 'vue'
import type { Component } from 'vue'
import { useProps } from '@Form/hooks/use-props'
import { useTarget } from '@Form/hooks/use-target'
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
    let info = componentMap[type]
    const compoName = type.slice(0, 1).toUpperCase() + type.slice(1)
    if (!info) {
      info = componentMap[type] = defineAsyncComponent(() => import(`../FormTypes/${compoName}/${ER.platform}.vue`))
    }
    return info
  }
}

const findComponent = loadComponent()
const dragOptions = reactive({
  swapThreshold: 1,
  list: [],
  group: {
    name: 'nocode-form'
  },
  parent: props.parent,
  plugins: [ControlInsertionPlugin(ER)],
  ControlInsertion: true
})
const handleMove = () => {
  return true
}

function onDrag(ev: any) {
  console.log('🚀 ~ onDrag ~ ev:', ev)
}
</script>

<style lang="scss" scoped></style>
