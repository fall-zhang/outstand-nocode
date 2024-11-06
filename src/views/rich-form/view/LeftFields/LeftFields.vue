// 左侧功能面板
<template>
  <ElAside :class="$style.Fields" width="220px">
    <ElMenu :default-openeds="FE.fieldsList.map(item => item.id)">
      <ElSubMenu v-for="eleGroup in FE.fieldsList" :key="eleGroup.id" :index="eleGroup.id">
        <template #title>
          {{ t(`rf.fields.${eleGroup.id}`) }}
        </template>
        <DraggableWrap :class="$style.dragContent" :list="eleGroup.list" :clone="handleClone" tag="ul" :sort="false"
          :move="handleMove" v-bind="dragOptions" :group="{ name: 'nocode-form', pull: 'clone', put: false }"
          item-key="null">
          <template #item="{ element }">
            <li @click="() => addStore(element)">
              <Icon :class="$style.icon" :icon="element.icon"></Icon>
              <span>{{ fieldLabel(t, element) }}</span>
            </li>
          </template>
        </DraggableWrap>
      </ElSubMenu>
    </ElMenu>
  </ElAside>
</template>

<script lang="ts" setup>

import { useI18n } from 'vue-i18n'
import { deepClone } from '@/utils'
import { DraggableWrap } from '@Form/components/DraggableWrap'
import { reactive } from 'vue'

import Icon from '@/assets'
import ControlInsertionPlugin from '@Form/components/FormContainer/ControlInsertionPlugin'
import $style from './index.module.scss'
import { fieldLabel, wrapElement } from '@/utils/field'
import { useFormProvider } from '@Form/hooks/use-form-provider'
import type { FieldItemBase, FieldItemContainer } from '../../types/rich-form-item'
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const { t } = useI18n()
const FE = reactive(useFormProvider())
const addStore = (element: FieldItemContainer | FieldItemBase) => {
  // 拖拽之后默认选中
  const newElement = reactive(wrapElement(deepClone(element)))
  // addContext(newElement, state.store)
  FE.handler.addFieldItem(newElement)
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
