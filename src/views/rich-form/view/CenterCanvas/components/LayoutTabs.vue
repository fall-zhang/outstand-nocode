<template>
  <Selection v-bind="useAttrs()" :data="data" :parent="parent" hasCopy hasDel hasDrag hasWidthScale>
    <ElTabs :class="$style.tabsLayout" :modelValue="activeValue" @tabClick="onClickTab" :type="props.data.options.type"
      :tabPosition="props.data.options.tabPosition">
      <Selection v-for="(element, index) in props.data.columns" :key="index" :class="$style.area" tag="el-tab-pane"
        label="element.label" name="element.value" :data="element" :parent="props.data">
        <LayoutDraggable data-layout-type="tabs-col" :data="element.list" ControlInsertion :parent="element" />
      </Selection>
    </ElTabs>
  </Selection>

</template>
<script lang="ts" setup>
import { useAttrs } from 'vue'
import Selection from '@Form/components/ElementSelection.vue'
import LayoutDraggable from './DraggableDrop.vue'
import { ElTabs } from 'element-plus'
const activeValue = ref()
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      options: {},
      column: []
    })
  },
  parent: {
    type: Array,
    default: () => ([])
  }
})
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