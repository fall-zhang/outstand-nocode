<!-- 右侧用于 -->
<!-- RadioButtonGroup -->
<script setup lang="ts">
import Icon from '@/assets'
defineOptions({
  name: 'ConfigTypeComponent'
})
const emit = defineEmits(['listener'])

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  nodes: {
    type: Array,
    default: () => []
  },
  height: {
    type: Number,
    default: 100
  },
  property: {
    type: String,
    default: ''
  },
  val: {
    type: [String, Number, Boolean],
    default: ''
  },
  fontSize: {
    type: Number,
    default: 16
  },
  layoutType: {
    type: [Number, String],
    // 全部改为 inline，
    default: 1
  }
})
const fireEvent = (property: string, item: any) => {
  emit('listener', {
    property,
    data: item
  })
}
</script>
<template>
  <div class="radio-button-group">
    <el-form-item>
      <template v-if="label" #label>
        <div class="form-label">
          <div>{{ label }}</div>
          <template v-if="layoutType === 2">
            <el-radio-group size="small" :modelValue="val" @change="(curVal) => fireEvent(property, { value: curVal })">
              <el-radio-button v-for="item in nodes" :value="item.value" :key="item.value">
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </template>
        </div>
      </template>
      <ul v-if="layoutType === 1" ref="elements" class="form-content" :style="{ height: height + 2 + 'px' }">
        <li @click="() => !item.disabled && fireEvent(property, item)" v-for="item in nodes" :key="item.value" :class="{
          'Selected': val !== undefined && item.value === val,
          'Disabled': item.disabled
        }">
          <Icon :icon="item.icon" :fontSize="fontSize" />
        </li>
      </ul>
      <div class="form-slot">
        <slot v-if="layoutType === 0"></slot>
      </div>
    </el-form-item>
  </div>
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