// 如果对象上面的属性为空，则删除该属性？（为空对象效果和为空时效果不一样？）
// 如果数组内容只有一个，那么转换成为对象
// 如果数组中没有内容，删除该属性
// 如果为 show false，压缩会去掉该属性
import { genTemplateCode } from './genSplitPart'
export function genVue3Code(option: any) {
  const templateCode = genTemplateCode(option)
  const jsCode = `
<script>
  import { init } from 'echarts';
  export default {
    name: 'GenChartCanvas',
    props: {
      option: {
        require: true
      }
    },
    data() {
      return {
        currentChart: null
      }
    },
    mounted() {
      this.renderChart()
    },
    methods: {
      renderChart(){
        this.currentChart = init(this.$refs['chart-zoom'])
        this.currentChart.setOption()
      },
      updateOption(option){
        if(!option) return
        this.currentChart.setOption(option)
      }
    }
  }
</script>`
  return templateCode + jsCode
}

export function genVue3SetupCode(option: any) {
  const templateCode = genTemplateCode(option)

  return templateCode + `
<script lang="ts" setup>
  import { init } from 'echarts';
  import {shallowRef,onMounted} from 'vue'
  const currentChart = shallowRef(null)
  onMounted(()=>{
    renderChart()
  })
  function renderChart(){
    currentChart.value = init(this.$refs['chart-zoom'])
    currentChart.value.setOption(${JSON.stringify(option)})
  }
  updateOption(option){
    if(!option) return
    this.currentChart.setOption(option)
  }
</script>
<script>
export default{
  name: 'GenChartCanvas'
}
</script>
  `
}

export const genVue2Code = (option: any) => {
  const chartOption = JSON.stringify(option, null, 2)
  // console.log(chartOption)
  return `<template>
  <div style="height: 600px;width: 860px;">
    <div ref="chart-zoom" style="height: 100%;width: 100%;"></div>
  </div>
</template>
<script>
import { init } from 'echarts';
export default {
  name: 'GenChartCanvas',
  props: {
    option: {
      require: true
    }
  },
  data() {
    return {
      currentChart: null
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart(){
      this.currentChart = init(this.$refs['chart-zoom'])
      this.currentChart.setOption(${chartOption})
    },
    updateOption(option){
      if(!option) return
      this.currentChart.setOption(option)
    }
  }
}
</script>`
}