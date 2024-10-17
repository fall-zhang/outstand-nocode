<!-- 右侧用于 -->
<!-- RadioButtonGroup -->
<script setup lang="ts">
import Icon from '@/assets'
defineOptions({
  name: 'ConfigTypeComponent'
})
const emit = defineEmits(['listener'])

const {
  height = 100,
  fontSize = 16,
  label = '',
  layoutType = 'multiLine' // 取消使用数字，改为 'inline'
} = defineProps<{
  label?: string,
  nodes: any[],
  height?: number
  property: string
  val: string | boolean | number
  fontSize?: number
  layoutType?: 'singleLine' | 'multiLine'
}>()
const fireEvent = (property: string, item: any) => {
  emit('listener', {
    property,
    data: item
  })
}
</script>
<template>
  <el-form-item class="radio-button-group">
    <template v-if="label" #label>
      <div class="form-label">
        <div>{{ label }}</div>
        <el-radio-group v-if="layoutType === 'singleLine'" size="small" :modelValue="val"
          @change="(curVal) => fireEvent(property, { value: curVal })">
          <el-radio-button v-for="item in nodes" :value="item.value" :key="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </template>
    <ul v-if="layoutType === 'multiLine'" ref="elements" class="form-content" :style="{ height: height + 2 + 'px' }">
      <li @click="() => !item.disabled && fireEvent(property, item)" v-for="item in nodes" :key="item.value" :class="{
        'Selected': val !== undefined && item.value === val,
        'Disabled': item.disabled
      }">
        <Icon :icon="item.icon" :fontSize="fontSize" />
      </li>
    </ul>
  </el-form-item>
</template>
<style lang="scss" scoped>
:deep(.radio-button-group) {
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
        border-color: $primary-color;
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