<!-- 图表类型 - 编辑图表配置 -->
<template>
  <div class="right-panel">
    <div class="panel-title">
      <h3 style="position: relative;">
        <IconReturn v-show="!isRootConfig" @click="onClickBack"
          style="cursor: pointer;position: absolute;left: 16px;top: 6px;" />
        {{ "图表类型" }}
        <div style="width: 40px;"></div>
      </h3>
      <div>
        <a @click="onChangeOption(-1)">图表</a>
        <template v-for="(item, index) in currentPath" :key="item.keyId">
          <a @click="onChangeOption(index)" v-if="item.index === undefined">
            / {{ item.keyName }}
          </a>
          <a @click="onChangeOption(index)" v-else>
            / {{ chartType[item.keyId] }}
          </a>
        </template>
      </div>
    </div>
    <!-- {{ currentForm }} -->
    <ul class="cell-group">
      <!-- 根配置 -->
      <template v-if="isRootConfig">
        <li class="cell-item add-method">
          <el-select v-model="currentSeriesType" size="small">
            <el-option v-for="(value, key) in chartType" :label="value" :value="key" :key="key"> </el-option>
          </el-select>
          <el-button type="primary" size="small">添加</el-button>
        </li>
        <!-- 首页，当前所拥有的图表和数据配置 -->
        <li class="cell-item complex-cell" v-for="(series, index) in currentForm" :key="series.id">
          <div>
            <div>
              图表名称：
              <el-input v-model="series.name" @input="onChangeSeriesName" size="small" style="width:182px ;"></el-input>
            </div>
            图表类型：
            <el-select v-model="series.type" size="small" @change="onChangeSeriesType">
              <el-option v-for="(value, key) in chartType" :label="value" :value="key" :key="key"> </el-option>
            </el-select>
          </div>
          <el-button circle type="primary" @click="onSelectSeries(index, series.type)">
            <IconRight size="18px" />
          </el-button>
        </li>
      </template>
      <template v-else>
        <template v-for="option in currentOptionList" :key="option.keyId">
          <li v-if="option.children" class="cell-item link-cell" @click="onChangeSetting(option)">
            <span style="display: flex;">
              {{ option.keyName }}
              <HelpTooltip v-if="option.tips" :tip="option.tips" :path="currentPath"></HelpTooltip>
            </span>
            <IconRight class="g-icon-center" size="18px" />
          </li>
          <FormItem v-else :receiveValue="currentForm[option.keyId]" @change="(value) => onFormValueChange(value, option)"
            :form-option="option" />
        </template>
      </template>
      <!-- 属性详情渲染 -->
    </ul>
  </div>
</template>

<script setup lang="ts">
import FormItem from './components/FormItem.vue'
import { Right as IconRight, Return as IconReturn, Help as IconHelp, Plus as IconPlus } from '@icon-park/vue-next'
import formOptionList from './right-series'
import HelpTooltip from './components/HelpTooltip.vue'
import { ref } from 'vue'
import { deepClone } from '@/utils/utils'
import { EchartsOption } from './chart-config'
const prop = defineProps({
  receiveValue: {
    require: true,
    type: Object,
    default: () => ({})
  }
})

let mainForm = reactive(deepClone(prop.receiveValue))
watch(() => prop.receiveValue, (newVal) => {
  mainForm = reactive(deepClone(prop.receiveValue))
  refreshCurrentForm()
})

const currentSeriesType = ref('bar')
const emit = defineEmits(['change'])
const chartType = reactive<Record<string, string>>({
  line: '折线图',
  bar: '柱状图',
  pie: '饼图',
  scatter: '散点（气泡）图',
  radar: '雷达图图',
  map: '地图',
  tree: '树图',
  sunburst: '旭日图',
  boxplot: '箱型图',
  heatmap: '热力图',
  graph: '关系图',
  sankey: '桑基图',
})

const isRootConfig = ref<boolean>(true)

const currentPath = ref<{
  keyName: string,
  keyId: string
  index?: number // keyName === 'index' 时有 index
}[]>([])
// const configIndex = ref<number>(0)
const currentForm = ref<any>(mainForm.series)
const currentOptionList = ref<any[]>([])

const refreshCurrentForm = () => {
  let optList: unknown = currentOptionList.value
  let newForm: Record<string, any> = mainForm.series

  // if (currentPath.value.length > 0) {
  //   isRootConfig.value = false
  // }
  currentPath.value.forEach(path => {
    if (path.index !== undefined) {
      newForm = newForm[path.index]
    } else {
      if (!Array.isArray(optList)) {
        return
      }
      optList.forEach(option => {
        if (path.keyId === option.keyId && option.children) {
          optList = option.children
          if (newForm[path.keyId]) {
            newForm = newForm[path.keyId]
          } else {
            newForm[path.keyId] = {}
            newForm = newForm[path.keyId]
          }
        }
      })
    }
  })
  currentForm.value = newForm
  currentOptionList.value = optList as []
}
function onChangeOption(index: number) {
  if (index < 0) {
    currentPath.value = []
    isRootConfig.value = true
  } else {
    currentPath.value = currentPath.value.slice(0, index + 1)
  }
  refreshCurrentForm()
}

function onClickBack() {
  currentPath.value.pop()
  if (currentPath.value.length === 0) {
    isRootConfig.value = true
  }
  refreshCurrentForm()
  // if (currentPath.value.at(-1)?.keyName === 'index') {
  //   currentPath.value.pop()
  // }
}

function onFormValueChange(value: any, option: EchartsOption) {
  let editForm: any = mainForm.series
  if (currentPath.value.length > 0) {
    currentPath.value.forEach(item => {
      if (item.index !== undefined) {
        editForm = editForm[item.index]
      } else {
        editForm = editForm[item.keyId]
      }
    })
  }
  editForm[option.keyId] = value
  emit('change', mainForm)
}

function onSelectSeries(index: number, type: string) {
  // console.log("🚀 ~ file: SerisePagePanel.vue:189 ~ onSelectSeries ~ type:", type)
  isRootConfig.value = false
  currentPath.value.push({
    keyId: type,
    keyName: 'series',
    index,
  })
  currentOptionList.value = formOptionList[type]
  refreshCurrentForm()
}

function onChangeSetting(setting: { keyId: string, keyName: string }) {
  currentPath.value.push({
    keyId: setting.keyId,
    keyName: setting.keyName
  })
  refreshCurrentForm()
}
// timber
const timberFun = ref<number>(0)
function onChangeSeriesName() {
  clearTimeout(timberFun.value)
  timberFun.value = setTimeout(() => {
    emit('change', mainForm)
  }, 300)
}
const seriesStore = reactive({

})
function onChangeSeriesType() {
  emit('change', mainForm)
}
</script>

<style scoped lang="scss">
.right-panel {
  background-color: white;
  height: 100vh;
  overflow: auto;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .07), 0 1px 4px rgba(0, 0, 0, .07), 0 12px 32px rgba(0, 0, 0, .1), 0 2px 6px rgba(0, 0, 0, .08);

  .panel-title {
    text-align: center;

    h3 {
      font-size: 18px;
      font-weight: 600;
    }

  }
}

.cell-group {
  user-select: none;
}

.cell-item {
  padding: 4px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .3s;


  &.link-cell {
    cursor: pointer;
    height: 36px;
    min-width: 110px;

    &:hover {
      background-color: var(--gray-2);
    }
  }

  .complex-cell {
    cursor: pointer;
    height: 36px;
    min-width: 110px;
  }

  &.add-d {
    border-bottom: 1px solid var(--gray-1);
    padding-bottom: 8px;
    margin-bottom: 6px;
  }
}
</style>
