<!-- 右侧的面包屑和全局配置面板 -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed, reactive, watch, onMounted } from 'vue'
import PanelsConfigComponentsPropsPanel from './components/PropsPanel.vue'
import GlobalConfigPanel from './ConfigPanelGlobal.vue'
import { isEmpty } from '@/utils/utils'
import { fieldLabel } from '@Form/utils/field'
import { useFormProvider } from '../../hooks/use-form-provider'
defineOptions({
  name: 'ConfigPanel',
  inheritAttrs: false,
  customOptions: {}
})
const { selected, isSelectRoot, handler } = useFormProvider()
const { t } = useI18n()
const activeName0 = ref('props')
const form = ref()

const validator = (rule: any, value: any, callback: any) => {
  const newValue = value.trim()
  const fn = (type: any) => {
    switch (type) {
      case 0:
        callback(new Error(t('rf.validateMsg.required')))
        break
      case 1:
        callback()
        break
      case 2:
        callback(new Error(t('rf.validateMsg.idUnique')))
        break
    }
  }
  if (isEmpty(newValue)) {
    fn(0)
  } else {
    fn(1)
  }
}
onMounted(() => {
  form.value.validate()
})
const rules = reactive({
  key: [
    {
      required: true,
      trigger: 'blur',
      validator
    }
  ]
})
const breadcrumbList = computed(() => {
  const nodes = ['root']
  let result = []
  if (!isSelectRoot.value) {
    // const targetNodes = selected.value?.context?.parents.filter((e: any) => !['inline', 'tr'].includes(e.type))
    // if (targetNodes) {
    // nodes = nodes.concat(targetNodes)
    // }
  }
  if (nodes.length > 4) {
    result.push(nodes[0])
    result.push({
      value: 'placeholder'
    })
    result.push(nodes.at(-2))
    result.push(nodes.at(-1))
  } else {
    result = nodes
  }
  result = result.map((node: any) => {
    const result = {
      node,
      label: ''
    }
    if (node === 'root') {
      result.label = t('rf.panels.config')
    } else if (node && node.value !== 'placeholder') {
      if (['col' + 'collapseCol' + 'tabsCol' + 'td'].includes(node.type)) {
        result.label = t(`er.layout.${node.type}`)
      } else {
        result.label = fieldLabel(t, node)
      }
    }
    return result
  })
  return result
})
const handleBreadcrumbClick = (item: any, index: number) => {
  if (index !== breadcrumbList.value.length - 1 && item.node.value !== 'placeholder') {
    if (item !== 'root') {
      handler.value.setSelection(item)
    } else {
      handler.value.setSelection({
        type: 'root',
        id: 'root',
        label: ''
      })
    }
  }
}
watch(selected, () => {
  if (isSelectRoot.value) {
    activeName0.value = 'root'
  } else {
    activeName0.value = 'props'
  }
}, {
  immediate: true
})
</script>
<template>
  <el-aside :class="['right-panel', $style.config]" width="320px">
    <el-breadcrumb :class="$style.breadcrumb" separator-icon="ArrowRight">
      <el-breadcrumb-item @click="handleBreadcrumbClick(item.node, index)" v-for="(item, index) in breadcrumbList"
        :key="index">
        {{ item.node.value === 'placeholder' ? '...' : item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="selected" :rules="rules" label-width="120px" label-position="top">
      <el-scrollbar>
        <div :class="$style.wrap">
          <div v-if="isSelectRoot">
            <GlobalConfigPanel></GlobalConfigPanel>
          </div>
          <div v-else>
            <PanelsConfigComponentsPropsPanel :key="selected.id" />
          </div>
        </div>
      </el-scrollbar>
    </el-form>
  </el-aside>
</template>
<style module lang="scss">
.config {
  position: relative;
  z-index: 3;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

  .el-form-item__label {
    color: #333333;
    font-weight: 400;
    font-size: 14px;
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
    padding: 0;
  }

  .breadcrumb {
    height: 40px;
    overflow: hidden;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    box-sizing: border-box;
    padding: 12px 12px;

    .el-breadcrumb__inner {
      line-height: 18px;
      font-size: 12px;
    }

    .el-breadcrumb__inner {
      cursor: pointer !important;
    }

    &>span:not(:last-child) {
      span {
        color: #666666;
      }
    }

    &>span:last-child {
      span {
        color: #303133 !important;
      }
    }
  }

  .wrap {
    padding: 12px;
  }
}
</style>