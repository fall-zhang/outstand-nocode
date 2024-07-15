<script setup lang="tsx">
// import ToDoList from '@C/ToDoList.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import CollectionItem from '@/components/_collection/CollectionItem.vue'
const locale = ref(zhCn)

</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
@import './styles/Basic.scss';
</style>
