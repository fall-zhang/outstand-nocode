<script>
import { useTarget } from '@/hooks'
import Icon from '@/assets'
export default {
  name: 'ConfigCollapseComponent',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  target
} = useTarget()
const props = defineProps({
  field: {
    type: String,
    required: true
  },
  operationKey: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="ConfigCollapseComponent">
    <el-form-item>
      <template #label>
        <div class="form-label">
          <div>
            <div>{{ label }}</div>
            <slot name="subSelect" v-if="target[operationKey][field]"></slot>
          </div>
          <Icon :icon="target[operationKey][field] ? 'minus' : 'plus'"
            @click="target[operationKey][field] = !target[operationKey][field]"></Icon>
        </div>
      </template>
      <slot name="content" v-if="target[operationKey][field]"></slot>
    </el-form-item>
  </div>
</template>
<style lang="scss" scoped>
.ConfigCollapseComponent {
  .el-form-item__label {
    padding: 0;
  }

  .form-label {
    display: flex;
    justify-content: space-between;

    &>div {
      display: flex;
      align-items: baseline;

      &>div:first-child {
        margin-right: 8px;
      }
    }
  }

  .ER-icon {
    cursor: pointer;
  }

  .el-dropdown {
    :focus {
      outline: 0;
    }
  }
}
</style>