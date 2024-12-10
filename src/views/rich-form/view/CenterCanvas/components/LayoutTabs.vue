<template>
  <ElementSelection v-bind="useAttrs()" :data="data" :parent="parent" hasCopy hasDel hasDrag hasWidthScale>
    <ElTabs :class="$style.tabsLayout" :modelValue="activeValue" @tabClick="onClickTab" :type="props.data.options?.type"
      :tabPosition="props.data.options?.tabPosition">
      <ElementSelection v-for="(element, index) in props.data.columns" :key="index" :class="$style.area" tag="el-tab-pane"
        label="element.label" name="element.value" :data="element" :parent="props.data">
        <DraggableDrop data-layout-type="tabs-col" :data="element.list" ControlInsertion :parent="element" />
      </ElementSelection>
    </ElTabs>
  </ElementSelection>

</template>
<script lang="ts" setup>
import { useAttrs } from 'vue'
import ElementSelection from '@Form/components/ElementSelection.vue'
import DraggableDrop from './DraggableDrop.vue'
import { ElTabs } from 'element-plus'
import { FieldItemContainer } from '@Form/types/rich-form-item'
const activeValue = ref()
const props = defineProps<{
  data: FieldItemContainer
  parent: any[]
}>()
function onClickTab(newActive: any) {
  activeValue.value = newActive
}

</script>
<style lang="scss" module>
.tabsLayout {
  .el-tabs__content {
    overflow: inherit;
  }

  .area {
    outline: 1px dashed #ddd;
  }
}
</style>