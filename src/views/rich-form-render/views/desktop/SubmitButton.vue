<script setup lang="ts">
import { useTarget } from '@Form/hooks/use-target'
defineOptions({
  name: 'CompleteButton'
})
const props = defineProps<{
  mode?: string,
  backgroundColor: string
  color: string
}>()
const { state } = useTarget()
const handleClick = async (type:string) => {
}
</script>
<template>
  <div style="text-align: center;">
    <el-button @click="handleClick('')" :color="state.config[state.platform].completeButton.backgroundColor" type="primary">
      <span :style="{ color: state.config[state.platform].completeButton.color }">{{
        state.config[state.platform].completeButton.text }}</span>
    </el-button>
  </div>
</template>

<style scoped></style>
