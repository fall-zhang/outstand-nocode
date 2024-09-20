<script>
import dayjs from 'dayjs'
import { useTarget } from '@Form/hooks/use-target'
import { useI18n } from 'vue-i18n'
export default {
  name: 'ConfigLimitComponent',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  t
} = useI18n()
const {
  target
} = useTarget()
// const props = defineProps({
//   min: {
//     type: Number,
//     default: 0
//   }
// })
// watch(target, (e) => {
//   console.log(JSON.stringify(e))
// })
</script>
<template>
  <el-row align="middle" :gutter="8">
    <el-col :span="11">
      <el-form-item :label="t('rf.public.min')">
        <el-date-picker v-model="target.options.startTime" value-format="X" type="date"
          :disabled-date="(time) => target.options && (target.options.endTime && dayjs.unix(time).isAfter(dayjs.unix(target.options.endTime)))"
          placeholder="" />
      </el-form-item>
    </el-col>
    <el-col :span="2">~</el-col>
    <el-col :span="11">
      <el-form-item :label="t('rf.public.max')">
        <el-date-picker value-format="X" v-model="target.options.endTime" type="date" placeholder=""
          :disabled-date="(time) => target.options && (target.options.startTime && dayjs.unix(time).isBefore(dayjs.unix(target.options.startTime)))" />
      </el-form-item>
    </el-col>
  </el-row>
</template>
