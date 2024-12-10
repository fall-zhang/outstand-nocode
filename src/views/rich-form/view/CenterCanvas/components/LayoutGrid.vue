<template>
  <ElementSelection v-bind="$attrs" hasWidthScale hasCopy hasAddCol hasDel hasDrag :data="props.data"
    :parent="props.parent">
    <ElRow data-layout-type="grid" :gutter="props.data.options?.gutter" :justify="props.data.options?.justify"
      :align="props.data.options?.align" :class="$style.gridLayoutArea">
      <ElementSelection v-for="element in props.data.columns" :key="element.id" hasCopy
        :hasDel="props.data.columns.length > 1" hasWidthScale data-layout-type="grid-col" tag="el-col"
        :class="$style.area" :span="element.options.span" :offset="element.options.offset" :data="element"
        :parent="props.data">
        <DraggableDrop :data="props.data.innerData" data-layout-type="grid-col" :parent="props.parent" />
      </ElementSelection>
    </ElRow>
  </ElementSelection>
</template>

<script lang="ts" setup>
import ElementSelection from '@Form/components/ElementSelection.vue'
import DraggableDrop from './DraggableDrop.vue'
import { ElRow } from 'element-plus'
import { FieldItemBase, FieldItemContainer } from '@/views/rich-form/types/rich-form-item';
defineOptions({
  name: 'GridLayout',
  inheritAttrs: false,
})
const props = defineProps<{
  data: FieldItemContainer,
  parent: any[]
}>()
const formItemMap = computed<Record<string, FieldItemBase>>(() => {
  const result: Record<string, FieldItemBase> = {}
  props.data.innerData.forEach(item => {
    const parentId = item.context?.parentId
    if (parentId) {
      result[parentId] = item
    } else {
      console.warn('当前 container 字内容没有传递父容器 id', props.data)
    }
  })
  return result
})
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
