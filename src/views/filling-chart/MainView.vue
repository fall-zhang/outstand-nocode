<template>
  <PageLayout no-side>
    <template #header-icon>
      <IconReturn @click="onClickBack" style="cursor: pointer;" />
    </template>
    <div style="display: flex;overflow: hidden;">
      <div class="main-graph">
        <!-- 头部工具 -->
        <HeaderTools :option="chartOption" @change="onChangeHistory"></HeaderTools>
        <!-- echart 工具 -->
        <ChartCanvas :option="chartOption" :chartId="chartId"></ChartCanvas>
        <!-- <div style="width: calc(100% - 360px);">
          <MonacoEditor ref="jsonEditor" :text="monacoCode"></MonacoEditor>
        </div> -->
        <DataGrasper></DataGrasper>
      </div>
      <!-- 负责修改 chartOption -->
      <RightPanel :key="currentKey" class="right-panel" :chartOption="chartOption" @change="onChangeOption"></RightPanel>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
// import ChartCanvas from './chart-canvas/ChartCanvas.vue'
// import RightPanel from './right-panel/RightPanel.vue'
import HeaderTools from './header-tools/HeaderTools.vue'
// import MonacoEditor from '@/components/module/MonacoEditor.vue'
import DataGrasper from './data-grasper/index.vue'
// import MonacoEditor from '@/components/module/MonacoEditor.vue'
import { Return as IconReturn } from '@icon-park/vue-next'
import { PageLayout } from '@/layout'
import { v4 as uuid } from 'uuid'

// const jsonEditor = ref(null)
const ChartCanvas = defineAsyncComponent(() => import('./chart-canvas/ChartCanvas.vue'))
const RightPanel = defineAsyncComponent(() => import('./right-panel/RightPanel.vue'))
const router = useRouter()

const onClickBack = () => router.go(-1)

const currentKey = ref(uuid())
let chartOption = ref({
  xAxis: {
    show: true,
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'bar'
    }
  ]
})
provide('chartOption', chartOption)
// const monacoCode = ref(JSON.stringify(toRaw(chartOption.value), null, 2))
const chartId = ref('')

// id 用来判断内容是否修改了，option表示
function onChangeOption(id: string, option: any) {
  chartOption.value = option
  chartId.value = id
}
function onChangeHistory(newVal: any) {
  const newId = uuid()
  chartId.value = newId
  currentKey.value = newId
  chartOption.value = newVal
}
</script>
<script lang="ts">
export default {
  name: 'MainView',
}
</script>
<style scoped lang="scss">
.main-graph {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
}

.right-panel {
  flex-basis: 360px;
  width: 360px;
  overflow: hidden;
}
</style>
