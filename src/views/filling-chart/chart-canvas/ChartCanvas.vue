<template>
  <!-- 可以自定义容器的大小，允许用户拖拽以查看表现效果 -->
  <div class="chart-container">
    <!-- {{ option }} -->
    <div ref="chartZoom" style="height: 100%;width: 100%;"></div>
  </div>
</template>

<script lang="ts" setup>
import { deepClone } from '@/utils/utils'
import { init } from 'echarts'
import type { EChartsType } from 'echarts'

const chartZoom = ref()
const prop = defineProps({
  chartId: {
    require: true,
    default: '',
    type: String
  },
  option: {
    require: true,
    default: () => ({}),
    type: Object
  }
})
const currentChart = ref<EChartsType>()
watch(() => prop.chartId,
  (newVal) => {
    // console.log(newVal);
    // console.log(prop.option);
    currentChart.value?.clear()
    currentChart.value?.setOption(deepClone(prop.option))
  })
onMounted(() => {
  currentChart.value = init(chartZoom.value)
  // console.log(prop.option)
  const chartOption = deepClone(prop.option)
  currentChart.value.setOption(chartOption as any)
})
</script>

<style scoped lang="scss">
.chart-container {
  height: 600px;
  width: 860px;
  width: calc(100% - 360px);
}
</style>
