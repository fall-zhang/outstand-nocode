<script>
import { ref } from 'vue'
import hooks from '@/hooks'
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
  }
})
const ns = hooks.useNamespace('Icon')
const element = ref('')
</script>
<template>
  <i ref="element" :class="[
    ns.b(),
    `er-editor-icon-${props.icon}`,
    props.disabled && ns.e('disabled')
  ]"></i>
</template>

<style scoped></style>
