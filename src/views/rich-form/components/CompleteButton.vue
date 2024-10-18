<script setup>
import { unref } from 'vue'
import { useTarget } from '@Form/hooks/use-target'
defineOptions({
  name: 'CompleteButton'
})
const props = defineProps({
  handle: {
    type: Object,
    default: () => ({})
  },
  mode: {
    type: String,
    default: 'edit'
  }
})
const {
  state,
  isDesktop
} = useTarget()
const handleClick = async (type) => {
  if (props.mode === 'preview') return false
  try {
    await Promise.resolve(unref(props.handle).validate())
  } catch (e) {
    console.warn(e)
  }
}
</script>
<template>
  <div v-if="isDesktop" style="text-align: center;">
    <el-button @click="handleClick" :color="state.config[state.platform].completeButton.backgroundColor" type="primary">
      <span :style="{ color: state.config[state.platform].completeButton.color }">{{
        state.config[state.platform].completeButton.text }}</span>
    </el-button>
  </div>
  <div v-else>
    <van-button @click="handleClick" round block type="primary"
      :color="state.config[state.platform].completeButton.backgroundColor">
      <span :style="{ color: state.config[state.platform].completeButton.color }">{{
        state.config[state.platform].completeButton.text }}</span>
    </van-button>
  </div>
</template>

<style scoped></style>
