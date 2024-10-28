<script setup lang="ts">
defineOptions({
  name: 'SubmitButtonDesktop'
})
const props = defineProps<{
  mode?: string,
  backgroundColor: string
  color: string
  text: string
}>()
const handleClick = async (type: string) => {
}
</script>
<template>
  <div style="text-align: center;">
    <el-button @click="handleClick('')" :color="backgroundColor" type="primary">
      <span :style="{ color: color }">
        {{ text }}
      </span>
    </el-button>
  </div>
</template>

<style scoped></style>
