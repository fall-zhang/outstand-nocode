<template>
  <div ref="sortableRef">
    <div class="item-drag">dddddd</div>
    <div class="item-drag">dddddd</div>
    <div class="item-drag">dddddd</div>
    <div class="item-drag">dddddd</div>
    <div class="item-drag">dddddd</div>
    <div class="item-drag">dddddd</div>
    <div class="item-drag">dddddd</div>
    <div class="item-drag">dddddd</div>
    <div class="item-drag">dddddd</div>
    <div class="item-drag">dddddd</div>
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs'
const sortableRef = useTemplateRef('sortableRef')
onMounted(() => {
  const sortable = new Sortable(sortableRef.value!, {
    // handle: '.handle', // Drag handle selector within list items
    filter: '.filtered', // 'filtered' class is not draggable
    group: 'shared',
    animation: 150,
    ghostClass: 'blue-background-class' // 拖拽时的类名
  })
})
</script>

<style scoped lang="scss"></style>
