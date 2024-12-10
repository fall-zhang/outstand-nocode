<template>
  <ElementSelection v-bind="$attrs" hasWidthScale hasCopy hasAddCol hasDel hasDrag :data="props.data"
    :parent="props.parent">
    'GridLayout'
    <ElRow data-layout-type="grid" :gutter="props.data.options?.gutter" :justify="props.data.options?.justify"
      :align="props.data.options?.align" :class="$style.gridLayoutArea">
      <ElementSelection v-for="element in props.data.columns" :key="element.id" hasCopy
        :hasDel="props.data.columns.length > 1" hasWidthScale data-layout-type="grid-col" tag="el-col"
        :class="$style.area" :span="element.options.span" :offset="element.options.offset" :data="element"
        :parent="props.data.columns">
        <LayoutDraggable :data="element.list" data-layout-type="grid-col" :parent="element" />
      </ElementSelection>
    </ElRow>
  </ElementSelection>
</template>

<script lang="ts" setup>
import { defineComponent, useAttrs } from 'vue'
import ElementSelection from '@Form/components/ElementSelection.vue'
import LayoutDraggable from './DraggableDrop.vue'
import { ElRow } from 'element-plus'
import { FieldItemContainer } from '@/views/rich-form/types/rich-form-item';
defineOptions({
  name: 'GridLayout',
  inheritAttrs: false,
})
const props = defineProps<{
  data: FieldItemContainer,
  parent: any[]
}>()
// {
//   data: {
//     type: Object,
//     default: () => ({})
//   },
//   parent: {
//     type: Array,
//     default: () => ([])
//   }
// }
</script>

<style lang="scss" module src="./Layout.module.scss"></style>
