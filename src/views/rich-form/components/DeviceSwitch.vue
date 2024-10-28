<!-- 设备切换功能 -->
<script setup lang="ts">
import Icon from '@/assets'
const props = defineProps({
  modelValue: {
    type: String,
    default: 'desktop'
  }
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <div class="switch-out">
    <Icon @click="() => emit('update:modelValue', 'desktop')" icon="PC"
      :class="['device-switch', props.modelValue === 'desktop' && 'active']"></Icon>
    <Icon @click="() => emit('update:modelValue', 'mobile')" icon="cellphone"
      :class="['device-switch', props.modelValue === 'mobile' && 'active']"></Icon>
  </div>
</template>

<style scoped lang="scss">
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
