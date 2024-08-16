<script setup lang="ts">
import { useNamespace } from '@/hooks'
import Icon from '@/assets'
const props = defineProps({
  modelValue: {
    type: String,
    default: 'pc'
  }
})
const emit = defineEmits(['update:modelValue'])
const ns = useNamespace('DeviceSwitch')
</script>
<template>
  <div :class="[ns.b()]">
    <Icon @click="() => emit('update:modelValue', 'pc')" icon="PC"
      :class="[ns.e('icon'), props.modelValue === 'pc' && 'active']"></Icon>
    <Icon @click="() => emit('update:modelValue', 'mobile')" icon="cellphone"
      :class="[ns.e('icon'), props.modelValue === 'mobile' && 'active']"></Icon>
  </div>
</template>

<style scoped></style>
