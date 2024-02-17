<!-- 通过导入 excel 或者其它类型的数据，将数据选中，挂载到图表上 -->
<template>
  <PageLayout no-side>
    <template #header>
      <h2>图表生成</h2>
    </template>
    <div style="display: flex;overflow: hidden;">
      <FileListGroup></FileListGroup>
    </div>
    <!-- <HandsonTable /> -->
    <FanTable ref="tableRef" />
  </PageLayout>
</template>

<script lang="ts" setup>
// import HandsonTable from '@/components/module/HandsonTable.vue'
import { PageLayout } from '@/layout'
import FileList from './components/FileList'
import FileListGroup from './components/FileListGroup'
import FanTable from '@/components/module/FanTable.vue'
const router = useRouter()
const onClickBack = () => router.go(-1)

</script>

<style lang="scss" scoped></style>
