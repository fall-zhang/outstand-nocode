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
  <div>
    <van-button @click="handleClick" round block type="primary"
      :color="state.config[state.platform].completeButton.backgroundColor">
      <span :style="{ color: state.config[state.platform].completeButton.color }">{{
        state.config[state.platform].completeButton.text }}</span>
    </van-button>
  </div>
</template>

<style scoped></style>
