<script lang="ts" setup>
import { ref, computed, StyleValue } from 'vue'
import svg from './svg'
defineOptions({
  name: 'FeIcon'
})
const emit = defineEmits(['click'])
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    required: true
  },
  fontSize: {
    require: false,
    default: 14,
    type: Number
  }
})
const style = computed(() => {
  const result: StyleValue = {}
  if (props.fontSize !== undefined) {
    result.fontSize = `${props.fontSize}px`
  }
  return result
})
const element = ref('')

</script>
<template>
  <i ref="element" :class="[`fe-icon`, props.disabled && 'is-disabled']" :style="style" @click="() => emit('click')">
    <component :is="svg[props.icon]"></component>
  </i>
</template>

<style lang="scss">
.fe-icon {
  font-size: 14px;
  width: 1em;
  height: 1em;
  line-height: 1em;
  display: inline-flex;
  cursor: pointer;
  color: #666;
  outline: none;

  svg {
    width: 1em;
    height: 1em;
  }

  &.is-disabled {
    color: $disabled-color;
    cursor: not-allowed;
  }
}
</style>
