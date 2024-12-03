<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import CKEditor from '@/components/module/ckeditor/index'
defineOptions({
  name: 'FeHtmlMobile',
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
const dialogVisible = ref(false)
const popup = ref()
const currentValue = computed({
  get() {
    let result = ''
    if (props.data.options.defaultValue) {
      result = t('rf.form.filled')
    } else {
      result = t('rf.form.notFilled')
    }
    return result
  }
})
const handleAction = async (type) => {
  dialogVisible.value = false
}
</script>
<template>
  <van-field readonly v-model="currentValue" @click="!params.disabled && (dialogVisible = true)" v-bind="params" />
  <van-popup ref="popup" :lock-scroll="false" class="popup" teleport="body" v-model:show="dialogVisible"
    position="right" :style="{ width: '100%', height: '100vh' }" :safe-area-inset-bottom="true">
    <van-nav-bar :left-text="t('rf.public.back')" left-arrow @click-left="handleAction(1)">
      <template #right>
        <span @click="handleAction(2)" class="van-nav-bar__text">{{ t('rf.public.save') }}</span>
      </template>
    </van-nav-bar>
    <CKEditor platform="mobile" v-model="data.options.defaultValue" v-bind="params"></CKEditor>
  </van-popup>
</template>

<style scoped></style>
