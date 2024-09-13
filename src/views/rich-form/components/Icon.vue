<script>
import { ref } from 'vue'
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
const element = ref('')
</script>
<template>
  <i ref="element" :class="[
    'Icon',
    `er-editor-icon-${props.icon}`,
    props.disabled && 'disabled'
  ]"></i>
</template>

<style scoped>
.Icon {
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 5px;
  color: #fff;
}
</style>
