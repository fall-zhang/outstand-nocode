<script setup lang="ts">
import { useFormProvider } from '@/views/rich-form/hooks/use-form-provider'
defineOptions({
  name: 'ConfigCheckboxComponent',
  inheritAttrs: false,
  customOptions: {}
})
const { selected } = useFormProvider()
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
    <el-checkbox v-model="selected.options[field]" @change="(newValue) => $emit('change', newValue)"
      :label="label"></el-checkbox>
    <template v-if="$slots.default">
      <div class="slot" v-show="selected.options[field]">
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