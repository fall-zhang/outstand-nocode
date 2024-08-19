<!-- 右侧的面包屑和全局配置面板 -->
<script setup lang="ts">
import utils from '@/utils'
import { useTarget } from '@/hooks/use-target'
import { useI18n, useNamespace } from '@/hooks'
import { ref, computed, reactive, watch, onMounted, inject } from 'vue'
import PanelsConfigComponentsPropsPanel from './components/PropsPanel.vue'
import GlobalConfigPanel from './components/GlobalConfigPanel.vue'
import { isEmpty } from '@/utils/utils'
defineOptions({
  name: 'ConfigPanel',
  inheritAttrs: false,
  customOptions: {}
})
const props = defineProps({
  mode: {
    type: String,
    default: 'editor'
  }
})
const {
  state,
  isSelectAnyElement,
  isSelectRoot,
  setSelection,
  target,
} = useTarget()
const ER = inject('Everright')
const { t } = useI18n()
const activeName0 = ref('props')
const ns = useNamespace('Config')
const form = ref()

const validator = (rule, value, callback) => {
  const newValue = value.trim()
  const fn = (type) => {
    switch (type) {
      case 0:
        callback(new Error(t('er.validateMsg.required')))
        break
      case 1:
        callback()
        break
      case 2:
        callback(new Error(t('er.validateMsg.idUnique')))
        break
    }
  }
  if (props.mode === 'editor') {
    state.validator(target.value, fn)
  } else if (isEmpty(newValue)) {
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
  let nodes = ['root']
  let result = []
  if (!isSelectRoot.value) {
    nodes = nodes.concat(target.value?.context?.parents.filter(e => !/^(inline|tr)$/.test(e.type)))
  }
  if (nodes.length > 4) {
    result.push(nodes[0])
    result.push({
      value: 'placeholder'
    })
    result.push(nodes[nodes.length - 2])
    result.push(nodes[nodes.length - 1])
  } else {
    result = nodes
  }
  return result.map(node => {
    const result = {
      // eslint-disable-next-line
      node: node,
      label: ''
    }
    console.log("🚀 ~ breadcrumbList ~ node.value:", node)
    if (node === 'root') {
      result.label = t('er.panels.config')
    } else if (node && node.value !== 'placeholder') {

      if (/^(col|collapseCol|tabsCol|td)$/.test(node.type)) {
        result.label = t(`er.layout.${node.type}`)
      } else {
        result.label = utils.fieldLabel(t, node)
      }
    }
    return result
  })
})
const handleBreadcrumbClick = (item: unknown, index: number) => {
  if (index !== breadcrumbList.value.length - 1 && item.node.value !== 'placeholder') {
    if (item !== 'root') {
      setSelection(item)
    } else {
      setSelection('root')
    }
  }
}
watch(target, () => {
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
  <el-aside :class="['right-panel', ns.b()]" :width="ER.props.configPanelWidth">
    <el-breadcrumb :class="[ns.e('breadcrumb')]" separator-icon="ArrowRight">
      <el-breadcrumb-item @click="handleBreadcrumbClick(item.node, index)" v-for="(item, index) in breadcrumbList"
        :key="index">
        {{ item.node.value === 'placeholder' ? '...' : item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="target" :rules="rules" label-width="120px" label-position="top">
      <el-scrollbar>
        <div :class="[ns.e('wrap')]">
          <div v-if="isSelectAnyElement">
            <PanelsConfigComponentsPropsPanel :key="target.id" />
          </div>
          <div v-if="isSelectRoot">
            <GlobalConfigPanel></GlobalConfigPanel>
          </div>
        </div>
      </el-scrollbar>
    </el-form>
  </el-aside>
</template>
