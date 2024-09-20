<template>
  <el-tooltip placement="top" :show-after="300">
    <div class="cursor-pointer">
      <slot></slot>
    </div>
    <template #content>
      {{ tip }}
    </template>
  </el-tooltip>
</template>

<script lang="ts" setup>
defineProps({
  tip: {
    require: false,
    default: '',
    type: String
  }
})

</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
