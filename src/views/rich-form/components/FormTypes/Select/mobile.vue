<script setup>
import { ref } from 'vue'
import hooks from '@/hooks'
defineOptions({
  name: 'FeSelectMobile',
  inheritAttrs: false,
  customOptions: {}
})
const props = defineProps({
  data: {
    require: true,
    type: Object,
    default: () => ({})
  },
  params: {
    require: true,
    type: Object,
    default: () => ({})
  }
})
const element = ref()
const ns = hooks.useNamespace('FormTypesSelect_mobile')
const onClear = () => {
  props.data.options.defaultValue = []
}
</script>
<template>
  <van-field readonly :class="[ns.b()]" v-bind="params" ref="element">
    <template #input>
      <el-select @change="element.resetValidation()" v-model="data.options.defaultValue" v-bind="params">
        <el-option v-for="item in params.options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </template>
    <template v-if="data.options.defaultValue.length && params.clearable" #button>
      <van-icon @click.stop="onClear" name="clear" />
    </template>
  </van-field>
</template>

<style scoped></style>
