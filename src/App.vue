<script setup lang="tsx">
// import ToDoList from '@C/ToDoList.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useI18n } from 'vue-i18n'
// import CollectionItem from '@/components/_collection/CollectionItem.vue'
const locale = ref(zhCn)
const { t } = useI18n()
</script>
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
    {{ t('rf.sleep.night') }}
  </el-config-provider>
</template>

<style lang="scss">
@import './styles/Basic.scss';
</style>
