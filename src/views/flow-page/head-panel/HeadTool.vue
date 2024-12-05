<template>
  <div class="tool-bar">
    <el-dropdown>
      <!-- <span class="el-dropdown-link"> -->
      <el-button type="primary" class="config-graph">
        画布设置
        <IconDown style="margin-left:6px;" theme="outline" size="14" />
      </el-button>
      <!-- </span> -->
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-checkbox v-model="setting.canZoom" @change="onToggleZoom">
              滚轮缩放
            </el-checkbox>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-checkbox v-model="setting.dragGraph" @change="onToggleDrag">
              画布可拖拽
            </el-checkbox>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-checkbox v-model="setting.showGrid" @change="onToggleGrid">
              显示网格
            </el-checkbox>
          </el-dropdown-item>
          <el-dropdown-item divided>
            默认设置
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div style="margin: 0 12px;">
      <el-button size="small" type="primary" @click="onDownload">
        保存
      </el-button>
      <el-button size="small" type="primary" @click="onImport">
        导入
      </el-button>
      <el-tooltip class="box-item" :open-delay="400" effect="dark" content="上一步：Ctrl+z" placement="bottom">
        <el-button size="small" circle type="primary" @click="onPreStep">
          <IconUndo></IconUndo>
        </el-button>
      </el-tooltip>
      <el-tooltip class="box-item" :open-delay="400" effect="dark" content="下一步：Ctrl+y" placement="bottom">
        <el-button size="small" circle type="primary" @click="onNextStep">
          <IconRedo></IconRedo>
        </el-button>
      </el-tooltip>
    </div>
    <el-checkbox v-model="setting.smartConnect" style="border-left:1px solid #aaa;padding-left: 10px;"
      @change="onSmartConnect">
      <span style="display: flex">
        <span>快速连接</span>
        <el-tooltip class="box-item" :open-delay="400" effect="dark" content="快速连接：点击两个节点即可实现连接" placement="bottom">
          <IconHelp style="display: flex;align-items: center;padding-left: 4px;" />
        </el-tooltip>
      </span>
    </el-checkbox>
  </div>
</template>

<script setup lang="ts">
import { DataUri } from '@antv/x6'
import { Down as IconDown, Redo as IconRedo, Undo as IconUndo, Help as IconHelp } from '@icon-park/vue-next'
import { Export } from '@antv/x6-plugin-export'
import type { Graph } from '@antv/x6'
import { useFlowInject } from '@/views/flow-page/hooks/useFlowInject'
defineEmits(['updateConfig', 'onExport', 'onInport', 'onClear'])
const { graph } = useFlowInject()
const setting = reactive({
  dragGraph: true, // 移动画布
  showGrid: true, // 展示网格
  smartConnect: false, // 智能连接
  canZoom: true, // 能否缩放
  deleteEdgeConfirm: true
})
// 画布下拉菜单
function onToggleGrid() {
  if (!graph.value) {
    return
  }
  if (setting.showGrid) {
    graph.value.showGrid()
  } else {
    graph.value.hideGrid()
  }
}
function onToggleZoom() {

}
function onToggleDrag() {
  // console.log(this.setting.dragGraph)
  if (!graph.value) {
    throw Error('获取不到 graph')
  }
  if (setting.dragGraph) {
    graph.value.enablePanning()
    graph.value.disableRubberband()
    graph.value.disableSelection()
  } else {
    graph.value.disablePanning()
    graph.value.enableSelection()
    graph.value.enableRubberband()
  }
}
function onImport() {

}
function onPreStep() {
  graph.value!.undo()
}
function onNextStep() {
  graph.value!.redo()
}
function onDownload() {
  console.log(graph.value)
  // 下载
  graph.value.use(new Export()).toPNG(
    (dataUri: string) => DataUri.downloadDataUri(dataUri, 'chart.png'),
    {
      padding: {
        top: 20,
        right: 30,
        bottom: 40,
        left: 50
      }
    })
}

function onSmartConnect() {
  if (!graph.value) {
    return
  }
  if (setting.smartConnect) {
    graph.value.enableMultipleSelection()
  } else {
    graph.value.disableMultipleSelection()
  }
  // 只要改变状态，就清空快速连接的内容
}

defineExpose({
  setting
})
</script>

<style scoped lang="scss">
.tool-bar {
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 3px 10px 0px #727272aa, 1px 0px 14px 0px #727272cc;
  z-index: 1;
}
</style>
