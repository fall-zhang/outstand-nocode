<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useFormProvider } from '@/views/rich-form/hooks/use-form-provider'
defineOptions({
  name: 'ConfigLimitComponent',
  inheritAttrs: false,
  customOptions: {}
})
const { t } = useI18n()
const { selected } = useFormProvider()
</script>
<template>
  <el-row align="middle" :gutter="8">
    <el-col :span="11">
      <el-form-item :label="t('rf.public.min')">
        <el-date-picker v-model="selected.options.startTime" value-format="X" type="date"
          :disabled-date="(time: Date) => selected.options && (selected.options.endTime && dayjs(time).isAfter(dayjs.unix(selected.options.endTime)))"
          placeholder="" />
      </el-form-item>
    </el-col>
    <el-col :span="2">~</el-col>
    <el-col :span="11">
      <el-form-item :label="t('rf.public.max')">
        <el-date-picker value-format="X" v-model="selected.options.endTime" type="date" placeholder=""
          :disabled-date="(time: Date) => selected.options && (selected.options.startTime && dayjs(time).isBefore(dayjs.unix(selected.options.startTime)))" />
      </el-form-item>
    </el-col>
  </el-row>
</template>
