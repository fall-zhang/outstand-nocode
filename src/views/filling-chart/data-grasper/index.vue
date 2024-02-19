<template>
  <div style="display: flex;overflow: hidden;">
    <el-button type="primary" @click="onCheckType">x 轴</el-button>
    <el-button type="primary" @click="onCheckType">y 轴</el-button>
    <el-button type="primary" @click="onCheckType">数据轴</el-button>
    <FanTable></FanTable>
  </div>
</template>

<script setup lang="ts">
import { Return as IconReturn } from '@icon-park/vue-next'
import { ref, onMounted, watch } from 'vue'
import { v4 as uuid } from 'uuid'


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
function onCheckType() {

}
</script>

<script lang="ts">
export default {
  name: 'DataGrasper',
}
</script>
<style scoped lang="scss">
.main-graph {
  flex-grow: 1;
  flex-shrink: 1;
}

.right-panel {
  flex-basis: 360px;
  width: 360px;
  overflow: hidden;
}
</style>
