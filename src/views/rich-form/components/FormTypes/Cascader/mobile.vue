<script>
import { useNamespace } from '@/hooks/use-namespace'
export default {
  name: 'FeCascader',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = useNamespace('FormTypesCascader_mobile')
const onClear = () => {
  props.data.options.defaultValue = []
}
</script>
<template>
  <van-field readonly :class="[ns.b()]" v-bind="params">
    <template #input>
      <el-cascader v-model="data.options.defaultValue" v-bind="params" :popper-class="ns.e('cascader')" />
    </template>
    <template v-if="data.options.defaultValue && data.options.defaultValue.length && params.clearable" #button>
      <van-icon @touchstart.stop="onClear" name="clear" />
    </template>
  </van-field>
</template>

<style scoped></style>
