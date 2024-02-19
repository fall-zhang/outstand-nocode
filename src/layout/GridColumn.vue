<!-- 组件功能：根据提供的宽度，自适应多列 -->

<template>
  <div class="chartFileGroup" ref="outContainer" :style="{ gridTemplateColumns: 'repeat(' + rowCount + ',1fr)' }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const prop = defineProps({
  // 单个子项的最大宽度
  max: {
    require: true,
    type: Number,
    default: 260
  },
  // 最小的宽度
  width: {
    require: true,
    type: Number,
    default: 260
  }
})
const outContainer = ref()
const rowCount = ref()
function resizeContainer() {
  const out = outContainer.value.getBoundingClientRect()
  let columnCount = Math.floor(Number(out.width) / prop.width)
  if (columnCount === 0) {
    rowCount.value = 1
  } else {
    rowCount.value = columnCount
  }
}
onMounted(() => {
  window.addEventListener('resize', resizeContainer)
  resizeContainer()
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeContainer)
})

</script>
<style lang="scss" scoped>
.chartFileGroup {
  display: grid;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  padding: 20px;
  box-sizing: border-box;
}

</style>