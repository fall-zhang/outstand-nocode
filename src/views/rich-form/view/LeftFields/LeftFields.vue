// 左侧功能面板
<template>
  <ElAside :class="$style.Fields" :width="FE.config.fieldsPanelWidth">
    <ElMenu :default-openeds="FE.config.fieldsPanelDefaultOpened">
      <ElSubMenu v-for="element in FE.fieldsList" :key="element.id" :index="element.id">
        <template #title>
          {{ t(`rf.fields.${element.id}`) }}
        </template>
        <DraggableWrap :class="$style.dragContent" :list="element.list" :clone="handleClone" tag="ul" :sort="false"
          :move="handleMove" v-bind="dragOptions" :group="{ name: 'nocode-form', pull: 'clone', put: false }"
          item-key="null">
          <template #item="{ ele2 }">
            <li @click="() => addStore(ele2)">
              <Icon :class="$style.icon" :icon="ele2.icon"></Icon>
              <span>{{ fieldLabel(t, ele2) }}</span>
            </li>
          </template>
        </DraggableWrap>
      </ElSubMenu>
    </ElMenu>
  </ElAside>
</template>

<script lang="ts" setup>

import { useI18n } from 'vue-i18n'
import { useTarget } from '@Form/hooks/use-target'
import { addContext, deepClone } from '@/utils'
import { DraggableWrap } from '@Form/components/FormContainer/DraggableWrap'
import { reactive } from 'vue'

import Icon from '@/assets'
import ControlInsertionPlugin from '@Form/components/FormContainer/ControlInsertionPlugin'
import $style from './index.module.scss'
import { fieldLabel } from '@/utils/field'
import { useFormProvider } from '../../hooks/use-form-provider'
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const { t } = useI18n()
const FE = reactive(useFormProvider())
const { state } = useTarget()
const addStore = (element: any) => {
  const newElement = reactive(FE.handler.wrapElement(deepClone(element), {}))
  addContext(newElement, state.store)
  FE.handler.setSelection(newElement)
  // nextTick(() => {
  //   setTimeout(() => {
  //     // 跳转到最后拖拽的元素
  //     FE.canvasScrollRef.value.setScrollTop(FE.canvasScrollRef.value.wrapRef.scrollHeight)
  //   }, 100)
  // })
}
const handleClone = (element: any) => {
  return deepClone(element)
}
const handleMove = () => {
  return true
}
const dragOptions = reactive({
  ControlInsertion: true,
  dataSource: 'block',
  direction: 'horizontal',
  scroll: false,
  plugins: [ControlInsertionPlugin(FE)]
})

</script>

<style lang="scss" scoped></style>
