<script>
import PanelsConfigComponentsTypeComponent from './TypeComponent.vue'
import {
  useTarget,
  useI18n
} from '@/hooks'
import Icon from '@/assets'
import _ from 'lodash-es'
export default {
  name: 'ConfigBorder',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  target,
  checkTypeBySelected
} = useTarget()
const {
  t
} = useI18n()

const borderActions = new Array(8).fill('tableStokeP').map((e, i) => {
  return {
    value: i,
    icon: e + (i + 1)
  }
})
if (checkTypeBySelected(['table'])) {
  if (!_.has(target.value.style, 'borderColor') || !_.has(target.value.style, 'borderWidth') || !_.has(target.value.style, 'borderType')) {
    target.value.style.borderColor = '#000'
    target.value.style.borderWidth = target.value.style.borderType = 1
  }
} else if (!target.value.style.border) {
  target.value.style.borderRadius = 0
  target.value.style.border = {
    width: 1,
    style: 'solid',
    color: '#4285f4'
  }
}

const handleTypeListener = ({ property, data }) => {
  if (property === 'borderType') {
    target.value.style.borderType = data.value
  }
}
</script>
<template>
  <div class="ConfigBorder">
    <div v-if="checkTypeBySelected(['table'])">
      <PanelsConfigComponentsTypeComponent @listener="handleTypeListener" property="borderType" :height="30"
        :fontSize="18" :val="target.style.borderType" :nodes="borderActions" />
      <el-row justify="space-between" align="middle">
        <el-col :span="5">
          <el-color-picker v-model="target.style.borderColor" />
        </el-col>
        <el-col :span="18">
          <el-form-item size="default" :label="t('er.config.borderComponent.borderWidth')">
            <el-input-number style="width: 100%;" :min="0" v-model="target.style.borderWidth"
              controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row justify="space-between" align="middle">
        <el-col :span="3">
          <el-form-item>
            <el-color-picker v-model="target.style.border.color" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template #label>
              <Icon icon="lineThickness" />
            </template>
            <el-input-number :step="1" :min="0" v-model="target.style.border.width" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template #label>
              <Icon icon="radius" />
            </template>
            <el-input-number :step="1" :min="0" v-model="target.style.borderRadius" controls-position="right" />
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
      &:hover,&.active {
        border-color: $primary-color;
      }
    }
  }
}
</style>