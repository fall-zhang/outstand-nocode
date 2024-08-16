<script setup>
import { ref } from 'vue'
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
  }
})
const element = ref('')
// defineExpose({
//   $el: element
// })
</script>
<template>
  <i ref="element" :class="[
    `ER-icon-${props.icon}`,
    props.disabled && 'is-disabled'
    // props.disabled && ns.e('disabled')
    ]"/>
</template>

<style scoped>

</style>
