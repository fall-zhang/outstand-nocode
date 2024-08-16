<script lang="ts" setup>
import { useTarget, useNamespace } from '@/hooks'
defineOptions({
  name: 'ConfigAllSides',
  inheritAttrs: false,
  customOptions: {}
})
const {
  target
} = useTarget()
const ns = useNamespace('ConfigAllsides')
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
  <div>
    <div :class="[ns.b()]">
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
  </div>
</template>
