<!-- margin、padding、上下左右四个边距的配置， -->

<script lang="ts" setup>
import { useFormProvider } from '@/views/rich-form/hooks/use-form-provider'
import { BaseItemType, FieldItemBase, FieldItemContainer } from '@/views/rich-form/types/rich-form-item'
defineOptions({
  name: 'ConfigAllSides',
  inheritAttrs: false,
  customOptions: {}
})
const { selected, basicFieldList, platform } = useFormProvider()
const currentSelect = computed(() => {
  const current = selected.value as FieldItemBase | FieldItemContainer
  return current
})

const props = defineProps<{
  field: 'margin' | 'padding'
  min: number
}>()

const currentState = reactive<{
  left?: number,
  right?: number,
  top?: number,
  bottom?: number
}>({})

if (basicFieldList.value.includes(selected.value.type as BaseItemType)) {
  const current = selected.value as FieldItemBase
  if (!current.options[props.field]) {
    const defaultVal = props.field === 'margin' ? 0 : 16
    current.options[props.field] = {
      top: defaultVal,
      right: defaultVal,
      bottom: defaultVal,
      left: defaultVal
    }
  }
}
function onChangeValue(prop: 'left' | 'top' | 'right' | 'bottom', value?: number | null) {
  // 默认单位 px
  if (!currentSelect.value.desktop) {
    currentSelect.value.desktop = {
      size: '',
      labelPosition: '',
      style: {
        marginLeft: ''
      }
    }
  }
}
</script>
<template>
  <div class="configAllSides">
    {{ 'all side components' }}
    <el-row :gutter="14" justify="center">
      <el-col :span="12">
        <el-input-number :precision="1" :step="10" :min="props.min" :model-value="currentState.left"
          @input="(newVal) => onChangeValue('left', newVal)" controls-position="right" />
      </el-col>
      <el-col :span="12">
        <el-input-number :step="10" :min="props.min" :model-value="currentState.top"
          @input="(newVal) => onChangeValue('top', newVal)" controls-position="right" />
      </el-col>
    </el-row>
    <el-row :gutter="14" justify="center">
      <el-col :span="12">
        <el-input-number :step="10" :min="props.min" :model-value="currentState.right"
          @input="(newVal) => onChangeValue('right', newVal)" controls-position="right" />
      </el-col>
      <el-col :span="12">
        <el-input-number :step="10" :min="props.min" :model-value="currentState.bottom"
          @input="(newVal) => onChangeValue('bottom', newVal)" controls-position="right" />
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.configAllSides {
  background: #F9F9F9;
  border-radius: 4px;
  padding: 16px;

  &>div:first-child {
    padding-top: 0;
  }

  &>div:last-child {
    padding-bottom: 0;
  }

  &>div {
    padding: 10px 0;
  }

  .el-input-number {
    width: 100%;
  }
}
</style>