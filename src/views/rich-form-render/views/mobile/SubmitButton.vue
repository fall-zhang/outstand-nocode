<script setup lang="ts">
defineOptions({
  name: 'SubmitButtonMobile'
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
  <div>
    <van-button @click="handleClick" round block type="primary" :color="backgroundColor">
      <span :style="{ color: color }">{{ text }}</span>
    </van-button>
  </div>
</template>

<style scoped></style>
