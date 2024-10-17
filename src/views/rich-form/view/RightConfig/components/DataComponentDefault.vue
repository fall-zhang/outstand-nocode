// 原 DataComponent1
<template>
  <div>
    {{ 'DataComponent1 --- DataComponentDefault' }}
    <table :class="$style.tableThead">
      <thead>
        <tr>
          <th>{{ t('rf.config.dataComponent1.defaultLabel') }}</th>
          <th>{{ t('rf.config.dataComponent1.unique') }}</th>
          <th>{{ t('rf.config.dataComponent1.name') }}</th>
          <th>{{ t('rf.config.dataComponent1.operate') }}</th>
        </tr>
      </thead>
    </table>
    <ElScrollbar ref="scrollbar" height="400px">
      <ElForm ref="form" :model="data">
        <ElCheckboxGroup :modelValue="checkList">
          <table :class="$style.table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <DraggableWrap tag="tbody" :list="data" handle=".handle" item-key="null">
              <template #item="{ element, index }">
                <tr>
                  <td>
                    <ElCheckbox @change="(e) => onChangeSelect(e, element)" :label="element.value" />
                  </td>
                  <td>
                    <ElFormItem :prop="`${index}.value`" :rules="[
                      { required: true, message: '' },
                      { type: 'number', message: t('rf.validateMsg.idUnique') },
                    ]">
                      <ElInput clearable :model-value="element.value"></ElInput>
                    </ElFormItem>
                  </td>
                  <td>
                    <ElFormItem :prop="`${index}.label`" :rules="[
                      { required: true, message: t('rf.validateMsg.required') },
                      { type: 'number', message: 'age must be a number' },
                    ]">
                      <ElInput clearable :model-value="element.label"></ElInput>
                    </ElFormItem>
                  </td>
                  <td>
                    <div :class="$style.operate">
                      <Icon :class="$style.icon" @click="() => data.splice(index, 1)" icon="delete"></Icon>
                      <Icon :class="[$style.icon, $style.handle]" icon="move1"></Icon>
                    </div>
                  </td>
                </tr>
              </template>
            </DraggableWrap>
          </table>
        </ElCheckboxGroup>
      </ElForm>
    </ElScrollbar>
    <div :class="$style.button">
      <ElButton @click="onAddSelect">{{ t('rf.config.dataComponent1.add') }}</ElButton>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { unref, nextTick, } from 'vue'
import { useTarget } from '@Form/hooks/use-target'
import { useI18n } from 'vue-i18n'
import Icon from '@/assets'
import { DraggableWrap } from '@Form/components/FormContainer/DraggableWrap'
import { ElCheckbox, ElCheckboxGroup, ElForm, ElFormItem, ElScrollbar, ElInput, ElButton } from 'element-plus'
import $style from './DataComponents.module.scss'
import { deepClone, intersection } from '@/utils/utils'
import { generateOptions } from '@/utils/generateOptions'
defineOptions({
  name: 'ConfigDataDefault',
  inheritAttrs: false,
  customOptions: {},
})
const checkList = ref<any[]>([])
const data = ref<any[]>([])
const { state, target, type } = useTarget()
const { t } = useI18n()
const formRef = useTemplateRef('form')
const scrollRef = useTemplateRef('scrollbar')
if (state.mode === 'config') {
  data.value = target.value.options.data = target.value.options.data || generateOptions(3)
} else {
  data.value = deepClone(state.data[target.value.options.dataKey].list)
}

const isMultiple = computed(() => {
  let result = false
  switch (type.value) {
    case 'checkbox':
      result = true
      break
    case 'select':
    case 'cascader':
      result = target.value.options.multiple
      break
    case 'tabs':
    case 'radio':
      result = false
      break
  }
  return result
})
if (isMultiple.value) {
  checkList.value = deepClone(target.value.options.defaultValue)
} else {
  checkList.value = [target.value.options.defaultValue]
}

// const validator = ({ field }, value, callback) => {
//   const newValue = value.trim()
//   if (newValue === '' || newValue === null || newValue === undefined) {
//     callback(new Error())
//     return false
//   }
//   if (field.includes('value')) {
//     if (data.value.filter((e) => e.value === newValue).length > 1) {
//       callback(new Error())
//       return false
//     }
//     callback()
//   } else {
//     callback()
//   }
// }
function getData() {
  return new Promise((resolve, reject) => {
    formRef.value!.validate((valid) => {
      if (valid) {
        const result: any = {
          data: deepClone(unref(data)),
          defaultValue: ''
        }
        if (isMultiple.value) {
          result.defaultValue = intersection(result.data.map((e: any) => e.value), unref(checkList))
        } else if (result.data.find((item: any) => item.value === unref(checkList)[0]) !== -1) {
          result.defaultValue = unref(checkList)[0]
        }
        resolve(result)
      } else {
        reject(new Error('valid is not pass'))
      }
    })
  })
}

const onAddSelect = () => {
  data.value.push(...generateOptions(1))
  nextTick(() => {
    // scrollRef.value.wrapRef.scrollHeight
    if (scrollRef.value?.wrapRef) {
      scrollRef.value.setScrollTop(scrollRef.value?.wrapRef?.scrollHeight)
    }
  })
}
const onChangeSelect = (value: string | number | boolean, item: any) => {
  if (!isMultiple.value) {
    if (!value) {
      return false
    }
    unref(checkList.value).filter(e => e !== item.value).forEach((e) => {
      unref(checkList.value).splice(unref(checkList.value).indexOf(e), 1)
    })
  }
}

defineExpose({
  getData
})
</script>
