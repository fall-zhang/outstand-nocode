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
import { ref, onMounted, watch, MaybeRef } from 'vue'
import { v4 as uuid } from 'uuid'
import { genRequireButton } from './tool'
const colorSeries = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
const chartOption = inject<Ref<any>>('chartOption')
const currentKey = ref(uuid())

genRequireButton(unref(currentKey), {
  color: colorSeries
})
const chartId = ref('')

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
