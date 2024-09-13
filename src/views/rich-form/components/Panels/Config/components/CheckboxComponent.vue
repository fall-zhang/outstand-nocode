<script>
import {
  useTarget
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
  <div :class="[$style.checkboxComponent]">
    <el-checkbox v-model="target.options[field]" @change="(newValue) => $emit('change', newValue)"
      :label="label"></el-checkbox>
    <template v-if="$slots.default">
      <div class="slot" v-show="target.options[field]">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<style lang="scss" module>
.checkboxComponent {
  margin: 2px 0;

  .slot {
    padding-top: 10px;
  }
}
</style>