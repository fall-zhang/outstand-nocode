<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
import { useFetch } from '@vueuse/core'
import { deepClone } from '@/utils/utils'
defineOptions({
  name: 'FeUploadMobile',
  inheritAttrs: false,
  customOptions: {}
})
const {
  t
} = useI18n()
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
const fileList = ref(deepClone(props.data.options.defaultValue))
const afterRead = async (file) => {
  const files = Array.isArray(file) ? file : [file]
  console.log(files)
  const form = new FormData()
  files.forEach((e) => {
    e.status = 'uploading'
    e.message = t('rf.form.uploading')
    // e.status = 'uploading'
    form.append('file', e.file)
  })
  try {
    const response = await useFetch(props.data.options.action, {
      method: 'post',
      data: form
    })
    files.forEach((e, index) => {
      e.status = ''
      e.response = {
        data: [response.data[index]]
      }
    })
    props.data.options.defaultValue.push(...response.data)
  } catch (e) {
    files.forEach((e) => {
      e.status = 'failed'
      e.message = t('rf.form.uploadFailed')
      // form.append('file', e.file)
    })
    showToast(e.message)
  }
}
const handleDel = (file) => {
  const url = file.response ? file.response.data[0].url : file.url
  props.data.options.defaultValue.splice(props.data.options.defaultValue.map(e => e.url).indexOf(url), 1)
}
</script>
<template>
  <van-field readonly v-bind="params">
    <template #input>
      <van-uploader v-bind="params" v-model="fileList" :after-read="afterRead" @delete="handleDel" />
    </template>
  </van-field>
</template>
