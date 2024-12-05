<template>
  <el-dialog destroy-on-close fullscreen class="previewDialog" @closed="previewPlatform = 'pc'"
    v-model="previewVisible">
    <template #header>
      <DeviceSwitch :modelValue="previewPlatform" @update:model-value="onDeviceSwitch">
      </DeviceSwitch>
    </template>
    <div v-loading="previewLoading" class="previewDialogWrap " :class="previewPlatform === 'mobile' && 'mobilePreview'">
      <FormPreview :visible ref="EReditorPreviewRef" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import FormPreview from './form-render.vue'
const previewPlatform = ref<'pc' | 'mobile'>('pc')
defineProps({
  visible: {
    default: false,
    type: Boolean
  }
})
const previewVisible = ref(false)
const previewLoading = ref(false)
function onDeviceSwitch(val: any) {
  previewLoading.value = true
  previewPlatform.value = val
  nextTick(() => {
    nextTick(() => {
      previewLoading.value = false
    })
  })
}
</script>

<style lang="scss">
.previewDialog {
  .el-dialog__header {
    display: flex;
    justify-content: center;
    height: 40px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    margin-right: 0;
    position: relative;
    z-index: 2;
    padding: 0;
    align-items: center;

    .el-dialog__headerbtn {
      top: 0;
      height: 40px;
      width: 40px;
    }
  }

  .el-dialog__body {
    padding-top: 0;
    height: calc(100% - 70px);
  }
}
</style>
