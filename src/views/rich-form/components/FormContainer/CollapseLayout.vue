<template>
  <ElementSelection hasCopy hasDel hasDrag hasWidthScale :data="props.data" :parent="props.parent">
    <ElCollapse :modelValue="props.data.options.defaultValue" :accordion="props.data.options.accordion">
      <ElCollapseItem v-for="element in props.data.columns" :title="element.label" :key="element.id" :name="element.id">
        <Selection :class="$style.outline" :data="element" :parent="props.data">
          <LayoutDragGable :data="element.list" data-layout-type="collapse-col" :parent="element" />
        </Selection>
      </ElCollapseItem>
    </ElCollapse>
  </ElementSelection>
</template>

<script lang="ts" setup>
import ElementSelection from '../Selection/ElementSelection.vue'
import LayoutDragGable from './DraggableDrop.vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
const props = defineProps<{
  data: Object,
  parent: Array<unknown>
}>()
console.log("🚀 ~ props:", props)
if (!props.data.options.defaultValue.length) {
  // eslint-disable-next-line vue/no-mutating-props
  props.data.options.defaultValue.push(props.data.columns[0].id)
}

defineOptions({
  inheritAttrs: false,
  customOptions: {},
})
</script>

<style lang="scss" module src="./CollapseLayout.module.scss"></style>
