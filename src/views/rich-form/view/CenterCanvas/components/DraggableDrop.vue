<!-- 将内容拖拽到的位置 -->
<template>
  {{ data }}
  <DraggableWrap handle=".handle" class="DragGableLayout edit" :tag="tag" item-key="id" :move="handleMove"
    v-bind="dragOptions" :componentData="$attrs" @change="onDrag">
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
        <template v-if="FE.isDesktop">
          <component :is="findComponent(element.type)" v-if="element.type === 'divider'" :data="element" :params="useFormItemProps({
            state: FE,
            data: element,
            isDesktop: FE.isDesktop
          })">
          </component>
          <template v-else>
            <el-form-item v-bind="useFormItemProps({
              state: FE,
              data: element,
              isDesktop: FE.isDesktop
            })">
              {{ useFormItemProps({
                state: FE,
                data: element,
                isDesktop: FE.isDesktop
              }) }}
              <component :is="findComponent(element.type)" :data="element" :params="element"></component>
              {{ element }}
            </el-form-item>
          </template>
        </template>
        <component v-else :is="findComponent(element.type)" :data="element" :params="useFormItemProps({
          state: FE,
          data: element,
          isDesktop: FE.isDesktop
        })">
        </component>
      </Selection>
    </template>
    <template #footer>
      <div v-if="isEmpty(data) && !isRoot" class="dropHere">放置在此处</div>
    </template>
  </DraggableWrap>
</template>

<script lang="ts" setup>
import {
  watch,
  defineAsyncComponent,
} from 'vue'
import type { Component } from 'vue'
import { useProps as useFormItemProps } from '@Form/hooks/use-props'
import LayoutGridLayout from './LayoutGrid'
import LayoutTabsLayout from './LayoutTabs.vue'
import LayoutCollapseLayout from './LayoutCollapse.vue'
import LayoutTableLayout from './LayoutTable'
import LayoutInlineLayout from './LayoutInline'
import Selection from '@Form/components/ElementSelection.vue'
import ControlInsertionPlugin from '@Form/utils/ControlInsertionPlugin'
import { DraggableWrap } from '@Form/components/DraggableWrap'
import { isEmpty } from '@/utils/utils'
import { useFormProvider } from '@Form/hooks/use-form-provider'
import { MoveEvent } from 'sortablejs'
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
const FE = reactive(useFormProvider())
const loadComponent = () => {
  let componentMap: Record<string, Component> = {}
  watch(() => FE.platform, () => {
    componentMap = {}
  })
  return function findComponent(type: string) {
    let info = componentMap[type]
    const compoName = type.slice(0, 1).toUpperCase() + type.slice(1)
    // console.log("🚀 ~ findComponent ~ compoName:", compoName)
    if (!info) {
      info = componentMap[type] = defineAsyncComponent(() => import(`@Form/components/FormTypes/${compoName}/${FE.platform}.vue`))
    }
    return info
  }
}

const findComponent = loadComponent()
const dragOptions = reactive({
  swapThreshold: 1,
  animation: 200,
  list: props.data,
  group: {
    name: 'nocode-form'
  },
  parent: props.parent,
  plugins: [ControlInsertionPlugin(FE)],
  ControlInsertion: true
})
const handleMove = () => {
  return true
}

function onDrag(ev: MoveEvent) {
}

</script>

<style lang="scss" scoped>
.DragGableLayout {
  height: 100%;

  &.edit {
    .el-row {
      padding: 10px;
    }
  }

  .dropHere {
    display: flex;
    background: #F2F8FF !important;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 60px;
  }
}
</style>
