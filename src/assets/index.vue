<script>
import { ref, computed } from 'vue'
import svg from './svg'
export default {
  name: 'FeIcon'
}
</script>
<script setup>
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
    type: Number
  }
})
const style = computed(() => {
  const result = {}
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
