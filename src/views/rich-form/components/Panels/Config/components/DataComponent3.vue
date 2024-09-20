<script>
import utils from '@/utils'
import { useI18n } from 'vue-i18n'
import { useTarget } from '@Form/hooks/use-target'
import { unref } from 'vue'
import { dragGableWrap } from '@/views/rich-form/components/Layout/DragGable'
import Icon from '@/assets'
export default {
  name: 'ConfigData3'
}
</script>
<script setup>
const { target } = useTarget()
const { t } = useI18n()
const addTab = (type) => {
  const data = utils.renderFieldData(`${target.value.type}Col`)
  data.label = `Tab ${unref(target).columns.length + 1}`
  // console.log(unref(target))
  unref(target).columns.push(data)
  utils.addContext(data, target.value)
}
</script>
<template>
  <el-form-item>
    <template #label>
      <div class="d-title">
        <span class="el-form-item__label">{{ t('rf.config.dataComponent3.panel') }}</span>
        <el-button text @click="addTab">{{ t('rf.config.dataComponent3.add') }}</el-button>
      </div>
    </template>
    <div style="width: 100%;">
      <dragGableWrap :list="target.columns" item-key="id" tag="ul" handle=".handle" class="d-content">
        <template #item="{ element, index }">
          <li>
            <el-input size="default" clearable v-model="element.label" />
            <div class="d-operate">
              <Icon class="d-icon" @click="target.columns.splice(index, 1)" icon="delete"></Icon>
              <Icon class="d-icon handle" icon="Rank"></Icon>
            </div>
          </li>
        </template>
      </dragGableWrap>
    </div>
  </el-form-item>
</template>
<style lang="scss" scoped>
.d-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-button {
    background: none !important;
    padding: 0;
  }
}

.d-content {
  li {
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-input {
      width: 86%;
    }
  }
}

.d-icon {
  &:hover {
    color: $primary-color;
  }
}

.d-operate {
  width: 16%;
  display: flex;
  justify-content: space-around;
}
</style>