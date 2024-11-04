<script setup lang="ts">
import TypeComponent from './TypeComponent.vue'
import { useFormProvider } from '@Form/hooks/use-form-provider'
import { useI18n } from 'vue-i18n'

import Icon from '@/assets/index.vue'
defineOptions({
  name: 'ConfigBorder',
  inheritAttrs: false,
  customOptions: {}
})
const { selected } = useFormProvider()
const { t } = useI18n()

const borderActions = new Array(8).fill('tableStokeP').map((e, i) => ({
  value: i,
  icon: e + (i + 1)
}))
if (['table'].includes(selected.value.type)) {
  const currentSelect = selected.value
  if (!currentSelect.style?.borderColor || !currentSelect.style?.borderWidth || !currentSelect.style?.borderType) {
    currentSelect.style.borderColor = '#000'
    currentSelect.style.borderWidth = currentSelect.style.borderType = 1
  }
} else if (!selected.value.style.border) {
  selected.value.style.borderRadius = 0
  selected.value.style.border = {
    width: 1,
    style: 'solid',
    color: '#4285f4'
  }
}

const handleTypeListener = ({ property, data }: any) => {
  if (property === 'borderType') {
    selected.value.style.borderType = data.value
  }
}
</script>
<template>
  <div class="ConfigBorder">
    <div v-if="['table'].includes(selected.type)">
      <TypeComponent @change="handleTypeListener" property="borderType" :height="30" :fontSize="18"
        :val="selected.style.borderType" :nodes="borderActions" label="" />
      <el-row justify="space-between" align="middle">
        <el-col :span="5">
          <el-color-picker v-model="selected.style.borderColor" />
        </el-col>
        <el-col :span="18">
          <el-form-item size="default" :label="t('rf.config.borderComponent.borderWidth')">
            <el-input-number style="width: 100%;" :min="0" v-model="selected.style.borderWidth"
              controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row justify="space-between" align="middle">
        <el-col :span="3">
          <el-form-item>
            <el-color-picker v-model="selected.style.border.color" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template #label>
              <Icon icon="lineThickness" />
            </template>
            <el-input-number :step="1" :min="0" v-model="selected.style.border.width" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template #label>
              <Icon icon="radius" />
            </template>
            <el-input-number :step="1" :min="0" v-model="selected.style.borderRadius" controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ConfigBorder {
  .borderStyle {
    display: flex;
    justify-content: space-around;

    li {
      width: 32px;
      height: 32px;
      display: flex;
      background: #F9F9F9;
      justify-content: center;
      align-items: center;
      border: 1px solid #F2F6FC;
      border-radius: 4px;

      &:hover,
      &.active {
        border-color: $primary-color;
      }
    }
  }
}
</style>