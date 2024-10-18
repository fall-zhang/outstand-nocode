// 左侧功能面板
<template>
  <ElAside :class="$style.Fields" :width="ER.config.fieldsPanelWidth">
    <ElMenu :default-openeds="ER.config.fieldsPanelDefaultOpened">
      <ElSubMenu v-for="element in ER.fieldsList" :key="element.id" :index="element.id">
        <template #title>
          {{ t(`rf.fields.${element.id}`) }}
        </template>
        <DraggableWrap :class="$style.dragContent" :list="element.list" :clone="handleClone" tag="ul" :sort="false"
          :move="handleMove" v-bind="dragOptions" :group="{ name: 'er-Canvas', pull: 'clone', put: false }"
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
import { useTarget } from '@Form/hooks/use-target'
import { addContext, deepClone } from '@/utils'
import { DraggableWrap } from '@Form/components/FormContainer/DraggableWrap'
import { inject, reactive, nextTick } from 'vue'

import Icon from '@/assets'
import ControlInsertionPlugin from '@Form/components/FormContainer/ControlInsertionPlugin'
import $style from './index.module.scss'
import { RichFormProvider } from '@Form/types/rich-form'
import { fieldLabel } from '@/utils/field'
defineProps({
  type: {
    type: Number,
    default: 1
  },
  visible: {
    type: Boolean,
    default: false
  }
})
const ER = inject<RichFormProvider>('rich-form')!
const { t } = useI18n()
const {
  state,
  setSelection
} = useTarget()
const addStore = (element: any) => {
  const newElement = reactive(ER?.handler.wrapElement(deepClone(element), {}))
  state.store.push(newElement)
  addContext(newElement, state.store)
  setSelection(newElement)
  // nextTick(() => {
  //   setTimeout(() => {
  //     ER.canvasScrollRef.value.setScrollTop(ER.canvasScrollRef.value.wrapRef.scrollHeight)
  //   }, 100)
  // })
}
const handleClone = (element: any) => {
  console.log('🚀 ~ handleClone ~ element:', element)
}
const handleMove = () => {
  return true
}
const dragOptions = reactive({
  ControlInsertion: true,
  dataSource: 'block',
  direction: 'horizontal',
  scroll: false,
  plugins: [ControlInsertionPlugin(ER)]
})

</script>

<style lang="scss" scoped></style>
