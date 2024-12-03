<!-- 右侧用于 -->
<script setup lang="ts">
const emit = defineEmits(['change', 'update:modelValue'])
type NodeItem = {
  label: string | number
  value: string | number
  disabled?: boolean
  icon?: string
}
type Prop = {
  radioList?: NodeItem[]
  height?: number
  property?: string
  modelValue?: string | number | boolean
  fontSize?: number
  layoutType?: 'breakLine' | 'inline' | 'slot'
}
defineProps<Prop>()
const onChangeRadio = (property: string | number | boolean | undefined) => {
  emit('change', property)
  emit('update:modelValue', property)
}
</script>
<template>
  <el-radio-group size="small" :modelValue="modelValue" @change="onChangeRadio">
    <el-radio-button v-for="item in radioList" :label="item.label" :value="item.value" :key="item.value">
      <!-- {{ item.label }} -->
    </el-radio-button>
  </el-radio-group>
</template>
<style lang="scss" scoped>
.radio-button-group {
  padding: 0 0 10px;

  .form-content {
    display: flex;
    width: 100%;

    li {
      flex: 1;
      border: 1px solid #DDDDDD;
      border-radius: 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        border-color: var(--primary-color);
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