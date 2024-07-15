<script lang="ts" setup>
import { ref, computed, StyleValue } from 'vue'
import svg from './svg'
defineOptions({
  name: 'FeIcon'
})
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
  <i ref="element" :class="[
    `ER-icon`,
    props.disabled && 'is-disabled'
  ]" :style="style">
    <component :is="svg[props.icon]"></component>
  </i>
</template>

<style scoped></style>
