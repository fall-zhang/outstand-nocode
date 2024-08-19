<script>
import utils from '@/utils'
import { useTarget, useI18n, useNamespace } from '@/hooks'
import { unref } from 'vue'
import { dragGableWrap } from '@/views/rich-form/components/Layout/DragGable'
import Icon from '@/assets'
export default {
  name: 'ConfigData3'
}
</script>
<script setup>
const {
  target
} = useTarget()
const {
  t
} = useI18n()
const ns = useNamespace('ConfigData3')
const addTab = (type) => {
  const data = utils.renderFieldData(`${target.value.type}Col`)
  data.label = `Tab ${unref(target).columns.length + 1}`
  // console.log(unref(target))
  unref(target).columns.push(data)
  utils.addContext(data, target.value)
}
</script>
<template>
  <el-form-item>
    <template #label>
      <div :class="[ns.e('title')]">
        <span class="el-form-item__label">{{ t('er.config.dataComponent3.panel') }}</span>
        <el-button text @click="addTab">{{ t('er.config.dataComponent3.add') }}</el-button>
      </div>
    </template>
    <div style="width: 100%;">
      <dragGableWrap :list="target.columns" item-key="id" tag="ul" handle=".handle" :class="[ns.e('content')]">
        <template #item="{ element, index }">
          <li>
            <el-input size="default" clearable v-model="element.label" />
            <div :class="ns.e('operate')">
              <Icon :class="[ns.e('icon')]" @click="target.columns.splice(index, 1)" icon="delete"></Icon>
              <Icon :class="[ns.e('icon'), 'handle']" icon="Rank"></Icon>
            </div>
          </li>
        </template>
      </dragGableWrap>
    </div>
  </el-form-item>
</template>
