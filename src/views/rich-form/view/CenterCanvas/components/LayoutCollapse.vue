<template>
  <ElementSelection hasCopy hasDel hasDrag hasWidthScale :data="props.data" :parent="props.parent">
    <ElCollapse :modelValue="props.data.options?.defaultValue" :accordion="props.data.options?.accordion">
      <ElCollapseItem v-for="element in props.data.columns" :title="element.label" :key="element.id" :name="element.id">
        <Selection class="outline" :data="element" :parent="props.data">
          <DraggableDrop :data="element.list" data-layout-type="collapse-col" :parent="element" />
        </Selection>
      </ElCollapseItem>
    </ElCollapse>
  </ElementSelection>
</template>

<script lang="ts" setup>
import { FieldItemContainer } from '@/views/rich-form/types/rich-form-item'
import ElementSelection from '@Form/components/ElementSelection.vue'
import DraggableDrop from './DraggableDrop.vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { useFormProvider } from '@/views/rich-form/hooks/use-form-provider'
const props = defineProps<{
  data: FieldItemContainer,
  parent: Array<unknown>
}>()
const { handler } = useFormProvider()
if (props.data.options?.defaultValue.length === 0) {
  // handler.value.addFieldItem
  // eslint-disable-next-line vue/no-mutating-props
  props.data.options.defaultValue.push(props.data.columns[0].id)
}

defineOptions({
  inheritAttrs: false,
  customOptions: {},
})
</script>

<style lang="scss" module>
.outline {
  outline: 1px dashed #ddd;
}
</style>
