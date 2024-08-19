<script>
import {
  useTarget,
  useNamespace
} from '@/hooks'
export default {
  name: 'ConfigCheckboxComponent',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  target
} = useTarget()
const ns = useNamespace('ConfigCheckboxComponent')
const props = defineProps({
  field: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div :class="[ns.b(), target.options[field] && ns.e('open')]">
    <el-checkbox v-model="target.options[field]" @change="(newValue) => $emit('change', newValue)"
      :label="label"></el-checkbox>
    <template v-if="$slots.default">
      <div :class="[ns.e('slot')]" v-show="target.options[field]">
        <slot></slot>
      </div>
    </template>
  </div>
</template>
