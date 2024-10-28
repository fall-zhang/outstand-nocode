<!-- 右侧用于 -->
<!-- RadioButtonGroup -->
<script setup lang="ts">
import Icon from '@/assets'
defineOptions({
  name: 'ConfigTypeComponent'
})

const emit = defineEmits(['listener'])
type NodeItem = {
  label: string
  value: string | number
  disabled?: boolean
  icon: string
}
type Prop = {
  label?: string
  nodes?: NodeItem[]
  height?: number
  property?: string
  val?: string | number | boolean
  fontSize?: number
  layoutType?: 'breakLine' | 'inline' | 'slot'
}
const { height = 50, property = '', fontSize = 16, layoutType = 'breakLine' } = defineProps<Prop>()
const fireEvent = (property: string, item: unknown) => {
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
        <el-radio-group v-if="layoutType === 'inline'" size="small" :modelValue="val"
          @change="(curVal) => fireEvent(property, { value: curVal })">
          <el-radio-button v-for="item in nodes" :value="item.value" :key="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </template>
    <ul v-if="layoutType === 'breakLine'" ref="elements" class="form-content" :style="{ height: height + 2 + 'px' }">
      <li @click="() => !item.disabled && fireEvent(property, item)" v-for="item in nodes" :key="item.value" :class="{
        'Selected': val !== undefined && item.value === val,
        'Disabled': item.disabled
      }">
        <Icon :icon="item.icon" :fontSize="fontSize" />
      </li>
    </ul>
    <div class="form-slot" v-if="layoutType === 'slot'">
      <slot></slot>
    </div>
  </el-form-item>
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