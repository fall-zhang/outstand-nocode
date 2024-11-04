<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, unref, computed } from 'vue'
// import CompleteButton from '@Form/components/CompleteButton.vue'
import TypeComponent from './components/TypeComponent.vue'
import PanelsConfigComponentsLogicComponent from './components/LogicComponent.vue'
import { FileQuestion } from '@icon-park/vue-next'
import { deepClone, set } from '@/utils/utils'
import { useFormProvider } from '../../hooks/use-form-provider'
defineOptions({
  name: 'GlobalConfigPanel',
  inheritAttrs: false,
  customOptions: {}
})

const { isDesktop, platform, selected, config, desktop, mobile } = useFormProvider()

const { t } = useI18n()
const visible = ref(false)
const buttonRef = ref()
const popoverRef = ref()
const radio1 = ref<'desktop' | 'mobile'>('desktop')
const handleModelValue = (type: string, value: any) => {
  const platforms = selected.value ? ['desktop', 'mobile'] : [platform]
  platforms.forEach((e) => {
    set(selected.value, `${e}.${type}`, value)
  })
}

const onConfirm = () => {
  // handleConfirm(true)
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

const sizeOptionList = computed(() => {
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
const onSizeChange = (data: any) => {
  desktop.value.formOption.size = data
}
const onTypeChange = (data: any) => {
  handleModelValue('labelPosition', data)
}

const curPlatformConf = computed(() => {
  if (platform.value === 'desktop') {
    return desktop.value
  }
  return mobile.value
})
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
          <el-radio value="desktop">desktop</el-radio>
          <el-radio value="mobile">mobile</el-radio>
        </el-radio-group>
      </template>
      <div class="syncActions">
        <el-button size="small" :text="true" @click="() => visible = false">{{ t('rf.public.cancel') }}</el-button>
        <el-button size="small" type="primary" @click="onConfirm">
          {{ t('rf.public.confirm') }}
        </el-button>
      </div>
    </el-popover>
    {{ 'layout-type-2' }}
    <TypeComponent v-if="isDesktop" @change="onSizeChange" property="size" layoutType="singleLine"
      :label="t('rf.config.globalConfig.componentSize.label')" :val="desktop.formOption.size" :nodes="sizeOptionList" />
    {{ 'layout-type-1' }}
    <TypeComponent @change="onTypeChange" property="labelPosition"
      :label="t('rf.config.globalConfig.labelPosition.label')" :height="66" :fontSize="80"
      :val="curPlatformConf.formOption.labelPosition" :nodes="alignOptions" />
    <el-form-item :label="t('rf.public.button')">
      <div style="width: 100%;">
        <!-- <CompleteButton mode="preview" /> -->
        <!-- <el-row :gutter="8">
          <el-col>
            <el-form-item :label="t('rf.public.text')">
              <el-input :model-value="selected[platform].completeButton.text" show-word-limit :maxlength="20"
                @update:modelValue="(e) => handleModelValue('completeButton.text', e)"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row :gutter="8" style="margin-top: 20px;">
          <el-col :span="12">
            <el-form-item :label="t('rf.public.color')">
              <el-color-picker popper-class="completeButtonColor" :model-value="selected[platform].completeButton.color"
                @update:modelValue="(e) => handleModelValue('completeButton.color', e)" show-alpha />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="t('rf.public.backgroundColor')">
              <el-color-picker popper-class="completeButtonColor"
                :model-value="selected[platform].completeButton.backgroundColor"
                @update:modelValue="(e) => handleModelValue('completeButton.backgroundColor', e)" show-alpha />
            </el-form-item>
          </el-col>
        </el-row> -->
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