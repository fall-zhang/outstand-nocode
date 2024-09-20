<script lang="ts" setup>
import { useTarget } from '@Form/hooks/use-target'
defineOptions({
  name: 'ConfigAllSides',
  inheritAttrs: false,
  customOptions: {}
})
const {
  target
} = useTarget()
const props = defineProps({
  field: {
    type: String,
    required: true
  },
  min: {
    type: Number,
    default: 0
  }
})
if (!target.value.style[props.field]) {
  const defaultVal = props.field === 'margin' ? 0 : 16
  target.value.style[props.field] = {
    top: defaultVal,
    right: defaultVal,
    bottom: defaultVal,
    left: defaultVal
  }
}
</script>
<template>
  <div class="configAllSides">
    {{ 'all side components' }}
    <el-row :gutter="14" justify="center">
      <el-col :span="12">
        <el-input-number :step="10" :min="props.min" v-model="target.style[props.field].left"
          controls-position="right" />
      </el-col>
      <el-col :span="12">
        <el-input-number :step="10" :min="props.min" v-model="target.style[props.field].top"
          controls-position="right" />
      </el-col>
    </el-row>
    <el-row :gutter="14" justify="center">
      <el-col :span="12">
        <el-input-number :step="10" :min="props.min" v-model="target.style[props.field].right"
          controls-position="right" />
      </el-col>
      <el-col :span="12">
        <el-input-number :step="10" :min="props.min" v-model="target.style[props.field].bottom"
          controls-position="right" />
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