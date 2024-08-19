<template>
  <div class="fun-main">
    <!-- <div class="add-item" @click="onAddNewChart('导图')">
      <MindmapMapIcon class="menu-icon left" />
      <span class="add-text">新建导图</span>
      <IconPlus class="menu-icon"></IconPlus>
    </div> -->
    <div class="add-item" @click="$router.push('/rich-form')">
      <IconKagiMap class="menu-icon left" />
      <span class="add-text">表单生成</span>
      <IconPlus class="menu-icon"></IconPlus>
    </div>
    <!-- <div class="add-item" @click="onAddNewChart('图表生成')">
      <IconKagiMap class="menu-icon left" />
      <span class="add-text">图表生成</span>
      <IconPlus class="menu-icon"></IconPlus>
    </div> -->
    <div class="add-item" @click="onAddNewChart('图表编辑')">
      <ChartHistogram class="menu-icon left" />
      <span class="add-text">创建图表</span>
      <IconPlus class="menu-icon"></IconPlus>
    </div>
    <div class="working-item">
      <FreezeLine class="menu-icon left" />
      <span class="add-text">功能施工中...</span>
      <!-- <IconPlus class="menu-icon"></IconPlus> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus as IconPlus, MindmapMap as MindmapMapIcon, ChartHistogram, KagiMap as IconKagiMap, FreezeLine } from '@icon-park/vue-next'
import { useRouter } from 'vue-router'
const router = useRouter()
const onAddNewChart = (type: string) => {
  let link = ''
  switch (type) {
    case '导图':
      link = '/mind-map'
      break
    case '图表生成':
      link = '/chart-generate'
      break
    case '图表编辑':
      link = '/filling-chart'
      break
    default:
      console.warn('未找到匹配内容')
  }
  router.push(link)
}
</script>

<style lang="scss" scoped>
.working-item {
  cursor: pointer;
  height: 64px;
  margin-right: 24px;
  box-sizing: border-box;
  padding: 0 20px;
  width: 200px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--gray-1);

  &:hover {
    background-color: var(--gray-1);
    transition: .5s;
  }
}

.add-item {
  height: 64px;
  margin-right: 24px;
  box-sizing: border-box;
  padding: 0 20px;
  width: 200px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--gray-1);
  cursor: pointer;

  &:hover {
    background-color: var(--gray-1);
    transition: .5s;
  }

}

.fun-main {
  display: flex;
  align-items: center;
  padding: 28px;
}

.add-text {
  flex: 1;
  font-size: 16px;
  line-height: 16px;
}

.menu-icon {
  width: 24px;
  font-size: 24px;
  display: flex;
  align-items: center;

  &.left {
    margin-right: 10px;
  }
}
</style>
