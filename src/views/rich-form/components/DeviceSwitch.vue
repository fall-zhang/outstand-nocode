<script setup lang="ts">
import Icon from '@/assets'
const props = defineProps({
  modelValue: {
    type: String,
    default: 'pc'
  }
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <div class="switch-out">
    <Icon @click="() => emit('update:modelValue', 'pc')" icon="PC"
      :class="['device-switch', props.modelValue === 'pc' && 'active']"></Icon>
    <Icon @click="() => emit('update:modelValue', 'mobile')" icon="cellphone"
      :class="['device-switch', props.modelValue === 'mobile' && 'active']"></Icon>
  </div>
</template>

<style scoped lang="scss">
.switch-out {
  border-top: 1px solid #DDDDDD;
}

.device-switch {
  border: 1px solid #DDDDDD;
  font-size: 14px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    border-right: 0;
    border-radius: 4px 0px 0px 4px;

    &.active+i {
      border-left-color: $primary-color;
    }
  }

  &:last-child {
    border-radius: 0px 4px 4px 0px;
  }

  &.active,
  &:hover {
    color: $primary-color;
    border-color: $primary-color;
  }
}
</style>
