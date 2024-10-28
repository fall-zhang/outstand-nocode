<script setup lang="ts">
import Icon from '@/assets'
import { useFormProvider } from '@/views/rich-form/hooks/use-form-provider';
defineOptions({
  name: 'ConfigCollapseComponent',
  inheritAttrs: false,
  customOptions: {}
})
const { selected } = useFormProvider()
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
            <slot name="subSelect" v-if="selected[operationKey][field]"></slot>
          </div>
          <Icon :icon="selected[operationKey][field] ? 'minus' : 'plus'"
            @click="selected[operationKey][field] = !selected[operationKey][field]"></Icon>
        </div>
      </template>
      <slot name="content" v-if="selected[operationKey][field]"></slot>
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