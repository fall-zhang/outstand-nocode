<script setup lang="ts">
import { useTarget } from '@/hooks'
import { useI18n } from 'vue-i18n'
import { ref, unref, computed } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import CompleteButton from '@/views/rich-form/components/CompleteButton.vue'
import TypeComponent from './components/TypeComponent.vue'
import PanelsConfigComponentsLogicComponent from './components/LogicComponent.vue'
import { FileQuestion } from '@icon-park/vue-next'
import { isEqual } from 'ohash'
import { deepClone, get, set } from '@/utils/utils'
defineOptions({
  name: 'GlobalConfigPanel',
  inheritAttrs: false,
  customOptions: {}
})
const {
  target,
  state,
  isPC
} = useTarget()
const { t } = useI18n()
const visible = ref(false)
const buttonRef = ref()
const popoverRef = ref()
const radio1 = ref('pc')
const handleModelValue = (type: string, value: any) => {
  const platforms = target.value.isSync ? ['pc', 'mobile'] : [state.platform]
  platforms.forEach((e) => {
    set(target.value, `${e}.${type}`, value)
  })
}
const popperPaneRef = computed(() => {
  return get(unref(popoverRef), 'popperRef.contentRef', '')
})
let handleConfirm = ''
const handleBeforeChange = () => {
  // visible.value = true
  return new Promise((resolve, reject) => {
    const platform = unref(target)
    const pcObj = {
      labelPosition: platform.pc.labelPosition,
      completeButton: platform.pc.completeButton
    }
    const mobileObj = {
      labelPosition: platform.mobile.labelPosition,
      completeButton: platform.mobile.completeButton
    }
    if (isEqual(pcObj, mobileObj)) {
      resolve(true)
    } else {
      visible.value = true
      handleConfirm = resolve
    }
  })
}
const onClickOutside = () => {
  visible.value = false
}
const onConfirm = () => {
  const targetObj = target.value[radio1.value === 'pc' ? 'mobile' : 'pc']
  const sourceObj = {
    labelPosition: unref(target)[radio1.value].labelPosition,
    completeButton: unref(target)[radio1.value].completeButton,
  }
  Object.assign(targetObj, deepClone(sourceObj))
  handleConfirm(true)
}
const alignOptions = computed(() => {
  return [
    {
      label: t('rf.config.globalConfig.labelPosition.top'),
      value: 'top',
      icon: 'labelStructureP1'
    },
    {
      label: t('rf.config.globalConfig.labelPosition.left'),
      value: 'left',
      icon: 'labelStructureP2'
    },
    {
      label: t('rf.config.globalConfig.labelPosition.right'),
      value: 'right',
      icon: 'labelStructureP3'
    }
  ]
})

const options1 = computed(() => {
  return [
    {
      label: t('rf.config.globalConfig.componentSize.large'),
      value: 'large'
    },
    {
      label: t('rf.config.globalConfig.componentSize.default'),
      value: 'default'
    },
    {
      label: t('rf.config.globalConfig.componentSize.small'),
      value: 'small'
    }
  ]
})
const handleTypeListener = ({ property, data }) => {
  switch (property) {
    case 'labelPosition':
      handleModelValue('labelPosition', data.value)
      break
    case 'size':
      target.value[state.platform].size = data.value
      break
  }
}
</script>
<template>
  <div class="GlobalConfigPanel">
    <el-popover virtual-triggering :visible="visible" ref="popoverRef" :virtual-ref="buttonRef" :width="200">
      <template #reference>
        <div class="syncContent">
          <el-icon color="#f90">
            <FileQuestion />
          </el-icon>
          {{ t('rf.config.globalConfig.sync.warning') }}
        </div>
        <el-radio-group class="syncType" v-model="radio1">
          <el-radio value="pc">pc</el-radio>
          <el-radio value="mobile">mobile</el-radio>
        </el-radio-group>
      </template>
      <div class="syncActions">
        <el-button size="small" :text="true" @click="() => visible = false">{{ t('rf.public.cancel') }}</el-button>
        <el-button size="small" type="primary" @click="onConfirm(2)">
          {{ t('rf.public.confirm') }}
        </el-button>
      </div>
    </el-popover>
    <el-form-item :label="t('rf.config.globalConfig.sync.label')" label-position="left">
      <el-switch ref="buttonRef" v-click-outside:[popperPaneRef]="onClickOutside" :before-change="handleBeforeChange"
        v-model="target.isSync" />
    </el-form-item>
    <TypeComponent v-if="isPC" @listener="handleTypeListener" property="size" :layoutType="2"
      :label="t('rf.config.globalConfig.componentSize.label')" :val="target[state.platform].size" :nodes="options1" />
    <TypeComponent @listener="handleTypeListener" property="labelPosition"
      :label="t('rf.config.globalConfig.labelPosition.label')" :height="66" :fontSize="80"
      :val="target[state.platform].labelPosition" :nodes="alignOptions" />
    <el-form-item :label="t('rf.public.button')">
      <div style="width: 100%;">
        <CompleteButton mode="preview" />
        <div>
          <el-row :gutter="8">
            <el-col>
              <el-form-item :label="t('rf.public.text')">
                <el-input :model-value="target[state.platform].completeButton.text" show-word-limit :maxlength="20"
                  @update:modelValue="(e) => handleModelValue('completeButton.text', e)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="8" style="margin-top: 20px;">
            <el-col :span="12">
              <el-form-item :label="t('rf.public.color')">
                <el-color-picker popper-class="completeButtonColor"
                  :model-value="target[state.platform].completeButton.color"
                  @update:modelValue="(e) => handleModelValue('completeButton.color', e)" show-alpha />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="t('rf.public.backgroundColor')">
                <el-color-picker popper-class="completeButtonColor"
                  :model-value="target[state.platform].completeButton.backgroundColor"
                  @update:modelValue="(e) => handleModelValue('completeButton.backgroundColor', e)" show-alpha />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form-item>
    <PanelsConfigComponentsLogicComponent />
  </div>
</template>
<style lang="scss" scoped>
.GlobalConfigPanel {
  overflow-y: hidden;
  padding: 16px;

  .el-form-item__label {
    color: #333333;
  }

  .subhead {
    font-size: 12px;
    color: #666;
    margin-top: -10px;
  }

  &>form {
    height: calc(100% - 40px);
  }

  .el-tabs {
    .el-tabs__header {
      background: none;
      padding: 16px 0;
    }

    &,
    .el-tabs__header,
    .el-tabs__item {
      border: none !important;
    }

    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      display: none;
    }

    .el-tabs__nav-wrap {
      padding: 0;
      margin: 0;
    }

    .el-tabs__nav {
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      padding: 2px;
      background: #F2F2F2;

      &>* {
        flex: 1;
      }

      .el-tabs__item {
        border-radius: 4px;
        line-height: 36px;
        height: 36px;
        margin: 0;
        color: #666666;
        text-align: center;
      }
    }
  }

  .el-tabs__content,
  .el-tab-pane {
    height: calc(100vh - 160px);
    padding: 0;
  }

  .breadcrumb {
    &>span:not(:last-child) {
      span {
        color: #909399;
      }
    }

    &>span:last-child {
      span {
        color: #303133;
      }
    }
  }

  .syncContent {
    display: flex;
    align-items: center;

    .el-icon {
      margin-right: 5px;
    }
  }

  .syncType {
    display: flex;
    justify-content: center;
  }

  .syncActions {
    text-align: right;
    margin-top: 8px;
  }

  .completeButtonColor {
    .el-color-dropdown__link-btn {
      display: none;
    }
  }
}
</style>