<!-- icon 选择 -->
<script setup lang="ts">
import Icon from '@/assets/index.vue'
const emit = defineEmits(['change', 'update:modelValue'])
type NodeItem = {
  label: string
  value: string | number
  disabled?: boolean
  icon?: string
}
type Prop = {
  modelValue?: string | number | boolean
  label?: string
  nodes?: NodeItem[]
  height?: number
  property?: string
  fontSize?: number
  layoutType?: 'breakLine' | 'inline' | 'slot'
}
const { height = 50, fontSize = 66 } = defineProps<Prop>()
const fireEvent = (property: string | number) => {
  emit('update:modelValue', property)
  emit('change', property)
}
</script>
<template>
  <ul ref="elements" class="form-content" :style="{ height: height + 2 + 'px' }">
    <li @click="() => !item.disabled && fireEvent(item.value)" v-for="item in nodes" :key="item.value" :class="{
      'selected': modelValue !== undefined && item.value === modelValue,
      'Disabled': item.disabled
    }">
      <Icon :icon="item.icon || ''" :fontSize="fontSize" />
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.form-content {
  display: flex;
  width: 100%;

  li {
    flex: 1;
    box-sizing: border-box;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      border-color: var(--primary-color);
    }

    &.selected {
      // background: #F2F2F2;
      // border-width: 3px;
      outline: 3px var(--primary-color);
    }

    &.Disabled {
      background: #F2F2F2;
      cursor: not-allowed;
    }
  }

  li:not(:last-child) {
    margin-right: 8px;
  }
}

.radio-button-group {
  .el-form-item__label {
    padding-right: 0;
  }

  .form-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .form-slot {
    width: 100%;

    &>* {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>